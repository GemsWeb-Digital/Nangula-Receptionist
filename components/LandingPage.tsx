import React from 'react';
import ChatSimulator from './ChatSimulator';
import { FacebookIcon, InstagramIcon, LinkedInIcon, WhatsAppIcon } from './icons/Icons';

interface LandingPageProps {
  onTryDemo: () => void;
}

const Navbar: React.FC<LandingPageProps> = ({ onTryDemo }) => (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#E0E0E0]/80 backdrop-blur-sm shadow-[0_4px_12px_rgba(163,163,163,0.2)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
                <a href="#hero" className="flex-shrink-0">
                    <img className="h-10 w-auto transition-transform hover:scale-105" src="https://gemsweb.xyz/wp-content/uploads/2025/10/Nangula-logo.png" alt="Nangula AI Logo" />
                </a>
                <div className="hidden md:flex items-center space-x-8">
                    <a href="#problem" className="font-medium text-[#2D2D2D] hover:text-[#C8A882] transition-colors">Problem</a>
                    <a href="#solution" className="font-medium text-[#2D2D2D] hover:text-[#C8A882] transition-colors">Solution</a>
                    <a href="#how-it-works" className="font-medium text-[#2D2D2D] hover:text-[#C8A882] transition-colors">How It Works</a>
                </div>
                <button onClick={onTryDemo} className="neuro-button-accent !px-6 !py-2.5 !text-sm !font-bold">Try Free Demo</button>
            </div>
        </div>
    </nav>
);

const Hero: React.FC<LandingPageProps> = ({ onTryDemo }) => (
    <section id="hero" className="min-h-screen flex items-center pt-20 bg-gradient-to-br from-[#E5E5E5] to-[#E0E0E0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-16 items-center">
            <div className="text-center md:text-left">
                <p className="eyebrow mb-4">FOR NAMIBIAN SMEs</p>
                <h1 className="h1 mb-6">Nangula AI: Your Always-On Chat Receptionist</h1>
                <p className="subheadline max-w-xl mx-auto md:mx-0 mb-8">Empowering Namibian SMEs with 24/7 AI-Powered Customer Support & Lead Capture.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    <button onClick={onTryDemo} className="neuro-button-accent !text-lg !px-10 !py-4 animate-pulse" style={{ animationDuration: '2s' }}>
                        Start Free Demo →
                    </button>
                    <a href="https://wa.me/264853411522?text=Hello%20Nangula%20AI!%20I'm%20interested%20in%20learning%20more." target="_blank" rel="noopener noreferrer" className="self-center font-medium text-gray-600 hover:text-[#C8A882] underline transition-colors">
                        Contact us on WhatsApp
                    </a>
                </div>
            </div>
            <div className="flex justify-center">
                <ChatSimulator />
            </div>
        </div>
    </section>
);

