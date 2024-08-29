from fastapi import FastAPI
from .dummy_data import dummyBase64Image
from .classes import Article, VideoRequest
from .subtitle import create_subtitles

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}


@app.post("/subtitles")
async def post_subtitles(article: Article):
    subtitles = create_subtitles(article)
    response = {"subtitles": []}
    for i, subtitle in enumerate(subtitles):
        response["subtitles"].append({"id": i, "content": subtitle})
    return response


@app.post("/video")
async def post_video(videoRequest: VideoRequest):
    response = {
        "video": dummyBase64Image,
    }
    return response
