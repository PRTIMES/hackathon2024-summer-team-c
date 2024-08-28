from moviepy.editor import ImageClip, AudioFileClip, TextClip, CompositeVideoClip

def generate_movie(image_path: str, subtitles: list):
    # 画像を読み込む
    image_clip = ImageClip(image_path)

    # 動画のサイズを指定（例: 500x500）
    movie_size = (1080, 1920)

    # 画像のアスペクト比を維持しつつ、動画サイズに合わせる
    image_clip = image_clip.resize(height=movie_size[1])  # 高さを基準にリサイズ
    if image_clip.w > movie_size[0]:  # 幅が超えている場合は幅も調整
        image_clip = image_clip.resize(width=movie_size[0])

    # 画像を指定したサイズに白背景でパッドする
    image_clip = image_clip.on_color(size=movie_size, color=(255, 100, 255), pos="center")
    
    # 各字幕ごとに10秒の長さを設定
    image_clip = image_clip.set_duration(len(subtitles) * 10)
    
    # BGMを読み込んで音量を調整
    bgm = AudioFileClip("maou_bgm_piano25.mp3").volumex(0.25)
    image_clip = image_clip.set_audio(bgm)
    
    # サブタイトルクリップを保存するリスト
    subtitle_clips = []
    
    # 各サブタイトルを処理
    for i, subtitle in enumerate(subtitles):
        subtitle_clip = TextClip(
            subtitle, font="./NotoSansJP-Regular.otf", fontsize=72, color="black", bg_color="white"
        )
        subtitle_clip = subtitle_clip.set_duration(10).set_start(i * 10)
        subtitle_clip = subtitle_clip.set_position(("center", 0.75), relative=True)
        subtitle_clips.append(subtitle_clip)
    
    # 画像クリップとサブタイトルクリップを合成
    final_clip = CompositeVideoClip([image_clip] + subtitle_clips)
    
    # 最終クリップをファイルに書き出す
    final_clip.write_videofile("video.mp4", fps=24)

# 関数を呼び出して動画を生成
generate_movie("rule99.png", ["ああああ", "かかかか", "ささささ", "タタタタ", "ナナナナ", "ママママ"])
