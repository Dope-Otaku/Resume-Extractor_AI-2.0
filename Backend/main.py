from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from PyPDF2 import PdfReader
from langchain.text_splitter import CharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings
from langchain.chat_models import ChatOpenAI
from langchain.vectorstores import FAISS
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationalRetrievalChain
from dotenv import load_dotenv
from retrying import RetryError

app = FastAPI()

# Allowing CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variables to store conversation and chat history
conversation = None
chat_history = None

load_dotenv()

def _create_retry_decorator(embeddings):
    def retry_if_exception_type(exception):
        return isinstance(exception, (RetryError,))
    
    return retrying.retry(
        wait_exponential_multiplier=1000,
        wait_exponential_max=10000,
        retry_on_exception=retry_if_exception_type,
    )

@app.post("/upload/")
async def upload_pdf(pdf_file: UploadFile = File(...)):
    global conversation, chat_history

    # Processing uploaded PDF file
    raw_text = ""
    with pdf_file.file as file:
        pdf_reader = PdfReader(file)
        for page in pdf_reader.pages:
            raw_text += page.extract_text()

    # Splitting text into chunks
    text_splitter = CharacterTextSplitter(
        separator="\n",
        chunk_size=1000,
        chunk_overlap=200,
        length_function=len
    )
    text_chunks = text_splitter.split_text(raw_text)

    # Creating vector store
    embeddings = OpenAIEmbeddings()
    vectorstore = FAISS.from_texts(texts=text_chunks, embedding=embeddings)

    # Creating conversation chain
    llm = ChatOpenAI()
    memory = ConversationBufferMemory(memory_key='chat_history', return_messages=True)
    conversation = ConversationalRetrievalChain.from_llm(
        llm=llm,
        retriever=vectorstore.as_retriever(),
        memory=memory,
        retry_decorator=_create_retry_decorator(embeddings)  # Passing retry decorator
    )

    return {"message": "PDF uploaded and processed successfully."}

@app.get("/chat/")
async def chat_with_bot(user_question: str):
    global conversation, chat_history

    if conversation is None:
        return {"error": "No conversation initialized. Please upload a PDF first."}

    # Querying chatbot with user's question
    response = conversation({'question': user_question})
    chat_history = response['chat_history']

    return chat_history

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
