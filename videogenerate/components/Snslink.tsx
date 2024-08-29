import { FaYoutube, FaTiktok, FaInstagram } from 'react-icons/fa';

export default function Snslink() {
    return (
        <div className="video-container">
            <a className="flex items-center text-red-600 text-lg font-medium hover:underline" href="https://www.youtube.com/?gl=JP&hl=ja&app=desktop">
                <FaYoutube className="mr-2 text-red-600" /> Youtube Short
            </a>
            <a className="flex items-center text-black text-lg font-medium hover:underline" href="https://www.tiktok.com/ja-JP/">
                <FaTiktok className="mr-2 text-black" /> TikTok
            </a>
            <a className="flex items-center text-pink-500 text-lg font-medium hover:underline" href="https://www.instagram.com/">
                <FaInstagram className="mr-2 text-pink-500" /> Instagram Reels
            </a>
        </div>
    )
}