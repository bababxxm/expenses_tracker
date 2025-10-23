"use client"

import { supabase } from "@/lib/supabase";
import { create } from "domain";
import Image from "next/image";
import { useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
  const supabaseVar = supabase
  
  // async function addExpense() {
  //   const { data, error } = await supabase
  //     .from("expense_list")
  //     .insert([{ id: 20, title: "", amount: 0, category: "", created_at: new Date().toISOString() }])

  //   if (error) console.error("Insert error:", error)
  //   else console.log("Inserted:", data)
  // }

  async function addExpense() {
    const newId = uuidv4();

    const { data, error } = await supabase
      .from('expenses')
      .insert([
        {
          title: 'Coffee',
          amount: 50,
          date: '2025-10-12'
        },
      ])
      .select();
  
    if (error) console.error(error);
    else console.log('Inserted:', data);
  }

  async function fetchExpenses() {
    const { data, error } = await supabase
      .from("expense_list")
      .select("*")
    console.log(data)
    if (error) console.error("Fetch error:", error)
  }

  useEffect(() => {
    addExpense()
  }, [])
  return (
    <div>
    </div>
  );
}
