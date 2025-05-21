'use client';

import Link from 'next/link';
import { useLayoutMode } from '../lib/context/LayoutModeContext';

const StarLogo = () => (
    <svg width="40" height="40" className="text-white fill-current" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
        <path fill="#FFFFFF" d="M324.52 191.715a97.542 97.542 0 0 0-4.228-4.229L256 22.303l-64.291 165.183a93.225 93.225 0 0 0-4.222 4.224L22.301 255.998l165.179 64.291a97.542 97.542 0 0 0 4.229 4.229L256 489.697l64.284-165.174a95.208 95.208 0 0 0 4.237-4.233l165.178-64.287zM256 297.773c-23.067 0-41.77-18.705-41.77-41.775 0-23.067 18.703-41.767 41.77-41.767 23.068 0 41.767 18.7 41.767 41.767 0 23.07-18.7 41.775-41.767 41.775z"></path>
    </svg>
);

export default function Header() {
    const { layoutMode, toggleLayoutMode } = useLayoutMode();

    return (
        <header className="fixed top-0 left-0 w-full z-50 flex items-center border-b border-white">
            {/* Logo - Left section with background */}
            <div className="h-16 w-28 bg-green-fluo flex items-center justify-center border-r border-white">
                <StarLogo />
            </div>

            {/* Navigation - Center section */}
            <nav className="flex-1 flex justify-center h-16 bg-black">
                <ul className="flex space-x-16 items-center h-full">
                    <li>
                        <Link href="#a-propos" className="text-sm text-white">
                            [●] A propos
                        </Link>
                    </li>
                    <li>
                        <Link href="#compétences" className="text-sm text-white">
                            [●] Compétences
                        </Link>
                    </li>
                    <li>
                        <Link href="#projets" className="text-sm text-white">
                            [●] Projets
                        </Link>
                    </li>
                    <li>
                        <Link href="#me-contacter" className="text-sm text-white">
                            [●] Me contacter
                        </Link>
                    </li>
                </ul>
            </nav>

            {/* Social Icons - Right section */}
            <div className="flex items-center space-x-4 h-16 px-6 bg-black">
                {/* Mode toggle button */}
                <button
                    onClick={toggleLayoutMode}
                    className="flex items-center justify-center mr-4 border border-green-fluo rounded px-3 py-1 text-green-fluo text-xs hover:bg-green-fluo hover:text-black transition-colors"
                >
                    {layoutMode === 'standard' ? 'MODE DESKTOP' : 'MODE STANDARD'}
                </button>

                <a
                    href="https://linkedin.com/in/yourprofile"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M6 9H2V21H6V9Z" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </a>
                <a
                    href="https://github.com/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 19C4.7 20.4 4.7 16.5 3 16M15 21V17.5C15 16.5 15.1 16.1 14.5 15.5C17.3 15.2 20 14.1 20 9.5C19.9988 8.30384 19.5325 7.15648 18.7 6.3C19.0905 5.27131 19.0545 4.13359 18.6 3.1C18.6 3.1 17.5 2.8 15.6 4C13.9562 3.56645 12.2438 3.56645 10.6 4C8.7 2.8 7.6 3.1 7.6 3.1C7.14548 4.13359 7.10951 5.27131 7.5 6.3C6.66745 7.15648 6.20117 8.30384 6.2 9.5C6.2 14.1 8.9 15.2 11.7 15.5C11.1 16.1 11 16.5 11 17.5V21" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </a>
            </div>
        </header>
    );
} 