"use client";

import { Routes } from "@/src/app/routes";
import { Fragment, useEffect, useRef } from "react";

type Props = {};

export const WidgetEmbedder = (p: Props) => {
	const id = "widget";
	const key = "api-key";
	const url = Routes.Widget_Loader;
	const scriptRef = useRef<HTMLScriptElement | undefined>(undefined);

	useEffect(() => {
		console.log("WidgetEmbed.useEffect", { url });

		if (scriptRef.current) return;

		scriptRef.current = document.createElement("script");
		scriptRef.current.src = url;
		scriptRef.current.async = true;
		scriptRef.current.setAttribute("data-api-key", key);
		scriptRef.current.setAttribute("data-target-element", id);

		document.body.appendChild(scriptRef.current);

		return () => {
			scriptRef.current?.remove();
			scriptRef.current = undefined;
		};
	}, [url]);

	return (
		<Fragment>
			<div id={id} />
		</Fragment>
	);
};
