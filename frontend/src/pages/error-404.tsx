import { Button } from '@/components/ui/button';
import { ArrowLeftCircleIcon } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function Error404() {
	const navigate = useNavigate();

	return (
		<div className="block p-8 lg:p-40">
			<div className="flex flex-col place-items-center text-center space-y-4">
				<h1 className="w-3/4 mx-auto flex flex-row text-6xl lg:text-9xl">Dis page does not Exist</h1>
				<p className="flex flex-row text-2xl lg:text-4xl">Please go bacc</p>
				<Button variant={'default'} size={'icon-lg'} onClick={() => navigate(-1)}>
					<ArrowLeftCircleIcon />
				</Button>
			</div>
		</div>
	);
}
