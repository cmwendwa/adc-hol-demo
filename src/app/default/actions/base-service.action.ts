import { ActionButtonAsync, ActionContainer } from '@microsoft/windows-admin-center-sdk/angular';
import { Service, ServiceActionType, ServiceStatus } from '../models/service';

export class BaseServiceAction extends ActionButtonAsync<Service> {
    constructor(
        private actiontype: ServiceActionType
    ) {
        super();
    }
    public setActionState(target: Service, container: ActionContainer): void {
        super.setActionState(target, container);

        if (container.isBusy) {
            this.enabled = false;
        } else {
            this.enabled = this.calculateEnabled(target);
        }
    }

    protected calculateEnabled(target: Service) {
        switch (this.actiontype) {
            case ServiceActionType.Stop:
                return !!target && !!target.canStop;
            case ServiceActionType.Start:
                return !!target && target.status !== ServiceStatus.Running;
            default:
                return !!target;
        }
    }
}
