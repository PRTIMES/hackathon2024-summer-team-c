from moviepy.editor import ImageClip, AudioFileClip, TextClip, CompositeVideoClip

# Load the image
image_clip = ImageClip("rule99.png")

# Set the desired movie size (e.g., 500x500)
movie_size = (500, 500)

# Pad the image with a white background to fit the movie size
image_clip = image_clip.on_color(size=movie_size, color=(255, 255, 255), pos="center")
image_clip = image_clip.set_duration(30)

# Load the background music and reduce its volume
bgm = AudioFileClip("maou_bgm_piano25.mp3").volumex(0.25)  # Reduce volume to 50%
image_clip = image_clip.set_audio(bgm)

# Create text clips for the subtitles
subtitle1 = TextClip(
    "こんにちは", font="./NotoSansJP-Regular.otf", fontsize=24, color="black", bg_color="white"
)
subtitle1 = subtitle1.set_duration(10).set_start(0)
subtitle1 = subtitle1.set_position(("center", 0.75), relative=True)  # Position 1

subtitle2 = TextClip("Subtitle 2", fontsize=24, color="black", bg_color="white")
subtitle2 = subtitle2.set_duration(10).set_start(10)
subtitle2 = subtitle2.set_position(("center", 0.75), relative=True)  # Position 2

subtitle3 = TextClip("Subtitle 3", fontsize=24, color="black", bg_color="white")
subtitle3 = subtitle3.set_duration(10).set_start(20)
subtitle3 = subtitle3.set_position(("center", 0.75), relative=True)  # Position 3

# Overlay the subtitle on the image clip
final_clip = CompositeVideoClip([image_clip, subtitle1, subtitle2, subtitle3])
final_clip.set_duration(30)

# Write the final clip to a video file
final_clip.write_videofile("video.mp4", fps=24)
