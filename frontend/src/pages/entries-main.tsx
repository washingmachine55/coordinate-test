import { EntryDialog } from '@/entries/entry-dialog';
import { EntriesDataTable } from '@/entries/data-table';

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
