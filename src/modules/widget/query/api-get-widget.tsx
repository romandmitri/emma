"use client";

import { Routes } from "@/src/app/routes";
import { WidgetBundleInClient } from "@/src/modules/widget/context/WidgetBundle";
import { WidgetId } from "@/src/modules/widget/type/WidgetId";

export type GetWidgetRequest = {
	widgetId: WidgetId;
	baseUrl?: string;
};

export type GetWidgetResponse = {
	bundle: WidgetBundleInClient;
};

type Request = GetWidgetRequest;
type Response = GetWidgetResponse;

export const api_GET_widget = async (req: Request): Promise<Response> => {
	const path = Routes.Api_Widget(req.widgetId);
	const url = req.baseUrl ? `${req.baseUrl}${path}` : path;
	// TODO: reidenzon - Switch to Axios
	const response = await fetch(url);
	return await response.json();
};
