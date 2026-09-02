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
import { Badge } from "@/src/common/components/shadcn/badge";
import { Button } from "@/src/common/components/shadcn/button";
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from "@/src/common/components/shadcn/card";
import { ThemeIcon } from "@/src/modules/branding/components/ThemeIcon";
import { getLatestEmotion } from "@/src/modules/emotion/type/EmotionTool";
import { UserAvatar } from "@/src/modules/user/components/UserAvatar";
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

	// TODO: reidenzon - Separate the conversation stuff into separate file.

	return (
		<Card
			size={"sm"}
			className={
				"dark rounded-4 fixed inset-4 z-50 flex flex-col border shadow-lg sm:inset-auto sm:right-4 sm:bottom-4 sm:h-[calc(80vh-2rem)] sm:max-h-[calc(100vh-2rem)] sm:w-[calc(50vw)]"
			}
		>
			<CardHeader>
				<CardTitle className={"flex flex-row items-start justify-between"}>
					<div className={"flex flex-row gap-2"}>
						<UserAvatar user={user} size={"lg"} />
						<UserBadge user={user} />
					</div>
					<Badge variant={"secondary"}>{getLatestEmotion(messages)}</Badge>
				</CardTitle>
				<CardAction>
					<Button onClick={() => wc.setIsOpen(false)} variant={"link"}>
						<ThemeIcon.Common_Close />
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
			<CardFooter className={"flex-col gap-1 rounded-none"}>
				<PromptInput onSubmit={handleSubmit}>
					<PromptInputBody>
						<PromptInputTextarea
							//
							autoFocus
							onChange={(e) => setText(e.target.value)}
							placeholder={"Say something..."}
							value={text}
						/>
					</PromptInputBody>
					<PromptInputFooter>
						<div></div>
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
