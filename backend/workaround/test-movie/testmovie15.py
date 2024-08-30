from moviepy.editor import ImageClip, AudioFileClip, TextClip, CompositeVideoClip

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
    #image_clip = image_clip.on_color(size=movie_size, color=(255, 100, 255), pos="center")
    
    # 動画の長さを15秒に設定
    video_duration = 15
    image_clip = image_clip.set_duration(video_duration)
    
    # BGMを読み込んで音量を調整
    #bgm = AudioFileClip("maou_bgm_piano25.mp3").volumex(0.1)
    
    
    # サブタイトルクリップを保存するリスト
    subtitle_clips = []

    # スピーチクリップを保存するリスト
    speech_clips = []
    sum_audio_duration = 0
    
    interval = 0

    # 各サブタイトルを処理（表示時間を5秒に設定）
    for i, subtitle in enumerate(subtitles):
        speech_clip = AudioFileClip(f"speech{i}.mp3")
        speech_duration = speech_clip.duration
        
        speech_clip = speech_clip.set_start(sum_audio_duration)

        #bgm = bgm.subclip(0, video_duration)  # BGMの長さを15秒にカット
        image_clip = image_clip.set_audio(speech_clip)
        #speechClip = AudioFileClip("speech0.mp3").volumex(0.2)
        #speech_duration = speechClip.duration
        #speechClip.set_start(i * speech_duration + interval)
        #print(speech_duration)
        #speech_clips.append(speechClip)
        #speech_duration = 5

        subtitle_clip = TextClip(
            subtitle, font="./NotoSansJP-Regular.otf", fontsize=72, color="black", bg_color="white"
        )
        subtitle_clip = subtitle_clip.set_duration(interval + speech_duration).set_start(sum_audio_duration)
        subtitle_clip = subtitle_clip.set_position(("center", 0.1), relative=True)

        #image_clip.set_audio(speechClip)

        subtitle_clips.append(subtitle_clip)

        sum_audio_duration += interval + speech_duration
    
    # 画像クリップとサブタイトルクリップを合成
    final_clip = CompositeVideoClip([image_clip] + subtitle_clips)
    
    # 最終クリップをファイルに書き出す
    final_clip.write_videofile("video.mp4", fps=24)


# 関数を呼び出して15秒の動画を生成
generate_movie("file.jpeg", ["人工知能（AI）は、コンピュータが人間の知能を模倣する能力です。",
    "学習、推論、問題解決、理解、生成などのタスクが含まれます。",
    "AI技術は、医療、金融、製造、交通などで応用されています。"])





"""from moviepy.editor import ImageClip, AudioFileClip, TextClip, CompositeVideoClip

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
    
    # 動画の長さを15秒に設定
    video_duration = 15
    image_clip = image_clip.set_duration(video_duration)
    
    # BGMを読み込んで音量を調整
    bgm = AudioFileClip("maou_bgm_piano25.mp3").volumex(0.25)
    bgm = bgm.subclip(0, video_duration)  # BGMの長さを15秒にカット
    image_clip = image_clip.set_audio(bgm)
    
    # サブタイトルクリップを保存するリスト
    subtitle_clips = []
    
    # 各サブタイトルを処理（表示時間を5秒に設定）
    for i, subtitle in enumerate(subtitles):
        subtitle_clip = TextClip(
            subtitle, font="./NotoSansJP-Regular.otf", fontsize=72, color="black", bg_color="white"
        )
        subtitle_clip = subtitle_clip.set_duration(5).set_start(i * 5)
        subtitle_clip = subtitle_clip.set_position(("center", 0.1), relative=True)
        subtitle_clips.append(subtitle_clip)
    
    # 画像クリップとサブタイトルクリップを合成
    final_clip = CompositeVideoClip([image_clip] + subtitle_clips)
    
    # 最終クリップをファイルに書き出す
    final_clip.write_videofile("video.mp4", fps=24)

# 関数を呼び出して15秒の動画を生成
generate_movie("file.jpeg", ["あああ","かかか","さささ"])"""