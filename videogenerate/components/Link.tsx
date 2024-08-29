import { FaYoutube, FaTiktok, FaInstagram } from 'react-icons/fa';

export default function Link() {
    return (
        <div className="video-container flex flex-col items-center justify-center min-h-screen bg-gray-50 space-y-4">
            <a className="flex items-center text-blue-500 text-lg font-medium hover:underline" href="https://www.youtube.com/?gl=JP&hl=ja&app=desktop">
                <FaYoutube className="mr-2" /> Youtube Short
            </a>
            <a className="flex items-center text-blue-500 text-lg font-medium hover:underline" href="https://www.tiktok.com/ja-JP/">
                <FaTiktok className="mr-2" /> TikTok
            </a>
            <a className="flex items-center text-blue-500 text-lg font-medium hover:underline" href="https://www.instagram.com/">
                <FaInstagram className="mr-2" /> Instagram Reels
            </a>
        </div>
    )
}
