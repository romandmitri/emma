import { AuthenticatedLayout } from "@/src/modules/layout/AuthenticatedLayout";
import { StoryEditor } from "@/src/modules/story/components/editor/StoryEditor";
import { StoryTabler } from "@/src/modules/story/type/StoryTable";
import { getCurrentUser } from "@/src/modules/user/service/UserService";

export default async function Page() {
	const user = await getCurrentUser();
	const story = await StoryTabler.ensure(user?.id);

	return (
		<AuthenticatedLayout title={"Story"}>
			<div></div>
			{story && <StoryEditor story={story.toClient()} />}
		</AuthenticatedLayout>
	);
}
