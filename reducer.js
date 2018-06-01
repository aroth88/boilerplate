import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';



const reducer = (state = {}, action) => {
    return state;
}


const store = createStore(reducer,
  applyMiddleware(thunkMiddleware,createLogger())
);

export default store;