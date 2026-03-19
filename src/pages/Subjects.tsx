import { useState } from "react";
import { subjects as initialSubjects, type Subject, type Topic } from "@/lib/mock-data";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function Subjects() {
  const [subjectsList, setSubjectsList] = useState<Subject[]>(initialSubjects);
  const [newSubject, setNewSubject] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const toggleTopic = (subjectId: string, topicId: string) => {
    setSubjectsList(prev =>
      prev.map(s =>
        s.id === subjectId
          ? { ...s, topics: s.topics.map(t => t.id === topicId ? { ...t, isCompleted: !t.isCompleted } : t) }
          : s
      )
    );
  };

  const addSubject = () => {
    if (!newSubject.trim()) return;
    const id = `s${Date.now()}`;
    const colors = ["hsl(195, 80%, 55%)", "hsl(330, 70%, 55%)", "hsl(150, 60%, 45%)", "hsl(45, 90%, 55%)", "hsl(270, 60%, 55%)"];
    setSubjectsList(prev => [...prev, {
      id,
      name: newSubject.trim(),
      code: newSubject.trim().substring(0, 4).toUpperCase(),
      examDate: new Date(Date.now() + 30 * 86400000),
      difficulty: 3,
      color: colors[prev.length % colors.length],
      topics: [],
    }]);
    setNewSubject("");
    setDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-medium text-foreground">Subjects & Topics</h1>
          <p className="text-sm text-muted-foreground">Manage your subjects. Mark topics complete to trigger AI recalculation.</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1.5">
              <Plus className="w-3.5 h-3.5" /> Add Subject
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Subject</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <Input
                placeholder="Subject name (e.g. Mathematics)"
                value={newSubject}
                onChange={e => setNewSubject(e.target.value)}
                onKeyDown={e => e.key === "Enter" && addSubject()}
              />
              <Button onClick={addSubject} className="w-full">Create Subject</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
          {subjectsList.map(subject => {
            const completed = subject.topics.filter(t => t.isCompleted).length;
            const total = subject.topics.length;
            const daysLeft = Math.ceil((subject.examDate.getTime() - Date.now()) / 86400000);

            return (
              <motion.div
                key={subject.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="surface p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ background: subject.color }} />
                    <h3 className="font-medium text-foreground">{subject.name}</h3>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{subject.code}</span>
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">
                    {daysLeft}d · D{subject.difficulty}
                  </span>
                </div>

                {total > 0 && (
                  <div className="h-1 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      animate={{ width: `${(completed / total) * 100}%` }}
                      className="h-full rounded-full"
                      style={{ background: subject.color }}
                    />
                  </div>
                )}

                <div className="space-y-1">
                  {subject.topics.map(topic => (
                    <motion.div
                      key={topic.id}
                      layout
                      className="flex items-center gap-2 p-2 rounded-sm hover:bg-secondary/50 cursor-pointer group"
                      onClick={() => toggleTopic(subject.id, topic.id)}
                    >
                      <div className={`w-4 h-4 rounded-sm border flex items-center justify-center shrink-0 transition-colors ${
                        topic.isCompleted ? "bg-success border-success" : "border-muted-foreground/30"
                      }`}>
                        {topic.isCompleted && <Check className="w-2.5 h-2.5 text-success-foreground" />}
                      </div>
                      <span className={`text-sm flex-1 ${topic.isCompleted ? "line-through text-muted-foreground" : "text-foreground"}`}>
                        {topic.title}
                      </span>
                      <span className="font-mono text-[10px] text-muted-foreground">
                        {topic.estimatedHours}h · P{topic.priorityScore.toFixed(2)}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
