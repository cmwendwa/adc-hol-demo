export enum ServiceStatus {
    Running = 'Running',
    Stopped = 'Stopped'
}

export interface Service {
    name: string;
    displayName: string;
    id: string;
    description: string;
    canStop: string;
    status: ServiceStatus;
}
