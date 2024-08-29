"use client";
import React, { useState, ChangeEvent, DragEvent } from "react";

export default function DropImageZone() {
  const [image, setImage] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);

  // ファイルが選択された時の処理
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageName(file.name); // ファイル名を設定
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // ドラッグ＆ドロップの処理
  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageName(file.name); // ファイル名を設定
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // ドラッグオーバー時の処理
  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  // 画像のキャンセル処理
  const handleCancel = () => {
    setImage(null);
    setImageName(null);
    // ファイル選択ボタンをリセット
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = ""; // ファイル選択ボタンの値をリセット
    }
  };

  return (
    <div
      className="relative border-2 border-dashed border-gray-300 rounded-lg text-center w-full h-64"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-2"
      />
      <p>ここに画像をドラッグ＆ドロップするか、ファイルを選択してください。</p>

      {image && (
        <div className="relative w-full h-full overflow-hidden">
          <img
            src={image}
            alt="Uploaded"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute bottom-2 left-2 bg-white bg-opacity-75 px-2 py-1 rounded-lg flex items-center">
            <span className="mr-2">{imageName}</span>
            <button
              onClick={handleCancel}
              className="text-red-500 hover:text-red-700"
            >
              キャンセル
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
