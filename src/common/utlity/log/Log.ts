export const consoleCatch = (err: any) => {
	console.error(err);
	if (err instanceof Error) {
		// TODO: reidenzon - Toast it..?!
	}
}
