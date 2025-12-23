import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/components/layouts/auth-layout';
import TextLink from '@/components/ui/text-link';
import InputError from '@/components/ui/input-error';
import { toast } from 'sonner';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export default function Register() {
	const [userName, setUserName] = useState('');
	const [userEmail, setUserEmail] = useState('');
	const [userPassword, setUserPassword] = useState('');
	const [confirmedPassword, setConfirmedPassword] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			const axiosReqRes = await axios.post(
				'/auth/register',
				{
					name: userName,
					email: userEmail,
					password: userPassword,
					confirmed_password: confirmedPassword,
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			if (axiosReqRes.data[0].type == 'success') {
				localStorage.setItem('token', axiosReqRes.data[1].token);
				toast.success(axiosReqRes.data[0].message);
				setTimeout(() => {
					navigate('/', { replace: true });
				}, 500);
			} else if (axiosReqRes.data[0].type == 'error') {
				toast.error(axiosReqRes.data[0].message);
			} else {
				toast.info('Something went wrong, please try again later.');
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<AuthLayout title="Create an account" description="Enter your details below to create your account">
			<form className="flex flex-col gap-6" onSubmit={handleSubmit}>
				<div className="grid gap-6">
					<div className="grid gap-2">
						<Label htmlFor="name">Name</Label>
						<Input
							id="name"
							type="text"
							required
							autoFocus
							tabIndex={1}
							value={userName}
							onChange={(e) => setUserName(e.target.value)}
							placeholder="Full name"
						/>
						<InputError message={'errors.name'} className="mt-2" />
					</div>

					<div className="grid gap-2">
						<Label htmlFor="email">Email address</Label>
						<Input
							id="email"
							type="email"
							required
							tabIndex={2}
							value={userEmail}
							onChange={(e) => setUserEmail(e.target.value)}
							placeholder="email@example.com"
						/>
						<InputError message={'errors.email'} />
					</div>

					<div className="grid gap-2">
						<Label htmlFor="password">Password</Label>
						<Input
							id="password"
							type="password"
							required
							tabIndex={3}
							value={userPassword}
							onChange={(e) => setUserPassword(e.target.value)}
							placeholder="Password"
						/>
						<InputError message={'errors.password'} />
					</div>

					<div className="grid gap-2">
						<Label htmlFor="password_confirmation">Confirm password</Label>
						<Input
							id="password_confirmation"
							type="password"
							required
							tabIndex={4}
							value={confirmedPassword}
							onChange={(e) => setConfirmedPassword(e.target.value)}
							placeholder="Confirm password"
						/>
						<InputError message={'errors.password_confirmation'} />
					</div>

					<Button
						type="submit"
						className="mt-2 w-full"
						tabIndex={5}
						value="submit"
						data-test="register-user-button"
						// onClick={() => submitData()}
					>
						{/* {processing && <Spinner />} */}
						Create account
					</Button>
				</div>

				<div className="text-center text-sm text-muted-foreground">
					Already have an account?{' '}
					<TextLink href="/login" tabIndex={6}>
						Log in
					</TextLink>
				</div>
			</form>
		</AuthLayout>
	);
}
