import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Flag, Calendar } from "lucide-react";
import { Task } from "./TaskItem";

interface Project {
  id: string;
  name: string;
  description?: string;
  color: string;
  taskCount: number;
}

interface AddTaskFormProps {
  onAddTask: (task: Omit<Task, "id" | "completed">) => void;
  projects: Project[];
  selectedProject: string;
}

const AddTaskForm = ({ onAddTask, projects, selectedProject }: AddTaskFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Task["priority"]>("none");
  const [dueDate, setDueDate] = useState("");
  const [project, setProject] = useState(selectedProject);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask({
      title: title.trim(),
      priority,
      dueDate: dueDate || undefined,
      project
    });

    setTitle("");
    setPriority("none");
    setDueDate("");
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <Button
        variant="ghost"
        className="w-full justify-start text-muted-foreground hover:text-foreground"
        onClick={() => setIsOpen(true)}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add task
      </Button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 p-3 border rounded-lg bg-card">
      <Input
        placeholder="Task name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        autoFocus
        className="border-none shadow-none text-base placeholder:text-muted-foreground"
      />
      
      <div className="flex items-center gap-2">
        <Select value={priority} onValueChange={(value: Task["priority"]) => setPriority(value)}>
          <SelectTrigger className="w-auto border-none shadow-none">
            <Flag className="h-4 w-4 mr-1" />
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">No priority</SelectItem>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>

        <Input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-auto border-none shadow-none"
        />

        <Select value={project} onValueChange={setProject}>
          <SelectTrigger className="w-auto border-none shadow-none">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {projects.map((proj) => (
              <SelectItem key={proj.id} value={proj.name}>
                <div className="flex items-center gap-2">
                  <div 
                    className="h-3 w-3 rounded-full" 
                    style={{ backgroundColor: proj.color }}
                  />
                  {proj.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-center gap-2">
        <Button type="submit" size="sm">
          Add task
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => {
            setIsOpen(false);
            setTitle("");
            setPriority("none");
            setDueDate("");
          }}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default AddTaskForm;