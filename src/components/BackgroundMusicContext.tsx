import React, { createContext, useContext, useState, useEffect } from 'react';

interface BackgroundMusicContextType {
  isPlaying: boolean;
  isMuted: boolean;
  hasInteracted: boolean;
  musicEnabled: boolean;
  currentTrackIndex: number;
  togglePlay: () => void;
  toggleMute: () => void;
  setHasInteracted: (interacted: boolean) => void;
  enableMusic: () => void;
  playNextTrack: () => void;
}

const BackgroundMusicContext = createContext<BackgroundMusicContextType | undefined>(undefined);

export const useBackgroundMusic = () => {
  const context = useContext(BackgroundMusicContext);
  if (!context) {
    throw new Error('useBackgroundMusic must be used within a BackgroundMusicProvider');
  }
  return context;
};

export const BackgroundMusicProvider = ({ children }: { children: React.ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  useEffect(() => {
    // Load preference from localStorage
    const savedPreference = localStorage.getItem('music_pref_v2');
    if (savedPreference === 'enabled') {
      setHasInteracted(true);
      setMusicEnabled(true);
      setIsPlaying(true);
      setIsMuted(false);
    } else if (savedPreference === 'disabled') {
      setHasInteracted(true);
      setMusicEnabled(false);
      setIsPlaying(false);
    }
  }, []);

  const togglePlay = () => {
    const newState = !isPlaying;
    setIsPlaying(newState);
    if (!hasInteracted) {
      setHasInteracted(true);
      if (newState) {
        localStorage.setItem('music_pref_v2', 'enabled');
      } else {
        localStorage.setItem('music_pref_v2', 'disabled'); // Or keep it unset? Logic suggests saving explicit choice
      }
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const enableMusic = () => {
    setHasInteracted(true);
    setMusicEnabled(true);
    setIsPlaying(true);
    setIsMuted(false);
    localStorage.setItem('music_pref_v2', 'enabled');
  };

  const playNextTrack = () => {
    setCurrentTrackIndex(prev => prev + 1);
  };


  return (
    <BackgroundMusicContext.Provider
      value={{
        isPlaying,
        isMuted,
        hasInteracted,
        musicEnabled,
        currentTrackIndex,
        togglePlay,
        toggleMute,
        setHasInteracted,
        enableMusic,
        playNextTrack
      }}
    >
      {children}
    </BackgroundMusicContext.Provider>
  );
};
