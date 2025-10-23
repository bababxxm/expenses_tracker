import React, { useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export type ExpenseData = {
  id: number;
  name: string;
  amount: number;
  category: string;
  date: string;
};

interface ExpenseDataProps {
  data?: ExpenseData[];
}

export default function ExpenseSummary({ data = [] }: ExpenseDataProps) {

	console.log("ExpenseSummary received data:", data);

  const totalSpent = useMemo(() => {
    return data.reduce((sum, item) => sum + item.amount, 0);
  }, [data]);

  const thisMonthSpent = useMemo(() => {
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    return data
      .filter((item) => {
        const [month, , year] = item.date.split("/").map(Number);
        return month === currentMonth && year === currentYear;
      })
      .reduce((sum, item) => sum + item.amount, 0);
  }, [data]);

  const totalTransactions = useMemo(() => data.length, [data]);

  const topCategory = useMemo(() => {
    const categoryMap: Record<string, number> = {};
    data.forEach((item) => {
      categoryMap[item.category] =
        (categoryMap[item.category] || 0) + item.amount;
    });

    let topCat = "N/A";
    let maxAmount = 0;
    for (const [cat, amt] of Object.entries(categoryMap)) {
      if (amt > maxAmount) {
        maxAmount = amt;
        topCat = cat;
      }
    }
    return topCat;
  }, [data]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardHeader>
          <CardTitle>Total Spent</CardTitle>
        </CardHeader>
        <CardContent className="text-center text-2xl font-semibold">
          ฿{totalSpent.toLocaleString()}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>This Month</CardTitle>
        </CardHeader>
        <CardContent className="text-center text-2xl font-semibold">
          ฿{thisMonthSpent.toLocaleString()}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
        </CardHeader>
        <CardContent className="text-center text-2xl font-semibold">
          {totalTransactions}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Category</CardTitle>
        </CardHeader>
        <CardContent className="text-center text-2xl font-semibold">
          {topCategory}
        </CardContent>
      </Card>
    </div>
  );
}
