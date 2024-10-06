import os
from langchain.vectorstores import FAISS
import pandas as pd

df = pd.read_csv('assets/final.csv')

def context(gemini_embeddings):
    vectordb = FAISS.load_local("assets/exoplanet_1", gemini_embeddings,allow_dangerous_deserialization=True)
    # Create a retriever for querying the vector database
    retriever = vectordb.as_retriever(score_threshold=0.7)

    vectordb1 = FAISS.load_local("assets/exoplanet_2", gemini_embeddings,allow_dangerous_deserialization=True)
    retriever1= vectordb1.as_retriever(score_threshold=0.7)

    vectordb2 = FAISS.load_local("assets/exoplanet_3", gemini_embeddings,allow_dangerous_deserialization=True)
    retriever2= vectordb2.as_retriever(score_threshold=0.7)

    vectordb3 = FAISS.load_local("assets/exoplanet_4", gemini_embeddings,allow_dangerous_deserialization=True)
    retriever3= vectordb3.as_retriever(score_threshold=0.7)

    vectordb4 = FAISS.load_local("assets/exoplanet_5", gemini_embeddings,allow_dangerous_deserialization=True)
    retriever4= vectordb4.as_retriever(score_threshold=0.7)

    vectordb5 = FAISS.load_local("assets/exoplanet_6", gemini_embeddings,allow_dangerous_deserialization=True)
    retriever5 = vectordb5.as_retriever(score_threshold=0.7)\
    
    vectordb6 = FAISS.load_local("assets/csv_data", gemini_embeddings,allow_dangerous_deserialization=True)
    retriever6 = vectordb6.as_retriever(score_threshold=0.7)

    vectordb7 = FAISS.load_local("assets/graph_data", gemini_embeddings,allow_dangerous_deserialization=True)
    retriever7 = vectordb7.as_retriever(score_threshold=0.7)

    vectordb8 = FAISS.load_local("assets/nasa_stars", gemini_embeddings,allow_dangerous_deserialization=True)
    retriever8 = vectordb8.as_retriever(score_threshold=0.7)

    vectordb9 = FAISS.load_local("assets/stellar_systems", gemini_embeddings,allow_dangerous_deserialization=True)
    retriever9 = vectordb9.as_retriever(score_threshold=0.7)

    return retriever,retriever1,retriever2,retriever3,retriever4,retriever5,retriever6,retriever7,retriever8,retriever9

def planrt_nasa_url(planet):
    result_scalar = df[df['Planet'] == planet]['Link'].values[0]
    return result_scalar
