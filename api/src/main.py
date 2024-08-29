from fastapi import FastAPI
from pydantic import BaseModel
from .dummy_data import dummyBase64Image

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


@app.post("/subtitles")
async def create_subtitles(article: Article):
    response = {
        "subtitles": [
            {
                "id": 0,
                "content": "人工知能（AI）は、コンピュータが人間の知能を模倣する能力です。",
            },
            {
                "id": 1,
                "content": "学習、推論、問題解決、理解、生成などのタスクが含まれます。",
            },
            {
                "id": 2,
                "content": "AI技術は、医療、金融、製造、交通などで応用されています。",
            },
            {
                "id": 3,
                "content": "特に、機械学習とディープラーニングの進歩が重要です。",
            },
            {
                "id": 4,
                "content": "AIは急速に進化し、より高度な自動化と効率化を実現しています。",
            },
            {
                "id": 5,
                "content": "これにより、社会全体に大きな影響を与えています。",
            },
        ]
    }
    return response


class Subtitle(BaseModel):
    id: int
    content: str


class VideoRequest(BaseModel):
    thumbnail: str
    subtitles: list[Subtitle]


@app.post("/video")
async def create_video(videoRequest: VideoRequest):
    response = {
        "video": dummyBase64Image,
    }
    return response
