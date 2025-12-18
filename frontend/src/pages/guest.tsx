import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function Guest() {
	return (
		<div className="my-auto mx-auto flex w-full h-full justify-center">
			<div className="bg-gray-50 w-1/2 h-1/4 fixed flex my-auto top-[35%] rounded-4xl">
				<div className="inline-flex my-auto mx-auto flex-wrap space-y-5 justify-center">
					<a href="/login">
						<Button variant={'default'} size={'lg'}>
							Login
						</Button>
					</a>
					<Separator className="bg-black" />
					<a href="/register">
						<Button variant={'default'} size={'lg'}>
							Register
						</Button>
					</a>
				</div>
			</div>
		</div>
	);
}
