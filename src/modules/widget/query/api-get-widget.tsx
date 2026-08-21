"use client";

import { Routes } from "@/src/app/routes";
import { WidgetInClient } from "@/src/modules/widget/type/Widget";
import { WidgetId } from "@/src/modules/widget/type/WidgetId";

export type GetWidgetRequest = {
	widgetId: WidgetId;
	baseUrl?: string;
};

export type GetWidgetResponse = {
	widget: WidgetInClient;
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
