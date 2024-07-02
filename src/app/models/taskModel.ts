export interface Task {
    _id: string;
    taskName: string;
    isActive?: boolean;
    expectedHours?: number;
    state?: string;
    progressState?: number
}