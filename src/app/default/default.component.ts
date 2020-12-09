import { Component, OnInit } from '@angular/core';
import { ConnectionService, NotificationService } from '@microsoft/windows-admin-center-sdk/angular';
import { Net } from '@microsoft/windows-admin-center-sdk/core';
import { Strings } from 'src/generated/strings';
import { Service, ServiceStatus } from './models/service';
import { ServicesService } from './services/services.service';

@Component({
  selector: 'default-component',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {
  public strings = MsftSme.getStrings<Strings>().Contosoadcholdemo.Default;

  public services: Service[];
  public selectedService: Service;

  public isLoading: boolean;

  constructor(
    private servicesService: ServicesService,
    private notificationService: NotificationService,
    private connectionService: ConnectionService
  ) { }

  public ngOnInit() {
    this.isLoading = true;

    const connectionName = this.connectionService.activeConnection.name;

    const fetchNotification = this.notificationService.create(connectionName);
    const fetchNotificationTitle = this.strings.FetchingServicesNotification.title;
    fetchNotification.showInProgress(
      fetchNotificationTitle,
      this.strings.FetchingServicesNotification.progress
    );
    this.servicesService.getServices().subscribe(
      (services) => {
        this.isLoading = false;
        this.services = services;
        fetchNotification.showSuccess(
          fetchNotificationTitle,
          this.strings.FetchingServicesNotification.sucess
        );
      },
      (error => {
        this.isLoading = false;
        fetchNotification.showError(
          fetchNotificationTitle,
          this.strings.FetchingServicesNotification.error.format(Net.getErrorMessage(error))
        );
      })
    );
  }

  /**
   * returns localized string for the status
   * @param status current status
   */
  public getStatusText(status: ServiceStatus) {
    return status === ServiceStatus.Running ? this.strings.Table.Content.Status.running : this.strings.Table.Content.Status.stopped;
  }
}
