import { UserTabler } from "@/src/modules/user/type/UserTable";
import { WidgetTabler } from "@/src/modules/widget/type/WidgetTable";
import { NextResponse } from "next/server";

type Params = Promise<{ id: string }>;

export async function GET(_req: Request, segmentData: { params: Params }) {
	const params = await segmentData.params;
	const widgetId = params.id;

	// TODO: reidenzon - Use standard response!

	if (!widgetId) {
		return NextResponse.json({ error: "Widget ID is required" }, { status: 400 });
	}

	const widget = await WidgetTabler.select({ id: widgetId });
	if (!widget) {
		return NextResponse.json({ error: "Widget not found" }, { status: 404 });
	}

	const user = await UserTabler.select({ id: widget.userId });
	if (!user) {
		return NextResponse.json({ error: "User NOT found" }, { status: 404 });
	}

	return NextResponse.json(
		{
			bundle: {
				widget: widget.toClient(),
				user: user.toClient(),
			},
			widget: widget.toClient(),
		},
		{ status: 200 },
	);
}
