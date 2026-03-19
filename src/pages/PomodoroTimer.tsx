import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";

type Mode = "focus" | "break" | "longBreak";

const DURATIONS: Record<Mode, number> = { focus: 25 * 60, break: 5 * 60, longBreak: 15 * 60 };
const MODE_LABELS: Record<Mode, string> = { focus: "Focus", break: "Break", longBreak: "Long Break" };

export default function PomodoroTimer() {
  const [mode, setMode] = useState<Mode>("focus");
  const [timeLeft, setTimeLeft] = useState(DURATIONS.focus);
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = DURATIONS[mode];
  const progress = ((total - timeLeft) / total) * 100;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const switchMode = useCallback((newMode: Mode) => {
    setMode(newMode);
    setTimeLeft(DURATIONS[newMode]);
    setIsRunning(false);
  }, []);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            if (mode === "focus") {
              const next = (sessions + 1) % 4 === 0 ? "longBreak" : "break";
              setSessions(s => s + 1);
              setTimeout(() => switchMode(next), 500);
            } else {
              setTimeout(() => switchMode("focus"), 500);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isRunning, mode, sessions, switchMode]);

  const reset = () => {
    setTimeLeft(DURATIONS[mode]);
    setIsRunning(false);
  };

  const modeColor = mode === "focus" ? "var(--primary)" : mode === "break" ? "var(--success)" : "var(--accent)";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-medium text-foreground">Pomodoro Timer</h1>
        <p className="text-sm text-muted-foreground">
          Session <span className="font-mono text-foreground">{sessions + 1}</span> · {MODE_LABELS[mode]} mode
        </p>
      </div>

      <div className="flex gap-2">
        {(["focus", "break", "longBreak"] as Mode[]).map(m => (
          <button
            key={m}
            onClick={() => switchMode(m)}
            className={`font-mono text-xs uppercase tracking-widest px-3 py-1.5 rounded-md transition-colors ${
              mode === m ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {MODE_LABELS[m]}
          </button>
        ))}
      </div>

      <div className="flex justify-center py-8">
        <div className="relative w-[280px] h-[280px]">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 260 260">
            <circle cx="130" cy="130" r="120" fill="none" stroke="hsl(var(--secondary))" strokeWidth="4" />
            <motion.circle
              cx="130" cy="130" r="120" fill="none"
              stroke={`hsl(${modeColor})`}
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={circumference}
              animate={{ strokeDashoffset }}
              transition={{ duration: 0.5, ease: "linear" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-mono text-5xl font-bold text-foreground tracking-tight">
              {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground mt-2">
              {MODE_LABELS[mode]}
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-3">
        <Button variant="outline" size="icon" onClick={reset}>
          <RotateCcw className="w-4 h-4" />
        </Button>
        <Button
          size="lg"
          onClick={() => setIsRunning(!isRunning)}
          className="gap-2 min-w-[120px]"
        >
          {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {isRunning ? "Pause" : "Start"}
        </Button>
      </div>

      <div className="surface p-4 max-w-md mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <p className="stat-label">Sessions Today</p>
            <p className="stat-value text-foreground">{sessions}</p>
          </div>
          <div>
            <p className="stat-label">Focus Time</p>
            <p className="stat-value text-foreground">{(sessions * 25 / 60).toFixed(1)}h</p>
          </div>
          <div>
            <p className="stat-label">Next Break</p>
            <p className="stat-value text-foreground">{4 - (sessions % 4)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
