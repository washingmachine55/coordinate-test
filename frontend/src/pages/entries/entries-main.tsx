import { EntryDialog } from '@/pages/entries/entry-dialog';
import { EntriesDataTable } from '@/pages/entries/data-table';
import App from '@/App';

function EntriesMain() {
	return (
		<App>
			<div className="flex flex-row mb-4 justify-end">
				<EntryDialog />
			</div>
			<EntriesDataTable />
		</App>
	);
}

export default EntriesMain;
