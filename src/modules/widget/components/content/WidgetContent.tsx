"use client";

import { Routes } from "@/src/app/routes";
import { Conversation, ConversationContent, ConversationScrollButton } from "@/src/common/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/src/common/components/ai-elements/message";
import {
	PromptInput,
	PromptInputBody,
	PromptInputFooter,
	PromptInputMessage,
	PromptInputSubmit,
	PromptInputTextarea,
} from "@/src/common/components/ai-elements/prompt-input";
import { Button } from "@/src/common/components/shadcn/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/common/components/shadcn/card";
import { withHtml } from "@/src/common/utlity/hmtl/Raw";
import { UserBadge } from "@/src/modules/user/components/UserBadge";
import { useWidget } from "@/src/modules/widget/context/WidgetProvider";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState } from "react";

type Props = {};

// https://elements.ai-sdk.dev/components/prompt-input#usage-with-ai-sdk

export const WidgetContent = (p: Props) => {
	const wc = useWidget();
	const bundle = wc.bundle!;

	const widget = bundle.widget;
	const user = bundle.user;

	const [text, setText] = useState<string>("");
	const chatApi = wc.baseUrl ? `${wc.baseUrl}${Routes.Api_Chat()}` : Routes.Api_Chat();
	const { messages, status, sendMessage } = useChat({
		transport: new DefaultChatTransport({
			api: chatApi,
		}),
	});

	if (!wc.isOpen) return null;

	const handleSubmit = (message: PromptInputMessage) => {
		const hasText = Boolean(message.text);
		const hasAttachments = Boolean(message.files?.length);
		if (!(hasText || hasAttachments)) {
			return;
		}
		sendMessage(
			{
				text: message.text || "Sent with attachments",
				files: message.files,
			},
			{
				body: { widgetId: widget.id },
			},
		);
		setText("");
	};

	return (
		<Card className={"dark fixed inset-0 z-50 flex flex-col rounded-none border-0 ring-0"}>
			<CardHeader>
				<CardTitle className={"flex flex-row items-center"}>
					{/*<BrandLogo isWide className={"h-3 w-max"} />*/}
					<UserBadge user={user} />
				</CardTitle>
				<CardDescription className={"text-xs"}>
					{withHtml("This is an <b>alpha</b> version using cheap AI models so it is NOT always accurate.")}
				</CardDescription>
				<CardAction>
					<Button onClick={() => wc.setIsOpen(false)} variant={"link"}>
						{"Close"}
					</Button>
				</CardAction>
			</CardHeader>
			<CardContent className={"flex min-h-0 flex-1 flex-col px-0"}>
				<Conversation className={"min-h-0 flex-1"}>
					<ConversationContent>
						{messages.map((message) => (
							<Message from={message.role} key={message.id}>
								<MessageContent>
									{message.parts.map((part, i) => {
										switch (part.type) {
											case "text":
												return <MessageResponse key={`${message.id}-${i}`}>{part.text}</MessageResponse>;
											default:
												return null;
										}
									})}
								</MessageContent>
							</Message>
						))}
					</ConversationContent>
					<ConversationScrollButton />
				</Conversation>
			</CardContent>
			<CardFooter className={"flex-col gap-2 rounded-none"}>
				<PromptInput onSubmit={handleSubmit}>
					<PromptInputBody>
						<PromptInputTextarea
							//
							onChange={(e) => setText(e.target.value)}
							placeholder={"Say something..."}
							value={text}
						/>
					</PromptInputBody>
					<PromptInputFooter>
						<div />
						<PromptInputSubmit disabled={!text && !status} status={status} />
					</PromptInputFooter>
				</PromptInput>
				<div className={"text-muted-foreground text-xs"}>
					{"Powered by "}
					<a href={"https://github.com/romandmitri/emma"} target={"_blank"}>
						{"EMMA"}
					</a>
					{" project."}
				</div>
			</CardFooter>
		</Card>
	);
};
