import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Users table
  users: defineTable({
    name: v.string(),
    email: v.string(),
    image: v.optional(v.string()),
    tokenIdentifier: v.string(),
    subscriptionTier: v.union(v.literal("free"), v.literal("pro"), v.literal("business")),
    subscriptionEnds: v.optional(v.number()),
    timezone: v.string(),
    preferences: v.optional(v.object({
      theme: v.union(v.literal("light"), v.literal("dark"), v.literal("system")),
      startOfWeek: v.union(v.literal("sunday"), v.literal("monday")),
      defaultView: v.union(v.literal("inbox"), v.literal("today"), v.literal("upcoming"))
    }))
  })
    .index("by_token", ["tokenIdentifier"])
    .index("by_email", ["email"]),

  // Projects table
  projects: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    color: v.string(), // hex color code
    icon: v.optional(v.string()),
    userId: v.id("users"),
    teamId: v.optional(v.id("teams")),
    isArchived: v.boolean(),
    position: v.number(), // for sorting
    view: v.union(v.literal("list"), v.literal("board")),
    createdAt: v.number(),
    updatedAt: v.number()
  })
    .index("by_user", ["userId"])
    .index("by_team", ["teamId"])
    .index("by_user_archived", ["userId", "isArchived"]),

  // Tasks table
  tasks: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    projectId: v.id("projects"),
    userId: v.id("users"),
    assigneeId: v.optional(v.id("users")), // for collaboration
    dueDate: v.optional(v.number()), // timestamp
    priority: v.union(v.literal("p1"), v.literal("p2"), v.literal("p3"), v.literal("p4")),
    labels: v.array(v.string()),
    isCompleted: v.boolean(),
    completedAt: v.optional(v.number()),
    isRecurring: v.boolean(),
    recurringPattern: v.optional(v.string()), // "daily", "weekly", etc.
    position: v.number(), // for sorting within project
    sectionId: v.optional(v.id("sections")), // for organizing tasks into sections
    parentTaskId: v.optional(v.id("tasks")), // for subtasks
    estimatedDuration: v.optional(v.number()), // in minutes
    timeSpent: v.optional(v.number()), // total time spent in minutes
    createdAt: v.number(),
    updatedAt: v.number()
  })
    .index("by_project", ["projectId"])
    .index("by_user", ["userId"])
    .index("by_due_date", ["dueDate"])
    .index("by_completed", ["isCompleted"])
    .index("by_project_completed", ["projectId", "isCompleted"])
    .index("by_user_completed", ["userId", "isCompleted"]),

  // Sections table (for organizing tasks within projects)
  sections: defineTable({
    name: v.string(),
    projectId: v.id("projects"),
    userId: v.id("users"),
    position: v.number(),
    isArchived: v.boolean()
  })
    .index("by_project", ["projectId"])
    .index("by_user", ["userId"]),

  // Comments table
  comments: defineTable({
    content: v.string(),
    taskId: v.id("tasks"),
    userId: v.id("users"),
    parentCommentId: v.optional(v.id("comments")), // for threaded comments
    isEdited: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number()
  })
    .index("by_task", ["taskId"])
    .index("by_user", ["userId"]),

  // Labels table
  labels: defineTable({
    name: v.string(),
    color: v.string(), // hex color code
    userId: v.id("users"),
    projectId: v.optional(v.id("projects")), // project-specific labels
    isGlobal: v.boolean(), // user-wide labels
    createdAt: v.number()
  })
    .index("by_user", ["userId"])
    .index("by_project", ["projectId"])
});