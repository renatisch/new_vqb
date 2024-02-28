from langchain_openai import ChatOpenAI
from langchain.prompts import (
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    MessagesPlaceholder,
)
from langchain.schema import SystemMessage
from langchain.agents import OpenAIFunctionsAgent, AgentExecutor
from langchain.memory import ConversationBufferMemory
from handlers.handlers import ChatModelStartHandler
from tools.list_objects_tool import list_objects_tool
from tools.get_object_tool import get_object_tool
from tools.describe_query_tool import describe_query_tool
from tools.select_query_tool import select_query_tool
from langchain_core.pydantic_v1 import BaseModel, Field, validator
from typing import List
from langchain.output_parsers.pydantic import PydanticOutputParser
from enum import Enum


class QueryType(str, Enum):
    list_databases = "list_databases"
    list_schemas = "list_schemas"
    list_tables = "list_tables"
    descibe_table = "describe_table"
    select = "join"


class LlmResponseQuery(BaseModel):
    query_type: QueryType = Field(description="Requested query type.")
    query: str = Field(description="SQL query.")

    # added validator to handle Databricks specific db structure: no list_database, but list_catalogs query.
    @validator("query_type", pre=True)
    def _flexible_city(cls, value):
        if value == "list_databases" or value == "list_catalogs":
            return "list_databases"
        else:
            return value


class Queries(BaseModel):
    technology: str = Field(
        description="Database technology for which queries have been requeted"
    )
    queries: List[LlmResponseQuery] = Field(description="List of queries.")


def initial_queries_assistant(technology: str, input: str):
    output_parser = PydanticOutputParser(pydantic_object=Queries)
    response_format = output_parser.get_format_instructions()
    tools = [
        list_objects_tool,
        get_object_tool,
        describe_query_tool,
        select_query_tool,
    ]
    ChatStartHandler = ChatModelStartHandler()
    human_prompt = input.replace("format_instructions", response_format)
    prompt = ChatPromptTemplate(
        messages=[
            SystemMessage(
                content=(
                    """You are a large language model trained by OpenAI.\n.
                    You are a SQL expert designed to help with a wide range of tasks.\n
                    from generating specific sql queries to listing database objects required to generate a sql query for specific technology.\n
                    Before answering a question, ALWAYS use 'list_objects_tool' function to get the list of the database objects required to be retrieved\n
                    to complete required task.\n
                    Next, use 'get_object_tool' to generate queries for resulting object.\n
                    Repeat the process for each database object\n
                    Do not make any assumptions about SQL queries, Instead, ONLY use functions available to you to complete required tasks.\n

                    TOOLS:
                    ------

                    Assistant has access to the following tools:

                    {tools}

                    To use a tool, please use the following format:

                    ```
                    Thought: Do I need to use a tool? Yes
                    Action: the action to take, should be one of [{tool_names}]
                    Action Input: the input to the action
                    Observation: the result of the action
                    ```

                    When you have a response to say to the Human, or if you do not need to use a tool, you MUST use the format:

                    ```
                    Thought: Do I need to use a tool? No
                    Final Answer: {format_instructions}\n
                    ```

                    Begin!

                    Previous conversation history:
                    {chat_history}

                    New input: {input}
                    {agent_scratchpad}"""
                ),
            ),
            MessagesPlaceholder(variable_name="chat_history"),
            HumanMessagePromptTemplate.from_template("{input}"),
            MessagesPlaceholder(variable_name="agent_scratchpad"),
        ],
        output_parser=output_parser,
    )
    prompt.partial(format_instructions=response_format)
    memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
    llm = ChatOpenAI(callbacks=[ChatStartHandler], temperature=0)
    agent = OpenAIFunctionsAgent(llm=llm, prompt=prompt, tools=tools)
    agent_executor = AgentExecutor(
        agent=agent,
        verbose=True,
        tools=tools,
        memory=memory,
        output_parser=output_parser,
    )
    response = agent_executor.invoke(input=human_prompt)
    return output_parser.invoke(response["output"])
