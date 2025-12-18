import './App.css';
import { EntryDialog } from './entries/entry-dialog';
import { EntriesDataTable } from './entries/data-table';
import { Toaster } from '@/components/ui/sonner';
import { TopNavBar } from './components/ui/top-nav-bar';

function App() {
	return (
		<>
			<div className="my-0 mx-auto p-8 text-center">
				<div id="nav" className="bg-gray-200 my-auto p-4 rounded-2xl mb-4">
					<TopNavBar />
				</div>
				<Toaster />
				<div className="mb-4 justify-items-end">
					<EntryDialog />
				</div>
				<EntriesDataTable />
			</div>
		</>
	);
}

export default App;
