import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  variant?: "default" | "primary" | "accent" | "success";
}

const variantStyles = {
  default: "rim-light",
  primary: "rim-light-active glow-primary",
  accent: "rim-light-accent glow-accent",
  success: "glow-success",
};

const iconColors = {
  default: "text-muted-foreground",
  primary: "text-primary",
  accent: "text-accent",
  success: "text-success",
};

export function StatCard({ label, value, icon: Icon, variant = "default" }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("bg-card rounded-md p-4 flex items-start justify-between", variantStyles[variant])}
    >
      <div>
        <p className="stat-label mb-1">{label}</p>
        <p className="stat-value text-foreground">{value}</p>
      </div>
      <Icon className={cn("w-5 h-5 mt-1", iconColors[variant])} />
    </motion.div>
  );
}
