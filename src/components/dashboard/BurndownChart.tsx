import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { burndownData } from "@/lib/mock-data";

export function BurndownChart() {
  return (
    <div className="surface p-4">
      <h3 className="stat-label mb-4">Topic Burndown</h3>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={burndownData}>
            <defs>
              <linearGradient id="gradRemaining" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(195, 80%, 55%)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="hsl(195, 80%, 55%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(230, 15%, 20%)" />
            <XAxis dataKey="day" stroke="hsl(215, 15%, 35%)" tick={{ fontSize: 10, fontFamily: "JetBrains Mono" }} />
            <YAxis stroke="hsl(215, 15%, 35%)" tick={{ fontSize: 10, fontFamily: "JetBrains Mono" }} />
            <Tooltip
              contentStyle={{
                background: "hsl(230, 18%, 14%)",
                border: "1px solid hsl(230, 15%, 20%)",
                borderRadius: 6,
                fontFamily: "JetBrains Mono",
                fontSize: 11,
              }}
            />
            <Area type="monotone" dataKey="projected" stroke="hsl(215, 15%, 35%)" strokeDasharray="4 4" fill="none" />
            <Area type="monotone" dataKey="remaining" stroke="hsl(195, 80%, 55%)" fill="url(#gradRemaining)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
