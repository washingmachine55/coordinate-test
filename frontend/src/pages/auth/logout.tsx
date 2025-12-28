import { Button } from '@/components/ui/button';
import { LogOutIcon } from 'lucide-react';
import { redirect, useNavigate } from 'react-router';

export default function Logout() {
	const navigate = useNavigate();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			if (!localStorage.getItem('token')) {
				// throw redirect('/login');
				throw navigate('/auth/login', { replace: true });
			} else {
				localStorage.removeItem('token');
				throw navigate('/auth/login', { replace: true });
				redirect('/login');
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<form onSubmit={handleSubmit}>
			<Button variant={'link'} size={'sm'}>
				<a className="flex space-x-2 align-middle items-center">
					<LogOutIcon />
					<p>Logout</p>
				</a>
			</Button>
		</form>
	);
}
