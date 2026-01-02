import React, { useState, useEffect } from 'react';
import youtubeMetrics from '../data/youtube-metrics.json';

interface MetricsData {
    timestamp: string;
    subscriberCount: string;
    viewCount: string;
    thumbnailUrl: string;
    channelTitle: string;
}

const MediaKit: React.FC = () => {
    const [latestMetrics, setLatestMetrics] = useState<MetricsData | null>(null);

    useEffect(() => {
        if (youtubeMetrics && youtubeMetrics.length > 0) {
            const latest = youtubeMetrics[youtubeMetrics.length - 1];
            setLatestMetrics(latest);

            // Set page title dynamically
            document.title = `${latest.channelTitle} Media Kit`;

            // Set favicon dynamically
            const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
            if (link) {
                link.href = latest.thumbnailUrl;
                link.type = 'image/jpeg';
            } else {
                const newLink = document.createElement('link');
                newLink.rel = 'icon';
                newLink.href = latest.thumbnailUrl;
                newLink.type = 'image/jpeg';
                document.head.appendChild(newLink);
            }
        }
    }, []);

    const calculateEngagementRate = (views: number, subscribers: number): string => {
        if (subscribers === 0) return '0%';
        return ((views / subscribers / 100) * 100).toFixed(2);
    };

    const formatDate = (isoString: string): string => {
        const date = new Date(isoString);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    const subscribers = latestMetrics ? parseInt(latestMetrics.subscriberCount) : 0;
    const views = latestMetrics ? parseInt(latestMetrics.viewCount) : 0;
    const engagementRate = calculateEngagementRate(views, subscribers);

    return (
        <div className="min-h-screen w-full bg-[#0d0d0d] text-[#e0e0e0] flex flex-col font-mono">
            {/* Header - VS Code Theme */}
            <header className="border-b border-[#404040] px-4 sm:px-8 py-6 sm:py-8 bg-[#1e1e1e]">
                <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center gap-6">
                    {/* Logo */}
                    {latestMetrics && (
                        <img
                            src={latestMetrics.thumbnailUrl}
                            alt={latestMetrics.channelTitle}
                            className="w-20 h-20 sm:w-24 sm:h-24 rounded-md border shadow-lg shadow-[var(--color-accent)]/20 flex-shrink-0" style={{ borderColor: 'var(--color-accent)' }}
                        />
                    )}

                    {/* Header Text */}
                    <div className="flex-1 text-center sm:text-left">
                        <div className="flex items-center gap-2 mb-2 justify-center sm:justify-start">
                            <span style={{ color: 'var(--color-accent)' }} className="text-xl">{'>'}</span>
                            <h1 className="text-3xl sm:text-4xl font-bold" style={{ color: 'var(--color-accent)' }}>
                                Quiche19
                            </h1>
                        </div>
                        <p className="text-sm sm:text-base font-semibold text-[#00d4ff] mb-2">
                            <span className="text-[#808080]">// </span>Deep Dive C++ Technical Content
                        </p>
                        <p className="text-xs sm:text-sm text-[#7a8c4f]">
                            {'<'} YouTube Shorts • Developer Audience • Tech Focus {'/>'}
                        </p>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 px-4 sm:px-8 py-8 sm:py-12 bg-[#0d0d0d]">
                <div className="max-w-5xl mx-auto">
                    {/* Key Metrics Section */}
                    <section className="mb-16">
                        <div className="mb-8 pl-4" style={{ borderLeft: '4px solid var(--color-accent)' }}>
                            <h2 className="text-2xl sm:text-3xl font-bold"><span className="text-[#808080]">const</span> <span style={{ color: 'var(--color-accent)' }}>metrics</span> = <span style={{ color: 'var(--color-accent)' }}>{'{'}</span></h2>
                        </div>

                        {/* Metrics Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 ml-8">
                            {/* Subscribers Card */}
                            <div className="bg-[#1e1e1e] border rounded p-4 hover:transition-all hover:shadow-lg group" style={{ borderColor: 'var(--color-accent)'}}>
                                <div className="text-xs font-semibold mb-2" style={{ color: 'var(--color-accent)' }}>subscribers:</div>
                                <div className="text-3xl font-bold mb-1 font-mono" style={{ color: 'var(--color-accent)' }}>
                                    {latestMetrics ? latestMetrics.subscriberCount : '—'}
                                </div>
                                <div className="text-[#808080] text-xs">// Growing developer community</div>
                            </div>

                            {/* Views Card */}
                            <div className="bg-[#1e1e1e] border rounded p-4 hover:transition-all hover:shadow-lg group" style={{ borderColor: 'var(--color-accent)'}}>
                                <div className="text-xs font-semibold mb-2" style={{ color: 'var(--color-accent)' }}>views:</div>
                                <div className="text-3xl font-bold mb-1 font-mono" style={{ color: 'var(--color-accent)' }}>
                                    {latestMetrics ? (parseInt(latestMetrics.viewCount) / 1000).toFixed(0) + 'K' : '—'}
                                </div>
                                <div className="text-[#808080] text-xs">// Cumulative channel reach</div>
                            </div>

                            {/* Engagement Card */}
                            <div className="bg-[#1e1e1e] border rounded p-4 hover:transition-all hover:shadow-lg group" style={{ borderColor: 'var(--color-accent)'}}>
                                <div className="text-xs font-semibold mb-2" style={{ color: 'var(--color-accent)' }}>engagement:</div>
                                <div className="text-3xl font-bold mb-1 font-mono" style={{ color: 'var(--color-accent)' }}>
                                    {engagementRate}x
                                </div>
                                <div className="text-[#808080] text-xs">// View-to-subscriber ratio</div>
                            </div>

                            {/* Frequency Card */}
                            <div className="bg-[#1e1e1e] border rounded p-4 hover:transition-all hover:shadow-lg group" style={{ borderColor: 'var(--color-accent)'}}>
                                <div className="text-xs font-semibold mb-2" style={{ color: 'var(--color-accent)' }}>frequency (per week):</div>
                                <div className="text-3xl font-bold mb-1 font-mono" style={{ color: 'var(--color-accent)' }}>
                                    4
                                </div>
                                <div className="text-[#808080] text-xs">// Consistent posting schedule</div>
                            </div>
                        </div>

                        {/* Closing brace */}
                        <div className="mb-8 pl-4">
                            <h2 className="text-2xl sm:text-3xl font-bold">
                                <span style={{ color: 'var(--color-accent)' }}>{'}'}</span>
                            </h2>
                        </div>

                        {/* Last Updated */}
                        <div className="bg-[#1e1e1e] border-l-4 border-[#00d4ff] px-4 py-3 rounded text-xs text-[#a0a0a0]">
                            <span className="text-[#00d4ff]">⏱ Updated:</span> {latestMetrics ? formatDate(latestMetrics.timestamp) : '—'}
                        </div>
                    </section>

                    {/* Audience Profile Section */}
                    <section>
                        <div className="mb-8 pl-4" style={{ borderLeft: '4px solid var(--color-accent)' }}>
                            <h2 className="text-2xl sm:text-3xl font-bold"><span style={{ color: 'var(--color-accent)' }}>audience_profile</span>
                                <span className="text-[#808080]">() {'{'}</span>
                            </h2>
                        </div>

                        <div className="bg-[#1e1e1e] border rounded p-6 ml-8" style={{ borderColor: 'var(--color-accent)'}}>
                            <div className="text-xs font-semibold mb-3" style={{ color: 'var(--color-accent)' }}><span className="text-[#808080]">return</span></div>
                            <p className="text-[#e0e0e0] leading-relaxed text-sm">
                                <span style={{ color: 'var(--color-accent)' }}>Developer-focused</span> technical audience specializing in{' '}
                                <span className="text-[#ce9178]">C++</span> and advanced programming concepts.
                            </p>
                        </div>

                        <div className="mt-8 pl-4">
                            <h2 className="text-2xl sm:text-3xl font-bold">
                                <span className="text-[#808080]">{'}'}</span>
                            </h2>
                        </div>

                    </section>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-[#404040] px-4 sm:px-8 py-4 bg-[#1e1e1e]">
                <div className="max-w-5xl mx-auto text-center text-xs text-[#808080]">
                    <p>{'// '}© 2026 Quiche19 Media Kit - Powered by Developer Intelligence</p>
                </div>
            </footer>
        </div>
    );
};

export default MediaKit;
