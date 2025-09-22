import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Inbox,
  Calendar,
  CalendarDays,
  Filter,
  User,
  BarChart3,
  Archive,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SettingsDialog } from "../settings/SettingsDialog";
import { CreateProjectDialog } from "../projects/CreateProjetDialog";

interface Project {
  id: string;
  name: string;
  description?: string;
  color: string;
  taskCount: number;
}

interface DashbaordSidebarProps {
  selectedProject: string;
  onProjectSelect: (project: string) => void;
  projects: Project[];
  taskCounts: Record<string, number>;
  onCreateProject: (project: Omit<Project, "id" | "taskCount">) => void;
  settings: any;
  onSettingsChange: (settings: any) => void;
}

const sidebarItems = [
  { id: "inbox", label: "Inbox", icon: Inbox },
  { id: "today", label: "Today", icon: Calendar },
  { id: "upcoming", label: "Upcoming", icon: CalendarDays },
  { id: "filters", label: "Filters & Labels", icon: Filter },
];

const bottomItems = [
  { id: "profile", label: "Profile", icon: User },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "archive", label: "Archive", icon: Archive },
];

export const DashbaordSidebar = ({
  selectedProject,
  onProjectSelect,
  projects,
  taskCounts,
  onCreateProject,
  settings,
  onSettingsChange,
}: DashbaordSidebarProps) => {
  return (
    <motion.div
      className="w-64 bg-sidebar-bg border-r border-sidebar-border flex flex-col"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <motion.div
        className="p-4 border-b border-sidebar-border"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-lg">TaskMaster</h2>
          <SettingsDialog
            settings={settings}
            onSettingsChange={onSettingsChange}
          />
        </div>
      </motion.div>

      {/* Main Navigation */}
      <div className="flex-1 p-4 space-y-6">
        <motion.div
          className="space-y-1"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {sidebarItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start text-sm font-normal transition-all duration-200",
                  selectedProject === item.id &&
                    "bg-accent text-accent-foreground shadow-sm",
                )}
                onClick={() => onProjectSelect(item.id)}
              >
                <item.icon className="h-4 w-4 mr-3" />
                {item.label}
                {taskCounts[item.id] > 0 && (
                  <motion.span
                    className="ml-auto text-xs bg-primary text-primary-foreground rounded-full px-2 py-0.5"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    {taskCounts[item.id]}
                  </motion.span>
                )}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Projects Section */}
        <motion.div
          className="space-y-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">
              Projects
            </h3>
            <CreateProjectDialog onCreateProject={onCreateProject} />
          </div>

          <div className="space-y-1">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start text-sm font-normal transition-all duration-200",
                    selectedProject === project.name &&
                      "bg-accent text-accent-foreground shadow-sm",
                  )}
                  onClick={() => onProjectSelect(project.name)}
                >
                  <motion.div
                    className="h-3 w-3 rounded-full mr-3"
                    style={{ backgroundColor: project.color }}
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  />
                  {project.name}
                  {taskCounts[project.name] > 0 && (
                    <motion.span
                      className="ml-auto text-xs bg-primary text-primary-foreground rounded-full px-2 py-0.5"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    >
                      {taskCounts[project.name]}
                    </motion.span>
                  )}
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Navigation */}
      <motion.div
        className="p-4 border-t border-sidebar-border space-y-1"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {bottomItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start text-sm font-normal",
                selectedProject === item.id &&
                  "bg-accent text-accent-foreground",
              )}
              onClick={() => onProjectSelect(item.id)}
            >
              <item.icon className="h-4 w-4 mr-3" />
              {item.label}
            </Button>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};
