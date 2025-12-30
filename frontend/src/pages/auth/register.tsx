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

	const [errorNameMsg, setErrorNameMsg] = useState('');
	const [errorPasswordMsg, setErrorPasswordMsg] = useState('');
	const [errorConfirmedPasswordMsg, setErrorConfirmedPasswordMsg] = useState('');

	const navigate = useNavigate();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			setErrorNameMsg('');
			setErrorPasswordMsg('');
			setErrorConfirmedPasswordMsg('');
			const axiosReqRes = await axios.post(
				'https://localhost:3000/auth/register',
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
			if (axiosReqRes.status == 200) {
				if (axiosReqRes.data[0].type == 'success') {
					localStorage.setItem('token', axiosReqRes.data[1].token);
					toast.success(axiosReqRes.data[0].message);
					setTimeout(() => {
						navigate('/', { replace: true });
					}, 500);
				} else if (axiosReqRes.data[0].type == 'error') {
					toast.error(axiosReqRes.data[0].message);
				} else if (axiosReqRes.data[0].type == 'validation_error') {
					toast.info('Please fill the required fields before trying again.');
					const pathName = Object.values(axiosReqRes.data[0].body);
					const iterator = pathName.keys();

					for (const key of iterator) {
						switch (pathName[key].path.toString()) {
							case 'name':
								setErrorNameMsg(axiosReqRes.data[0].body[key].message);
								break;
							case 'password':
								setErrorPasswordMsg(axiosReqRes.data[0].body[key].message);
								break;
							case 'confirmed_password':
								setErrorConfirmedPasswordMsg(axiosReqRes.data[0].body[key].message);
								break;
							default:
								break;
						}
					}
				} else {
					toast.info('Something went wrong, please try again later.');
				}
			}
		} catch (error) {
			// toast.error('Something went wrong, please try again later.');
			console.debug(error);

			// ['na,e'].includes(err.pat){ }
			// if (axios.isAxiosError(error)) {
			// 	if (error.status == 422) {
			// 		toast.error(error.response?.data[0].message);
			// 		if (error.response?.data[0].path == 'name') {
			// 			setErrorNameMsg(error.response?.data[0].message);
			// 		}

			// 		return error.response?.data[0].path == 'name'
			// 			? setErrorNameMsg(error.response?.data[0].message)
			// 			: setErrorNameMsg('');
			// 	}
			// }
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
						<InputError forField={errorNameMsg} message={errorNameMsg} className="mt-2" />
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
							autoComplete="password"
							placeholder="Password"
						/>
						<InputError forField={errorPasswordMsg} message={errorPasswordMsg} className="mt-2" />
					</div>

					<div className="grid gap-2">
						<Label htmlFor="password_confirmation">Confirm password</Label>
						<Input
							id="password_confirmation"
							type="password"
							autoComplete="password_confirmation"
							required
							tabIndex={4}
							value={confirmedPassword}
							onChange={(e) => setConfirmedPassword(e.target.value)}
							placeholder="Confirm password"
						/>
						<InputError
							forField={errorConfirmedPasswordMsg}
							message={errorConfirmedPasswordMsg}
							className="mt-2"
						/>
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
