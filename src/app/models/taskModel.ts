export interface Task {
    _id: string;
    taskName: string;
    isActive?: boolean;
    state?: string;
    progressState?: Number
}