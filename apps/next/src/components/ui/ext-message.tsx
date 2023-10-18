"use client";
import {FC, useEffect} from "react";
import * as React from "react";

export const ExtMessage: FC<{ message: any }> = ({message}) => {
	const sendMessage = () => {
		var editorExtensionId = "gfgaoaiabjbmbfjmaoapiiemolailnnh";

		console.log("message", message);

		// Make a simple request:
		chrome.runtime.sendMessage(editorExtensionId, message,
			function (response) {
				console.log("resp", response);
			});
	}

	useEffect(() => {
		sendMessage()
	}, []);

	return (
		<div className="bg-gray-200">
			<div className="bg-blue-200"
			     onClick={() => sendMessage()}>
				Send message {JSON.stringify(message)}
			</div>
		</div>

	)
}