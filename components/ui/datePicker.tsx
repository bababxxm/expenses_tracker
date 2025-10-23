"use client";
import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type expenseData = {
  name: string;
  amount: number;
  category: string;
  date: string;
};

function DatePicker({
  data,
  setData,
}: {
  data: expenseData;
  setData: React.Dispatch<React.SetStateAction<expenseData>>;
}) {
  const date = new Date(data.date);
  const setDate = (date: Date) => {
    setData({ ...data, date: date.toLocaleDateString() });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          className="data-[empty=true]:text-muted-foreground w-[200px] justify-start text-left font-normal"
        >
          <CalendarIcon />
          {date ? format(date, "yyyy-MM-dd") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        {/* @ts-ignore */}
        <Calendar mode="single" selected={date} onSelect={setDate} />
      </PopoverContent>
    </Popover>
  );
}

export default DatePicker;
