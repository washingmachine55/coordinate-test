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
	// const [responseMsg, setResponseMsg] = useState('');
	// const [responseType, setResponseType] = useState('');

	const handleSubmit = async () => {
		// const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		// event.preventDefault();
		try {
			const axiosReqRes = await axios.post(
				'http://localhost:3000/coordinates/add',
				{
					start_position: startPosition,
					end_position: endPosition,
				},
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: localStorage.getItem('token'),
					},
				}
			);

			if (axiosReqRes.data.type == 'success') {
				toast.success(axiosReqRes.data.message);
				setTimeout(() => {
					setStartPosition('');
					setEndPosition('');
				}, 500);
			} else if (axiosReqRes.data.type == 'error') {
				toast.error(axiosReqRes.data.message);
			} else {
				toast.info('Something went wrong, please try again later.');
			}
		} catch (error) {
			console.debug(error);
		}
	};

	return (
		<Dialog>
			<form>
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
							valid [latitude,longitude] numerical values with optional decimal points.
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
						<Button type="submit" value="submit" onClick={() => handleSubmit()}>
							Save changes
						</Button>
					</DialogFooter>
				</DialogContent>
			</form>
		</Dialog>
	);
}
