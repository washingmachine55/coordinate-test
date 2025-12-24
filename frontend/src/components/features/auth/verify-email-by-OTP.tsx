import { Button } from '@/components/ui/button';
import axios from 'axios';
import {
	InputOTP,
	InputOTPGroup,
	// InputOTPSeparator,
	InputOTPSlot,
} from '@/components/ui/input-otp';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { DeleteIcon, EraserIcon, MailWarningIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';
import { redirect } from 'react-router';

export function VerifyEmailByOTP() {
	const [value, setValue] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	// const handleSubmit = async () => {
	// const handleSubmit = async (e) => {
	// 	e.preDefault();
	// 	e.stopPropagation();
	// 	try {
	// 		const axiosReqRes = await axios.post(
	// 			'/coordinates/add',
	// 			{
	// 				start_position: startPosition,
	// 				end_position: endPosition,
	// 			},
	// 			{
	// 				headers: {
	// 					'Content-Type': 'application/json',
	// 					Authorization: localStorage.getItem('token'),
	// 				},
	// 			}
	// 		);

	// 		if (axiosReqRes.data.type == 'success') {
	// 			toast.success(axiosReqRes.data.message);
	// 			setTimeout(() => {
	// 				setStartPosition('');
	// 				setEndPosition('');
	// 			}, 500);
	// 		} else if (axiosReqRes.data.type == 'error') {
	// 			toast.error(axiosReqRes.data.message);
	// 		} else {
	// 			toast.info('Something went wrong, please try again later.');
	// 		}
	// 	} catch (error) {
	// 		console.debug(error);
	// 	}
	// };

	const verifyOTP = async () => {
		setIsLoading(true);
		try {
			const axiosReqRes = await axios.post(
				'/auth/verify-otp',
				{
					otp: value,
				},
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: localStorage.getItem('token'),
					},
				}
			);
			if (axiosReqRes.data[0].type == 'success') {
				toast.success(axiosReqRes.data[0].message);
				setIsLoading(false);
				setTimeout(() => {
					toast.info('Redirecting you to the homepage in 3 seconds');
					throw redirect('/'); // doesn't work - Speculation is due to bad code relating to useContext
				}, 3000);
			} else if (axiosReqRes.data[0].type == 'error') {
				toast.error(axiosReqRes.data[0].message);
				setIsLoading(false);
			} else {
				toast.info('Something went wrong, please try again later.');
				setIsLoading(false);
			}
		} catch (error) {
			console.debug(error);
		}
	};

	const resendOTP = async () => {
		try {
			const axiosReqRes = await axios.get('/auth/resend-otp', {
				headers: {
					'Content-Type': 'application/json',
					Authorization: localStorage.getItem('token'),
				},
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
		<>
			<div className="flex flex-col items-center space-y-4 fixed justify-self-center my-auto h-[75vh] place-content-center">
				<div className="flex flex-row space-x-2 items-center">
					<InputOTP
						maxLength={6}
						pattern={REGEXP_ONLY_DIGITS}
						value={value}
						onChange={(value) => setValue(value)}
					>
						<InputOTPGroup>
							<InputOTPSlot index={0} />
							<InputOTPSlot index={1} />
							<InputOTPSlot index={2} />
							{/* </InputOTPGroup> */}
							{/* <InputOTPSeparator /> */}
							{/* <InputOTPGroup> */}
							<InputOTPSlot index={3} />
							<InputOTPSlot index={4} />
							<InputOTPSlot index={5} />
						</InputOTPGroup>
					</InputOTP>
					<div className="flex flex-col space-y-0.5">
						<Button variant={'outline'} size={'icon-sm'} onClick={() => setValue(value.slice(0, -1))}>
							<DeleteIcon />
						</Button>
						<Button variant={'destructive'} size={'icon-sm'} onClick={() => setValue('')}>
							<EraserIcon />
						</Button>
					</div>
				</div>
				<div className="flex flex-row space-x-2">
					<Button variant={'default'} size={'lg'} onClick={() => verifyOTP()}>
						{isLoading ? (
							<>
								<Spinner />
								<p>Verifying OTP</p>
							</>
						) : (
							<>
								<MailWarningIcon />
								<p>Verify OTP</p>
							</>
						)}
					</Button>
					<Button variant={'outline'} size={'lg'} onClick={() => resendOTP()}>
						<MailWarningIcon />
						Resend OTP
					</Button>
				</div>
			</div>
		</>
	);
}
