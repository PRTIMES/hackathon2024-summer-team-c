brew install imagemagick ffmpeg
python3 -m venv .venv
source .venv/bin/activate
export OPENAI_API_KEY=sk-<API_KEY>
export GOOGLE_APPLICATION_CREDENTIALS=<key.json>
uvicorn src.main:app --reload --host 0.0.0.0 --port 80
