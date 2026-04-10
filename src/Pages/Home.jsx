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
            <div className="relative min-h-screen pt-16 pb-20 px-8 lg:px-12 z-10">
                <div className="max-w-full grid lg:grid-cols-[0.7fr_1.3fr] gap-12 lg:gap-16 items-start pt-5">
                    {/* Left Column: Text & CTA */}
                    <div className="flex flex-col gap-6 relative text-left pt-0 pl-0">
                        <div className="flex flex-col gap-2 relative">
                            {/* AI Halo Effect */}
                            <div className="absolute -top-12 -left-12 w-48 h-48 bg-purple-600/20 blur-[80px] rounded-full pointer-events-none animate-pulse"></div>

                            <h1 className="text-3xl md:text-3xl lg:text-3xl font-bold leading-[1.02] tracking-[-0.04em] text-white mb-0 z-10 whitespace-nowrap">
                                <span className="relative inline-block">
                                    AI
                                    <div className="absolute -inset-6 bg-purple-600/30 rounded-full blur-2xl -z-10"></div>
                                </span> Creative & Copyright
                            </h1>
                            <h2 className="text-3xl md:text-3xl lg:text-3xl font-medium bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-[1.1] tracking-[-0.04em] py-1 z-10 whitespace-nowrap">
                                Intelligence Platform
                            </h2>
                        </div>

                        <p className="text-base text-white/50 leading-relaxed max-w-xl z-10 font-normal">
                            Empower your content creation and copyright management with advanced AI .
                        </p>

                        <div className="flex flex-row items-center gap-4 mt-0.5 z-10 justify-start whitespace-nowrap">
                            <button className="min-w-[152px] px-8 py-4 rounded-full bg-gradient-to-r from-[#d946ef] to-blue-500 font-medium text-base hover:scale-105 transition-all shadow-[0_0_40px_rgba(217,70,239,0.4)] text-white">
                                Start Free Trial
                            </button>
                            <button className="min-w-[152px] px-8 py-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-md font-medium text-base hover:bg-white/15 transition-all text-white/60 border-white/20">
                                View Pricing
                            </button>
                        </div>
                    </div>


                    {/* Right Column: Staggered Grid of Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative lg:mt-0 max-w-[550px] lg:ml-auto">
                        {tools.map((tool, idx) => (
                            <div key={idx} className={`${idx % 2 !== 0 ? 'lg:translate-y-6' : ''}`}>
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


                {/* Stats Section: Modern Horizontal Row */}
                <div className="relative z-10 max-w-full mt-16 pt-0 ml-40">
                    <div className="flex flex-wrap items-center justify-start gap-16 lg:gap-32">
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
                <div className="relative z-10 max-w-[1850px] mx-auto px-4 mt-20 grid lg:grid-cols-[1.2fr_0.8fr] gap-16 items-center">
                    <div className="flex flex-wrap gap-4 max-w-3xl">
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

                    {/* Tool Preview Card - Clean & Interactive */}
                    <div className="relative w-full max-w-[500px] ml-auto group -mt-10">
                        <div className="relative w-full aspect-[16/10] rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 backdrop-blur-sm bg-white/[0.02]">
                            <img
                                src={hoveredTag ? hoveredTag.img : textToImageV2}
                                className="w-full h-full object-cover transition-all duration-700 ease-in-out scale-100 group-hover:scale-105"
                                alt="Preview"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                            {/* Accent Glow */}
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-500/10 blur-[60px] rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Global Styles */}
            <style jsx>{`
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
    <div className="group relative rounded-[1.2rem] overflow-hidden border border-white/10 backdrop-blur-2xl bg-[#ffffff02] p-1.5 transition-all hover:border-white/30 hover:bg-white/10 shadow-2xl w-full h-full">
        <p className="text-white/80 text-[0.8rem] font-medium mb-1.5 ml-3 tracking-tight text-center">{tool.title}</p>
        <div className="rounded-[1rem] overflow-hidden aspect-video relative border border-white/5 bg-black/40">
            <img src={tool.img} alt={tool.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out opacity-90 group-hover:opacity-100" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        </div>
    </div>
);

const TagButton = ({ tag, hoveredTag, setHoveredTag }) => (
    <div className="relative w-[172px] h-[82px] rounded-[1.2rem] overflow-hidden group/border transition-all duration-500 hover:scale-110 hover:-translate-y-2">
        {/* Layer 1: Rotating Magenta Border Layer (Hidden on hover) */}
        <div className={`absolute inset-[-200%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,#d946ef,transparent_30%,transparent_100%)] transition-opacity duration-300 ${hoveredTag?.label === tag.label ? 'opacity-0' : 'opacity-100'}`}></div>

        {/* Layer 2: Inner Glass Cutout - Hollowing out the center */}
        <div className={`absolute inset-[1px] rounded-[1.1rem] backdrop-blur-xl transition-all duration-500 z-0
            ${hoveredTag?.label === tag.label
                ? 'bg-purple-600/30'
                : 'bg-white/[0.05]'
            }`}
        ></div>

        {/* Layer 3: Content Button */}
        <button
            onMouseEnter={() => setHoveredTag(tag)}
            onMouseLeave={() => setHoveredTag(null)}
            className="relative w-full h-full flex flex-col items-center justify-center text-sm font-semibold tracking-tight text-center leading-tight p-3 z-10 transition-colors text-white/50 hover:text-white"
        >
            {tag.label.split(' ').map((word, i) => <div key={i}>{word}</div>)}
            {hoveredTag?.label === tag.label && (
                <div className="absolute inset-0 bg-purple-500/10 blur-xl -z-10 rounded-full animate-pulse"></div>
            )}
        </button>
    </div>
);

export default Home;
