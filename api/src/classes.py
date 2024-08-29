from pydantic import BaseModel


class Article(BaseModel):
    title: str
    subtitle: str
    content: str


class Subtitle(BaseModel):
    id: int
    content: str


class VideoRequest(BaseModel):
    thumbnail: str
    subtitles: list[Subtitle]
