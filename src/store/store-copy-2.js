import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { thunk } from "redux-thunk";

import customerReducer from "../features/customers/customerSlice";
import accountReducer from "../features/accounts/accountSlice";

const rootReducer = combineReducers({
  customer: customerReducer,
  account: accountReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;

// store.dispatch(createCustomer("John Doe", "123456789"));
// console.log("Customer created:", store.getState());
// store.dispatch(deposit(200));
// console.log("Initial state:", store.getState());
// store.dispatch(withdraw(200));
// console.log("After withdrawal:", store.getState());
// store.dispatch(requestLoan(500, "Home Renovation"));
// console.log("After requesting loan:", store.getState());
// store.dispatch(withdraw(200));
// console.log("After withdrawal with loan:", store.getState());
// store.dispatch(payLoan());
// console.log("After paying loan:", store.getState());
