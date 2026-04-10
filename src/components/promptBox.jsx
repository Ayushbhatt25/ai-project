import React, { useState } from 'react';

const PromptBox = () => {
    const [prompt, setPrompt] = useState('');
    const [selectedStyle, setSelectedStyle] = useState('Cinematic');
    const [selectedDuration, setSelectedDuration] = useState('10s');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedVideo, setGeneratedVideo] = useState(null);

    const styles = ['Cinematic', 'Realistic', 'Anime', '3D Render', 'Cyberpunk'];
    const durations = ['5s', '10s', '15s', '30s'];

    const handleGenerate = () => {
        if (!prompt.trim()) return;
        setIsGenerating(true);
        setGeneratedVideo(null);
        // Simulate generation
        setTimeout(() => {
            setGeneratedVideo({
                url: 'https://cdn.pixabay.com/vimeo/327334752/nature-22441.mp4?width=1280&hash=8ff3f1b8a5d3f8a0a1f0a1f0a1f0a1f0a1f0a1f0',
                thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800'
            });
            setIsGenerating(false);
        }, 3500);
    };

    return (
        <div className="w-full max-w-lg bg-[#0d1426]/70 border border-white/10 rounded-[2rem] p-8 text-white shadow-2xl backdrop-blur-2xl">
            <div className="mb-6 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-white/90 tracking-tight font-['Poppins',sans-serif]">Prompt</h2>
                <div className="flex gap-2">
                    <span className="px-2 py-1 bg-white/5 rounded text-[10px] text-white/40 uppercase tracking-widest font-bold">Video Engine v2</span>
                </div>
            </div>
            
            <div className="relative mb-6">
                <textarea 
                    className="w-full min-h-[160px] bg-white/5 border border-white/10 rounded-2xl p-5 text-gray-300 text-base focus:outline-none focus:border-blue-500/50 transition-all resize-none placeholder:text-white/20 leading-relaxed"
                    placeholder="Describe the scene you want to create... (e.g. A futuristic city at sunset with flying cars and neon lights)"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                />
            </div>

            <div className="space-y-6">
                <div className="space-y-3">
                    <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-1">Visual Style</label>
                    <div className="flex flex-wrap gap-2">
                        {styles.map(style => (
                            <button
                                key={style}
                                onClick={() => setSelectedStyle(style)}
                                className={`px-4 py-1.5 rounded-xl text-xs font-medium border transition-all duration-300 ${
                                    selectedStyle === style 
                                    ? 'bg-blue-600/20 border-blue-500/50 text-white shadow-[0_0_15px_rgba(59,130,246,0.2)]' 
                                    : 'bg-white/5 border-white/5 text-white/40 hover:border-white/10 hover:bg-white/10 hover:text-white/60'
                                }`}
                            >
                                {style}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-1">Duration</label>
                    <div className="flex flex-wrap gap-2">
                        {durations.map(duration => (
                            <button
                                key={duration}
                                onClick={() => setSelectedDuration(duration)}
                                className={`px-4 py-1.5 rounded-xl text-xs font-medium border transition-all duration-300 ${
                                    selectedDuration === duration 
                                    ? 'bg-purple-600/20 border-purple-500/50 text-white shadow-[0_0_15px_rgba(168,85,247,0.2)]' 
                                    : 'bg-white/5 border-white/5 text-white/40 hover:border-white/10 hover:bg-white/10 hover:text-white/60'
                                }`}
                            >
                                {duration}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Result Area */}
                {isGenerating && (
                    <div className="mt-4 rounded-2xl border border-white/5 bg-white/5 aspect-video flex flex-col items-center justify-center gap-4 animate-pulse overflow-hidden">
                        <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
                        <span className="text-sm text-white/40 font-medium">Rendering cinematic frames...</span>
                    </div>
                )}

                {generatedVideo && !isGenerating && (
                    <div className="mt-4 rounded-2xl overflow-hidden border border-white/10 aspect-video relative group cursor-pointer shadow-2xl">
                        <img src={generatedVideo.thumbnail} alt="Preview" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white"><path d="M8 5v14l11-7z" /></svg>
                            </div>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                            <span className="px-2 py-1 bg-black/60 backdrop-blur-md rounded text-[10px] text-white/80 font-bold uppercase tracking-wider border border-white/10">HD | {selectedDuration}</span>
                        </div>
                    </div>
                )}

                <div className="pt-2">
                    <button 
                        onClick={handleGenerate}
                        disabled={isGenerating || !prompt.trim()}
                        className="w-full h-14 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100 text-white rounded-2xl text-base font-bold transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 group"
                    >
                        {isGenerating ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                <span>Rendering...</span>
                            </>
                        ) : (
                            <>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5 group-hover:scale-110 transition-transform"><path d="M15 10l5-5v14l-5-5H5V10h10z" /></svg>
                                <span>Generate Video</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PromptBox;

