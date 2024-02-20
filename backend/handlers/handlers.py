from langchain.callbacks.base import BaseCallbackHandler
from langchain.callbacks.openai_info import OpenAICallbackHandler
from langchain_core.outputs import LLMResult
from uuid import UUID
from typing import Optional, Any, Dict, List
from handlers.handler_models import Messages, Message
from pyboxen import boxen
import re


def get_system_prompt(prompt: str):
    message_found = prompt.find("System:")
    if message_found == 0:
        system_prompt = re.split("^System:|Human:", prompt)
        system_message = Message(type="system", text=system_prompt[1])
        human_message = Message(type="human", text=system_prompt[2])
        return Messages(messages=[system_message, human_message])


def boxen_print(*args, **kwargs):
    print(boxen(*args, **kwargs))


class ChatModelStartHandler(BaseCallbackHandler):
    def on_chat_model_start(self, serialized, messages, **kwargs):
        print("\n\n\n\n======== Sending messages ======== \n\n")
        for message in messages[0]:
            if message.type == "system":
                boxen_print(message.content, title=message.type, color="yellow")

            elif message.type == "human":
                boxen_print(message.content, title=message.type, color="green")

            # printing function requested by ai with args.
            elif message.type == "ai" and "function_call" in message.additional_kwargs:
                call = message.additional_kwargs["function_call"]
                boxen_print(
                    f"Running tool call {call} with args {call['arguments']}",
                    title=message.type,
                    color="cyan",
                )

            elif message.type == "ai":
                boxen_print(message.content, title=message.type, color="blue")

            # printing result of function call. In this case message.type equals to function
            elif message.type == "function":
                boxen_print(message.content, title=message.type, color="purple")

            else:
                boxen_print(message.content, title=message.type)

    def on_llm_start(
        self,
        serialized: Dict[str, Any],
        prompts: List[str],
        *,
        run_id: UUID,
        parent_run_id: Optional[UUID] = None,
        tags: Optional[List[str]] = None,
        metadata: Optional[Dict[str, Any]] = None,
        **kwargs: Any,
    ):
        print("\n\n\n\n======== Sending messages ======== \n\n")
        boxen_print(prompts[0], title="Sending prompt to LLM", color="yellow")
        # LLM_start_messages = get_system_prompt(prompts[0])
        # for message in LLM_start_messages.messages:
        #     boxen_print(
        #         message.text,
        #         title=f"LLM start {message.type.value} message",
        #         color="yellow",
        #     )

    def on_llm_end(
        self,
        response: LLMResult,
        *,
        run_id: UUID,
        parent_run_id: Optional[UUID] = None,
        **kwargs: Any,
    ):
        print("\n\n\n\n======== Receiving messages ======== \n\n")
        generations = response.generations
        for each in generations:
            generation_text = each[0].text
            boxen_print(generation_text, title="LLM response", color="yellow")

    def on_chain_start(
        self, serialized: Dict[str, Any], inputs: Dict[str, Any], **kwargs: Any
    ) -> Any:
        print("inputs:", inputs)
