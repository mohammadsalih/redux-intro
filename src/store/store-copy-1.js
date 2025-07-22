import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/balance/deposit":
      return { ...state, balance: state.balance + action.payload };

    case "account/balance/withdraw":
      return { ...state, balance: state.balance - action.payload };

    case "account/loan/request":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.loan,
        loanPurpose: action.payload.loanPurpose,
        balance: state.balance + action.payload.loan,
      };

    case "account/loan/pay":
      return {
        ...state,
        balance: state.balance - state.loan,
        loan: 0,
        loanPurpose: "",
      };

    default:
      return state;
  }
}

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

// account action creators
function deposit(amount) {
  return {
    type: "account/balance/deposit",
    payload: amount,
  };
}

function withdraw(amount) {
  return {
    type: "account/balance/withdraw",
    payload: amount,
  };
}

function requestLoan(amount, purpose) {
  return {
    type: "account/loan/request",
    payload: {
      loan: amount,
      loanPurpose: purpose,
    },
  };
}

function payLoan() {
  return function (dispatch, getState) {
    const state = getState().account;

    if (state.loan > state.balance) {
      console.log("Paying off loan did not work ,due to insufficient balance");
      return;
    }

    if (state.loan <= 0) return;

    dispatch({ type: "account/loan/pay" });
  };
}

// customer action creators
function createCustomer(fullName, nationalID) {
  return {
    type: "customer/createCustomer",
    payload: {
      fullName,
      nationalID,
      createdAt: new Date().toISOString(),
    },
  };
}

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
