import { Widget } from "@/src/modules/widget/components/Widget";
import widgetCss from "@/src/modules/widget/widget.generated.css";
import { createRoot } from "react-dom/client";

(function () {
	console.log("widget.loader...");

	const script = document.currentScript;
	if (!script) return console.error("loader.script.MISSING");

	const apiKey = script.getAttribute("data-api-key");
	const targetId = script.getAttribute("data-target-element");

	if (!apiKey) return console.error("loader.apiKey.MISSING");
	if (!targetId) return console.error("loader.targetId.MISSING");

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
	root.render(<Widget apiKey={apiKey} />);
})();
