'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Music } from 'lucide-react';

interface PlaylistItem {
  id: string;
  name: string;
  emoji: string;
  url: string;
  description: string;
}

const PLAYLISTS: PlaylistItem[] = [
  {
    id: 'focus',
    name: 'Fokus Trading',
    emoji: '🎯',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    description: 'Musik tenang untuk konsentrasi'
  },
  {
    id: 'upbeat',
    emoji: '🚀',
    name: 'Seru & Motivasi',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    description: 'Musik energik penuh semangat'
  },
  {
    id: 'lucu',
    emoji: '😆',
    name: 'Lucu & Ceria',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    description: 'Musik playful & menghibur'
  },
  {
    id: 'epic',
    emoji: '⚡',
    name: 'Epic Gaming',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    description: 'Musik epic & intense'
  },
];

export default function BackgroundMusic() {
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0.3);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlaylist, setCurrentPlaylist] = useState<string>('focus');
  const [showPlaylist, setShowPlaylist] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentMusic = PLAYLISTS.find(p => p.id === currentPlaylist) || PLAYLISTS[0];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.src = currentMusic.url;
      audio.play().catch(err => {
        console.log('[v0] Audio playback failed:', err);
      });
      setIsPlaying(true);
    }
  }, [isMuted, currentMusic.url]);

  const handlePlaylistChange = (id: string) => {
    setCurrentPlaylist(id);
    setShowPlaylist(false);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      audio.currentTime = 0;
      audio.play();
    };

    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);
  }, []);

  return (
    <>
      <audio
        ref={audioRef}
        loop
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <motion.div className="relative inline-flex items-center gap-2">
        {/* Music Button Compact */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowPlaylist(!showPlaylist)}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg font-semibold text-sm transition-all ${
            isMuted
              ? 'bg-slate-700/50 hover:bg-slate-700 text-slate-300'
              : 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-white shadow-lg hover:shadow-cyan-500/50'
          }`}
        >
          <motion.span
            animate={!isMuted ? { rotate: 360 } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {currentMusic.emoji}
          </motion.span>
          <span className="hidden sm:inline">{currentMusic.name}</span>
          {!isMuted && (
            <motion.span
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-xs"
            >
              ♪
            </motion.span>
          )}
        </motion.button>

        {/* Volume Control Compact */}
        <div className="flex items-center gap-1 bg-slate-700/50 rounded-lg px-2 py-2">
          {isMuted ? (
            <VolumeX className="w-3 h-3 text-slate-400" />
          ) : (
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
            >
              <Volume2 className="w-3 h-3 text-cyan-400" />
            </motion.div>
          )}
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={e => setVolume(parseFloat(e.target.value))}
            disabled={isMuted}
            className="w-12 h-1 bg-slate-600 rounded-full cursor-pointer accent-cyan-500 disabled:opacity-30"
          />
        </div>

        {/* Mute Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsMuted(!isMuted)}
          className={`px-2 py-2 rounded-lg transition-all text-sm ${
            isMuted
              ? 'bg-slate-700/50 hover:bg-slate-700 text-slate-400'
              : 'bg-emerald-500/50 hover:bg-emerald-500/70 text-emerald-300'
          }`}
        >
          {isMuted ? '🔇' : '🎵'}
        </motion.button>

        {/* Playlist Dropdown */}
        <AnimatePresence>
          {showPlaylist && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute top-12 left-0 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg border border-slate-700 shadow-xl z-50 w-48"
            >
              {PLAYLISTS.map((music, idx) => (
                <motion.button
                  key={music.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => handlePlaylistChange(music.id)}
                  className={`w-full text-left px-4 py-2 flex items-center gap-3 transition-all ${
                    currentPlaylist === music.id
                      ? 'bg-cyan-500/20 border-l-2 border-cyan-500'
                      : 'hover:bg-slate-700/50'
                  } ${idx === 0 ? 'rounded-t-lg' : ''} ${idx === PLAYLISTS.length - 1 ? 'rounded-b-lg' : ''}`}
                >
                  <span className="text-xl">{music.emoji}</span>
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-white">{music.name}</p>
                    <p className="text-xs text-slate-400">{music.description}</p>
                  </div>
                  {currentPlaylist === music.id && (
                    <motion.span
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="text-cyan-400"
                    >
                      ✓
                    </motion.span>
                  )}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
