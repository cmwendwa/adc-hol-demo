import { Injectable } from '@angular/core';
import { AppContextService } from '@microsoft/windows-admin-center-sdk/angular';
import { PowerShell, QueryCache } from '@microsoft/windows-admin-center-sdk/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PowerShellScripts } from 'src/generated/powershell-scripts';
import { Service } from '../models/service';

@Injectable({
    providedIn: 'root'
})
export class ServicesService {
    public servicesQueryCache = new QueryCache<Service[], any>(() => this.getServices());

    constructor(
        private appContextService: AppContextService
    ) { }

    private getServices(): Observable<Service[]> {
        const command = PowerShell.createCommand(PowerShellScripts.Get_Services);

        return this.appContextService.powerShell.run(
            this.appContextService.connectionManager.activeConnection.name,
            command,
            {}
        ).pipe(
            map((response) => response.results)
        );
    }

    public startService(name: string): Observable<Service> {
        const command = PowerShell.createCommand(
            PowerShellScripts.Start_Service,
            { name: name }
        );

        return this.appContextService.powerShell.run(
            this.appContextService.connectionManager.activeConnection.name,
            command,
            {}
        ).pipe(
            map((response) => response.results)
        );
    }

    public stopService(name: string): Observable<Service> {
        const command = PowerShell.createCommand(
            PowerShellScripts.Stop_Service,
            { name: name }
        );

        return this.appContextService.powerShell.run(
            this.appContextService.connectionManager.activeConnection.name,
            command,
            {}
        ).pipe(
            map((response) => response.results)
        );
    }
}
