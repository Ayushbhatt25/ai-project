import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import aiAvatar from '../assets/ai-avatar.png';

const Navbar = () => {
    const location = useLocation();

    // The tool pages where the main navbar should be HIDDEN
    const toolRoutes = [
        '/text-to-video', 
        '/text-to-audio', 
        '/watermark-remover', 
        '/text-to-image', 
        '/copyright',
        '/seo-planner',
        '/sora-ai',
        '/signin',
        '/signup',
        '/pricing'
    ];

    const [isLoggedIn, setIsLoggedIn] = React.useState(!!localStorage.getItem('token'));

    React.useEffect(() => {
        const checkAuth = () => {
            setIsLoggedIn(!!localStorage.getItem('token'));
        };
        window.addEventListener('storage', checkAuth);
        return () => window.removeEventListener('storage', checkAuth);
    }, []);

    if (toolRoutes.includes(location.pathname)) {
        return null;
    }

    return (
        <nav className="fixed top-0 left-0 right-0 z-[100] px-8 py-2.5 bg-[#020617]/60 backdrop-blur-md border-b border-white/5">
            <div className="max-w-[1850px] mx-auto flex justify-between items-center">
                <Link to="/" className="text-1xl font-bold text-white tracking-tight hover:text-white/80 transition-colors">
                    AI Platform
                </Link>

                <div className="flex items-center gap-10">
                    <div className="flex items-center gap-8">
                        <Link to="/" className="text-1xl font-bold text-white relative group">
                            Overview
                            {location.pathname === '/' && (
                                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-[#d946ef] to-blue-500 transform scale-x-100 transition-transform"></span>
                            )}
                        </Link>
                        <Link to="/pricing" className={`text-1xl font-bold relative group ${location.pathname === '/pricing' ? 'text-white' : 'text-white/70 hover:text-white transition-all'}`}>
                            Pricing
                            {location.pathname === '/pricing' && (
                                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-[#d946ef] to-blue-500 transform scale-x-100 transition-transform"></span>
                            )}
                        </Link>
                        {!isLoggedIn && (
                            <Link to="/signin" className="text-1xl font-bold text-white/70 hover:text-white transition-all">Sign In</Link>
                        )}
                    </div>

                    <Link 
                        to={isLoggedIn ? "/profile" : "/sora-ai"} 
                        className="w-10 h-10 rounded-full overflow-hidden border border-white/20 shadow-lg cursor-pointer hover:border-white/40 transition-all bg-white/5"
                    >
                        <img src={aiAvatar} alt="Profile" className="w-full h-full object-cover" />
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
