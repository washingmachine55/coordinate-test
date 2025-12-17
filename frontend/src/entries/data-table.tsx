import React, { useEffect } from 'react';

import { 
	createColumnHelper, 
	flexRender, 
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable 
	} from '@tanstack/react-table';
import { 
	Table, 
	TableBody, 
	TableCell, 
	// TableFooter, 
	TableHead, 
	TableHeader, 
	TableRow 
} from '@/components/ui/table';
import axios from 'axios';
import { 
	ChevronLeftIcon, 
	ChevronRightIcon, 
	// MoreHorizontalIcon 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
// import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';

type Entry = {
	id: number;
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
		start_lat: "string",
		start_long: "string",
		end_lat: "string",
		end_long: "string",
		decision: "string",
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
	columnHelper.accessor((row) => row.start_lat, {
		id: 'start_lat',
		// cell: (info) => <i>{info.getValue()}</i>,
		header: () => <span>Start Latitude</span>,
		// footer: (info) => info.column.id,
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

export function DataTable() {
	const url = 'http://localhost:3000/coordinates/all';

	useEffect(() => {
		axios.get(url).then((Response) => setData(Response.data));
	}, []);

	const [data, setData] = React.useState(() => [...preferredData]);
	// const rerender = React.useReducer(() => ({}), {})[1];

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	});

	return (
		<div className="p-2 overflow-hidden bg-gray-200 rounded-3xl">
			<Table>
				<TableHeader className="testing">
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id} className="">
							{headerGroup.headers.map((header) => (
								<TableHead
									key={header.id}
									className="text-center text-xl font-bold rounded-2xl bg-gray-300"
								>
									{header.isPlaceholder
										? null
										: flexRender(header.column.columnDef.header, header.getContext())}
								</TableHead>
							))}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
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
	);
}
