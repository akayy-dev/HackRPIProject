from gpt import OpenAI
from os import getenv

api_key = getenv("OPENAI_KEY")

client = OpenAI(api_key=api_key)

assistant = client.beta.assistants.create(
  name="Place Summarizer",
  instructions="You give summarizes about places in urban areas, placing empahsis on cultural impact and historical notions",
  model="gpt-4o"
)

print(f'Assistant ID: {assistant.id}')