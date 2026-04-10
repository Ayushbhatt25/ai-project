import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SubNavbar = ({ title }) => {
    const navigate = useNavigate();

    return (
        <nav className="fixed top-0 left-0 right-0 z-[100] px-6 py-4 bg-[#020617]/80 backdrop-blur-md border-b border-white/5">
            <div className="max-w-[1850px] mx-auto flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-white hover:text-white/80 transition-colors flex items-center gap-3 cursor-pointer group"
                    >
                        <svg className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="text-2xl font-bold tracking-tight">
                            {title}
                        </span>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default SubNavbar;
