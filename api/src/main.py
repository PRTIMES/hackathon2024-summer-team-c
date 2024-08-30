import os
import uuid
import re

from fastapi import FastAPI

from .dummy_data import dummyBase64Video
from .classes import SubtitlesRequest, VideoRequest
from .subtitle import create_subtitles
from .tts import subtitles_to_speeches_google
from .video import generate_video

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}


@app.post("/subtitles")
async def post_subtitles(subtitlesRequest: SubtitlesRequest):
    title = subtitlesRequest.title
    subtitle = subtitlesRequest.subtitle
    content = subtitlesRequest.content
    subtitles = create_subtitles(title, subtitle, re.sub(re.compile("<.*?>"), "", content))

    response = {"subtitles": []}
    for i, subtitle in enumerate(subtitles):
        response["subtitles"].append({"id": i, "content": subtitle})
    return response


@app.post("/video")
async def post_video(videoRequest: VideoRequest):
    data_path = os.path.join(os.path.dirname(__file__), "tmp", f"{uuid.uuid4()}")
    os.makedirs(data_path, exist_ok=True)

    subtitles = videoRequest.subtitles
    subtitles_to_speeches_google(data_path, subtitles)
    base64Image = videoRequest.thumbnail

    base64Video = generate_video(data_path, base64Image, subtitles)

    response = {
        "video": base64Video,
    }
    return response
