export default function Subtitle() {
    return (
        <div className="video-container flex flex-col items-center justify-center min-h-screen">
            <label
          htmlFor="article-title"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
            字幕の編集
            </label>
            <input
            id="article-title"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="You can modify your subtitle..."
            ></input>
        </div>
    )
}
