import * as z from "zod";

// const authRegisterSchema = z.object({
// 	name: z.string().min(4).max(64).trim(),
// 	email: z.email(),
// 	password: z.string().min(8).max(64),
// 	confirmed_password: z.string(),
// });
const authRegisterSchema = z.object({
	name: z.string().min(4).max(64).trim(),
	email: z.email(),
	password: z.string().min(8).max(64),
	confirmed_password: z.string(),
}).refine((data) => data.password === data.confirmed_password, {
	message: "Passwords do not match",
	path: ["confirmed_password"],
});


// some untrusted data...
// const input = { 
	// _name: 'dude',
	// _email: "something@prototype.com"
// };

// the parsed result is validated and type safe!
// const data = authRegisterSchema.parse(input);

// so you can use it with confidence :)
// console.log(data._name);
// console.log(data._email);

export default authRegisterSchema;