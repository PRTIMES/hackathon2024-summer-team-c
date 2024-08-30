import os
import base64
from io import BytesIO

import numpy as np
from PIL import Image
from moviepy.editor import (
    ImageClip,
    AudioFileClip,
    TextClip,
    CompositeVideoClip,
    concatenate_audioclips,
)

from .classes import Subtitle


def decode_base64Image(base64_image: str) -> np.ndarray:
    im = Image.open(BytesIO(base64.b64decode(base64_image)))
    image_array = np.array(im)

    return image_array


def generate_video(data_path: str, base64Image: str, subtitles: list[Subtitle]):
    image_array = decode_base64Image(base64Image)

    # 画像を読み込む
    image_clip = ImageClip(image_array)

    # 動画のサイズを指定（例: 1080x1920）
    movie_size = (1080, 1920)

    # 画像のアスペクト比を維持しつつ、動画サイズに合わせる
    image_clip = image_clip.resize(height=movie_size[1])  # 高さを基準にリサイズ
    if image_clip.w > movie_size[0]:  # 幅が超えている場合は幅も調整
        image_clip = image_clip.resize(width=movie_size[0])

    # 画像を指定したサイズに背景色でパッドする
    image_clip = image_clip.on_color(size=movie_size, color=(255, 255, 255), pos="center")

    audio_clips = [AudioFileClip(f"{data_path}/speech{i}.mp3") for i in range(len(subtitles))]
    audio_durations = [audio_clip.duration for audio_clip in audio_clips]
    audio_durations = [0] + audio_durations  # 最初の要素を0にしておく
    speeches = concatenate_audioclips(audio_clips)

    image_clip = image_clip.set_audio(speeches)
    image_clip = image_clip.set_duration(speeches.duration)

    # サブタイトルクリップを保存するリスト
    subtitle_clips = []
    for i, subtitle in enumerate(subtitles):
        subtitle_clip = TextClip(
            subtitle.content,
            font=f"{os.path.dirname(os.path.abspath(__file__))}/data/NotoSansJP-Regular.otf",
            fontsize=50,
            color="black",
            bg_color="white",
        )
        subtitle_clip = subtitle_clip.set_duration(audio_durations[i + 1]).set_start(
            sum(audio_durations[: i + 1])
        )
        # subtitle_clip = subtitle_clip.set_duration(5).set_start(i * 5)
        subtitle_clip = subtitle_clip.set_position(("center", 0.1), relative=True)
        subtitle_clips.append(subtitle_clip)

    # 画像クリップとサブタイトルクリップを合成
    final_clip = CompositeVideoClip([image_clip] + subtitle_clips)
    # 最終クリップをファイルに書き出す
    video_path = f"{data_path}/video.mp4"
    final_clip.write_videofile(video_path, fps=2)

    with open(video_path, "rb") as video_file:
        base64Video = base64.b64encode(video_file.read()).decode("utf-8")
    return base64Video
