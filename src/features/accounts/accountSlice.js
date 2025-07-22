import { createSlice } from "@reduxjs/toolkit";

// account initial state
const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
    },

    withdraw(state, action) {
      state.balance -= action.payload;
    },

    requestLoan: {
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose },
        };
      },

      reducer(state, action) {
        if (state.loan > 0) return;

        console.log(action);

        state.loan = action.payload.amount;
        state.balance += action.payload.amount;
        state.loanPurpose = action.payload.purpose;
      },
    },

    payLoan(state) {
      if (state.loan > state.balance) return;
      if (state.loan <= 0) return;

      state.balance -= state.loan;

      state.loan = 0;
      state.loanPurpose = "";
    },
  },
});

const { withdraw, requestLoan, payLoan } = accountSlice.actions;

export default accountSlice.reducer;
export { deposit, withdraw, requestLoan, payLoan };

function deposit(amount, currency = "USD") {
  return async function (dispatch) {
    if (currency === "USD") {
      dispatch({
        type: "account/deposit",
        payload: amount,
      });

      return;
    }

    try {
      const response = await fetch(
        `https://api.frankfurter.dev/v1/latest?base=${currency}&symbols=USD`
      );

      if (!response.ok) throw new Error("Failed to fetch conversion rate");

      const data = await response.json();

      if (!data?.rates?.USD) throw new Error("conversion rate not found");

      const rate = data?.rates?.USD;
      const depositAmount = +amount * rate;

      dispatch({
        type: "account/deposit",
        payload: depositAmount,
      });
    } catch (error) {
      console.error("Error fetching conversion rate:", error);

      return;
    }
  };
}
