import DOMPurify from "dompurify";

export const withHtml = (dirty?: string) => {
	if (!dirty) return null;
	const clean = DOMPurify.sanitize(dirty);
	return <span dangerouslySetInnerHTML={{ __html: clean }} />;
};
