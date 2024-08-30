export default function Header() {
  return (
    <header className="relative bg-white h-20 flex items-center justify-start px-8">
      <div className="flex items-center">
        {/* AIを連想させる新しいロゴ */}
        <div className="mr-4">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="10" fill="black" />
            <text
              x="12"
              y="16"
              textAnchor="middle"
              fill="white"
              fontSize="15"
              fontFamily="Arial, sans-serif"
              fontWeight="bold"
            >
              AI
            </text>
          </svg>
        </div>

        {/* タイトル */}
        <h1 className="font-sans text-3xl text-black text-4xl">
          Generate.
        </h1>
      </div>
    </header>
  );
}
