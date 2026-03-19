import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const AI_RESPONSES: Record<string, string> = {
  default: "Based on your current schedule analysis: Physics has the highest urgency score (0.95) due to the exam in 10 days with difficulty level 5. I recommend allocating 40% of your study time to Physics, focusing on Quantum Mechanics first.\n\nYour burndown rate suggests you'll complete all topics 2 days before the Physics exam if you maintain current pace.",
  weak: "Your weakest subjects based on completion rate and difficulty:\n\n1. **Physics** — 33% complete, D5, 10 days left (Critical)\n2. **Mathematics** — 25% complete, D4, 14 days left (At Risk)\n3. **Chemistry** — 50% complete, D3, 18 days left (On Track)\n\nRecommendation: Shift 1.2h daily from CS to Physics.",
  schedule: "Schedule recalculated. Changes:\n\n• +1.5h Physics (Quantum Mechanics priority)\n• -0.5h Computer Science (ahead of pace)\n• Chemistry moved to afternoon slots for better retention\n• Added 30min review blocks before each new topic\n\nProjected completion: All topics covered 3 days before first exam.",
};

export default function AiChat() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", role: "assistant", content: "I'm your AI study assistant. Ask me about your schedule, weak subjects, or study strategies. I analyze your data in real-time." },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const lower = input.toLowerCase();
      let response = AI_RESPONSES.default;
      if (lower.includes("weak") || lower.includes("struggle")) response = AI_RESPONSES.weak;
      if (lower.includes("schedule") || lower.includes("recalculate")) response = AI_RESPONSES.schedule;

      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: "assistant", content: response }]);
    }, 800);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-3rem)]">
      <div className="mb-4">
        <h1 className="text-lg font-medium text-foreground">AI Study Assistant</h1>
        <p className="text-sm text-muted-foreground">Powered by priority scoring algorithm · Real-time analysis</p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-2">
        <AnimatePresence>
          {messages.map(msg => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`max-w-[80%] ${msg.role === "user" ? "ml-auto" : ""}`}
            >
              <div className={`p-3 rounded-md text-sm ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "surface"
              }`}>
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground mt-1 block">
                {msg.role === "assistant" ? "AETHER AI" : "YOU"}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="flex gap-2 pt-4 border-t border-border mt-4">
        <Input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
          placeholder="Ask about your schedule, weak subjects, strategies..."
          className="flex-1"
        />
        <Button onClick={sendMessage} size="icon">
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
