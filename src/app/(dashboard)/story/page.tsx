import { AuthenticatedLayout } from "@/src/modules/layout/AuthenticatedLayout";

export default function Page() {
	return (
		<AuthenticatedLayout title={"Story"}>
			<div></div>
		</AuthenticatedLayout>
	);
}
