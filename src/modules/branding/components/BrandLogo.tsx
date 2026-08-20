import { HtmlClassName } from "@/src/common/components/cn";
import { EmmaLogoSquare } from "@/src/modules/branding/components/logo/EmmaLogoSquare";
import { EmmaLogoWide } from "@/src/modules/branding/components/logo/EmmaLogoWide";
import { Fragment } from "react";

type Props = {
	isSquare?: boolean;
	isWide?: boolean;

	className?: HtmlClassName;

	width?: number;
	height?: number;
};

export const BrandLogo = (p: Props) => {
	// TODO: reidenzon - Finish me!

	const props = {
		className: p.className,
		width: p.width,
		height: p.height,
	};

	return (
		<Fragment>
			{p.isSquare && <EmmaLogoSquare {...props} />}
			{p.isWide && <EmmaLogoWide {...props} />}
		</Fragment>
	);
};
