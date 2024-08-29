import os

from openai import OpenAI

from .classes import Subtitle


def subtitles_to_speeches(data_path: str, subtitles: Subtitle):
    client = OpenAI(
        # This is the default and can be omitted
        api_key=os.environ.get("OPENAI_API_KEY"),
    )

    for i, subtitle in enumerate(subtitles):
        speech_file_path = data_path / f"speech{i}.mp3"
        response = client.audio.speech.create(
            model="tts-1",
            voice="alloy",
            input=subtitle,
        )

        response.stream_to_file(speech_file_path)
