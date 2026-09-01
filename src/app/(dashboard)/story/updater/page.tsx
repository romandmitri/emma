import { AuthenticatedLayout } from "@/src/modules/layout/AuthenticatedLayout";
import { StoryUpdater } from "@/src/modules/story/components/updater/StoryUpdater";
import { StoryTabler } from "@/src/modules/story/type/StoryTable";
import { getCurrentUser } from "@/src/modules/user/service/UserService";

export default async function Page() {
	const user = await getCurrentUser();

	// TODO: reidenzon - Can probably skip loading this until submit... meh.
	const story = await StoryTabler.ensure(user?.id);

	return (
		<AuthenticatedLayout title={"Story Updater"}>
			<div></div>
			{story && <StoryUpdater story={story.toClient()} />}
		</AuthenticatedLayout>
	);
}
