import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Palette } from "lucide-react";
import { RichTextEditor } from "../editor/RichTextEditor";

interface Project {
  id: string;
  name: string;
  description?: string;
  color: string;
  taskCount: number;
}

interface CreateProjectDialogProps {
  onCreateProject: (project: Omit<Project, "id" | "taskCount">) => void;
}

const projectColors = [
  "#EF4444", // red
  "#F97316", // orange
  "#EAB308", // yellow
  "#22C55E", // green
  "#3B82F6", // blue
  "#8B5CF6", // purple
  "#EC4899", // pink
  "#6B7280", // gray
];

const colorVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.1 },
  tap: { scale: 0.95 },
};

export const CreateProjectDialog = ({
  onCreateProject,
}: CreateProjectDialogProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedColor, setSelectedColor] = useState(projectColors[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onCreateProject({
      name: name.trim(),
      description: description.trim() || undefined,
      color: selectedColor,
    });

    setName("");
    setDescription("");
    setSelectedColor(projectColors[0]);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            <Plus className="h-3 w-3" />
          </Button>
        </motion.div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
        </DialogHeader>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Label htmlFor="name">Project Name</Label>
            <Input
              id="name"
              placeholder="Enter project name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </motion.div>

          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Label htmlFor="description">Description</Label>
            <RichTextEditor
              content={description}
              onChange={setDescription}
              placeholder="Describe your project... You can use rich text formatting!"
              className="min-h-[120px]"
            />
          </motion.div>

          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Label>Color Theme</Label>
            <div className="flex items-center gap-3">
              <Palette className="h-4 w-4 text-muted-foreground" />
              <div className="flex gap-3">
                {projectColors.map((color) => (
                  <motion.button
                    key={color}
                    type="button"
                    className="w-8 h-8 rounded-full border-2 transition-all relative"
                    style={{
                      backgroundColor: color,
                      borderColor:
                        selectedColor === color ? color : "transparent",
                    }}
                    onClick={() => setSelectedColor(color)}
                    variants={colorVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    {selectedColor === color && (
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-background"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="flex justify-end gap-3 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button type="submit" disabled={!name.trim()}>
                Create Project
              </Button>
            </motion.div>
          </motion.div>
        </motion.form>
      </DialogContent>
    </Dialog>
  );
};
