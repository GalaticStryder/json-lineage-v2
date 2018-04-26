import { Injectable } from '@angular/core';
import { Device } from './data-model';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DeviceService {
  private devicesUrl = '/api/devices';

  constructor(private httpClient: HttpClient) { }

    // get("/api/devices")
    getDevices(): Promise<Device[]> {
      return this.httpClient.get(this.devicesUrl)
                 .toPromise()
                 .catch(this.handleError);
    }

    // post("/api/devices")
    createDevice(newDevice: Device): Promise<Device> {
      return this.httpClient.post(this.devicesUrl, newDevice)
                 .toPromise()
                 .catch(this.handleError);
    }

    // delete("/api/devices/:id")
    deleteDevice(delDeviceId: String): Promise<String> {
      return this.httpClient.delete(this.devicesUrl + '/' + delDeviceId)
                 .toPromise()
                 .catch(this.handleError);
    }

    // put("/api/devices/:id")
    updateDevice(putDevice: Device): Promise<Device> {
      var putUrl = this.devicesUrl + '/' + putDevice._id;
      return this.httpClient.put(putUrl, putDevice)
                 .toPromise()
                 .catch(this.handleError);
    }

    private handleError (error: any): Promise<any> {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Internal server error!';
      console.error(errMsg);
      return Promise.reject(errMsg);
    }
}
