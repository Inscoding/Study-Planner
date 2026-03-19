export interface Subject {
  id: string;
  name: string;
  code: string;
  examDate: Date;
  difficulty: number;
  color: string;
  topics: Topic[];
}

export interface Topic {
  id: string;
  subjectId: string;
  title: string;
  isCompleted: boolean;
  estimatedHours: number;
  priorityScore: number;
}

export interface ScheduleBlock {
  id: string;
  subjectId: string;
  subjectCode: string;
  subjectName: string;
  topicTitle: string;
  color: string;
  startHour: number;
  durationMinutes: number;
  day: number; // 0-6
}

export interface ProgressLog {
  date: string;
  hoursStudied: number;
  topicsCompleted: number;
  targetHours: number;
}

const now = new Date();
const daysFrom = (d: number) => new Date(now.getTime() + d * 86400000);

export const subjects: Subject[] = [
  {
    id: "s1", name: "Mathematics", code: "MATH", examDate: daysFrom(14), difficulty: 4,
    color: "hsl(195, 80%, 55%)",
    topics: [
      { id: "t1", subjectId: "s1", title: "Linear Algebra", isCompleted: true, estimatedHours: 3, priorityScore: 0.82 },
      { id: "t2", subjectId: "s1", title: "Calculus III", isCompleted: false, estimatedHours: 4, priorityScore: 0.91 },
      { id: "t3", subjectId: "s1", title: "Differential Equations", isCompleted: false, estimatedHours: 3.5, priorityScore: 0.88 },
      { id: "t4", subjectId: "s1", title: "Probability Theory", isCompleted: false, estimatedHours: 2.5, priorityScore: 0.75 },
    ],
  },
  {
    id: "s2", name: "Physics", code: "PHYS", examDate: daysFrom(10), difficulty: 5,
    color: "hsl(330, 70%, 55%)",
    topics: [
      { id: "t5", subjectId: "s2", title: "Quantum Mechanics", isCompleted: false, estimatedHours: 5, priorityScore: 0.95 },
      { id: "t6", subjectId: "s2", title: "Thermodynamics", isCompleted: true, estimatedHours: 3, priorityScore: 0.7 },
      { id: "t7", subjectId: "s2", title: "Electromagnetism", isCompleted: false, estimatedHours: 4, priorityScore: 0.89 },
    ],
  },
  {
    id: "s3", name: "Computer Science", code: "CS", examDate: daysFrom(21), difficulty: 3,
    color: "hsl(150, 60%, 45%)",
    topics: [
      { id: "t8", subjectId: "s3", title: "Data Structures", isCompleted: true, estimatedHours: 2, priorityScore: 0.5 },
      { id: "t9", subjectId: "s3", title: "Algorithms", isCompleted: false, estimatedHours: 3, priorityScore: 0.65 },
      { id: "t10", subjectId: "s3", title: "System Design", isCompleted: false, estimatedHours: 2.5, priorityScore: 0.58 },
    ],
  },
  {
    id: "s4", name: "Chemistry", code: "CHEM", examDate: daysFrom(18), difficulty: 3,
    color: "hsl(45, 90%, 55%)",
    topics: [
      { id: "t11", subjectId: "s4", title: "Organic Chemistry", isCompleted: false, estimatedHours: 4, priorityScore: 0.72 },
      { id: "t12", subjectId: "s4", title: "Inorganic Chemistry", isCompleted: true, estimatedHours: 2, priorityScore: 0.45 },
    ],
  },
];

