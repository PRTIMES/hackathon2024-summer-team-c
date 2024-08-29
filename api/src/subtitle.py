import os

from openai import OpenAI
from pydantic import BaseModel
from .classes import Article


class SubtitleFormat(BaseModel):
    subtitles: list[str]


def create_subtitles(article: Article):
    client = OpenAI(
        # This is the default and can be omitted
        api_key=os.environ.get("OPENAI_API_KEY"),
    )

    prompt = """
    あなたは優秀なAIアシスタントです。
    次のWebサイトの内容を15秒の動画にしたときの字幕を生成してください。
    一つの字幕の長さは5秒程度にしてください。
    """

    content = f"""
    title: {article.title}
    subtitle: {article.subtitle}
    content: {article.content}
    """

    response = client.beta.chat.completions.parse(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": prompt,
            },
            {"role": "user", "content": f"内容： {content}"},
        ],
        temperature=0,
        response_format=SubtitleFormat,
    )

    subtitles = response.choices[0].message.parsed.subtitles

    return subtitles
