"use client";

import React, { useState, ChangeEvent, DragEvent } from "react";

type Props = {
  base64Image: string|null;
  setBase64Image: (value: string|null) => void;
}

export default function DropImageZone({base64Image, setBase64Image}: Props) {
  const [image, setImage] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);

  
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setImageName(file.name); // ファイル名を設定
        setImage(base64); // 画像を表示するためにBase64形式で設定
        setBase64Image(base64); // Base64文字列を保存
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
        const base64 = reader.result as string;
        setImageName(file.name); // ファイル名を設定
        setImage(base64); // 画像を表示するためにBase64形式で設定
        setBase64Image(base64); // Base64文字列を保存
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
    setBase64Image(null); // Base64文字列もリセット
    // ファイル選択ボタンをリセット
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = ""; // ファイル選択ボタンの値をリセット
    }
  };

  return (
    <div>
      <div
        className="relative border-2 border-dashed border-gray-300 rounded-lg text-center w-full h-64"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input
        placeholder="a"
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

      {base64Image && (
        <div className="mt-4">
          <h2 className="text-lg font-medium text-gray-900">Base64形式:</h2>
          <textarea
            placeholder="a"
            className="w-full p-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            rows={6}
            value={base64Image}
            readOnly
          />
        </div>
      )}
    </div>
  );
}
