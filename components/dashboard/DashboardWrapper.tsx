"use client";

import { FC, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Search, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import TaskItem, { Task } from "../tasks/TaskItem";
import { DashbaordSidebar } from "./DashboardSidebar";
import AddTaskForm from "../tasks/AddTaskForm";

interface Project {
  id: string;
  name: string;
  description?: string;
  color: string;
  taskCount: number;
}

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Review project proposal",
    completed: false,
    priority: "high",
    dueDate: "2024-09-25",
    project: "Work",
  },
  {
    id: "2",
    title: "Buy groceries",
    completed: false,
    priority: "medium",
    project: "Personal",
  },
  {
    id: "3",
    title: "Call dentist",
    completed: true,
    priority: "low",
    dueDate: "2024-09-23",
    project: "Personal",
  },
  {
    id: "4",
    title: "Prepare presentation slides",
    completed: false,
    priority: "high",
    dueDate: "2024-09-26",
    project: "Work",
  },
];

const initialProjects: Project[] = [
  {
    id: "1",
    name: "Work",
    color: "#3B82F6",
    taskCount: 0,
    description: "Work-related tasks",
  },
  {
    id: "2",
    name: "Personal",
    color: "#10B981",
    taskCount: 0,
    description: "Personal tasks and goals",
  },
  {
    id: "3",
    name: "Shopping",
    color: "#F59E0B",
    taskCount: 0,
    description: "Shopping lists and errands",
  },
  {
    id: "4",
    name: "Health",
    color: "#EF4444",
    taskCount: 0,
    description: "Health and fitness goals",
  },
];

const DashboardWrapper: FC = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [selectedProject, setSelectedProject] = useState("inbox");
  const [searchQuery, setSearchQuery] = useState("");
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    compactView: false,
    soundEffects: true,
    autoSave: true,
    theme: "blue",
    fontSize: 14,
    language: "en",
    emailNotifications: true,
    taskReminders: true,
    weeklyDigest: false,
    dataBackup: true,
    analyticsTracking: false,
    keyboardShortcuts: true,
    animationsEnabled: true,
    autoSync: true,
    timeFormat: "12h",
    dateFormat: "mdy",
  });

  const handleToggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleAddTask = (newTask: Omit<Task, "id" | "completed">) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
      completed: false,
    };
    setTasks([...tasks, task]);
  };

  const handleCreateProject = (
    newProject: Omit<Project, "id" | "taskCount">,
  ) => {
    const project: Project = {
      ...newProject,
      id: Date.now().toString(),
      taskCount: 0,
    };
    setProjects([...projects, project]);
  };

  const getFilteredTasks = () => {
    let filtered = tasks;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Filter by selected project/view
    if (selectedProject === "inbox") {
      return filtered;
    } else if (selectedProject === "today") {
      const today = new Date().toISOString().split("T")[0];
      return filtered.filter((task) => task.dueDate === today);
    } else if (selectedProject === "upcoming") {
      const today = new Date().toISOString().split("T")[0];
      return filtered.filter((task) => task.dueDate && task.dueDate > today);
    } else if (projects.find((p) => p.name === selectedProject)) {
      return filtered.filter((task) => task.project === selectedProject);
    }

    return filtered;
  };

  const getTaskCounts = () => {
    const counts: Record<string, number> = {
      inbox: tasks.filter((t) => !t.completed).length,
      today: tasks.filter(
        (t) =>
          !t.completed && t.dueDate === new Date().toISOString().split("T")[0],
      ).length,
      upcoming: tasks.filter(
        (t) =>
          !t.completed &&
          t.dueDate &&
          t.dueDate > new Date().toISOString().split("T")[0],
      ).length,
    };

    projects.forEach((project) => {
      counts[project.name] = tasks.filter(
        (t) => !t.completed && t.project === project.name,
      ).length;
    });

    return counts;
  };

  const filteredTasks = getFilteredTasks();
  const taskCounts = getTaskCounts();

  const getPageTitle = () => {
    if (selectedProject === "inbox") return "Inbox";
    if (selectedProject === "today") return "Today";
    if (selectedProject === "upcoming") return "Upcoming";
    return selectedProject;
  };

  return (
    <motion.div
      className="flex h-screen bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <DashbaordSidebar
        selectedProject={selectedProject}
        onProjectSelect={setSelectedProject}
        projects={projects}
        taskCounts={taskCounts}
        onCreateProject={handleCreateProject}
        settings={settings}
        onSettingsChange={setSettings}
      />

      <motion.div
        className="flex-1 flex flex-col"
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <motion.header
          className="border-b px-6 py-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/">
                    <ArrowLeft className="h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
              <motion.h1
                className="text-2xl font-semibold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {getPageTitle()}
              </motion.h1>
            </div>
            <div className="flex items-center gap-2">
              <motion.div
                className="relative"
                initial={{ width: 0 }}
                animate={{ width: "auto" }}
                transition={{ delay: 0.4 }}
              >
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-64"
                />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.header>

        <motion.main
          className="flex-1 overflow-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="min-h-full flex items-start justify-center p-6">
            <motion.div
              className="w-full max-w-3xl space-y-3"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <AddTaskForm
                  onAddTask={handleAddTask}
                  projects={projects}
                  selectedProject={
                    selectedProject === "inbox"
                      ? projects[1]?.name || "Personal"
                      : selectedProject
                  }
                />
              </motion.div>

              <AnimatePresence>
                {filteredTasks.length === 0 ? (
                  <motion.div
                    className="text-center py-12 text-muted-foreground"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    {searchQuery
                      ? "No tasks found matching your search."
                      : "No tasks in this view."}
                  </motion.div>
                ) : (
                  filteredTasks.map((task, index) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.95 }}
                      transition={{ delay: index * 0.05 }}
                      layout
                    >
                      <TaskItem
                        task={task}
                        onToggle={handleToggleTask}
                        onDelete={handleDeleteTask}
                      />
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.main>
      </motion.div>
    </motion.div>
  );
};

export default DashboardWrapper;
