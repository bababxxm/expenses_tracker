"use client"
import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import DatePicker from './ui/datePicker';
import { useDispatch } from 'react-redux';
import { add, init } from '@/slice/expenseSlice'
import { ExpenseData } from '@/slice/expenseSlice'
import { supabase } from '@/lib/supabase';

function AddExpense() {
	async function addExpense(expenseItem: ExpenseData) {
		const { data, error } = await supabase
		  .from('expenses')
		  .insert([
			{
			  name: expenseItem.name,
			  amount: expenseItem.amount,
			  category: expenseItem.category,
			  date: expenseItem.date
			},
		  ])
		  .select();
	  
		if (error) console.error(error);
		else console.log('Inserted:', data);
	  }
	
	  async function fetchExpenses() {
		const { data, error } = await supabase
		  .from("expenses")
		  .select("*")
		console.log(data)
		dispatch(init(data))
		if (error) console.error("Fetch error:", error)
		else console.log("Fetched:", data)
	  }
	  
	  useEffect(() => {
		fetchExpenses()
	  }, [])

	const dispatch = useDispatch()

	const [expenseItem, setexpenseItem] = useState<ExpenseData>({
		id: 0,
		name: "",
		amount: 0,
		category: "Food",
		date: "10/11/2025",
	  });

	return (
		<div className="flex justify-center items-center my-2">
      <div className="flex gap-4 items-center">
        <Input
          className="w-[200px] text-center"
          placeholder="Name"
          value={expenseItem.name}
          onChange={(e) => {
            setexpenseItem({ ...expenseItem, name: e.target.value });
          }}
        />
        <Input
          className="w-[120px] text-center"
          placeholder="Amount"
          value={expenseItem.amount}
          onChange={(e) => {
            setexpenseItem({
              ...expenseItem,
              amount: isNaN(+e.target.value) ? 0 : +e.target.value,
            });
          }}
        />
        <Select
          value={expenseItem.category}
          onValueChange={(value) => {
            setexpenseItem({
              ...expenseItem,
              category: value,
            });
          }}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Food">Food</SelectItem>
            <SelectItem value="Bills">Bills</SelectItem>
            <SelectItem value="Others">Others</SelectItem>
          </SelectContent>
        </Select>
        <DatePicker data={expenseItem} setData={setexpenseItem} />
        <Button
          size="lg"
          className="cursor-pointer"
          onClick={(e) => {
			dispatch(add(expenseItem));
			setexpenseItem({
				...expenseItem,
				id: expenseItem.id + 1,
			  });
			addExpense(expenseItem);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          Add Expense
        </Button>
      </div>
    </div>
	);
  }
export default AddExpense

function uuidv4() {
	throw new Error('Function not implemented.');
}
