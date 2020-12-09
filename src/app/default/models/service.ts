export enum ServiceStatus {
    Running = 'Running',
    Stopped = 'Stopped'
}

export interface Service {
    name: string;
    displayName: string;
    description: string;
    canStop: string;
    status: ServiceStatus;
}

export enum ServiceActionType {
    Start,
    Stop
}
