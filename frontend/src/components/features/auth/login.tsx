import AuthLayout from '@/components/layouts/auth-layout';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import InputError from '@/components/ui/input-error';
import { Label } from '@/components/ui/label';
import TextLink from '@/components/ui/text-link';

interface LoginProps {
	status?: string;
	canRegister: boolean;
}

export default function Login({ status, canRegister }: LoginProps) {
	return (
		<AuthLayout title="Log in to your account" description="Enter your email and password below to log in">
			<head title="Log in" />

			<form className="flex flex-col gap-6">
				<>
					<div className="grid gap-6">
						<div className="grid gap-2">
							<Label htmlFor="email">Email address</Label>
							<Input
								id="email"
								type="email"
								name="email"
								required
								autoFocus
								tabIndex={1}
								autoComplete="email"
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
								name="password"
								required
								tabIndex={2}
								autoComplete="current-password"
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
				</>
			</form>

			{status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
		</AuthLayout>
	);
}
