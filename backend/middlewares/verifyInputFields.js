import authRegisterSchema from "../validations/auth.validations.js";

export async function verifyInputFields(req, res, next) {

	const reqData = await authRegisterSchema.safeParseAsync(req.body);
	// console.log(resData.error.issues);

	if (!reqData.success) {
		// console.log(reqData.error.issues);
		return res.status(200).json([
			{
				type: 'validation_error',
				body: reqData.error.issues,
				// message: reqData.error.issues.message.toString(),
				// path: reqData.error.issues.path,
			},
		]);
	} else {
		next()
	}

	// try {
	// 	next();
	// } catch (error) {
	// 	if (error instanceof z.ZodError) {
	// 		return res.status(200).json([
	// 			{
	// 				path: reqData.error.issues.path,
	// 				message: reqData.error.issues.message,
	// 			},
	// 		]);
	// 	}
	// }
}