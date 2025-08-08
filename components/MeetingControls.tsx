"use client";

import { useState } from "react";
import { Video, VideoOff, Mic, MicOff, Calendar, Plus, Keyboard } from "lucide-react";
import { motion } from "framer-motion";

export default function MeetingControls() {
  const [meetingCode, setMeetingCode] = useState("");
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);

  const handleNewMeeting = () => {
    // Generate a random meeting code
    const code = `${Math.random().toString(36).substring(2, 5)}-${Math.random().toString(36).substring(2, 6)}-${Math.random().toString(36).substring(2, 5)}`;
    console.log("New meeting created with code:", code);
    // In a real app, this would redirect to the meeting room
    alert(`Yeni toplantı oluşturuldu! Kod: ${code}`);
  };

  const handleJoinMeeting = () => {
    if (meetingCode) {
      console.log("Joining meeting with code:", meetingCode);
      // In a real app, this would validate the code and redirect to the meeting room
      alert(`Toplantıya katılınıyor: ${meetingCode}`);
    }
  };

  const handleScheduleMeeting = () => {
    console.log("Opening meeting scheduler");
    // In a real app, this would open a calendar/scheduling modal
    alert("Toplantı planlama özelliği yakında gelecek!");
  };

  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      {/* Left Column - Meeting Controls */}
      <motion.div 
        className="space-y-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <motion.h1 
            className="text-5xl font-bold tracking-tight mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Video toplantıları.
            <br />
            <span className="text-primary">Herkes için.</span>
          </motion.h1>
          <motion.p 
            className="text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Güvenli, yüksek kaliteli video toplantılarla bağlantıda kalın.
            Ücretsiz ve kolay kullanım.
          </motion.p>
        </div>

        {/* Meeting Actions */}
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex gap-3">
            <motion.button 
              onClick={handleNewMeeting}
              className="flex-1 bg-primary text-primary-foreground rounded-xl px-6 py-3 font-medium hover:bg-primary/90 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Yeni toplantı başlat"
            >
              <Plus className="w-5 h-5" />
              Yeni toplantı
            </motion.button>
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Kod veya bağlantı girin"
                aria-label="Toplantı kodu veya bağlantısı"
                value={meetingCode}
                onChange={(e) => setMeetingCode(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleJoinMeeting()}
                className="w-full px-4 py-3 rounded-xl border border-input bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all pr-10"
              />
              <Keyboard className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" aria-hidden="true" />
            </div>
          </div>
          <motion.button 
            onClick={handleJoinMeeting}
            className={`w-full py-3 rounded-xl font-medium transition-all ${
              meetingCode 
                ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.02]" 
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
            disabled={!meetingCode}
            whileHover={meetingCode ? { scale: 1.02 } : {}}
            whileTap={meetingCode ? { scale: 0.98 } : {}}
            aria-label="Toplantıya katıl"
            aria-disabled={!meetingCode}
          >
            Katıl
          </motion.button>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          className="flex gap-4 pt-4 border-t border-border/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <button 
            onClick={handleScheduleMeeting}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toplantı planla"
          >
            <Calendar className="w-4 h-4" />
            Toplantı planla
          </button>
        </motion.div>
      </motion.div>

      {/* Right Column - Preview */}
      <motion.div 
        className="relative"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.div 
          className="aspect-video bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl overflow-hidden relative shadow-2xl"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <motion.div 
                className="w-24 h-24 bg-slate-700 rounded-full mx-auto mb-4 flex items-center justify-center"
                animate={{ 
                  boxShadow: [
                    "0 0 0 0 var(--tw-color-slate-400-alpha)",
                    "0 0 0 20px rgba(148, 163, 184, 0)",
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Video className="w-12 h-12 text-slate-400" />
              </motion.div>
              <p className="text-white/80">Kamera önizlemesi</p>
            </div>
          </div>
          
          {/* Preview Controls */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            <motion.button
              onClick={() => setIsCameraOn(!isCameraOn)}
              className={`p-3 rounded-full transition-all ${
                isCameraOn 
                  ? "bg-white/10 hover:bg-white/20 text-white" 
                  : "bg-red-500 hover:bg-red-600 text-white"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={isCameraOn ? "Kamerayı kapat" : "Kamerayı aç"}
              aria-pressed={isCameraOn}
            >
              {isCameraOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
            </motion.button>
            <motion.button
              onClick={() => setIsMicOn(!isMicOn)}
              className={`p-3 rounded-full transition-all ${
                isMicOn 
                  ? "bg-white/10 hover:bg-white/20 text-white" 
                  : "bg-red-500 hover:bg-red-600 text-white"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={isMicOn ? "Mikrofonu kapat" : "Mikrofonu aç"}
              aria-pressed={isMicOn}
            >
              {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}