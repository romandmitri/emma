"use client";

import { Routes } from "@/src/app/routes";
import { WidgetId } from "@/src/modules/widget/type/WidgetId";
import { Fragment, useEffect, useRef } from "react";

type Props = {
	widgetId?: WidgetId;
};

export const WidgetEmbedder = (p: Props) => {
	const targetId = "widget";
	// TODO: reidenzon - Get the right value!
	const widgetId = p.widgetId ?? "widget-id";
	const url = Routes.Widget_Loader;
	const scriptRef = useRef<HTMLScriptElement | undefined>(undefined);

	useEffect(() => {
		console.log("WidgetEmbed.useEffect", { url });

		if (scriptRef.current) return;

		scriptRef.current = document.createElement("script");
		scriptRef.current.src = url;
		scriptRef.current.async = true;
		scriptRef.current.setAttribute("data-target-element", targetId);
		scriptRef.current.setAttribute("data-widget-id", widgetId);

		document.body.appendChild(scriptRef.current);

		return () => {
			scriptRef.current?.remove();
			scriptRef.current = undefined;
		};
	}, [url]);

	return (
		<Fragment>
			<div id={targetId} />
		</Fragment>
	);
};
