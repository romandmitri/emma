"use client";

import { Button } from "@/src/common/components/shadcn/button";
import { ThemeIcon } from "@/src/modules/branding/components/ThemeIcon";
import { useWidget } from "@/src/modules/widget/context/WidgetProvider";

type Props = {};

export const WidgetLauncher = (p: Props) => {
	const wc = useWidget();

	const isOpen = wc.isOpen;
	if (isOpen) return null;

	const handleOpen = () => {
		wc.setIsOpen(true);
	};

	// TODO: reidenzon - Make multiple modes, ie: button, tile, etc...

	return (
		<div className={"dark"}>
			<Button
				//
				onClick={handleOpen}
				variant={"default"}
				// tooltip={"Launch my agent!"}
			>
				<ThemeIcon.Widget />
				{"emma"}
			</Button>
		</div>
	);
};
