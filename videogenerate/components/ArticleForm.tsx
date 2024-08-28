export default function ArticleForm() {
  return (
    <div>
      <form className="max-w-sm mx-auto">
        <label
          htmlFor="article-title"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          記事のタイトル
        </label>
        <input
          id="article-title"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Leave a comment..."
        ></input>
        <label
          htmlFor="article-body"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          記事の内容
        </label>
        <textarea
          id="article-body"
          rows={4}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Leave a comment..."
        ></textarea>
        <label
          htmlFor="article-title"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          記事のサムネイル
        </label>
        <input
          id="article-title"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Leave a comment..."
        ></input>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          生成
        </button>
      </form>
    </div>
  );
}
