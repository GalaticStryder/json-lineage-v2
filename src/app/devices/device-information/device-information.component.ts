import { Component, OnInit } from '@angular/core';
import { Device } from '../device';
import { DeviceService } from '../device.service';

@Component({
  selector: 'device-information',
  templateUrl: './device-information.component.html',
  styleUrls: ['./device-information.component.css']
})

export class DeviceInformationComponent {
  @Input()
  device: Device;

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor(private contactService: ContactService) { }

  createDevice(device: Device) {
    this.deviceService.createDevice(device).then((newDevice: Device) => {
      this.createHandler(newDevice);
    });
  }

  updateDevice(device: Device): void {
    this.deviceService.updateDevice(device).then((updatedDevice: Device) => {
      this.updateHandler(updatedDevice);
    });
  }

  deleteDevice(deviceId: String): void {
    this.deviceService.deleteDevice(deviceId).then((deletedDeviceId: String) => {
      this.deleteHandler(deletedDeviceId);
    });
  }
}
