import { Component, OnInit } from '@angular/core';
import { ActionButtonAsync, ConnectionService, NotificationService } from '@microsoft/windows-admin-center-sdk/angular';
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
  public actions: ActionButtonAsync<Service>[] = [];

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

        if (this.selectedService) {
          const previous = this.selectedService;
          this.selectedService = this.services.find(service => service.name === previous.name);
        }

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


    const startServiceAction = new ActionButtonAsync<Service>();
    startServiceAction.text = this.strings.Actions.StartService.text;
    startServiceAction.iconClass = 'sme-icon sme-icon-play';
    startServiceAction.execute = (target) => {
      if (!target) {
        return;
      }
      const notification = this.notificationService.create(connectionName);
      const title = this.strings.Actions.StartService.Notification.title;
      notification.showInProgress(
        title,
        this.strings.Actions.StartService.Notification.progress.format(target.displayName)
      );

      this.servicesService.startService(target.name).subscribe(
        (result) => notification.showSuccess(title, this.strings.Actions.StartService.Notification.successs.format(target.name)),
        (error) => notification.showError(
          title,
          this.strings.Actions.StartService.Notification.error.format(target.name, Net.getErrorMessage(error))
        )
      );
    };

    this.actions.push(
      startServiceAction
    );

    const stopServiceAction = new ActionButtonAsync<Service>();
    stopServiceAction.text = this.strings.Actions.StopService.text;
    stopServiceAction.iconClass = 'sme-icon sme-icon-stop';
    stopServiceAction.execute = (target) => {
      if (!target) {
        return;
      }
      const stopServiceNotification = this.notificationService.create(connectionName);
      const title = this.strings.Actions.StopService.Notification.title;
      stopServiceNotification.showInProgress(
        title,
        this.strings.Actions.StopService.Notification.progress.format(target.displayName)
      );
      this.servicesService.stopService(target.name).subscribe(
        (result) => stopServiceNotification.showSuccess(title, this.strings.Actions.StopService.Notification.successs.format(target.name)),
        (error) => stopServiceNotification.showError(
          title,
          this.strings.Actions.StopService.Notification.error.format(target.displayName, Net.getErrorMessage(error))
        )
      );
    };
    this.actions.push(stopServiceAction);
  }

  /**
   * returns localized string for the status
   * @param status current status
   */
  public getStatusText(status: ServiceStatus) {
    return status === ServiceStatus.Running ? this.strings.Table.Content.Status.running : this.strings.Table.Content.Status.stopped;
  }
}
