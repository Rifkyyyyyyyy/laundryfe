import { combineReducers } from "redux";
import auth from "./auth";
import members from "./member";
import discounts from "./discount";
import orders from "./orders";
import outlets from "./outlet";
import laundryService from "./service";
import cashiers from "./cashiers";
import customers from "./customers";
import products from "./product";
import popup from "./popup";
import todo from "./todo";
import tracking from "./tracking";
import stock from "./stock";
import reports from "./reports";
import payments from "./payment";
import calculate from "./calculate";


const appReducer = combineReducers({
   auth,
   members,
   orders,
   discounts,
   outlets,
   laundryService,
   cashiers,
   customers,
   products,
   popup,
   todo,
   tracking,
   stock,
   reports ,
   payments ,
   calculate
});



const rootReducer = (state, action) => {
   console.log('state awal:', state); 
   console.log('action.type === LOGOUT_SUCCESS:', action.type === 'LOGOUT_SUCCESS'); // log hasil boolean
 
   if (action.type === 'LOGOUT_SUCCESS') {
     console.log('Resetting state to undefined');
     state = undefined;
   }
 
   return appReducer(state, action);
 };

 
export default rootReducer;
