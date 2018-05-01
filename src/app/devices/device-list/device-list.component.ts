import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../device.service';
import { Device } from '../data-model';

@Component({
  selector: 'device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css'],
  providers: [DeviceService]
})

export class DeviceListComponent implements OnInit {
  devices: Device[];
  selectedDevice: Device;

  constructor(private deviceService: DeviceService) { console.log('Initializing...'); }

  ngOnInit() {
     this.deviceService
      .getDevices()
      .then((devices: Device[]) => {
        this.devices = devices.map((device) => {
          return device;
        });
      });
  }

  private getIndexOfDevice = (deviceId: String) => {
    return this.devices.findIndex((device) => {
      return device._id === deviceId;
    });
  }

  getDevices() {
    this.ngOnInit();
  }

  selectDevice(device: Device) {
    this.selectedDevice = device;
  }

  createNewDevice() {
    var device: Device = {
      name: '',
      codename: '',
      updates: []
    };

    // By default, a newly-created device will have the selected state.
    this.selectDevice(device);
  }

  deleteDevice = (deviceId: String) => {
    var idx = this.getIndexOfDevice(deviceId);
    if (idx !== -1) {
      this.devices.splice(idx, 1);
      this.selectDevice(null);
    }
    return this.devices;
  }

  addDevice = (device: Device) => {
    this.devices.push(device);
    this.selectDevice(device);
    return this.devices;
  }

  updateDevice = (device: Device) => {
    var idx = this.getIndexOfDevice(device._id);
    if (idx !== -1) {
      this.devices[idx] = device;
      this.selectDevice(device);
    }
    return this.devices;
  }
}
