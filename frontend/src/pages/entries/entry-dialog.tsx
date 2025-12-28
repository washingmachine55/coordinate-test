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
import { Spinner } from '@/components/ui/spinner';
import { axiosInstance } from '@/lib/axios-headers';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export function EntryDialog() {
	const [startPosition, setStartPosition] = useState('');
	const [endPosition, setEndPosition] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	// const [responseMsg, setResponseMsg] = useState('');
	// const [responseType, setResponseType] = useState('');

	const handleSubmit = async () => {
		setIsLoading(true);
		// const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		// event.preventDefault();
		try {
			const axiosReqRes = await axiosInstance.post('/coordinates/add', {
				start_position: startPosition,
				end_position: endPosition,
			});

			if (axiosReqRes.data.type == 'success') {
				setTimeout(() => {
					toast.success(axiosReqRes.data.message);
					setStartPosition('');
					setEndPosition('');
					setIsLoading(false);
				}, 3000);
			} else if (axiosReqRes.data.type == 'error') {
				setTimeout(() => {
					toast.error(axiosReqRes.data.message);
					setIsLoading(false);
				}, 3000);
			} else {
				toast.info('Something went wrong, please try again later.');
				setIsLoading(false);
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
							{isLoading ? (
								<>
									<Spinner />
									Saving Changes
								</>
							) : (
								<>Save changes</>
							)}
						</Button>
					</DialogFooter>
				</DialogContent>
			</form>
		</Dialog>
	);
}
