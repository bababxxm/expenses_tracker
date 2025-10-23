import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "@/slice/expenseSlice";

export default configureStore({
  reducer: {
    expense: expenseReducer,
  },
});
 