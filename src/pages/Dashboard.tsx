import { StatCard } from "@/components/dashboard/StatCard";
import { TodaySchedule } from "@/components/dashboard/TodaySchedule";
import { BurndownChart } from "@/components/dashboard/BurndownChart";
import { SubjectProgress } from "@/components/dashboard/SubjectProgress";
import { getStats } from "@/lib/mock-data";
import { BookOpen, Clock, Target, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const stats = getStats();

  return (
    <div className="space-y-6">
      <div>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-lg font-medium text-foreground"
        >
          Your exam is in{" "}
          <span className="font-mono text-primary">{stats.nearestExam}</span> days.
          You are{" "}
          <span className={`font-mono ${stats.pace === "behind" ? "text-accent" : "text-success"}`}>
            {stats.pacePercent}% {stats.pace} pace
          </span>.
        </motion.h1>
        <p className="text-sm text-muted-foreground mt-1">
          AI recalculated your week. Schedule adjusted for optimal coverage.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Nearest Exam" value={`${stats.nearestExam}d`} icon={AlertTriangle} variant="accent" />
        <StatCard label="Completion" value={`${stats.completionRate}%`} icon={Target} variant="primary" />
        <StatCard label="Topics Done" value={`${stats.completedTopics}/${stats.totalTopics}`} icon={BookOpen} variant="success" />
        <StatCard label="Hours Studied" value={stats.totalHoursStudied.toFixed(1)} icon={Clock} />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 space-y-4">
          <BurndownChart />
          <SubjectProgress />
        </div>
        <TodaySchedule />
      </div>
    </div>
  );
}
