"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskPriorityDto = exports.TaskStatusDto = void 0;
var TaskStatusDto;
(function (TaskStatusDto) {
    TaskStatusDto["TODO"] = "To Do";
    TaskStatusDto["IN_PROGRESS"] = "In Progress";
    TaskStatusDto["DONE"] = "Done";
})(TaskStatusDto || (exports.TaskStatusDto = TaskStatusDto = {}));
var TaskPriorityDto;
(function (TaskPriorityDto) {
    TaskPriorityDto["LOW"] = "Low";
    TaskPriorityDto["MEDIUM"] = "Medium";
    TaskPriorityDto["HIGH"] = "High";
    TaskPriorityDto["URGENT"] = "Urgent";
})(TaskPriorityDto || (exports.TaskPriorityDto = TaskPriorityDto = {}));
/*
  id             Int               @id @default(autoincrement())
  title          String
  description    String?
  status         String?
  priority       String?
  tags           String?
  startDate      DateTime?
  dueDate        DateTime?
  points         Int?
  projectId      Int
  authorUserId   Int
  assignedUserId Int?
  project        Project           @relation(fields: [projectId], references: [id])
  author         User              @relation("TaskAuthor", fields: [authorUserId], references: [userId])
  assignee       User?             @relation("TaskAssignee", fields: [assignedUserId], references: [userId])
  taskAssignment TaskAssignement[]
  attachments    Attachment[]
  comments       Comment[]
*/ 
