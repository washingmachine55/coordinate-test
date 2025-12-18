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

export function EntryDialog() {
	const [startPosition, setStartPosition] = useState('');
	const [endPosition, setEndPosition] = useState('');
	const [responseMsg, setResponseMsg] = useState('');
	const [responseType, setResponseType] = useState('');

	async function submitData() {
		try {
			await axios
				.post(
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
				)
				.then(
					(responseMsg) => (setResponseMsg(responseMsg.data.message), setResponseType(responseMsg.data.type))
				);
		} catch (error) {
			console.log(error);
			toast.error('Something went wrong :/');
		} finally {
			if (responseType == 'success') {
				toast.success(responseMsg);
			} else if (responseType == 'error') {
				toast.error(responseMsg);
			} else {
				toast.info('Something went wrong, please try again later.');
			}
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
							Enter your coordinates in the input fields below. The coordinates need to be in a format of
							vaild [latitude,longitude] numerical values with optional decimal points.
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
						<Button type="submit" value="submit" onClick={() => submitData()}>
							Save changes
						</Button>
					</DialogFooter>
				</DialogContent>
			</form>
		</Dialog>
	);
}
