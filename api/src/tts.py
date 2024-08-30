import os

from openai import OpenAI
from google.cloud import texttospeech
from google.oauth2 import service_account


from .classes import Subtitle


def subtitles_to_speeches_openai(data_path: str, subtitles: list[Subtitle]):
    client = OpenAI(
        # This is the default and can be omitted
        api_key=os.environ.get("OPENAI_API_KEY"),
    )

    for i, subtitle in enumerate(subtitles):
        speech_file_path = f"{data_path}/speech{i}.mp3"
        response = client.audio.speech.create(
            model="tts-1",
            voice="alloy",
            input=subtitle["content"],
        )

        response.stream_to_file(speech_file_path)


def subtitles_to_speeches_google(data_path: str, subtitles: list[Subtitle]):
    # Initialize the Text-to-Speech client
    # Specify the path to your service account key file
    key_path = os.environ.get("GOOGLE_APPLICATION_CREDENTIALS")
    print(key_path)

    # Create credentials from the service account key file
    credentials = service_account.Credentials.from_service_account_file(key_path)

    # Initialize the Text-to-Speech client with the credentials
    client = texttospeech.TextToSpeechClient(credentials=credentials)

    # Build the voice request
    voice = texttospeech.VoiceSelectionParams(
        language_code="ja-JP", ssml_gender=texttospeech.SsmlVoiceGender.MALE
    )

    # Select the type of audio file to return
    audio_config = texttospeech.AudioConfig(audio_encoding=texttospeech.AudioEncoding.MP3)

    for i, subtitle in enumerate(subtitles):
        # Set the text input to be synthesized
        synthesis_input = texttospeech.SynthesisInput(text=subtitle.content)
        # Perform the text-to-speech request
        response = client.synthesize_speech(
            input=synthesis_input, voice=voice, audio_config=audio_config
        )
        # print(response)

        # Save the output audio file
        with open(f"{data_path}/speech{i}.mp3", "wb") as out:
            print(f"{data_path}/speech{i}.mp3")
            out.write(response.audio_content)
