interface CreateTaskRequestDto {
    title: string;
    description?: string;
    status?: TaskStatusDto;
    priority?: TaskPriorityDto;
    tags?: string;
    startDate?: Date;
    dueDate?: Date;
    projectId: number;
    authorUserId: number;
    assignedUserId?: number;
}

interface TaskDto {
    id: number;
    title: string;
    description: string | null;
    status: TaskStatusDto | null;
    priority: TaskPriorityDto | null;
    tags: string | null;
    startDate: Date | null;
    dueDate: Date | null;
    projectId: number;
    authorUserId: number;
    assignedUserId: number | null;
}


enum TaskStatusDto {
    TODO = "To Do",
    IN_PROGRESS = "In Progress",
    DONE = "Done",
}

enum TaskPriorityDto {
    LOW = "Low",
    MEDIUM = "Medium",
    HIGH = "High",
    URGENT = "Urgent",
}




export { CreateTaskRequestDto, TaskDto, TaskStatusDto, TaskPriorityDto }
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