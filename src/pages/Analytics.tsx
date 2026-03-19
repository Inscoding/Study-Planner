import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, PieChart, Pie, Cell } from "recharts";
import { progressLogs, subjects, burndownData } from "@/lib/mock-data";
import { Area, AreaChart } from "recharts";
import { motion } from "framer-motion";

const subjectDistribution = subjects.map(s => ({
  name: s.name,
  hours: s.topics.reduce((a, t) => a + t.estimatedHours, 0),
  color: s.color,
}));

const tooltipStyle = {
  background: "hsl(230, 18%, 14%)",
  border: "1px solid hsl(230, 15%, 20%)",
  borderRadius: 6,
  fontFamily: "JetBrains Mono",
  fontSize: 11,
};

export default function Analytics() {
  const totalHours = progressLogs.reduce((a, l) => a + l.hoursStudied, 0);
  const totalTopics = progressLogs.reduce((a, l) => a + l.topicsCompleted, 0);
  const avgHours = (totalHours / progressLogs.length).toFixed(1);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-medium text-foreground">Study Analytics</h1>
        <p className="text-sm text-muted-foreground">
          <span className="font-mono text-foreground">{totalHours.toFixed(1)}h</span> studied this week ·{" "}
          <span className="font-mono text-foreground">{totalTopics}</span> topics completed ·{" "}
          <span className="font-mono text-foreground">{avgHours}h</span> daily avg
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="surface p-4">
          <h3 className="stat-label mb-4">Daily Hours</h3>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={progressLogs}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(230, 15%, 20%)" />
                <XAxis dataKey="date" stroke="hsl(215, 15%, 35%)" tick={{ fontSize: 10, fontFamily: "JetBrains Mono" }} />
                <YAxis stroke="hsl(215, 15%, 35%)" tick={{ fontSize: 10, fontFamily: "JetBrains Mono" }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="targetHours" fill="hsl(230, 15%, 22%)" radius={[2, 2, 0, 0]} />
                <Bar dataKey="hoursStudied" fill="hsl(195, 80%, 55%)" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="surface p-4">
          <h3 className="stat-label mb-4">Subject Distribution</h3>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={subjectDistribution} dataKey="hours" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3}>
                  {subjectDistribution.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-3 mt-2 justify-center">
            {subjectDistribution.map(s => (
              <div key={s.name} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                <span className="text-xs text-muted-foreground">{s.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="surface p-4 col-span-2">
          <h3 className="stat-label mb-4">Burndown Projection</h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={burndownData}>
                <defs>
                  <linearGradient id="gradBurn" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(330, 70%, 55%)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(330, 70%, 55%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(230, 15%, 20%)" />
                <XAxis dataKey="day" stroke="hsl(215, 15%, 35%)" tick={{ fontSize: 10, fontFamily: "JetBrains Mono" }} />
                <YAxis stroke="hsl(215, 15%, 35%)" tick={{ fontSize: 10, fontFamily: "JetBrains Mono" }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="projected" stroke="hsl(215, 15%, 35%)" strokeDasharray="4 4" fill="none" />
                <Area type="monotone" dataKey="remaining" stroke="hsl(330, 70%, 55%)" fill="url(#gradBurn)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
