// Components
// import { LoaderCircle } from 'lucide-react';

// import InputError from '@/components/input-error';
import TextLink from '@/components/ui/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/components/layouts/auth-layout';
import { axiosInstanceWithoutHeaders } from '@/lib/axios-headers';
import { useState } from 'react';
import { toast } from 'sonner';

export default function ForgotPassword({ status }: { status?: string }) {
	const [value, setValue] = useState('');

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const axiosReqRes = await axiosInstanceWithoutHeaders.post('/auth/forgot-password', {
				email: value,
			});

			if (axiosReqRes.data[0].type == 'success') {
				toast.success(axiosReqRes.data[0].message);
			} else if (axiosReqRes.data[0].type == 'error') {
				toast.error(axiosReqRes.data[0].message);
			} else {
				toast.info('Something went wrong, please try again later.');
			}
		} catch (error) {
			console.debug(error);
		}
	};

	return (
		<AuthLayout title="Forgot password" description="Enter your email to receive a password reset link">
			{status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}

			<div className="space-y-6">
				<form onSubmit={handleSubmit}>
					{/* {({ processing, errors }) => ( */}
					{/* <> */}
					<div className="grid gap-2">
						<Label htmlFor="email">Email address</Label>
						<Input
							id="email"
							type="email"
							autoComplete="off"
							autoFocus
							placeholder="email@example.com"
							value={value}
							onChange={(e) => setValue(e.target.value)}
						/>

						{/* <InputError message={errors.email} /> */}
					</div>

					<div className="my-6 flex items-center justify-start">
						<Button className="w-full" data-test="email-password-reset-link-button">
							{/* {processing && <LoaderCircle className="h-4 w-4 animate-spin" />} */}
							Email password reset link
						</Button>
					</div>
					{/* </> */}
					{/* )} */}
				</form>

				<div className="space-x-1 text-center text-sm text-muted-foreground">
					<span>Or, return to</span>
					<TextLink href="/auth/login">log in</TextLink>
				</div>
			</div>
		</AuthLayout>
	);
}
