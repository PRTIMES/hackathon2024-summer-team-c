import json
import requests

# POSTするデータ
article = {
    "title":"タイトル",
    "subtitle":"サブタイトル",
    "content": "内容"
    }

# データをJSONに変換
json_data = json.dumps(article)

# POSTメソッドでリクエストを送信、データはjsonパラメータに指定
response = requests.post(
    "http://127.0.0.1:8000/subtitles", 
    data=json_data,
    headers={"Content-Type": "application/json"}
)

print(response.status_code)
print(response.text)


# サブタイトルのリストをPOSTする
subtitles = {
    "subtitles": [
        "サブタイトル1",
        "サブタイトル2",
        "サブタイトル3"
    ]
}

# データをJSONに変換
json_data = json.dumps(subtitles)

# POSTメソッドでリクエストを送信、データはjsonパラメータに指定
response = requests.post(
    "http://127.0.0.1:8000/video/",
    data=json_data,
    headers={"Content-Type": "application/json"}
)

print("\nResponse for video endpoint:")
print(response.status_code)
print(response.json())

