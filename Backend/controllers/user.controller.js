const user = require('../model/db.usermodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// 1. REGISTER
async function register(req, res) {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields (username, email, password) are required" });
        }

        const existingUser = await user.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            if (existingUser.email === email) {
                return res.status(400).json({ message: "User with this email already exists" });
            }
            return res.status(400).json({ message: "Username is already taken" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await user.create({
            username,
            email,
            password: hashedPassword
        });

        return res.status(201).json({
            message: "User created successfully",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }
        });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: "Error creating user", error: error.message });
    }
}

// 2. LOGIN (Issues Access Token + Refresh Token)
async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const existingUser = await user.findOne({ email });
        if (!existingUser) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // A. Generate short-lived Access Token (15m)
        const accessToken = jwt.sign(
            { id: existingUser._id.toString(), username: existingUser.username, email: existingUser.email },
            process.env.ACCESS_TOKEN_SECRET || "default_access_secret",
            { expiresIn: '15m' }
        );

        // B. Generate long-lived Refresh Token (7d)
        const refreshToken = jwt.sign(
            { id: existingUser._id.toString() },
            process.env.REFRESH_TOKEN_SECRET || "default_refresh_secret",
            { expiresIn: '7d' }
        );

        // C. Save refresh token directly to database
        await user.findByIdAndUpdate(existingUser._id, { refreshToken: refreshToken });

        // D. Set refresh token in HttpOnly cookie
        res.cookie('jwt_refresh', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        // E. Send access token in JSON body
        return res.status(200).json({
            message: "Login successful",
            accessToken,
            user: {
                id: existingUser._id.toString(),
                username: existingUser.username,
                email: existingUser.email
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

// 3. REFRESH TOKEN (Exchanges refresh token cookie for a new access token)
async function refreshTokenHandler(req, res) {
    try {
        const cookies = req.cookies;
        if (!cookies?.jwt_refresh) {
            return res.status(401).json({ message: "No refresh token provided" });
        }

        const incomingRefreshToken = cookies.jwt_refresh;

        const foundUser = await user.findOne({ refreshToken: incomingRefreshToken });
        if (!foundUser) {
            res.clearCookie('jwt_refresh', {
                httpOnly: true,
                sameSite: 'lax',
                secure: process.env.NODE_ENV === 'production'
            });
            return res.status(403).json({ message: "Invalid or revoked refresh token" });
        }

        try {
            const decoded = jwt.verify(
                incomingRefreshToken,
                process.env.REFRESH_TOKEN_SECRET || "default_refresh_secret"
            );

            if (foundUser._id.toString() !== decoded.id) {
                return res.status(403).json({ message: "Token identification mismatch" });
            }

            const newAccessToken = jwt.sign(
                { id: foundUser._id.toString(), username: foundUser.username, email: foundUser.email },
                process.env.ACCESS_TOKEN_SECRET || "default_access_secret",
                { expiresIn: '15m' }
            );

            return res.status(200).json({
                accessToken: newAccessToken,
                user: {
                    id: foundUser._id.toString(),
                    username: foundUser.username,
                    email: foundUser.email
                }
            });
        } catch (jwtErr) {
            foundUser.refreshToken = null;
            await foundUser.save();
            res.clearCookie('jwt_refresh', {
                httpOnly: true,
                sameSite: 'lax',
                secure: process.env.NODE_ENV === 'production'
            });
            return res.status(403).json({ message: "Refresh token expired or invalid" });
        }
    } catch (error) {
        console.error('Refresh token error:', error);
        return res.status(500).json({ message: "Server error during token refresh" });
    }
}

// 4. LOGOUT (Clears token from DB and deletes cookie)
async function logout(req, res) {
    try {
        const cookies = req.cookies;
        if (!cookies?.jwt_refresh) {
            res.clearCookie('jwt_refresh', {
                httpOnly: true,
                sameSite: 'lax',
                secure: process.env.NODE_ENV === 'production'
            });
            return res.status(200).json({ message: "Logged out successfully" });
        }

        const incomingRefreshToken = cookies.jwt_refresh;
        const foundUser = await user.findOne({ refreshToken: incomingRefreshToken });

        if (foundUser) {
            foundUser.refreshToken = null;
            await foundUser.save();
        }

        res.clearCookie('jwt_refresh', {
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production'
        });

        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error during logout" });
    }
}

// 5. GET USERS (Protected endpoint)
async function getusers(req, res) {
    try {
        const allusers = await user.find().select('-password -refreshToken');
        return res.status(200).json({
            message: "Users fetched successfully",
            allusers
        });
    } catch (error) {
        return res.status(500).json({ message: "Error in fetching users" });
    }
}

// 6. UPDATE USER (Protected endpoint)
async function updateusers(req, res) {
    try {
        const { id } = req.params;
        if (req.user?.id !== id) {
            return res.status(403).json({ message: "Unauthorized to update this account" });
        }

        const { username, email, password } = req.body;

        const updateData = {};
        if (username) updateData.username = username;
        if (email) updateData.email = email;

        if (password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
        }

        const updateuser = await user.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        ).select('-password -refreshToken');

        if (!updateuser) {
            return res.status(404).json({ message: "User with the given ID not found" });
        }

        return res.status(200).json({
            message: "User updated successfully",
            user: updateuser
        });
    } catch (error) {
        return res.status(500).json({ message: "Unable to update user" });
    }
}

// 7. DELETE USER (Protected endpoint)
async function deleteuser(req, res) {
    try {
        const { id } = req.params;
        if (req.user?.id !== id) {
            return res.status(403).json({ message: "Unauthorized to delete this account" });
        }

        const deletedUser = await user.findByIdAndDelete(id).select('-password -refreshToken');

        if (!deletedUser) {
            return res.status(404).json({ message: "User ID not found to delete" });
        }

        return res.status(200).json({
            message: "User deleted successfully",
            user: deletedUser
        });
    } catch (error) {
        return res.status(500).json({ message: "Error in deleting the user" });
    }
}

module.exports = {
    register,
    login,
    refreshTokenHandler,
    logout,
    getusers,
    updateusers,
    deleteuser
};