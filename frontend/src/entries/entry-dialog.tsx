import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

// type Inputs = {
// 	startPosition: string;
// 	endPosition: string;
// };

export function EntryDialog() {
	const [startPosition, setStartPosition] = useState('');
	const [endPosition, setEndPosition] = useState('');

	async function submitData() {
		try {
			await axios.post(
				'http://localhost:3000/coordinates/add',
				{
					start_position: startPosition,
					end_position: endPosition,
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<Dialog>
			<form id="entry-form" onSubmit={submitData}>
				<DialogTrigger asChild>
					<Button variant="default">
						<PlusIcon />
						Add New
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-106.25">
					<DialogHeader>
						<DialogTitle>Add new entry</DialogTitle>
						<DialogDescription>
							Make changes to your profile here. Click save when you&apos;re done.
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4">
						<div className="grid gap-3">
							<Label htmlFor="start-position">Start Position*</Label>
							<Input
								id="start-position"
								name="end_position"
								value={startPosition}
								onChange={(e) => setStartPosition(e.target.value)}
								placeholder="53.64362,24.5235235"
								required
							/>
						</div>
						<div className="grid gap-3">
							<Label htmlFor="end-position">End Position*</Label>
							<Input
								id="end-position"
								name="end_position"
								value={endPosition}
								onChange={(e) => setEndPosition(e.target.value)}
								placeholder="23.64362,94.5235235"
								required
							/>
						</div>
					</div>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant="outline">Cancel</Button>
						</DialogClose>
						<Button onClick={() => toast.success('Event has been created')} ></Button>
						<Button type="submit" value="submit" onClick={() => submitData()}>
							Save changes
						</Button>
					</DialogFooter>
				</DialogContent>
			</form>
		</Dialog>
	);
}
