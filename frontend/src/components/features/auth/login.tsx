import AuthLayout from '@/components/layouts/auth-layout';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import InputError from '@/components/ui/input-error';
import { Label } from '@/components/ui/label';
import TextLink from '@/components/ui/text-link';
import { toast } from 'sonner';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router';

interface LoginProps {
	status?: string;
	canRegister: boolean;
}

export default function Login({ status, canRegister }: LoginProps) {
	const [userEmail, setUserEmail] = useState('');
	const [userPassword, setUserPassword] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const axiosReqRes = await axios.post(
				'/auth/login',
				{
					email: userEmail,
					password: userPassword,
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
		<AuthLayout title="Log in to your account" description="Enter your email and password below to log in">
			<form className="flex flex-col gap-6" onSubmit={handleSubmit}>
				<div className="grid gap-6">
					<div className="grid gap-2">
						<Label htmlFor="email">Email address</Label>
						<Input
							id="email"
							type="email"
							required
							autoFocus
							tabIndex={1}
							autoComplete="email"
							value={userEmail}
							onChange={(e) => setUserEmail(e.target.value)}
							placeholder="email@example.com"
						/>
						<InputError message={'errors.email'} />
					</div>

					<div className="grid gap-2">
						<div className="flex items-center">
							<Label htmlFor="password">Password</Label>
							<TextLink className="ml-auto text-sm" tabIndex={5}>
								Forgot password?
							</TextLink>
						</div>
						<Input
							id="password"
							type="password"
							required
							tabIndex={2}
							autoComplete="current-password"
							value={userPassword}
							onChange={(e) => setUserPassword(e.target.value)}
							placeholder="Password"
						/>
					</div>

					<div className="flex items-center space-x-3">
						<Checkbox id="remember" name="remember" tabIndex={3} />
						<Label htmlFor="remember">Remember me</Label>
					</div>

					<Button type="submit" className="mt-4 w-full" tabIndex={4} data-test="login-button">
						Log in
					</Button>
				</div>

				{canRegister && (
					<div className="text-center text-sm text-muted-foreground">
						Don't have an account? <TextLink href="/register">Sign up</TextLink>
					</div>
				)}
			</form>
			{status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
		</AuthLayout>
	);
}
