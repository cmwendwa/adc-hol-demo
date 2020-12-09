import { Component, OnInit } from '@angular/core';
import { ConnectionService, NotificationService } from '@microsoft/windows-admin-center-sdk/angular';
import { Net } from '@microsoft/windows-admin-center-sdk/core';
import { Service } from './models/service';
import { ServicesService } from './services/services.service';

@Component({
  selector: 'default-component',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {
  public services: Service[];
  public isLoading: boolean;
  constructor(
    private servicesService: ServicesService,
    private notificationService: NotificationService,
    private connectionService: ConnectionService
  ) {}

  public ngOnInit() {
    this.isLoading = true;

    const connectionName = this.connectionService.activeConnection.name;

    const fetchNotification = this.notificationService.create(connectionName);
    const fetchNotificationTitle = 'Fetch services';
    fetchNotification.showInProgress(
      fetchNotificationTitle,
      'Fetching services'
    );
    this.servicesService.getServices().subscribe(
      (services) => {
        this.isLoading = false;
        this.services = services;
        fetchNotification.showSuccess(
          fetchNotificationTitle,
          'Successfully fetched services'
        );
      },
      (error => {
        this.isLoading = false;
        fetchNotification.showError(
          fetchNotificationTitle,
          'An error occcured while fetching services: {0}'.format(Net.getErrorMessage(error))
        );
      })
    );
  }
}
