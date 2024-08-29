from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}

class Article(BaseModel):
    title: str
    subtitle: str
    content: str
    
@app.post("/subtitles/")
async def create_subtitles(article: Article):
    return article

class Subtitle(BaseModel):
    id: int
    content: str

class Subtitles(BaseModel):
    subtitles: list[str]

@app.post("/video/")
async def create_video(subtitles: Subtitles):
    return subtitles