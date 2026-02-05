import { useRef, useEffect } from 'react';
import { useBackgroundMusic } from './BackgroundMusicContext';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const TRACKS = [
    '/Shah Abdul Latif — We Are Champions.mp3',
    '/Shah Abdul Latif — We Are Champions (1).mp3'
];

export const BackgroundMusicPlayer = () => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const { isPlaying, isMuted, hasInteracted, musicEnabled, currentTrackIndex, playNextTrack, toggleMute, enableMusic, setHasInteracted } = useBackgroundMusic();

    const currentTrack = TRACKS[currentTrackIndex % TRACKS.length];

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.3; // Default volume 30%
        }
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                const playPromise = audioRef.current.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.log("Autoplay prevented:", error);
                        // Fallback: Wait for any user interaction to start playback
                        const resumeAudio = () => {
                            if (audioRef.current) {
                                audioRef.current.play().catch(e => console.error("Resume failed:", e));
                                document.removeEventListener('click', resumeAudio);
                                document.removeEventListener('keydown', resumeAudio);
                                document.removeEventListener('touchstart', resumeAudio);
                            }
                        };
                        document.addEventListener('click', resumeAudio);
                        document.addEventListener('keydown', resumeAudio);
                        document.addEventListener('touchstart', resumeAudio);
                    });
                }
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying, currentTrackIndex]); // Re-trigger play when track changes if playing

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.muted = isMuted;
        }
    }, [isMuted]);

    const handleEnded = () => {
        playNextTrack();
    };

    const handleDenyMusic = () => {
        setHasInteracted(true);
        localStorage.setItem('music_pref_v2', 'disabled');
    };

    return (
        <>
            <audio
                ref={audioRef}
                src={currentTrack}
                onEnded={handleEnded}
                loop={false}
            />

            {/* Initial Interaction Modal */}
            <AnimatePresence>
                {!hasInteracted && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 rounded-2xl shadow-2xl max-w-md w-full mx-auto relative overflow-hidden"
                        >
                            {/* Decorative background element */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500" />

                            <div className="flex flex-col items-center text-center gap-6">
                                <div className="p-4 bg-primary/10 rounded-full ring-4 ring-primary/5">
                                    <Music className="w-10 h-10 text-primary" />
                                </div>
                                <div className="space-y-3">
                                    <h3 className="text-2xl font-bold tracking-tight">Enable Background Music?</h3>
                                    <p className="text-base text-muted-foreground leading-relaxed">
                                        Enhance your browsing experience with our curated playlist. You can mute or stop it at any time.
                                    </p>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-3 w-full pt-2">
                                    <button
                                        onClick={enableMusic}
                                        className="flex-1 px-6 py-3 text-sm font-semibold bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-primary/20"
                                    >
                                        Yes, Enable Music
                                    </button>
                                    <button
                                        onClick={handleDenyMusic}
                                        className="flex-1 px-6 py-3 text-sm font-semibold border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
                                    >
                                        No, Keep it Silent
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Control Button */}
            {musicEnabled && (
                <button
                    onClick={toggleMute}
                    style={{
                        position: 'fixed',
                        bottom: '24px',
                        right: '24px',
                        zIndex: 99999,
                        width: '60px',
                        height: '60px',
                        backgroundColor: '#dc2626',
                        color: 'white',
                        borderRadius: '50%',
                        border: 'none',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'transform 0.2s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    {isMuted ? (
                        <VolumeX className="w-6 h-6" />
                    ) : (
                        <Volume2 className="w-6 h-6" />
                    )}
                </button>
            )}
        </>
    );
};
