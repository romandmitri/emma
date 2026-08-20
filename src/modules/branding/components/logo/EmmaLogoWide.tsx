import * as React from "react";
import { SVGProps } from "react";

export const EmmaLogoWide = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg
			//
			viewBox="0 0 300 100"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<g
				style={{
					fontSize: "127.484px",
					fill: "teal",
				}}
			>
				<path d="M60.643 96.468H2.753V3.532h57.89v16.185H21.115V39.76h35.793v16.185H21.115v24.339h39.528zM74.4 3.532H96.31l11.08 40.773L118.41 3.532h22.036v92.936h-15.811V22.02l-9.835 40.648H100.17L90.21 22.02v74.448H74.4zM151.152 3.532h21.91l11.081 40.773 11.018-40.773h22.036v92.936h-15.811V22.02l-9.835 40.648h-14.629l-9.96-40.648v74.448h-15.81zM260.895 20.34l-8.653 38.033h17.368zM249.69 3.531h22.472l25.086 92.936h-18.363l-5.727-22.97H248.57l-5.603 22.97h-18.363z" />
			</g>
		</svg>
	);
};
