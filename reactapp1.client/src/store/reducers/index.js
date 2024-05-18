import { combineReducers } from 'redux';
import cartReducer from './cartReducer';
import interfaceReducer from './interfaceReducer';

const rootReducer = combineReducers({
  cart: cartReducer,
  interface:  interfaceReducer
});

export default rootReducer;