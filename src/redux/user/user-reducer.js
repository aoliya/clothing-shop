const INITIAL_STATE = {
    currentUser: null
}
//if state undefined the default will be initial state
const userReducer =(state = INITIAL_STATE, action)=> {
  switch(action.type){
     //if "SET_CURRENT_USER" is the action type that gets fired
     case 'SET_CURRENT_USER':
       //then return a new state(new obj) that user reducer is going to transform into 
        return{
            //...state = everything in the state
            ...state,
            currentUser: action.payload
    }
      default:
          return state;
  }
}

export default userReducer;