import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Seoplanner.css';

const Seoplanner = () => {
    const navigate = useNavigate();
    const [view, setView] = useState('input'); // input, loading, result
    const [formData, setFormData] = useState({
        keyword: 'Digital Marketing Strategy',
        audience: 'All Audiences',
        platform: 'YouTube'
    });

    const handleGenerate = () => {
        setView('loading');
        setTimeout(() => {
            setView('result');
        }, 2500);
    };

    const contentIdeas = [
        { text: "Best AI Tools for Social Media Marketing" },
        { text: "AI prompts for writing viral Instagram captions" },
        { text: "AI tools to automate business tasks" }
    ];

    const keywords = [
        { name: "Digital Marketing", volume: "400K" },
        { name: "Seo Optimization", volume: "210K" },
        { name: "Online Strategy", volume: "600K" },
        { name: "Content Marketing", volume: "200K" }
    ];

    const suggestedTitles = [
        { text: "10 Proven SEO Growth Hacks", type: "check" },
        { text: "How to Rank on Google Fast", type: "star" },
        { text: "Best Digital Marketing Strategy in 2026", type: "chat" }
    ];

    if (view === 'input') {
        return (
            <div className="seo-planner-container">
      <header className="flex items-center gap-[10px] px-6 py-3 border-b border-[#4f8fff]/15 backdrop-blur-md bg-[#060d1f]/45 shrink-0 z-50">
        <div 
          className="cursor-pointer hover:scale-110 active:scale-90 transition-transform" 
          onClick={() => navigate(-1)}
        >
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </div>
        <span className="font-bold text-lg md:text-xl tracking-tight text-[#e8f0ff]">AI SEO Planner</span>
      </header>

                <div className="input-view-container">
                    <div className="input-card glass">
                        <h2>Create SEO Plan</h2>
                        
                        <div className="form-group">
                            <label>Keyword / Topic</label>
                            <textarea 
                                value={formData.keyword}
                                onChange={(e) => setFormData({...formData, keyword: e.target.value})}
                                placeholder="Enter keyword or topic..."
                                className="glass-input"
                            />
                        </div>

                        <div className="form-group">
                            <label>Audience</label>
                            <div className="glass-select-wrapper">
                                <select 
                                    className="glass-select"
                                    value={formData.audience}
                                    onChange={(e) => setFormData({...formData, audience: e.target.value})}
                                >
                                    <option>All Audiences</option>
                                    <option>Beginners</option>
                                    <option>Experts</option>
                                    <option>Business Owners</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Target Platform</label>
                            <div className="platform-chips">
                                {['YouTube', 'Blog', 'Website'].map(p => (
                                    <button 
                                        key={p} 
                                        className={`platform-chip ${formData.platform === p ? 'active' : ''}`}
                                        onClick={() => setFormData({...formData, platform: p})}
                                    >
                                        {p}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button className="generate-main-btn" onClick={handleGenerate}>
                            Generate
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (view === 'loading') {
        return (
            <div className="seo-planner-container loading-view">
                <div className="loading-content">
                    <div className="loading-spinner"></div>
                    <h2>Generating SEO Strategy...</h2>
                    <p>Brewing some viral content ideas for you.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="seo-planner-container">
            <header className="flex items-center gap-[10px] px-6 py-3 border-b border-[#4f8fff]/15 backdrop-blur-md bg-[#060d1f]/45 shrink-0 z-50">
                <div 
                    className="cursor-pointer hover:scale-110 active:scale-90 transition-transform" 
                    onClick={() => setView('input')}
                >
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </div>
                <span className="font-bold text-lg md:text-xl tracking-tight text-[#e8f0ff]">AI SEO Planner</span>
            </header>

            <div className="planner-grid">
                {/* AI Content Ideas */}
                <section className="section content-ideas glass">
                    <h2>AI Content Ideas</h2>
                    <div className="ideas-grid">
                        {contentIdeas.map((idea, idx) => (
                            <div key={idx} className="idea-card glass-inner">
                                <p>{idea.text}</p>
                                <div className="card-actions">
                                    <button title="Copy"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg></button>
                                    <button title="Download"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="main-content-row">
                    {/* Keyword Suggestions */}
                    <section className="section keywords-section glass">
                        <h2>Keyword Suggestions</h2>
                        <div className="keywords-table">
                            <div className="table-header">
                                <span>Keyword</span>
                                <span>Search Volume</span>
                            </div>
                            {keywords.map((kw, idx) => (
                                <div key={idx} className="table-row">
                                    <span className="kw-name">{kw.name}</span>
                                    <span className="kw-vol">{kw.volume}</span>
                                    <button className="generate-btn">Generate</button>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Suggested Titles & SEO Score */}
                    <div className="right-panel">
                        <section className="section suggested-titles glass">
                            <div className="titles-header">
                                <h2>Suggested Titles</h2>
                                <div className="seo-score-container">
                                    <div className="score-circle">
                                      <svg viewBox="0 0 36 36" className="circular-chart">
                                        <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                        <path className="circle" strokeDasharray="92, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                        <text x="18" y="20.35" className="percentage">92%</text>
                                      </svg>
                                    </div>
                                    <span className="score-label">SEO Score</span>
                                </div>
                            </div>
                            <div className="titles-list glass-inner">
                                {suggestedTitles.map((title, idx) => (
                                    <div key={idx} className="title-item">
                                        <span className={`icon ${title.type}`}>
                                            {title.type === 'check' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                                            {title.type === 'star' && <svg width="16" height="16" viewBox="0 0 24 24" fill="#818cf8" stroke="#818cf8"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>}
                                            {title.type === 'chat' && <svg width="16" height="16" viewBox="0 0 24 24" fill="#fb7185" stroke="#fb7185"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>}
                                        </span>
                                        <p>{title.text}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Explore Topics */}
                        <div className="explore-topics">
                            <h3>Explore Topics</h3>
                            <div className="topic-cards">
                                <div className="topic-card glass">
                                    <div className="topic-icon purple">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                                    </div>
                                    <div className="topic-info">
                                        <span className="topic-title">Beginner Guide</span>
                                    </div>
                                </div>
                                <div className="topic-card glass">
                                    <div className="topic-icon pink">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
                                    </div>
                                    <div className="topic-info">
                                        <span className="topic-title">Tools & Tips</span>
                                    </div>
                                </div>
                                <div className="topic-card glass">
                                    <div className="topic-icon violet">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                                    </div>
                                    <div className="topic-info">
                                        <span className="topic-title">Trends 2026</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Row */}
                <div className="bottom-row">
                    <section className="section hook-section glass">
                        <h3>Hook</h3>
                        <div className="hook-content">
                            <p>Stop wasting hours on content-let AI do it</p>
                            <button className="copy-btn-small">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                            </button>
                        </div>
                    </section>

                    <section className="section hashtags-section glass">
                        <h3>Hashtags</h3>
                        <div className="hashtags-content">
                            <p>#DigitalMarketing #AITools #ContentCreation</p>
                            <button className="copy-btn-small">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Seoplanner;
