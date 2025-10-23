"use client";
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useDispatch, useSelector } from "react-redux";
import { ExpenseData, del, sort } from "@/slice/expenseSlice";
import { Button } from "./ui/button";
import { supabase } from "@/lib/supabase";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import ExpenseSummary from "./ExpenseSummary";

function ExpenseTable() {
	const dispatch = useDispatch();

	const transfromDate = (date: string) => {
		const split = date.split("/");
		return `${split[2]}-${split[0]}-${split[1]}`;
	};

	async function delDb(id: number) {
		const { data, error } = await supabase
			.from("expenses")
			.delete()
			.eq("id", id);

		if (error) console.error("Delete failed:", error.message);
		else console.log("Deleted expense:", data);
	}
	const createRow = (rowdata: ExpenseData) => {
		return (
			<TableRow key={rowdata.id}>
				<TableCell className="text-center">
					{transfromDate(rowdata.date)}
				</TableCell>
				<TableCell className="text-center">{rowdata.name}</TableCell>
				<TableCell className="text-center">{rowdata.category}</TableCell>
				<TableCell className="text-center">{rowdata.amount}</TableCell>
				<TableCell className="text-center">
					<Button
						onClick={() => {
							delDb(rowdata.id);
							dispatch(del(rowdata.id));
						}}
					>
						<X/>
					</Button>
				</TableCell>
			</TableRow>
		);
	};
	const data = useSelector((state) => state.expense.data);
	const [flagSort, setFlagSort] = useState<string>("asc");
	const [flagFilter, setflagFilter] = useState<string>("0");

	const filteredData = data
		.filter((item) => {
			if (flagFilter == '0') return true;
			const month = parseInt(item.date.split("/")[0]);
			return month === parseInt(flagFilter);
		})
		.sort((a, b) => {
			const dateA = a.date.split("/");
			const dateB = b.date.split("/");
			const formattedA = `${dateA[2]}-${dateA[0]}-${dateA[1]}`;
			const formattedB = `${dateB[2]}-${dateB[0]}-${dateB[1]}`;
			return flagSort === "asc"
				? formattedA.localeCompare(formattedB)
				: formattedB.localeCompare(formattedA);
		});

	console.log("Filtered Data in ExpenseTable:", filteredData);

	useEffect(() => {
		dispatch(sort(flagSort));
	});
	return (
		<div>
			<div className="flex justify-between items-center p-4 text-1xl font-semibold text-center">
				<div className="flex flex-row gap-4 items-center">
					<div>Sort By:</div>
					<Select
						value={flagSort}
						onValueChange={(value) => {
							setFlagSort(value);
							dispatch(sort(flagSort));
						}}
					>
						<SelectTrigger className="w-[125px]">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="asc">Ascending</SelectItem>
							<SelectItem value="dsc">Descending</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div className="flex flex-row gap-4 items-center">
					<div>Filter:</div>
					<Select
						value={flagFilter}
						onValueChange={(value) => {
							setflagFilter(value);
						}}
					>
						<SelectTrigger className="w-[125px]">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="0">All</SelectItem>
							<SelectItem value="1">January</SelectItem>
							<SelectItem value="2">February</SelectItem>
							<SelectItem value="3">March</SelectItem>
							<SelectItem value="4">April</SelectItem>
							<SelectItem value="5">May</SelectItem>
							<SelectItem value="6">June</SelectItem>
							<SelectItem value="7">July</SelectItem>
							<SelectItem value="8">August</SelectItem>
							<SelectItem value="9">September</SelectItem>
							<SelectItem value="10">October</SelectItem>
							<SelectItem value="11">November</SelectItem>
							<SelectItem value="12">December</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>
			<div className="flex items-center gap-2 justify-between ">
				<Table>
					<TableCaption>A list of your expenses.</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="text-center">Date</TableHead>
							<TableHead className="text-center">Name</TableHead>
							<TableHead className="text-center">Category</TableHead>
							<TableHead className="text-center">Amount</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>{filteredData.map((item) => createRow(item))}</TableBody>
				</Table>
			</div>
			<ExpenseSummary filteredData={filteredData}/>
		</div>
	);
}

export default ExpenseTable;
