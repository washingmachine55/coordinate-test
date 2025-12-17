import './App.css';
import EntriesTableWrapper from '@/components/entries-table-wrapper';
import { EntryDialog } from './components/entry-dialog';

function App() {
	return (
		<>
			<div className="mb-4">
				<EntryDialog />
			</div>
			<EntriesTableWrapper />
		</>
	);
}

export default App;
