import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  Settings,
  Bell,
  Moon,
  Palette,
  Layout,
  Volume2,
  Keyboard,
  Database,
  Shield,
} from "lucide-react";

interface SettingsData {
  notifications: boolean;
  darkMode: boolean;
  compactView: boolean;
  soundEffects: boolean;
  autoSave: boolean;
  theme: string;
  fontSize: number;
  language: string;
}

interface SettingsDialogProps {
  settings: SettingsData;
  onSettingsChange: (settings: SettingsData) => void;
}

const settingSections = [
  {
    id: "appearance",
    title: "Appearance",
    icon: Palette,
    settings: [
      { key: "darkMode", label: "Dark Mode", type: "switch" },
      { key: "compactView", label: "Compact View", type: "switch" },
      { key: "theme", label: "Color Theme", type: "select" },
      { key: "fontSize", label: "Font Size", type: "slider" },
    ],
  },
  {
    id: "notifications",
    title: "Notifications",
    icon: Bell,
    settings: [
      { key: "notifications", label: "Push Notifications", type: "switch" },
      { key: "soundEffects", label: "Sound Effects", type: "switch" },
    ],
  },
  {
    id: "behavior",
    title: "Behavior",
    icon: Layout,
    settings: [
      { key: "autoSave", label: "Auto Save", type: "switch" },
      { key: "language", label: "Language", type: "select" },
    ],
  },
];

export const SettingsDialog = ({
  settings,
  onSettingsChange,
}: SettingsDialogProps) => {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("appearance");

  const updateSetting = (key: keyof SettingsData, value: any) => {
    onSettingsChange({
      ...settings,
      [key]: value,
    });
  };

  const renderSettingControl = (setting: any) => {
    const { key, label, type } = setting;

    switch (type) {
      case "switch":
        return (
          <div className="flex items-center justify-between">
            <Label htmlFor={key}>{label}</Label>
            <Switch
              id={key}
              checked={settings[key as keyof SettingsData] as boolean}
              onCheckedChange={(checked: any) => updateSetting(key, checked)}
            />
          </div>
        );

      case "select":
        if (key === "theme") {
          return (
            <div className="space-y-2">
              <Label>{label}</Label>
              <Select
                value={settings.theme}
                onValueChange={(value) => updateSetting("theme", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="blue">Ocean Blue</SelectItem>
                  <SelectItem value="green">Forest Green</SelectItem>
                  <SelectItem value="purple">Royal Purple</SelectItem>
                  <SelectItem value="orange">Sunset Orange</SelectItem>
                </SelectContent>
              </Select>
            </div>
          );
        }

        if (key === "language") {
          return (
            <div className="space-y-2">
              <Label>{label}</Label>
              <Select
                value={settings.language}
                onValueChange={(value) => updateSetting("language", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                  <SelectItem value="sk">Slovenčina</SelectItem>
                </SelectContent>
              </Select>
            </div>
          );
        }
        break;

      case "slider":
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>{label}</Label>
              <span className="text-sm text-muted-foreground">
                {settings.fontSize}px
              </span>
            </div>
            <Slider
              value={[settings.fontSize]}
              onValueChange={([value]) => updateSetting("fontSize", value)}
              min={12}
              max={20}
              step={1}
              className="w-full"
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Settings className="h-4 w-4" />
          </Button>
        </motion.div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[700px] h-[600px]">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>

        <div className="flex h-full">
          {/* Sidebar */}
          <motion.div
            className="w-1/3 border-r pr-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="space-y-1">
              {settingSections.map((section) => (
                <motion.button
                  key={section.id}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                    activeSection === section.id
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                  onClick={() => setActiveSection(section.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <section.icon className="h-4 w-4" />
                  <span className="font-medium">{section.title}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Content */}
          <div className="flex-1 pl-6">
            <AnimatePresence mode="wait">
              {settingSections.map(
                (section) =>
                  section.id === activeSection && (
                    <motion.div
                      key={section.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center gap-3">
                        <section.icon className="h-5 w-5 text-primary" />
                        <h3 className="text-lg font-semibold">
                          {section.title}
                        </h3>
                      </div>

                      <div className="space-y-4">
                        {section.settings.map((setting, index) => (
                          <motion.div
                            key={setting.key}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            {renderSettingControl(setting)}
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  ),
              )}
            </AnimatePresence>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
