import { createSlice } from "@reduxjs/toolkit";

// customer initial state
const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

const customerSlice = createSlice({
  name: "customer",
  initialState: initialStateCustomer,
  reducers: {
    createCustomer: {
      prepare(fullName, nationalId) {
        return {
          payload: {
            fullName,
            nationalId,
            createdAt: new Date().toISOString(),
          },
        };
      },
      reducer(state, action) {
        const { fullName, nationalId, createdAt } = action.payload;

        state.fullName = fullName;
        state.createdAt = createdAt;
        state.nationalID = nationalId;
      },
    },
  },
});

const { createCustomer } = customerSlice.actions;

export default customerSlice.reducer;
export { createCustomer };
