import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react';
import { WorkItem } from '../types/work';

interface AudioContextType {
  currentTrack: WorkItem | null;
  isPlaying: boolean;
  playTrack: (track: WorkItem) => void;
  startTrack: (track: WorkItem) => void;
  togglePlay: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  stopAndClose: () => void;
  playlist: WorkItem[];
  setPlaylist: (tracks: WorkItem[]) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<WorkItem | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playlist, setPlaylist] = useState<WorkItem[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Mutable refs to eliminate stale closure bugs
  const currentTrackRef = useRef<WorkItem | null>(null);
  currentTrackRef.current = currentTrack;

  const playlistRef = useRef<WorkItem[]>([]);
  playlistRef.current = playlist;

  const isPlayingRef = useRef<boolean>(false);
  isPlayingRef.current = isPlaying;

  const togglePlay = useCallback(() => {
    if (!audioRef.current || !currentTrackRef.current) return;
    if (isPlayingRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => console.warn(err));
    }
  }, []);

  const playTrack = useCallback((track: WorkItem) => {
    if (!audioRef.current) return;

    if (currentTrackRef.current?.id === track.id) {
      togglePlay();
      return;
    }

    setCurrentTrack(track);
    if (track.audioUrl) {
      audioRef.current.src = track.audioUrl;
      audioRef.current.currentTime = 0;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.warn("Audio play blocked or unavailable", err);
        setIsPlaying(false);
      });
    } else {
      setIsPlaying(false);
    }
  }, [togglePlay]);

  const startTrack = useCallback((track: WorkItem) => {
    if (!audioRef.current) return;

    // If this track is already playing, keep playing without interrupting
    if (currentTrackRef.current?.id === track.id) {
      if (!isPlayingRef.current) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(err => console.warn(err));
      }
      return;
    }

    // Otherwise switch to this track and start playing
    setCurrentTrack(track);
    if (track.audioUrl) {
      audioRef.current.src = track.audioUrl;
      audioRef.current.currentTime = 0;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.warn("Audio play blocked or unavailable", err);
        setIsPlaying(false);
      });
    } else {
      setIsPlaying(false);
    }
  }, []);

  const nextTrack = useCallback(() => {
    const list = playlistRef.current;
    const current = currentTrackRef.current;
    if (!list.length || !current) return;
    const currentIndex = list.findIndex(t => t.id === current.id);
    const nextIndex = (currentIndex + 1) % list.length;
    playTrack(list[nextIndex]);
  }, [playTrack]);

  const prevTrack = useCallback(() => {
    const list = playlistRef.current;
    const current = currentTrackRef.current;
    if (!list.length || !current) return;
    const currentIndex = list.findIndex(t => t.id === current.id);
    const prevIndex = (currentIndex - 1 + list.length) % list.length;
    playTrack(list[prevIndex]);
  }, [playTrack]);

  const stopAndClose = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setCurrentTrack(null);
  }, []);

  // Sync ref to nextTrack for onended listener
  const nextTrackRef = useRef(nextTrack);
  nextTrackRef.current = nextTrack;

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    const handleEnded = () => {
      const list = playlistRef.current;
      const current = currentTrackRef.current;
      if (list.length > 0 && current) {
        const currentIndex = list.findIndex(t => t.id === current.id);
        if (currentIndex !== -1 && currentIndex + 1 < list.length) {
          // Seamlessly auto-play next track in the playlist
          nextTrackRef.current();
          return;
        }
      }
      // Reached the end of playlist: cleanly stop and reset play button to idle state
      setIsPlaying(false);
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
      }
    };

    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  return (
    <AudioContext.Provider value={{
      currentTrack,
      isPlaying,
      playTrack,
      startTrack,
      togglePlay,
      nextTrack,
      prevTrack,
      stopAndClose,
      playlist,
      setPlaylist
    }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};
