import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// import  axios from 'axios';
// import { useState } from "react";

// function submitData() {
// 	axios.post('http://localhost:3000/coordinates/add', document.querySelector('#entry-form'), {
// 		headers: {
// 			// 'Content-Type': 'application/json'
// 			'X-Requested-With': 'XMLHttpRequest'
// 		}
// 	})
// }


// document.querySelector('#entry-form').addEventListener("submit", submitData());


export function EntryDialog() {

	// const [start, setStart] =useState('')
	// const [end, setEnd] =useState()

	// 	state = {
	// 		name: ''
	// 	}

	// 	handleChange = event => {
	// 		this.setState({ name: event.target.value });
	// 	}

	// 	handleSubmit = async event => {
	// 	event.preventDefault();

	// 	const user = { name: this.state.name };

	// 	try {
	// 	const res = await axios.post('https://jsonplaceholder.typicode.com/users', user);
	// 	console.log('Status:', res.status);
	// 	console.log('Response data:', res.data);
	// 	} catch (err) {
	// 	if (err.response) {
	// 		console.error('POST failed with status:', err.response.status, err.response.statusText);
	// 	} else if (err.request) {
	// 		console.error('Network error: no response from server');
	// 	} else {
	// 		console.error('Request setup error:', err.message);
	// 	}
	// 	}
	// }
	// const submitFunction  =()=>{
	// 	console.log(start)
	// }

// const handelChange= (event)=>{
// 	console.log('',event)
// 	setStart(event.target.value)
// }
		return (
			
			<Dialog>
			{/* <form id="entry-form" onSubmit={submitFunction}> */}
			<form id="entry-form">
				<DialogTrigger asChild>
				<Button variant="default">Add New</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-106.25">
				<DialogHeader>
					<DialogTitle>Add new entry</DialogTitle>
					<DialogDescription>
					Make changes to your profile here. Click save when you&apos;re
					done.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4">
					<div className="grid gap-3">
					<Label htmlFor="start-position">Start Position*</Label>
					{/* <Input value={start} onChange={handelChange} id="start-position" name="end_position" placeholder="53.64362,24.5235235" required /> */}
					{/* <input type="text" value={start} onChange={handelChange} /> */}
					</div>
					<div className="grid gap-3">
					<Label htmlFor="end-position">End Position*</Label>
					<Input id="end-position" name="end_position" placeholder="23.64362,94.5235235" defaultValue="53.64362,24.5235235" required />
					</div>
				</div>
				<DialogFooter>
					<DialogClose asChild>
					<Button variant="outline">Cancel</Button>
					</DialogClose>
					<Button type="submit" value="submit">Save changes</Button>
				</DialogFooter>
				</DialogContent>
			</form>
			</Dialog>
		)
	}

