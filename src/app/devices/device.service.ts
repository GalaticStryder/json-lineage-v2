import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Device, Update } from './data-model';

@Injectable()
export class DeviceService {
  private devicesUrl = '/api/devices';

  constructor(private httpClient: HttpClient) { }

  getDevices(): Promise<Device[]> {
    return this.httpClient.get(this.devicesUrl)
      .toPromise()
      .catch(this.handleError);
  }

  createDevice(newDevice: Device): Promise<Device> {
    return this.httpClient.post(this.devicesUrl, newDevice)
      .toPromise()
      .catch(this.handleError);
  }

  deleteDevice(delDeviceId: String): Promise<String> {
    return this.httpClient.delete(this.devicesUrl + '/' + delDeviceId)
      .toPromise()
      .catch(this.handleError);
  }

  updateDevice(putDevice: Device): Promise<Device> {
    const putUrl = this.devicesUrl + '/' + putDevice._id;
    return this.httpClient.put(putUrl, putDevice)
      .toPromise()
      .catch(this.handleError);
  }

  getUpdates(getDeviceId): Promise<Update[]> {
    console.log('Fetching updates for ' + getDeviceId);
    return this.httpClient.get(this.devicesUrl + '/' + getDeviceId + '/updates')
      .toPromise()
      .catch(this.handleError);
  }

  createUpdate(getDeviceId, newUpdate: Update): Promise<Update> {
    console.log('Posting updates for ' + getDeviceId);
    return this.httpClient.post(this.devicesUrl + '/' + getDeviceId + '/updates', newUpdate)
      .toPromise()
      .catch(this.handleError);
  }

  private handleError (error: any): Promise<any> {
    const errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Internal server error!';
    console.error(errMsg);
    return Promise.reject(errMsg);
  }
}
