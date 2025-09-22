"use client";

import { useState, FC } from "react";
import { motion } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Calendar, Flag, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: "low" | "medium" | "high" | "none";
  dueDate?: string;
  project: string;
}

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const priorityColors = {
  high: "text-priority-high",
  medium: "text-priority-medium",
  low: "text-priority-low",
  none: "text-muted-foreground",
};

const TaskItem = ({ task, onToggle, onDelete }: TaskItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={cn(
        "group flex items-center gap-3 p-3 rounded-lg border transition-all duration-200",
        "hover:bg-task-hover hover:shadow-sm",
        task.completed && "opacity-60",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.01, y: -1 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      layout
    >
      <motion.div whileTap={{ scale: 0.95 }}>
        <Checkbox
          checked={task.completed}
          onCheckedChange={() => onToggle(task.id)}
          className="shrink-0"
        />
      </motion.div>

      <div className="flex-1 min-w-0">
        <motion.p
          className={cn(
            "text-sm transition-all duration-200",
            task.completed && "line-through text-muted-foreground",
          )}
          animate={{
            opacity: task.completed ? 0.6 : 1,
            scale: task.completed ? 0.98 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          {task.title}
        </motion.p>

        <motion.div
          className="flex items-center gap-2 mt-1"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {task.dueDate && (
            <motion.div
              className="flex items-center gap-1 text-xs text-muted-foreground"
              whileHover={{ scale: 1.05 }}
            >
              <Calendar className="h-3 w-3" />
              <span>{task.dueDate}</span>
            </motion.div>
          )}

          {task.priority !== "none" && (
            <motion.div
              whileHover={{ scale: 1.2, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <Flag className={cn("h-3 w-3", priorityColors[task.priority])} />
            </motion.div>
          )}

          <motion.span
            className="text-xs text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {task.project}
          </motion.span>
        </motion.div>
      </div>

      {(isHovered || task.completed) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(task.id)}
            className="shrink-0"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TaskItem;
