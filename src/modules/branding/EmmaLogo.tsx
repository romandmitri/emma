import { cn } from "@/src/common/components/cn";
import logoImg from "@/src/public/images/emma-logo-square-64x64.png";
import Image from "next/image";

export interface EmmaLogoProps {
	className?: string;
	size?: number;
}

export function EmmaLogo({ className, size = 48 }: EmmaLogoProps) {
	return (
		<div
			className={cn(
				"relative flex items-center justify-center overflow-hidden rounded-xl border border-amber-300/30 bg-[#ffeeaa] shadow-md shadow-amber-500/10 transition-transform duration-200 hover:scale-105",
				className,
			)}
			style={{ width: size, height: size }}
		>
			<Image src={logoImg} alt="Emma Logo" width={size} height={size} className="object-contain" priority />
		</div>
	);
}
