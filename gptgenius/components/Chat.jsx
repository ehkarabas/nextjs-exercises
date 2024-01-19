"use client";
import {
  generateChatResponse,
  getGptGeniusUserTokenAmount,
  subtractGptGeniusUserTokenAmount,
} from "@/utils/actions";
import { useAuth } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

import React from "react";
import toast from "react-hot-toast";

const Chat = () => {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);

  const { userId } = useAuth(); // GptGeniusUser ve GptGeniusUserToken one-to-one oldugu icin clerk userId ile kisa yol

  const {
    mutate,
    isPending: isPendingMutate,
    data,
  } = useMutation({
    mutationFn: async (query) => {
      const gptGeniusUserTokenAmount = await getGptGeniusUserTokenAmount(
        userId
      );

      if (gptGeniusUserTokenAmount < 100) {
        toast.error("Token balance too low....");
        return;
      }

      const response = await generateChatResponse([...messages, query]);

      if (!response) {
        toast.error("Something went wrong...");
        return;
      }
      setMessages((prev) => [...prev, response.message]);
      const newTokens = await subtractGptGeniusUserTokenAmount(
        userId,
        response.tokens
      );
      toast.success(`${newTokens} tokens remaining...`);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const query = { role: "user", content: prompt };
    mutate(query);
    // giden istegi Context'e uygun sekilde client state'e kaydeder
    setMessages((prev) => [...prev, query]);
    setPrompt("");
  };

  return (
    <div className="min-h-[calc(100vh-6rem)] grid grid-rows-[1fr,auto]">
      <div className="overflow-y-auto overflow-x-hidden max-h-[calc(100vh-12rem)] gpt-messages">
        {messages.map(({ role, content }, index) => {
          const avatar = role == "user" ? "👤" : "🤖";
          const bcg = role == "user" ? "bg-base-200" : "bg-base-100";
          return (
            <div
              key={`chat-message-${index}`}
              className={` ${bcg} flex py-6 -mx-8 px-8 text-xl leading-loose border-b border-base-300`}
            >
              <span className="mr-4 ">{avatar}</span>
              <p className="max-w-3xl">{content}</p>
            </div>
          );
        })}
        {isPendingMutate && (
          <span className="loading loading-dots loading-lg mt-4"></span>
        )}
      </div>
      <form onSubmit={handleSubmit} className="max-w-4xl pt-12 gpt-prompt">
        <div className="join w-full">
          <input
            type="text"
            className="input input-bordered join-item flex-grow"
            placeholder="Message GeniusGPT"
            value={prompt}
            onChange={(e) => {
              setPrompt(e.target.value);
            }}
            required
          />
          <button
            type="submit"
            className="btn btn-primary join-item rounded-md uppercase"
            disabled={isPendingMutate}
          >
            {isPendingMutate
              ? "please wait"
              : prompt === ""
              ? "type message"
              : "ask question"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
