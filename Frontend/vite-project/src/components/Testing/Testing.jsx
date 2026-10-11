import React,{useReducer} from 'react'


function reducercase(state,action){
  switch (action.type) {
    case 'increment': return {count:state.count+1};
    case 'decrement': return {count:state.count-1};
    case 'reset': return {count:state=0};
    default:return state
      
  }
}
const Testing = () => {
  const[state,dispatch]=useReducer(reducercase,{count:0})
  return (
    <div>
      <h1>{state.count}</h1>
      <button onClick={()=>dispatch()}></button>
    </div>
  )
}

export default Testing