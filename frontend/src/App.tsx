import './App.css';
import { EntryDialog } from './entries/entry-dialog';
import { DataTable } from './entries/data-table';
import { Toaster } from '@/components/ui/sonner';

function App() {
	return (
		<>
			<Toaster />
			<div className="mb-4 justify-items-end">
				<EntryDialog />
			</div>
			<DataTable />
		</>
	);
}

export default App;
