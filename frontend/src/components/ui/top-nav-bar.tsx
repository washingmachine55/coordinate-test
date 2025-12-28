// 'use client';

import * as React from 'react';

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import Logout from '../../pages/auth/logout';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from './dropdown-menu';
import { Button } from './button';
import { MailWarningIcon } from 'lucide-react';
import { useNavigate } from 'react-router';
import { VerifiedContext } from '@/lib/context';

const components: { title: string; href: string; description: string }[] = [
	{
		title: 'Alert Dialog',
		href: '/docs/primitives/alert-dialog',
		description: 'A modal dialog that interrupts the user with important content and expects a response.',
	},
	{
		title: 'Hover Card',
		href: '/docs/primitives/hover-card',
		description: 'For sighted users to preview content available behind a link.',
	},
	{
		title: 'Progress',
		href: '/docs/primitives/progress',
		description:
			'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
	},
	{
		title: 'Scroll-area',
		href: '/docs/primitives/scroll-area',
		description: 'Visually or semantically separates content.',
	},
	{
		title: 'Tabs',
		href: '/docs/primitives/tabs',
		description: 'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
	},
	{
		title: 'Tooltip',
		href: '/docs/primitives/tooltip',
		description:
			'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
	},
	{
		title: 'Logout',
		href: '/account/logout/',
		description: '',
	},
	{
		title: 'Settings',
		href: '/account/settings/',
		description: '',
	},
];

export function TopNavBar() {
	const navigate = useNavigate();
	const userIsVerified = React.useContext(VerifiedContext);
	return (
		<VerifiedContext.Provider value={userIsVerified}>
			<NavigationMenu className="w-full flow-root">
				<NavigationMenuList className="float-start">
					<NavigationMenuItem>
						<Button
							variant={'outline'}
							size={'default'}
							onClick={() => navigate('/')}
							disabled={!userIsVerified}
						>
							Home
						</Button>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuTrigger>Components</NavigationMenuTrigger>
						<NavigationMenuContent>
							<ul className="grid gap-2 sm:w-100 md:w-125 md:grid-cols-2 lg:w-150">
								{components.map((component) => (
									<ListItem key={component.title} title={component.title} href={component.href}>
										{component.description}
									</ListItem>
								))}
							</ul>
						</NavigationMenuContent>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
							<a href="/docs">Docs</a>
						</NavigationMenuLink>
					</NavigationMenuItem>
				</NavigationMenuList>
				<NavigationMenuList className="float-end justify-end">
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
									disabled={userIsVerified}
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
				</NavigationMenuList>
			</NavigationMenu>
		</VerifiedContext.Provider>
	);
}

function ListItem({ title, children, href, ...props }: React.ComponentPropsWithoutRef<'li'> & { href: string }) {
	return (
		<li {...props}>
			<NavigationMenuLink asChild>
				<a href={href}>
					<div className="text-sm leading-none font-medium">{title}</div>
					<p className="text-muted-foreground line-clamp-2 text-sm leading-snug">{children}</p>
				</a>
			</NavigationMenuLink>
		</li>
	);
}
