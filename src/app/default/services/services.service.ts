import { Injectable } from '@angular/core';
import { AppContextService } from '@microsoft/windows-admin-center-sdk/angular';
import { PowerShell, QueryCache } from '@microsoft/windows-admin-center-sdk/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PowerShellScripts } from 'src/generated/powershell-scripts';

@Injectable({
    providedIn: 'root'
})
export class ServicesService {
    constructor(
        private appContextService: AppContextService
    ) { }

    public getServices(): Observable<any[]> {
        const command = PowerShell.createCommand(PowerShellScripts.Get_Services);

        return this.appContextService.powerShell.run(
            this.appContextService.connectionManager.activeConnection.name,
            command,
            {}
        ).pipe(
            map((response) => response.results)
        );
    }
}
