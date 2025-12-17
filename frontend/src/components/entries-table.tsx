import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import axios from 'axios';
import { useEffect, useState } from 'react';

// export interface Entry {
// 	id: number;
// 	start_lat: string;
// 	start_long: string;
// 	end_lat: string;
// 	end_long: string;
// 	decision: string;
// 	distance_km: number;
// }

const EntriesTable = () => {
	const url = 'http://localhost:3000/coordinates/all';

	const [data, setData] = useState([]);

	useEffect(() => {
		axios.get(url).then((Response) => setData(Response.data));
	}, []);

	const renderTable = () => {
		return data.map((item) => {
			return (
				<TableRow key={item.id}>
					<TableCell>{item.id}</TableCell>
					<TableCell>{item.start_lat}</TableCell>
					<TableCell>{item.start_long}</TableCell>
					<TableCell>{item.end_lat}</TableCell>
					<TableCell>{item.end_long}</TableCell>
					<TableCell>{item.decision}</TableCell>
					<TableCell>{item.distance_km}</TableCell>
				</TableRow>
			);
		});
	};

	return (
		<Table className="rounded-2xl border-2 border-amber-300">
			{/* <TableCaption>A list of your recent invoices.</TableCaption> */}
			<TableHeader className="bg-black">
				<TableRow>
					<TableHead className="text-center text-white">id</TableHead>
					<TableHead className="text-center text-white">start_lat</TableHead>
					<TableHead className="text-center text-white">start_long</TableHead>
					<TableHead className="text-center text-white">end_lat</TableHead>
					<TableHead className="text-center text-white">end_long</TableHead>
					<TableHead className="text-center text-white">decision</TableHead>
					<TableHead className="text-center text-white">distance_km</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>{renderTable()}</TableBody>
		</Table>
	);
};

// const EntriesTable = () => {
// 	// useState
// 	// data and loading
// 	// error
// 	const [entries, setEntries] = useState([]);

// 	const getEntries = async () => {
// 		try {
// 		const data = await axios
// 		.get('http://localhost:3000/coordinates/all')

// 		setEntries(data.data);
// 		} catch(e) {
// 			console.log(e);
// 		}
// 	}

// 	useEffect(() => {
// 		getEntries();
// 	}, [])

// 	return (
// 		<Table>
// 			<TableCaption>A list of your recent invoices.</TableCaption>
// 			<TableHeader>
// 				<TableRow>
// 					<TableHead className="text-center">id</TableHead>
// 					<TableHead className="text-center">start_lat</TableHead>
// 					<TableHead className="text-center">start_long</TableHead>
// 					<TableHead className="text-center">end_lat</TableHead>
// 					<TableHead className="text-center">end_long</TableHead>
// 					<TableHead className="text-center">decision</TableHead>
// 					<TableHead className="text-center">distance_km</TableHead>
// 				</TableRow>
// 			</TableHeader>
// 			<TableBody>
// 				{entries.map((item) => {
// 					return (
// 					<TableRow key={item.id}>
// 						<TableCell>{item.id}</TableCell>
// 						<TableCell>{item.start_lat}</TableCell>
// 						<TableCell>{item.start_long}</TableCell>
// 						<TableCell>{item.end_lat}</TableCell>
// 						<TableCell>{item.end_long}</TableCell>
// 						<TableCell>{item.decision}</TableCell>
// 						<TableCell>{item.distance_km}</TableCell>
// 					</TableRow>
// 					);
// 				})}
// 			</TableBody>
// 		</Table>
// 	)
// }

export default EntriesTable;
