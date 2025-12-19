import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/components/layouts/auth-layout';
import TextLink from '@/components/ui/text-link';
import InputError from '@/components/ui/input-error';
import { toast } from 'sonner';
import axios from 'axios';
import { useState } from 'react';

export default function Register() {
	const [userName, setUserName] = useState('');
	const [userEmail, setUserEmail] = useState('');
	const [userPassword, setUserPassword] = useState('');
	const [confirmedPassword, setConfirmedPassword] = useState('');
	const [responseMsg, setResponseMsg] = useState('');
	const [responseType, setResponseType] = useState('');

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		// async function submitData() {
		try {
			await axios
				.post(
					'http://localhost:3000/auth/register',
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
				)
				.then(
					(responseMsg) => (setResponseMsg(responseMsg.data.message), setResponseType(responseMsg.data.type))
				)
				.catch(function (error) {
					console.log(error);
				});
		} catch (error) {
			console.log(error);
		} finally {
			if (responseType == 'success') {
				toast.success(responseMsg);
			} else if (responseType == 'error') {
				toast.error(responseMsg);
			} else {
				toast.info('Something went wrong, please try again later.');
			}
		}
		// }
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
