"use client";
import React, { useState, ChangeEvent, DragEvent } from "react";

export default function DropImageZone() {
  const [image, setImage] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);

  // ファイルが選択された時の処理
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
            className="w-full p-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            rows={6}
            value={base64Image}
            readOnly
          />
        </div>
      )}

      <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAzOTQgODAiPjxwYXRoIGZpbGw9IiMwMDAiIGQ9Ik0yNjIgMGg2OC41djEyLjdoLTI3LjJ2NjYuNmgtMTMuNlYxMi43SDI2MlYwWk0xNDkgMHYxMi43SDk0djIwLjRoNDQuM3YxMi42SDk0djIxaDU1djEyLjZIODAuNVYwaDY4Ljd6bTM0LjMgMGgtMTcuOGw2My44IDc5LjRoMTcuOWwtMzItMzkuNyAzMi0zOS42aC0xNy45bC0yMyAyOC42LTIzLTI4LjZ6bTE4LjMgNTYuNy05LTExLTI3LjEgMzMuN2gxNy44bDE4LjMtMjIuN3oiLz48cGF0aCBmaWxsPSIjMDAwIiBkPSJNODEgNzkuMyAxNyAwSDB2NzkuM2gxMy42VjE3bDUwLjIgNjIuM0g4MVptMjUyLjYtLjRjLTEgMC0xLjgtLjQtMi41LTFzLTEuMS0xLjYtMS4xLTIuNi4zLTEuOCAxLTIuNSAxLjYtMSAyLjYtMSAxLjguMyAyLjUgMWEzLjQgMy40IDAgMCAxIC42IDQuMyAzLjcgMy43IDAgMCAxLTMgMS44em0yMy4yLTMzLjVoNnYyMy4zYzAgMi4xLS40IDQtMS4zIDUuNWE5LjEgOS4xIDAgMCAxLTMuOCAzLjVjLTEuNi44LTMuNSAxLjMtNS43IDEuMy0yIDAtMy43LS40LTUuMy0xcy0yLjgtMS44LTMuNy0zLjJjLS45LTEuMy0xLjQtMy0xLjQtNWg2Yy4xLjguMyAxLjYuNyAyLjJzMSAxLjIgMS42IDEuNWMuNy40IDEuNS41IDIuNC41IDEgMCAxLjgtLjIgMi40LS42YTQgNCAwIDAgMCAxLjYtMS44Yy4zLS44LjUtMS44LjUtM1Y0NS41em0zMC45IDkuMWE0LjQgNC40IDAgMCAwLTItMy4zIDcuNSA3LjUgMCAwIDAtNC4zLTEuMWMtMS4zIDAtMi40LjItMy4zLjUtLjkuNC0xLjYgMS0yIDEuNmEzLjUgMy41IDAgMCAwLS4zIDRjLjMuNS43LjkgMS4zIDEuMmwxLjggMSAyIC41IDMuMi44YzEuMy4zIDIuNS43IDMuNyAxLjJhMTMgMTMgMCAwIDEgMy4yIDEuOCA4LjEgOC4xIDAgMCAxIDMgNi41YzAgMi0uNSAzLjctMS41IDUuMWExMCAxMCAwIDAgMS00LjQgMy41Yy0xLjguOC00LjEgMS4yLTYuOCAxLjItMi42IDAtNC45LS40LTYuOC0xLjItMi0uOC0zLjQtMi00LjUtMy41YTEwIDEwIDAgMCAxLTEuNy01LjZoNmE1IDUgMCAwIDAgMy41IDQuNmMxIC40IDIuMi42IDMuNC42IDEuMyAwIDIuNS0uMiAzLjUtLjYgMS0uNCAxLjgtMSAyLjQtMS43YTQgNCAwIDAgMCAuOC0yLjRjMC0uOS0uMi0xLjYtLjctMi4yYTExIDExIDAgMCAwLTIuMS0xLjRsLTMuMi0xLTMuOC0xYy0yLjgtLjctNS0xLjctNi42LTMuMmE3LjIgNy4yIDAgMCAxLTIuNC01LjcgOCA4IDAgMCAxIDEuNy01IDEwIDEwIDAgMCAxIDQuMy0zLjVjMi0uOCA0LTEuMiA2LjQtMS4yIDIuMyAwIDQuNC40IDYuMiAxLjIgMS44LjggMy4yIDIgNC4zIDMuNCAxIDEuNCAxLjUgMyAxLjUgNWgtNS44eiIvPjwvc3ZnPg==" alt="SVG Image"/>

    </div>
  );
}
