import { motion, AnimatePresence } from "framer-motion";
import { scheduleBlocks } from "@/lib/mock-data";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const hours = Array.from({ length: 9 }, (_, i) => i + 8); // 8am - 4pm

export default function CalendarView() {
  return (
    <div className="space-y-4">
      <h1 className="text-lg font-medium text-foreground">Study Calendar</h1>
      <p className="text-sm text-muted-foreground">Living schedule — blocks shift when priorities change.</p>

      <div className="surface overflow-hidden">
        <div className="grid" style={{ gridTemplateColumns: "60px repeat(5, 1fr)" }}>
          {/* Header */}
          <div className="p-3 border-b border-border" />
          {days.map(day => (
            <div key={day} className="p-3 border-b border-l border-border text-center">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{day}</span>
            </div>
          ))}

          {/* Time grid */}
          {hours.map(hour => (
            <div key={hour} className="contents">
              <div className="p-2 pr-3 text-right border-b border-border">
                <span className="font-mono text-[10px] text-muted-foreground">{hour}:00</span>
              </div>
              {days.map((_, dayIdx) => {
                const blocksInSlot = scheduleBlocks.filter(
                  b => b.day === dayIdx && Math.floor(b.startHour) === hour
                );
                return (
                  <div key={dayIdx} className="relative border-b border-l border-border min-h-[60px] p-1">
                    <AnimatePresence>
                      {blocksInSlot.map(block => (
                        <motion.div
                          key={block.id}
                          layoutId={block.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                          className="rounded-sm p-2 border-l-2 bg-secondary/60 cursor-pointer hover:bg-secondary transition-colors"
                          style={{
                            borderLeftColor: block.color,
                            height: `${Math.max(block.durationMinutes * 0.9, 40)}px`,
                          }}
                        >
                          <span className="font-mono text-[9px] uppercase tracking-widest block" style={{ color: block.color }}>
                            {block.subjectCode}
                          </span>
                          <span className="text-xs text-foreground truncate block">{block.topicTitle}</span>
                          <span className="font-mono text-[9px] text-muted-foreground">{block.durationMinutes}m</span>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
