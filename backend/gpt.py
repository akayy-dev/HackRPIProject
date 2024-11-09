from openai import OpenAI

class OpenAIClient():
    def __init__(self, API_KEY:str, ASST_ID:str):
        self.client = OpenAI(api_key=API_KEY)
        self.asst_id = ASST_ID

    def get_summary(self, json_input) -> str:
        #Create a thread with the prompt
        thread = self.create_thread_and_prompt(json_input)

        #Create and poll the run and return the assistant response
        response = self.create_and_poll_run(thread)

        return response

    def create_thread_and_prompt(self, input):
         thread = self.client.beta.threads.create(
             messages=[
                 {
                     "role": "user",
                     "content": input
                 }
             ]
         )
         return thread
    
    def create_and_poll_run(self, thread) -> str:
        run = self.client.beta.threads.runs.create_and_poll(
                thread_id=thread.id,
                assistant_id=self.asst_id
        )
        
        if run.status == 'completed': 
            messages = self.client.beta.threads.messages.list(thread_id=thread.id)
            return(messages.data[0].content[0].text.value) #The text of the first response
        else:
            print(run.status)
