import React, { useState } from 'react';

const AudioPromptBox = () => {
    const [prompt, setPrompt] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Narration');
    const [selectedVoice, setSelectedVoice] = useState('Male');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedAudio, setGeneratedAudio] = useState(null);

    const categories = ['Story', 'Narration', 'Podcast', 'None'];
    const voices = ['Male', 'Female', 'Deep', 'Calm'];

    const handleGenerate = () => {
        if (!prompt.trim()) return;
        setIsGenerating(true);
        // Simulate generation
        setTimeout(() => {
            setGeneratedAudio({
                url: '#',
                name: 'Generated Podcast.mp3'
            });
            setIsGenerating(false);
        }, 2500);
    };

    return (
        <div className="w-full max-w-lg bg-[#0d1426]/60 border border-white/10 rounded-[2rem] p-8 text-white shadow-2xl backdrop-blur-xl">
            <div className="mb-6 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-white/90 tracking-tight font-['Poppins',sans-serif]">Prompt</h2>
                <div className="flex gap-2">
                    <span className="px-2 py-1 bg-white/5 rounded text-[10px] text-white/40 uppercase tracking-widest font-bold">Audio AI</span>
                </div>
            </div>
            
            <div className="relative mb-6">
                <textarea 
                    className="w-full min-h-[180px] bg-white/5 border border-white/10 rounded-2xl p-5 text-gray-300 text-base focus:outline-none focus:border-purple-500/50 transition-all resize-none placeholder:text-white/20 leading-relaxed"
                    placeholder="Enter your script here... (e.g. Welcome to our podcast, today we explore the future of AI.)"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                />
            </div>

            <div className="space-y-6">
                {/* Categories Row */}
                <div className="space-y-3">
                    <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-1">Category</label>
                    <div className="flex flex-wrap gap-2">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-1.5 rounded-xl text-xs font-medium border transition-all duration-300 ${
                                    selectedCategory === cat 
                                    ? 'bg-purple-600/20 border-purple-500/50 text-white shadow-[0_0_15px_rgba(168,85,247,0.2)]' 
                                    : 'bg-white/5 border-white/5 text-white/40 hover:border-white/10 hover:bg-white/10 hover:text-white/60'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Voice Row */}
                <div className="space-y-3">
                    <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-1">Voice Profile</label>
                    <div className="flex flex-wrap gap-2">
                        {voices.map(voice => (
                            <button
                                key={voice}
                                onClick={() => setSelectedVoice(voice)}
                                className={`px-4 py-1.5 rounded-xl text-xs font-medium border transition-all duration-300 ${
                                    selectedVoice === voice 
                                    ? 'bg-blue-600/20 border-blue-500/50 text-white shadow-[0_0_15px_rgba(59,130,246,0.2)]' 
                                    : 'bg-white/5 border-white/5 text-white/40 hover:border-white/10 hover:bg-white/10 hover:text-white/60'
                                }`}
                            >
                                {voice}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Result / Loading Area */}
                {isGenerating && (
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center gap-4 animate-pulse">
                        <div className="flex gap-1 justify-center items-end h-6">
                            {[0.4, 0.7, 0.5, 0.9, 0.4, 0.6].map((h, i) => (
                                <div key={i} className="w-1 bg-gradient-to-t from-purple-500 to-blue-500 rounded-full animate-bounce" style={{ height: `${h * 100}%`, animationDelay: `${i * 0.1}s` }} />
                            ))}
                        </div>
                        <span className="text-sm text-white/40 font-medium">Synthesizing audio...</span>
                    </div>
                )}

                {generatedAudio && !isGenerating && (
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between group">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-all">
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-1"><path d="M8 5v14l11-7z" /></svg>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-white/80">{generatedAudio.name}</p>
                                <p className="text-[10px] text-white/30 uppercase tracking-tighter">Ready to download</p>
                            </div>
                        </div>
                        <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-white/40"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>
                        </button>
                    </div>
                )}

                {/* Generate Button */}
                <div className="pt-2">
                    <button 
                        onClick={handleGenerate}
                        disabled={isGenerating || !prompt.trim()}
                        className="w-full h-14 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100 text-white rounded-2xl text-base font-bold transition-all shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2 group"
                    >
                        {isGenerating ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                <span>Generating...</span>
                            </>
                        ) : (
                            <>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5 group-hover:rotate-12 transition-transform"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z" /></svg>
                                <span>Generate Audio</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AudioPromptBox;

