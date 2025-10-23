"use client"

import AddExpense from "@/components/AddExpense";
import ExpenseHeader from "@/components/ExpenseHeader";
import ExpenseTable from "@/components/ExpenseTable";
import { supabase } from "@/lib/supabase";
import store from "@/store/store";
import { create } from "domain";
import Image from "next/image";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

export default function Home() {

  return (
    <Provider store={store}>
      <div className="flex justify-center items-center">
        <div className="w-[60%] py-4">
          <ExpenseHeader/>
          <AddExpense/>
          <br></br>
          <ExpenseTable/>
        </div>
      </div>
    </Provider>
  );
}
