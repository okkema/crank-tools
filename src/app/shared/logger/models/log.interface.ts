import { LogLevel } from './log.level.enum';

export interface ILog {
    id?: number;
    level: LogLevel;
    message: string;
};
