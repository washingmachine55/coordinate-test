// 'use client';

import * as React from 'react';

import Logout from '../../pages/auth/logout';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from './button';
import { ArrowRight, MailWarningIcon, MenuIcon, XIcon } from 'lucide-react';
import { useNavigate } from 'react-router';
import { AuthContext } from '@/lib/auth-context';
import ThemeSwitcher from './theme-switcher';

export function TopNavBar() {
	const navigate = useNavigate();
	const userIsVerified = React.useContext(AuthContext);
	return (
		<AuthContext.Provider value={userIsVerified}>
			{/* <div className="w-full flow-root"> */}
			<div className="w-full flex flex-row justify-between">
				{HamburgerMenu()}
				<div className="md:flex hidden float-start justify-start place-items-center space-x-2">
					<Button
						variant={'default'}
						size={'default'}
						onClick={() => navigate('/')}
						disabled={!userIsVerified}
					>
						Home
					</Button>
					<Button
						variant={'default'}
						size={'default'}
						onClick={() => navigate('/entries')}
						disabled={!userIsVerified}
					>
						Entries
					</Button>
				</div>
				<div className="flex float-end justify-end place-items-center space-x-2">
					<ThemeSwitcher />
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button>Account</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuLabel>Account Options</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<Button
									variant={'link'}
									size={'sm'}
									onClick={() => navigate('/verify-otp')}
									disabled={!userIsVerified}
								>
									<MailWarningIcon />
									Verify Email
								</Button>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Logout />
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</AuthContext.Provider>
	);

	function HamburgerMenu() {
		return (
			<div className="md:hidden flex float-start justify-start place-items-center space-x-2">
				<Sheet>
					<SheetTrigger asChild>
						<Button variant="default">
							<MenuIcon className="text-black" />
						</Button>
					</SheetTrigger>
					<SheetContent side="left">
						<SheetHeader>
							<SheetTitle className="text-2xl">Menu </SheetTitle>
							<SheetDescription>Navigate around the app as you want :)</SheetDescription>
						</SheetHeader>
						<div className="grid flex-1 auto-rows-min gap-6 px-4">
							<div className="grid gap-3">
								<Button
									variant={'default'}
									size={'lg'}
									onClick={() => navigate('/')}
									disabled={!userIsVerified}
								>
									Home
									<ArrowRight size={24} />
								</Button>
								<Button
									variant={'default'}
									size={'lg'}
									onClick={() => navigate('/entries')}
									disabled={!userIsVerified}
								>
									Entries
									<ArrowRight size={24} />
								</Button>
							</div>
							<div className="grid gap-3"></div>
						</div>
						<SheetFooter>
							<SheetClose asChild>
								<Button variant="destructive">
									Close
									<XIcon />
								</Button>
							</SheetClose>
						</SheetFooter>
					</SheetContent>
				</Sheet>
			</div>
		);
	}
}