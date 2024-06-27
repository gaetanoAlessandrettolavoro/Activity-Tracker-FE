import { Task } from "./taskModel";
import { User } from "./userModel";

export interface Activity {
    _id?: string;
    taskName: Task["taskName"];
    taskID: Task["_id"];
    startTime: Date;
    endTime: Date;
    notes: string;
    userID?: User["_id"];
    isActive?: boolean;
    hours?: string;
}