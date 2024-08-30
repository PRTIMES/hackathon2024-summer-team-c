from moviepy.editor import (
    ImageClip,
    AudioFileClip,
    TextClip,
    CompositeVideoClip,
    CompositeAudioClip,
    concatenate_audioclips
)

def generate_movie(image_path: str, background_path: str, subtitles: list):
    # 動画のサイズを指定（例: 1080x1920）
    #movie_size = (1080, 1920)

    # 背景画像を読み込む
    background_clip = ImageClip(background_path)

    # 背景画像を動画の縦幅のみを基準にリサイズ、横幅などの調整を行った際、どうしても綺麗にならないのでこうしている。アスペクト比率がこれよりも横が大きい場合は修正が必要
    background_clip = background_clip.resize(height=1920)  # 縦幅を基準にリサイズ
    # if background_clip.w > 1080:  # 横幅が超えている場合は横幅も調整
    #     background_clip = background_clip.resize(width=1080)

    # 画像を読み込む
    image_clip = ImageClip(image_path)

    # 画像を動画の横幅に合わせてリサイズし、縦幅が超えている場合は縦幅も調整
    image_clip = image_clip.resize(width=1080)  # 横幅を基準にリサイズ
    if image_clip.h > 1920:  # 縦幅が超えている場合は縦幅も調整
        image_clip = image_clip.resize(height=1920)

    # 画像を指定したサイズに背景色でパッドする
    #image_clip = image_clip.on_color(size=(1080,1920), color=(255, 255, 255), pos="center")

    # サブタイトル用のオーディオクリップを生成
    audio_clips = [AudioFileClip(f"speech{i}.mp3") for i in range(len(subtitles))]
    audio_durations = [audio_clip.duration for audio_clip in audio_clips]
    audio_durations = [0] + audio_durations  # 最初の要素を0にしておく
    speeches = concatenate_audioclips(audio_clips)

    # 画像クリップに音声を追加し、持続時間を設定
    image_clip = image_clip.set_audio(speeches)
    image_clip = image_clip.set_duration(speeches.duration)

    # 背景クリップに音声を追加し、持続時間を設定
    background_clip = background_clip.set_audio(speeches)
    background_clip = background_clip.set_duration(speeches.duration)

    # サブタイトルクリップを保存するリスト
    subtitle_clips = []
    for i, subtitle in enumerate(subtitles):
        subtitle_clip = TextClip(
            subtitle, font="./NotoSansJP-Regular.otf", fontsize=35, color="white"
        )
        subtitle_clip = subtitle_clip.set_duration(audio_durations[i + 1]).set_start(
            sum(audio_durations[:i + 1])
        )
        subtitle_clip = subtitle_clip.set_position(("center", 0.1), relative=True)
        subtitle_clips.append(subtitle_clip)

    # 画像クリップとサブタイトルクリップを合成
    final_clip = CompositeVideoClip([background_clip, image_clip.set_position("center")] + subtitle_clips, size = (1080,1920))

    # 最終クリップをファイルに書き出す
    final_clip.write_videofile("video.mp4", fps=2)

# 関数を呼び出して動画を生成
generate_movie(
    "file.jpeg", "aogurade-tx2.png", 
    [
        "人工知能（AI）は、コンピュータが人間の知能を模倣する能力です。",
        "学習、推論、問題解決、理解、生成などのタスクが含まれます。",
        "AI技術は、医療、金融、製造、交通などで応用されています。",
    ]
)