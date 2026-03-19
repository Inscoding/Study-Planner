import { motion, AnimatePresence } from "framer-motion";
import { scheduleBlocks } from "@/lib/mock-data";
import { Check } from "lucide-react";
import { useState } from "react";

export function TodaySchedule() {
  const todayBlocks = scheduleBlocks.filter(b => b.day === 0);
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  const toggleComplete = (id: string) => {
    setCompleted(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="surface p-4">
      <h3 className="stat-label mb-4">Today's Schedule</h3>
      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {todayBlocks.map((block) => (
            <motion.div
              key={block.id}
              layoutId={block.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
              className="flex items-center gap-3 p-3 rounded-md bg-secondary/50 border-l-2 cursor-pointer group"
              style={{ borderLeftColor: block.color }}
              onClick={() => toggleComplete(block.id)}
            >
              <div
                className={`w-5 h-5 rounded-sm border flex items-center justify-center shrink-0 transition-colors ${
                  completed.has(block.id) ? "bg-success border-success" : "border-muted-foreground/30"
                }`}
              >
                {completed.has(block.id) && <Check className="w-3 h-3 text-success-foreground" />}
              </div>
              <div className="flex-1 min-w-0">
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {block.subjectCode}
                </span>
                <p className={`text-sm truncate ${completed.has(block.id) ? "line-through text-muted-foreground" : "text-foreground"}`}>
                  {block.topicTitle}
                </p>
              </div>
              <span className="font-mono text-xs text-muted-foreground shrink-0">
                {block.durationMinutes}m
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
