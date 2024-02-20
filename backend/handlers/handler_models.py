from pydantic import BaseModel
from enum import Enum
from typing import List


class MessageTypeEnum(str, Enum):
    system = "system"
    human = "human"


class Message(BaseModel):
    type: MessageTypeEnum
    text: str


class Messages(BaseModel):
    messages: List[Message]
