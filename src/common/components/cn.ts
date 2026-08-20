import clsx, { ClassValue } from "clsx";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

// TODO: reidenzon - Figure out a better standard way that's more specific than basic "string|undefined" type.
export type HtmlClassName = HTMLAttributes<HTMLElement>["className"];
