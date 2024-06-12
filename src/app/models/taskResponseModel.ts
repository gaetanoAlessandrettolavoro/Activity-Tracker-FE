import { Task } from './taskModel';

export interface TaskResponse {
  data: {
    document: Task[];
  };
}
