interface Task {
    taskName: string;
    isActive?: boolean,
    state?: string,
    progressState?: Number
}

export interface Activity {
    taskName: Task["taskName"];
    taskID?: string;
    activityDate: Date;
    startTime: Date;
    endTime: Date;
    notes: string;
    userID?: string;
    isActive?: boolean;
}