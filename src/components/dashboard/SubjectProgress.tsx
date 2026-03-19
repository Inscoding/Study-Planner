import { subjects } from "@/lib/mock-data";
import { motion } from "framer-motion";

export function SubjectProgress() {
  return (
    <div className="surface p-4">
      <h3 className="stat-label mb-4">Subject Progress</h3>
      <div className="space-y-3">
        {subjects.map((subject) => {
          const completed = subject.topics.filter(t => t.isCompleted).length;
          const total = subject.topics.length;
          const pct = Math.round((completed / total) * 100);
          const daysLeft = Math.ceil((subject.examDate.getTime() - Date.now()) / 86400000);

          return (
            <div key={subject.id} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: subject.color }} />
                  <span className="text-sm text-foreground">{subject.name}</span>
                </div>
                <span className="font-mono text-xs text-muted-foreground">
                  {daysLeft}d left · {completed}/{total}
                </span>
              </div>
              <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{ background: subject.color }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
