import os
import uuid

from fastapi import FastAPI

from .dummy_data import dummyBase64Video
from .classes import Article, VideoRequest
from .subtitle import create_subtitles
from .tts import subtitles_to_speeches

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
    data_path = os.path.join(os.path.dirname(__file__), "tmp", f"{uuid.uuid4()}")
    os.makedirs(data_path, exist_ok=True)

    subtitles = videoRequest.subtitles
    speeches = subtitles_to_speeches(data_path, subtitles)
    base64Image = videoRequest.thumbnail

    # video = create_video(data_path, base64Image, subtitles, speeches)
    video = dummyBase64Video

    response = {
        "video": video,
    }
    return response
