FROM python:3.12-slim

WORKDIR /api

COPY requirements.txt .

RUN apt update && apt install -y \
    imagemagick \
    ffmpeg

RUN pip install --no-cache-dir --upgrade -r requirements.txt

COPY . .
