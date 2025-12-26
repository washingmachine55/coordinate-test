import { EntryDialog } from '@/pages/entries/entry-dialog';
import { EntriesDataTable } from '@/pages/entries/data-table';

function EntriesMain() {
	return (
		<>
			<div className="mb-4 justify-items-end">
				<EntryDialog />
			</div>
			<EntriesDataTable />
		</>
	);
}

export default EntriesMain;
