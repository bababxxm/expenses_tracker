import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ExpenseData = {
  id: number
  name: string
  amount: number
  category: string
  date: string
}

interface ExpenseState {
  data: ExpenseData[]
}

const initialState: ExpenseState = {
  data: [],
}

export const expenseSlice = createSlice({
	name: "expense",
	initialState,
	reducers: {
	  add: (state, action: PayloadAction<ExpenseData>) => {
		state.data.push(action.payload)
	  },
	  init: (state, action: PayloadAction<ExpenseData[]>) => {
		state.data = action.payload
	  },
	  del: (state, action: PayloadAction<number>) => {
		state.data = state.data.filter(item => item.id !== action.payload);
	  },
	  sort: (state, action: PayloadAction<'asc' | 'desc'>) => {
		state.data.sort((a, b) => {
		  const dateA = a.date.split("/");
		  const dateB = b.date.split("/");
		  const formattedA = `${dateA[2]}-${dateA[0]}-${dateA[1]}`;
		  const formattedB = `${dateB[2]}-${dateB[0]}-${dateB[1]}`;
		  return action.payload === 'asc'
			? formattedA.localeCompare(formattedB)
			: formattedB.localeCompare(formattedA);
		});
	  },
	},
  })
  
  export const { add, init, del, sort } = expenseSlice.actions;
  export default expenseSlice.reducer;
  