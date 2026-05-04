import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import bgImg from '../assets/bg.png';
import textToImageV2 from '../assets/text-image-v2.png';
import textToVideoV2 from '../assets/text-video-v2.png';
import textToAudioPreview from '../assets/text-audio-v2.png';
import copyrightCheckerV2 from '../assets/copy-check-v2.png';
import copyrightChangerPreview from '../assets/copy-change-v2.png';
import aiSeoPlannerPreview from '../assets/seo-plan-v2.png';
import watermarkRemoverV4 from '../assets/water-remove-v2.png';

import heroWatermark from '../assets/hero-watermark.png';
import heroImage from '../assets/hero-image.png';
import heroVideo from '../assets/hero-video.png';
import heroCopyright from '../assets/hero-copyright.png';

const Home = () => {
    const tools = [
        { title: 'Watermark Remover', img: heroWatermark, size: 'small' },
        { title: 'Text to Image', img: heroImage, size: 'large' },
        { title: 'Text to Video', img: heroVideo, size: 'large' },
        { title: 'Copyright Checker', img: heroCopyright, size: 'small' },
    ];

    const stats = [
        { label: '5,000+ Creators', sub: 'Trusted by Creators', icon: '👥' },
        { label: 'Advanced AI Tools', sub: 'Next-Gen AI tools', icon: '⚙️' },
        { label: 'Fast Turnaround', sub: 'Quick AI Results', icon: '⚡' },
    ];

    const [hoveredTag, setHoveredTag] = useState(null);

    const tags = [
        { label: 'Text to Image', img: textToImageV2 },
        { label: 'Text to Video', img: textToVideoV2 },
        { label: 'Text to Audio', img: textToAudioPreview },
        { label: 'Copyright Checker', img: copyrightCheckerV2 },
        { label: 'SORA AI', img: copyrightChangerPreview },
        { label: 'AI SEO Planner', img: aiSeoPlannerPreview },
        { label: 'Watermark Remover', img: watermarkRemoverV4 },
    ];

    return (
        <div className="min-h-screen bg-[#020617] text-white overflow-x-hidden font-sans selection:bg-purple-500/30">
            {/* Background Image Layer */}
            <div
                className="fixed inset-0 z-0 opacity-100 bg-cover bg-center bg-no-repeat pointer-events-none"
                style={{ backgroundImage: `url(${bgImg})` }}
            ></div>

            {/* Main Hero Section */}
            <div className="relative min-h-screen pt-24 md:pt-16 pb-20 px-6 md:px-8 lg:px-12 z-10">
                <div className="max-w-full grid grid-cols-1 lg:grid-cols-[0.7fr_1.3fr] gap-12 lg:gap-16 items-start pt-5">
                    {/* Left Column: Text & CTA */}
                    <div className="flex flex-col gap-6 relative text-left pt-0 pl-0">
                        <div className="flex flex-col gap-2 relative">
                            {/* AI Halo Effect */}
                            <div className="absolute -top-12 -left-12 w-48 h-48 bg-purple-600/20 blur-[80px] rounded-full pointer-events-none animate-pulse"></div>

                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-[-0.04em] text-white mb-0 z-10">
                                <span className="relative inline-block">
                                    AI
                                    <div className="absolute -inset-6 bg-purple-600/30 rounded-full blur-2xl -z-10"></div>
                                </span> Creative & Copyright
                            </h1>
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-[1.2] tracking-[-0.04em] py-1 z-10">
                                Intelligence Platform
                            </h2>
                        </div>

                        <p className="text-base text-white/50 leading-relaxed max-w-xl z-10 font-normal">
                            Empower your content creation and copyright management with advanced AI.
                        </p>

                        <div className="flex flex-row items-center gap-4 mt-2 z-10 justify-start">
                            <button className="px-8 py-4 rounded-full bg-gradient-to-r from-[#d946ef] to-blue-500 font-medium text-sm md:text-base hover:scale-105 transition-all shadow-[0_0_40px_rgba(217,70,239,0.4)] text-white whitespace-nowrap">
                                Start Free Trial
                            </button>
                            <button className="px-8 py-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-md font-medium text-sm md:text-base hover:bg-white/15 transition-all text-white/60 border-white/20 whitespace-nowrap">
                                View Pricing
                            </button>
                        </div>
                    </div>


                    {/* Right Column: Staggered Grid of Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative lg:mt-0 max-w-[550px] lg:ml-auto w-full">
                        {tools.map((tool, idx) => (
                            <div key={idx} className={`${
                                idx === 1 ? 'lg:translate-y-6' :
                                idx === 3 ? 'lg:translate-y-16' : ''
                            }`}>
                                {tool.title === 'Text to Video' ? (
                                    <Link to="/text-to-video" className="block w-full">
                                        <ToolCard tool={tool} />
                                    </Link>
                                ) : tool.title === 'Watermark Remover' ? (
                                    <Link to="/watermark-remover" className="block w-full">
                                        <ToolCard tool={tool} />
                                    </Link>
                                ) : tool.title === 'Text to Image' ? (
                                    <Link to="/text-to-image" className="block w-full">
                                        <ToolCard tool={tool} />
                                    </Link>
                                ) : tool.title === 'Copyright Checker' ? (
                                    <Link to="/copyright" className="block w-full">
                                        <ToolCard tool={tool} />
                                    </Link>
                                ) : (
                                    <ToolCard tool={tool} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>


                <div className="relative z-10 w-full mt-32 mb-24 py-10 flex justify-center items-center">
                    <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-6 md:gap-10 lg:gap-14">
                        {/* 5,000+ Creators */}
                        <div className="flex items-center gap-4 group">
                            <div className="relative w-8 h-8 flex items-center justify-center">
                                <svg className="w-full h-full text-blue-400 group-hover:scale-110 transition-transform duration-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path className="text-purple-400" d="M23 21V19C22.9993 18.1137 22.7044 17.2522 22.1614 16.5523C21.6184 15.8524 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path className="text-purple-400" d="M16 3.13C16.8647 3.35031 17.6308 3.85544 18.1754 4.5624C18.72 5.26936 19.0119 6.13817 19 7.03C19.0119 7.92183 18.72 8.79064 18.1754 9.4976C17.6308 10.2046 16.8647 10.7097 16 10.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <div className="absolute inset-0 bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[0.9rem] font-semibold text-white/95 group-hover:text-white transition-colors">5,000+ Creators</span>
                                <span className="text-white/40 text-[0.75rem] font-medium tracking-wide">Trusted by Creators</span>
                            </div>
                        </div>

                        {/* Advanced AI Tools */}
                        <div className="flex items-center gap-4 group">
                            <div className="relative w-8 h-8 flex items-center justify-center">
                                <svg className="w-full h-full text-indigo-400 group-hover:rotate-90 transition-transform duration-700" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <div className="absolute inset-0 bg-indigo-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[0.9rem] font-semibold text-white/95 group-hover:text-white transition-colors">Advanced AI Tools</span>
                                <span className="text-white/40 text-[0.75rem] font-medium tracking-wide">Next-Gen AI tools</span>
                            </div>
                        </div>

                        {/* Fast Turnaround */}
                        <div className="flex items-center gap-4 group">
                            <div className="relative w-8 h-8 flex items-center justify-center">
                                <svg className="w-full h-full text-fuchsia-400 group-hover:scale-125 transition-transform duration-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.1" />
                                </svg>
                                <div className="absolute inset-0 bg-fuchsia-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[0.9rem] font-semibold text-white/95 group-hover:text-white transition-colors">Fast Turnaround</span>
                                <span className="text-white/40 text-[0.75rem] font-medium tracking-wide">Quick AI Results</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Categories & Dynamic Preview */}
                <div className="relative z-10 max-w-[1850px] mx-auto px-4 mt-20 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
                    <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center lg:justify-start gap-4 max-w-3xl">
                        {tags.map((tag, idx) => (
                            <div key={idx}>
                                {tag.label === 'Text to Video' ? (
                                    <Link to="/text-to-video" className="block">
                                        <TagButton tag={tag} hoveredTag={hoveredTag} setHoveredTag={setHoveredTag} />
                                    </Link>
                                ) : tag.label === 'Text to Audio' ? (
                                    <Link to="/text-to-audio" className="block">
                                        <TagButton tag={tag} hoveredTag={hoveredTag} setHoveredTag={setHoveredTag} />
                                    </Link>
                                ) : tag.label === 'Watermark Remover' ? (
                                    <Link to="/watermark-remover" className="block">
                                        <TagButton tag={tag} hoveredTag={hoveredTag} setHoveredTag={setHoveredTag} />
                                    </Link>
                                ) : tag.label === 'Text to Image' ? (
                                    <Link to="/text-to-image" className="block">
                                        <TagButton tag={tag} hoveredTag={hoveredTag} setHoveredTag={setHoveredTag} />
                                    </Link>
                                ) : tag.label === 'Copyright Checker' || tag.label === 'Copyright Changer' ? (
                                    <Link to="/copyright" className="block">
                                        <TagButton tag={tag} hoveredTag={hoveredTag} setHoveredTag={setHoveredTag} />
                                    </Link>
                                ) : tag.label === 'AI SEO Planner' ? (
                                    <Link to="/seo-planner" className="block">
                                        <TagButton tag={tag} hoveredTag={hoveredTag} setHoveredTag={setHoveredTag} />
                                    </Link>
                                ) : tag.label === 'SORA AI' ? (
                                    <Link to="/sora-ai" className="block">
                                        <TagButton tag={tag} hoveredTag={hoveredTag} setHoveredTag={setHoveredTag} />
                                    </Link>
                                ) : (
                                    <TagButton tag={tag} hoveredTag={hoveredTag} setHoveredTag={setHoveredTag} />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Tool Preview Card - Premium Neon Glow */}
                    <div className="relative w-full max-w-[500px] lg:ml-auto group lg:-mt-10 mx-auto">
                        {/* Animated outer glow ring */}
                        <div className="absolute -inset-[2px] rounded-[2.1rem] bg-gradient-to-br from-purple-500 via-blue-500 to-pink-500 opacity-60 blur-sm group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
                        <div className="relative w-full aspect-[16/10] rounded-[2rem] overflow-hidden shadow-[0_20px_80px_rgba(139,92,246,0.4)] border border-white/20 backdrop-blur-sm bg-black/40">
                            <img
                                src={hoveredTag ? hoveredTag.img : textToImageV2}
                                className="w-full h-full object-cover transition-all duration-700 ease-in-out scale-100 group-hover:scale-110 brightness-90 group-hover:brightness-100"
                                alt="Preview"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
                            {/* Corner Accents */}
                            <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-purple-400/80 rounded-tl-lg" />
                            <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-blue-400/80 rounded-tr-lg" />
                            <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-pink-400/80 rounded-bl-lg" />
                            <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-purple-400/80 rounded-br-lg" />
                            {/* Bottom label */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white/70 text-xs font-semibold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all duration-300">
                                {hoveredTag ? hoveredTag.label : 'Text to Image'}
                            </div>
                            {/* Shimmer sweep on hover */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] duration-1000" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Global Styles */}
            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 0.2; transform: scale(1); }
                    50% { opacity: 0.3; transform: scale(1.1); }
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .selection\\:bg-purple-500\\/30 ::selection {
                    background: rgba(168, 85, 247, 0.3);
                }
            `}</style>
        </div>
    );
};

const ToolCard = ({ tool }) => (
    <div className="group relative rounded-[1.4rem] overflow-hidden p-[1.5px] w-full h-full shadow-[0_8px_40px_rgba(0,0,0,0.6)] transition-all duration-500 hover:shadow-[0_12px_60px_rgba(139,92,246,0.5)] hover:-translate-y-1">
        {/* Animated gradient border */}
        <div className="absolute inset-0 rounded-[1.4rem] bg-gradient-to-br from-purple-600/60 via-blue-500/30 to-pink-500/40 opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative rounded-[1.3rem] overflow-hidden bg-[#080d24] backdrop-blur-2xl h-full">
            {/* Header */}
            <div className="flex items-center justify-between px-3 pt-2.5 pb-1.5">
                <p className="text-white/80 text-[0.75rem] font-semibold tracking-tight">{tool.title}</p>
                <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-red-500/80" />
                    <span className="w-2 h-2 rounded-full bg-yellow-400/80" />
                    <span className="w-2 h-2 rounded-full bg-green-400/80" />
                </div>
            </div>
            {/* Image */}
            <div className="rounded-[0.9rem] overflow-hidden aspect-video relative border border-white/5 mx-1.5 mb-1.5">
                <img src={tool.img} alt={tool.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out brightness-80 group-hover:brightness-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                {/* Neon bottom edge glow */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            {/* Inner shimmer on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-[1.3rem]" />
        </div>
    </div>
);

const TagButton = ({ tag, hoveredTag, setHoveredTag }) => {
    const isActive = hoveredTag?.label === tag.label;
    return (
        <div className={`relative w-[172px] h-[82px] rounded-[1.2rem] overflow-hidden group/border transition-all duration-500 hover:scale-110 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgba(139,92,246,0.5)] ${isActive ? 'shadow-[0_8px_30px_rgba(139,92,246,0.6)]' : ''}`}>
            {/* Layer 1: Multi-color rotating conic gradient border */}
            <div className={`absolute inset-[-200%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg,#d946ef_0%,#3b82f6_25%,#06b6d4_50%,#d946ef_75%,transparent_80%,transparent_100%)] transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-70'}`} />

            {/* Layer 2: Inner Glass */}
            <div className={`absolute inset-[1.5px] rounded-[1.05rem] backdrop-blur-xl transition-all duration-500 z-0 border border-white/5
                ${isActive
                    ? 'bg-gradient-to-br from-purple-700/40 to-blue-700/30'
                    : 'bg-[#080d24]/90'
                }`}
            />

            {/* Layer 3: Content */}
            <button
                onMouseEnter={() => setHoveredTag(tag)}
                onMouseLeave={() => setHoveredTag(null)}
                className={`relative w-full h-full flex flex-col items-center justify-center text-sm font-semibold tracking-tight text-center leading-tight p-3 z-10 transition-colors ${
                    isActive ? 'text-white' : 'text-white/50 hover:text-white/80'
                }`}
            >
                {tag.label.split(' ').map((word, i) => <div key={i}>{word}</div>)}
                {isActive && (
                    <>
                        <div className="absolute inset-0 bg-purple-500/15 blur-md -z-10 rounded-[1rem] animate-pulse" />
                        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-8 h-[2px] rounded-full bg-gradient-to-r from-purple-400 to-blue-400" />
                    </>
                )}
            </button>
        </div>
    );
};

export default Home;
