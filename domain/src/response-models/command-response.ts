export interface CommandSuccess {
    success: true;
}

export interface CommandError {
    success: false;
    error: string;
}

export type CommandResponse = CommandSuccess | CommandError;
