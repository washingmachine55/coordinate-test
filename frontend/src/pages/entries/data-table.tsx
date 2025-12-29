import React, { useEffect, useState } from 'react';

import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
} from '@tanstack/react-table';
import {
	Table,
	TableBody,
	TableCell,
	// TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
	ChevronLeftIcon,
	ChevronRightIcon,
	// MoreHorizontalIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { axiosInstance } from '@/lib/axios-headers';
// import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';

type Entry = {
	id: number;
	// user_id: number;
	name: string;
	start_lat: string;
	start_long: string;
	end_lat: string;
	end_long: string;
	decision: string;
	distance_km: number;
};

const preferredData: Entry[] = [
	{
		id: 1,
		// user_id: 2,
		name: 'Tester',
		start_lat: 'string',
		start_long: 'string',
		end_lat: 'string',
		end_long: 'string',
		decision: 'string',
		distance_km: 29,
	},
];

const columnHelper = createColumnHelper<Entry>();

const columns = [
	columnHelper.accessor('id', {
		header: () => <span>ID</span>,
		// cell: (info) => info.getValue(),
		// footer: (info) => info.column.id,
	}),
	columnHelper.accessor('name', {
		header: () => <span>User's Name</span>,
	}),
	// columnHelper.accessor((row) => row.start_lat, {
	// 	id: 'start_lat',
	// 	// cell: (info) => <i>{info.getValue()}</i>,
	// 	header: () => <span>Start Latitude</span>,
	// 	// footer: (info) => info.column.id,
	// }),
	columnHelper.accessor('start_lat', {
		header: () => <span>Start Latitude</span>,
	}),
	columnHelper.accessor('start_long', {
		header: () => 'Start Longitude',
		// cell: (info) => info.renderValue(),
		// footer: (info) => info.column.id,
	}),
	columnHelper.accessor('end_lat', {
		header: () => <span>End Latitude</span>,
		// footer: (info) => info.column.id,
	}),
	columnHelper.accessor('end_long', {
		header: 'End Longitude',
		// footer: (info) => info.column.id,
	}),
	columnHelper.accessor('distance_km', {
		header: 'Distance (KM)',
		// footer: (info) => info.column.id,
	}),
	columnHelper.accessor('decision', {
		header: 'Decision',
		// footer: (info) => info.column.id,
	}),
];

export function EntriesDataTable() {
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		setTimeout(() => {
			axiosInstance.get('/coordinates/all').then((Response) => setData(Response.data));
			setIsLoading(false);
		}, 500);
	}, []);

	// const [data, setData] = React.useState(() => [...preferredData]);
	const [data, setData] = React.useState('');
	// const rerender = React.useReducer(() => ({}), {})[1];

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	});

	if (isLoading) {
		return (
			<div className="p-2 border rounded-3xl">
				<Table className="min-w-[90%] mx-auto">
					<TableHeader>
						<TableRow>
							<TableHead>
								<Skeleton className="h-6 w-32 bg-gray-300 dark:bg-zinc-600" />
							</TableHead>
							<TableHead>
								<Skeleton className="h-6 w-32 bg-gray-300 dark:bg-zinc-600" />
							</TableHead>
							<TableHead>
								<Skeleton className="h-6 w-32 bg-gray-300 dark:bg-zinc-600" />
							</TableHead>
							<TableHead>
								<Skeleton className="h-6 w-32 bg-gray-300 dark:bg-zinc-600" />
							</TableHead>
							<TableHead>
								<Skeleton className="h-6 w-32 bg-gray-300 dark:bg-zinc-600" />
							</TableHead>
							<TableHead>
								<Skeleton className="h-6 w-32 bg-gray-300 dark:bg-zinc-600" />
							</TableHead>
							<TableHead>
								<Skeleton className="h-6 w-32 bg-gray-300 dark:bg-zinc-600" />
							</TableHead>
							<TableHead>
								<Skeleton className="h-6 w-32 bg-gray-300 dark:bg-zinc-600" />
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{[...Array(12)].map((_, i) => (
							<TableRow key={i}>
								<TableCell>
									<Skeleton className="h-5 w-[200px] dark:bg-zinc-700" />
								</TableCell>
								<TableCell>
									<Skeleton className="h-5 w-[200px] dark:bg-zinc-700" />
								</TableCell>
								<TableCell>
									<Skeleton className="h-5 w-[200px] dark:bg-zinc-700" />
								</TableCell>
								<TableCell>
									<Skeleton className="h-5 w-[200px] dark:bg-zinc-700" />
								</TableCell>
								<TableCell>
									<Skeleton className="h-5 w-[200px] dark:bg-zinc-700" />
								</TableCell>
								<TableCell>
									<Skeleton className="h-5 w-[200px] dark:bg-zinc-700" />
								</TableCell>
								<TableCell>
									<Skeleton className="h-5 w-[200px] dark:bg-zinc-700" />
								</TableCell>
								<TableCell>
									<Skeleton className="h-5 w-[200px] dark:bg-zinc-700" />
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		);
	}

	return (
		<>
			<div className="p-2 bg-gray-200 dark:bg-zinc-800 rounded-3xl">
				<Table className="">
					<TableHeader className="">
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id} className="overflow-hidden">
								{headerGroup.headers.map((header) => (
									<TableHead
										key={header.id}
										className="text-center text-xl font-bold rounded-2xl bg-gray-300 dark:bg-zinc-600 overflow-hidden"
									>
										{header.isPlaceholder
											? null
											: flexRender(header.column.columnDef.header, header.getContext())}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody className="border-0 last:border-b-2 first:mt-4">
						{table.getRowModel().rows.map((row) => (
							<TableRow key={row.id}>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id} className="text-base">
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))}
					</TableBody>
					{/* <TableFooter>
					{table.getFooterGroups().map((footerGroup) => (
						<TableRow key={footerGroup.id}>
							{footerGroup.headers.map((header) => (
								// <th key={header.id}>
								// 	{header.isPlaceholder
								// 		? null
								// 		: flexRender(header.column.columnDef.footer, header.getContext())}
								// </th>
								<TableCell key={header.id}>
									{header.isPlaceholder
										? null
										: flexRender(header.column.columnDef.footer, header.getContext())}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableFooter> */}
				</Table>
				<div className="h-4" />
				<div>
					<div className="flex items-center justify-end space-x-2 py-4">
						<Button variant={'outline'} onClick={() => table.firstPage()}>
							1
						</Button>
						<Button
							variant="outline"
							size="sm"
							onClick={() => table.previousPage()}
							disabled={!table.getCanPreviousPage()}
						>
							<ChevronLeftIcon />
							Previous
						</Button>
						{/* <Select>
						<SelectTrigger className="w-20">
							<SelectValue placeholder={table.getPageCount()} />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Page Number</SelectLabel>
								{[1, 2, 3, 4, 5].map((pageSize) => (
									<SelectItem value={table.getPageCount()} key={pageSize}>
										{pageSize}
									</SelectItem>
								))}
								<SelectItem value="banana">Banana</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select> */}
						<Button
							variant="outline"
							size="sm"
							onClick={() => table.nextPage()}
							disabled={!table.getCanNextPage()}
						>
							Next
							<ChevronRightIcon />
						</Button>
						<Button variant={'outline'} onClick={() => table.lastPage()}>
							{table.getPageCount()}
						</Button>
					</div>
				</div>
				{/* <Button onClick={() => rerender()} className="border p-2" variant="secondary">
				Rerender
			</Button> */}
			</div>
			{/* <div>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-25">Invoice</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Method</TableHead>
							<TableHead className="text-right">Amount</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell className="font-medium">Test 1</TableCell>
							<TableCell>Test 2</TableCell>
							<TableCell>Test 3</TableCell>
							<TableCell className="text-right">Test 4</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</div> */}
		</>
	);
}
