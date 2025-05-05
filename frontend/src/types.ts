export interface Task {
    id: number;
    title: string;
    parent?: Task;
    subtasks?: Task[];
  }