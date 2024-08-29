import DropImageZone from "./DropImageZone";

export default function ArticleForm() {
  return (
    <div>
      <form className="max-w-sm mx-auto">
        <label
          htmlFor="article-title"
          className="block my-2.5 text-sm font-medium text-gray-900 dark:text-white"
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
          className="block my-2.5 text-sm font-medium text-gray-900 dark:text-white"
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
          className="block my-2.5 text-sm font-medium text-gray-900 dark:text-white"
        >
          記事のサムネイル
        </label>
        {/* <input
          id="article-title"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Leave a comment..."
        ></input> */}

        <DropImageZone />

        <div className="flex justify-center mt-4">
          <button
            type="button"
            className="text-white bg-[#317EC6] hover:bg-[#2163a8] focus:ring-2 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5"
          >
            生成
          </button>
        </div>
      </form>
    </div>
  );
}