export const scheduleBlocks: ScheduleBlock[] = [
  { id: "b1", subjectId: "s2", subjectCode: "PHYS", subjectName: "Physics", topicTitle: "Quantum Mechanics", color: "hsl(330, 70%, 55%)", startHour: 9, durationMinutes: 90, day: 0 },
  { id: "b2", subjectId: "s1", subjectCode: "MATH", subjectName: "Mathematics", topicTitle: "Calculus III", color: "hsl(195, 80%, 55%)", startHour: 11, durationMinutes: 60, day: 0 },
  { id: "b3", subjectId: "s3", subjectCode: "CS", subjectName: "Computer Science", topicTitle: "Algorithms", color: "hsl(150, 60%, 45%)", startHour: 14, durationMinutes: 60, day: 0 },
  { id: "b4", subjectId: "s1", subjectCode: "MATH", subjectName: "Mathematics", topicTitle: "Differential Equations", color: "hsl(195, 80%, 55%)", startHour: 9, durationMinutes: 75, day: 1 },
  { id: "b5", subjectId: "s2", subjectCode: "PHYS", subjectName: "Physics", topicTitle: "Electromagnetism", color: "hsl(330, 70%, 55%)", startHour: 11, durationMinutes: 90, day: 1 },
  { id: "b6", subjectId: "s4", subjectCode: "CHEM", subjectName: "Chemistry", topicTitle: "Organic Chemistry", color: "hsl(45, 90%, 55%)", startHour: 14, durationMinutes: 60, day: 1 },
  { id: "b7", subjectId: "s2", subjectCode: "PHYS", subjectName: "Physics", topicTitle: "Quantum Mechanics", color: "hsl(330, 70%, 55%)", startHour: 9, durationMinutes: 60, day: 2 },
  { id: "b8", subjectId: "s1", subjectCode: "MATH", subjectName: "Mathematics", topicTitle: "Probability Theory", color: "hsl(195, 80%, 55%)", startHour: 10.5, durationMinutes: 60, day: 2 },
  { id: "b9", subjectId: "s3", subjectCode: "CS", subjectName: "Computer Science", topicTitle: "System Design", color: "hsl(150, 60%, 45%)", startHour: 13, durationMinutes: 75, day: 2 },
  { id: "b10", subjectId: "s1", subjectCode: "MATH", subjectName: "Mathematics", topicTitle: "Calculus III", color: "hsl(195, 80%, 55%)", startHour: 9, durationMinutes: 90, day: 3 },
  { id: "b11", subjectId: "s4", subjectCode: "CHEM", subjectName: "Chemistry", topicTitle: "Organic Chemistry", color: "hsl(45, 90%, 55%)", startHour: 11, durationMinutes: 60, day: 3 },
  { id: "b12", subjectId: "s2", subjectCode: "PHYS", subjectName: "Physics", topicTitle: "Electromagnetism", color: "hsl(330, 70%, 55%)", startHour: 14, durationMinutes: 75, day: 3 },
  { id: "b13", subjectId: "s3", subjectCode: "CS", subjectName: "Computer Science", topicTitle: "Algorithms", color: "hsl(150, 60%, 45%)", startHour: 9, durationMinutes: 60, day: 4 },
  { id: "b14", subjectId: "s1", subjectCode: "MATH", subjectName: "Mathematics", topicTitle: "Differential Equations", color: "hsl(195, 80%, 55%)", startHour: 10.5, durationMinutes: 90, day: 4 },
];

export const progressLogs: ProgressLog[] = [
  { date: "Mon", hoursStudied: 3.5, topicsCompleted: 1, targetHours: 4 },
  { date: "Tue", hoursStudied: 4.2, topicsCompleted: 2, targetHours: 4 },
  { date: "Wed", hoursStudied: 2.8, topicsCompleted: 0, targetHours: 4 },
  { date: "Thu", hoursStudied: 4.0, topicsCompleted: 1, targetHours: 4 },
  { date: "Fri", hoursStudied: 3.2, topicsCompleted: 1, targetHours: 4 },
  { date: "Sat", hoursStudied: 5.1, topicsCompleted: 2, targetHours: 5 },
  { date: "Sun", hoursStudied: 1.5, topicsCompleted: 0, targetHours: 3 },
];

export const burndownData = Array.from({ length: 14 }, (_, i) => ({
  day: i + 1,
  remaining: Math.max(0, 32 - (i * 2.3) + Math.random() * 2 - 1),
  projected: 32 - (i * 32 / 14),
}));

export function calculatePriority(examUrgency: number, difficulty: number, remainingTopics: number): number {
  return (examUrgency * 0.5) + (difficulty * 0.3) + (remainingTopics * 0.2);
}

export function getStats() {
  const totalTopics = subjects.reduce((a, s) => a + s.topics.length, 0);
  const completedTopics = subjects.reduce((a, s) => a + s.topics.filter(t => t.isCompleted).length, 0);
  const totalHoursStudied = progressLogs.reduce((a, l) => a + l.hoursStudied, 0);
  const nearestExam = Math.min(...subjects.map(s => Math.ceil((s.examDate.getTime() - now.getTime()) / 86400000)));
  const completionRate = Math.round((completedTopics / totalTopics) * 100);
  const pace = completionRate > (100 - nearestExam * 7) ? "ahead" : "behind";
  const pacePercent = Math.abs(completionRate - (100 - nearestExam * 5));

  return { totalTopics, completedTopics, totalHoursStudied, nearestExam, completionRate, pace, pacePercent };
}
