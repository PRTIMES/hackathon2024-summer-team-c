from moviepy.editor import (
    ImageClip,
    AudioFileClip,
    TextClip,
    CompositeVideoClip,
    CompositeAudioClip,
    concatenate_audioclips,
)


def generate_movie(image_path: str, subtitles: list):
    # 画像を読み込む
    image_clip = ImageClip(image_path)

    # 動画のサイズを指定（例: 1080x1920）
    movie_size = (1080, 1920)

    # 画像のアスペクト比を維持しつつ、動画サイズに合わせる
    image_clip = image_clip.resize(height=movie_size[1])  # 高さを基準にリサイズ
    if image_clip.w > movie_size[0]:  # 幅が超えている場合は幅も調整
        image_clip = image_clip.resize(width=movie_size[0])

    # 画像を指定したサイズに背景色でパッドする
    image_clip = image_clip.on_color(size=movie_size, color=(255, 100, 255), pos="center")

    audio_clips = [AudioFileClip(f"speech{i}.mp3") for i in range(len(subtitles))]
    audio_durations = [audio_clip.duration for audio_clip in audio_clips]
    audio_durations = [0] + audio_durations  # 最初の要素を0にしておく
    speeches = concatenate_audioclips(audio_clips)

    image_clip = image_clip.set_audio(speeches)
    image_clip = image_clip.set_duration(speeches.duration)

    # サブタイトルクリップを保存するリスト
    subtitle_clips = []
    for i, subtitle in enumerate(subtitles):
        subtitle_clip = TextClip(
            subtitle, font="./NotoSansJP-Regular.otf", fontsize=35, color="black", bg_color="white"
        )
        subtitle_clip = subtitle_clip.set_duration(audio_durations[i + 1]).set_start(
            sum(audio_durations[:i])
        )
        # subtitle_clip = subtitle_clip.set_duration(5).set_start(i * 5)
        subtitle_clip = subtitle_clip.set_position(("center", 0.1), relative=True)
        subtitle_clips.append(subtitle_clip)

    # 画像クリップとサブタイトルクリップを合成
    final_clip = CompositeVideoClip([image_clip] + subtitle_clips)
    # 最終クリップをファイルに書き出す
    final_clip.write_videofile("video.mp4", fps=24)


# 関数を呼び出して15秒の動画を生成
generate_movie(
    "file.jpeg",
    [
        "人工知能（AI）は、コンピュータが人間の知能を模倣する能力です。",
        "学習、推論、問題解決、理解、生成などのタスクが含まれます。",
        "AI技術は、医療、金融、製造、交通などで応用されています。",
    ],
)


# def generate_movie_with_bgm(image_path: str, subtitles: list):
#     # 画像を読み込む
#     image_clip = ImageClip(image_path)

#     # 動画のサイズを指定（例: 1080x1920）
#     movie_size = (1080, 1920)

#     # 画像のアスペクト比を維持しつつ、動画サイズに合わせる
#     image_clip = image_clip.resize(height=movie_size[1])  # 高さを基準にリサイズ
#     if image_clip.w > movie_size[0]:  # 幅が超えている場合は幅も調整
#         image_clip = image_clip.resize(width=movie_size[0])

#     # 画像を指定したサイズに背景色でパッドする
#     image_clip = image_clip.on_color(size=movie_size, color=(255, 100, 255), pos="center")

#     audio_clips = [AudioFileClip(f"speech{i}.mp3") for i in range(len(subtitles))]
#     audio_durations = [audio_clip.duration for audio_clip in audio_clips]
#     audio_durations = [0] + audio_durations  # 最初の要素を0にしておく
#     speeches = concatenate_audioclips(audio_clips)

#     # BGMを読み込んで音量を調整
#     bgm = AudioFileClip("maou_bgm_piano25.mp3").volumex(0.1)
#     bgm = bgm.subclip(0, speeches.duration)  # BGMの長さをスピーチの長さにカット

#     final_audio = CompositeAudioClip([speeches, bgm])

#     image_clip = image_clip.set_audio(final_audio)

#     image_clip = image_clip.set_duration(speeches.duration)

#     # サブタイトルクリップを保存するリスト
#     subtitle_clips = []

#     # 各サブタイトルを処理（表示時間を5秒に設定）
#     for i, subtitle in enumerate(subtitles):
#         subtitle_clip = TextClip(
#             subtitle, font="./NotoSansJP-Regular.otf", fontsize=35, color="black", bg_color="white"
#         )
#         subtitle_clip = subtitle_clip.set_duration(audio_durations[i + 1]).set_start(
#             sum(audio_durations[:i])
#         )
#         # subtitle_clip = subtitle_clip.set_duration(5).set_start(i * 5)
#         subtitle_clip = subtitle_clip.set_position(("center", 0.1), relative=True)

#         subtitle_clips.append(subtitle_clip)

#     # 画像クリップとサブタイトルクリップを合成
#     final_clip = CompositeVideoClip([image_clip] + subtitle_clips)

#     # 最終クリップをファイルに書き出す
#     final_clip.write_videofile("video.mp4", fps=24)