from src.helpers.index import quiz_info_helper
from src.helpers.index import info_image_helpers
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI
import src.helpers.index as helper

helper.initializaion()

template_info = """
    ##Instruction##:-
        **You are an helpful assistant who help generate and fetch relevant information about the queried exoplanet**
        **Your task is to generate response in an age specific manner, with the information provided in a fun fact format to engage users**
        **The response generate should be one liner**
        **It should be a short and crisp information**
    You are an assistant for generating responses. 
    Use the following pieces of retrieved context to generate response.
    you can also use your own information in combination to help generate response.
    Provide the answer in about 5-10 words
    Provide the response in great detail.
    Provide the answer in a language according to the age.
    \n\n
    \n\n
{context1}

{context2}

{context3}

{context4}

{context5}

{context6}

{context7}

{context8}

{context9}

{context10}
Question: {question}
"""
prompt_info = ChatPromptTemplate.from_template(template_info)


def generate_info(data):
    planet = data['planet']
    age = data['age']
    info_query = f"""what is {planet}. Explain like you are explaining it to a {age} year old. Generate the response in a fun fact format as a short one liner info for generating useful insights in a game themed on start trek.
    """
    gemini_embeddings, model =helper.models()
    retriever,retriever1,retriever2,retriever3,retriever4,retriever5,retriever6,retriever7,retriever8,retriever9 = quiz_info_helper.context(gemini_embeddings)
    chain = (
        {"context1": retriever,
         "context2": retriever1,
         "context3": retriever2,
         "context4": retriever3,
         "context5": retriever4,
         "context6": retriever5,
         "context7": retriever6,
         "context8": retriever7,
         "context9": retriever8,
         "context10": retriever9,
         "question": RunnablePassthrough()}
        | prompt_info
        | model
        | StrOutputParser()
    )
    result = chain.invoke(info_query)
    result
    print(result)
    return {"result":result},200