const FeatureCard: React.FC<{icon: string, title: string, children: React.ReactNode}> = ({ icon, title, children }) => (
    <div className="neuro-card text-center p-8 transition-transform hover:-translate-y-2">
        <div className="mx-auto mb-4 w-20 h-20 rounded-full bg-gradient-to-br from-[#E5E5E5] to-[#D8D8D8] shadow-[6px_6px_12px_#A3A3A3,-6px_-6px_12px_#FFFFFF] flex items-center justify-center text-4xl">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-[#6B6B6B]">{children}</p>
    </div>
);

const Solution = () => (
    <section id="solution" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <p className="eyebrow mb-4">THE SOLUTION</p>
                <h2 className="h2 mb-4">Smart, Local, Always On.</h2>
                <p className="subheadline max-w-3xl mx-auto">A modern assistant tuned for Namibian businesses: fast, culturally aware, and always available.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <FeatureCard icon="💬" title="24/7 WhatsApp & Web Support">Never miss a message. Nangula AI responds instantly on WhatsApp, your website, Instagram DMs, and Facebook Messenger.</FeatureCard>
                <FeatureCard icon="📅" title="Instant Appointment Booking">AI checks your availability and books appointments in real-time, syncing directly with your Google Calendar.</FeatureCard>
                <FeatureCard icon="🌍" title="Built for Namibia">Understands local phrases, landmarks (FNB Building, Wernhil Mall), and payments like eWallet & BlueWallet.</FeatureCard>
            </div>
        </div>
    </section>
);


const Problem = () => (
    <section id="problem" className="py-24 bg-gradient-to-br from-[#E5E5E5] to-[#D8D8D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="text-center mb-16">
                <p className="eyebrow mb-4">THE CHALLENGE</p>
                <h2 className="h2 mb-4">Are You Losing Business After Hours?</h2>
                <p className="subheadline max-w-3xl mx-auto">Many Namibian SMEs miss critical inquiries outside business hours. Nangula AI ensures every potential lead is engaged — instantly.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                <div className="neuro-card-inset p-8 text-center">
                    <div className="text-5xl mb-4">📞</div>
                    <h3 className="text-2xl font-bold mb-2">Missed Calls & Leads</h3>
                    <p className="text-gray-600">70% of messages after 5 PM go unanswered until the next day. You're losing leads while you sleep.</p>
                </div>
                <div className="neuro-card-inset p-8 text-center">
                    <div className="text-5xl mb-4">💬</div>
                    <h3 className="text-2xl font-bold mb-2">Inconsistent Service</h3>
                    <p className="text-gray-600">Different staff give different answers. Customers get confused, and trust erodes.</p>
                </div>
                <div className="neuro-card-inset p-8 text-center">
                    <div className="text-5xl mb-4">💰</div>
                    <h3 className="text-2xl font-bold mb-2">High Operational Costs</h3>
                    <p className="text-gray-600">Hiring a full-time receptionist costs thousands, but still can't cover nights and weekends.</p>
                </div>
            </div>
        </div>
    </section>
);

const HowItWorks = () => (
    <section id="how-it-works" className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="eyebrow mb-4">SIMPLE SETUP</p>
            <h2 className="h2 mb-4">Live in 15 Minutes</h2>
            <p className="subheadline max-w-2xl mx-auto mb-16">Connect your channels, provide your business info, and let Nangula AI handle the rest. It's that simple.</p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                <div className="flex flex-col items-center">
                    <div className="neuro-card w-32 h-32 flex items-center justify-center text-5xl mb-4">🔌</div>
                    <h3 className="text-xl font-bold">1. Connect</h3>
                    <p className="text-gray-600">Link your WhatsApp or website.</p>
                </div>
                <div className="text-4xl text-gray-400 font-light hidden md:block">→</div>
                 <div className="text-4xl text-gray-400 font-light md:hidden">↓</div>
                <div className="flex flex-col items-center">
                    <div className="neuro-card w-32 h-32 flex items-center justify-center text-5xl mb-4">🧠</div>
                    <h3 className="text-xl font-bold">2. Train</h3>
                    <p className="text-gray-600">Provide your business details.</p>
                </div>
                <div className="text-4xl text-gray-400 font-light hidden md:block">→</div>
                 <div className="text-4xl text-gray-400 font-light md:hidden">↓</div>
                <div className="flex flex-col items-center">
                    <div className="neuro-card w-32 h-32 flex items-center justify-center text-5xl mb-4">✅</div>
                    <h3 className="text-xl font-bold">3. Activate</h3>
                    <p className="text-gray-600">Start capturing leads 24/7.</p>
                </div>
            </div>
        </div>
    </section>
);


const FinalCTA: React.FC<LandingPageProps> = ({ onTryDemo }) => (
    <section className="py-24 bg-gradient-to-br from-[#D4A574] to-[#C8A882]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{textShadow: '2px 2px 8px rgba(0,0,0,0.2)'}}>Ready to Transform Your Business?</h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">Start your Nangula AI demo today and experience the difference. No credit card required. No commitment.</p>
            <button onClick={onTryDemo} className="neuro-button !bg-white !text-[#C8A882] !text-lg !font-bold !px-12 !py-4 transition-transform hover:!scale-105">
                Try Free Demo Now
            </button>
        </div>
    </section>
);

const Footer = () => (
    <footer className="bg-[#D8D8D8] shadow-[inset_0_4px_8px_rgba(163,163,163,0.3)]">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
            <img className="h-10 w-auto mx-auto mb-4" src="https://gemsweb.xyz/wp-content/uploads/2025/10/Nangula-logo.png" alt="Nangula AI" />
            <div className="flex justify-center space-x-6 my-6">
                <a href="https://www.facebook.com/namibia.digital" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#C8A882]"><FacebookIcon /></a>
                <a href="https://www.instagram.com/gemsweb_digital" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#C8A882]"><InstagramIcon /></a>
                <a href="https://www.linkedin.com/company/gemsweb-digital/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#C8A882]"><LinkedInIcon /></a>
                <a href="https://wa.me/264853411522" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#C8A882]"><WhatsAppIcon /></a>
            </div>
            <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Nangula AI. All rights reserved.</p>
            <p className="text-xs text-gray-400 mt-2">Powered by Gemsweb Digital & Tuppaman Investment</p>
        </div>
    </footer>
);


const LandingPage: React.FC<LandingPageProps> = ({ onTryDemo }) => {
    return (
        <div className="bg-[#E0E0E0]">
            <Navbar onTryDemo={onTryDemo} />
            <main>
                <Hero onTryDemo={onTryDemo} />
                <Problem />
                <Solution />
                <HowItWorks />
                <FinalCTA onTryDemo={onTryDemo} />
            </main>
            <Footer />
        </div>
    );
};

export default LandingPage;
