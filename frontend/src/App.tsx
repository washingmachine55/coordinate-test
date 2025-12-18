import './App.css';
import { EntryDialog } from './entries/entry-dialog';
import { EntriesDataTable } from './entries/data-table';
import { Toaster } from '@/components/ui/sonner';

function App() {
	return (
		<>
			<Toaster />
			<div className="mb-4 justify-items-end">
				<EntryDialog />
			</div>
			<EntriesDataTable />
		</>
	);
}

export default App;
