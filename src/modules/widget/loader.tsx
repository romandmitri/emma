import { Widget } from "@/src/modules/widget/components/Widget";
import widgetCss from "@/src/modules/widget/widget.generated.css";
import { createRoot } from "react-dom/client";

(function () {
	console.log("widget.loader...");

	const script = document.currentScript as HTMLScriptElement | null;
	if (!script) return console.error("loader.script.MISSING");

	const isOpen = script.getAttribute("data-is-open") == "true";

	const targetId = script.getAttribute("data-target-element");
	if (!targetId) return console.error("loader.targetId.MISSING");

	const widgetId = script.getAttribute("data-widget-id");
	if (!widgetId) return console.error("loader.widgetId.MISSING");

	const placeholder = "__SERVER_ORIGIN_PLACEHOLDER__";
	const baseUrl = placeholder !== "__SERVER_ORIGIN_PLACEHOLDER__" ? placeholder : new URL(script.src, window.location.href).origin;

	const element = document.getElementById(targetId);
	if (!element) return console.error("loader.element.MISSING");
	if (element.shadowRoot) return;

	// Attach shadow root for complete style isolation
	const shadow = element.attachShadow({ mode: "open" });

	// Inject styles into Shadow DOM via Constructable Stylesheets
	const sheet = new CSSStyleSheet();
	sheet.replaceSync(widgetCss);
	shadow.adoptedStyleSheets = [sheet];

	const root = createRoot(shadow);
	root.render(
		<Widget
			//
			baseUrl={baseUrl}
			isOpen={isOpen}
			widgetId={widgetId}
		/>,
	);
})();
