import { Injectable } from '@angular/core';
import { Device } from './device';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DeviceService {
  private devicesUrl = '/api/devices';

  constructor(private http: Http) { }

    // get("/api/devices")
    getDevices(): Promise<Device[]> {
      return this.http.get(this.devicesUrl)
                 .toPromise()
                 .then(response => response.json() as Device[])
                 .catch(this.handleError);
    }

    // post("/api/devices")
    createDevice(newDevice: Device): Promise<Device> {
      return this.http.post(this.devicesUrl, newDevice)
                 .toPromise()
                 .then(response => response.json() as Device)
                 .catch(this.handleError);
    }

    // delete("/api/devices/:id")
    deleteDevice(delDeviceId: String): Promise<String> {
      return this.http.delete(this.devicesUrl + '/' + delDeviceId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    // put("/api/devices/:id")
    updateDevice(putDevice: Device): Promise<Device> {
      var putUrl = this.devicesUrl + '/' + putDevice._id;
      return this.http.put(putUrl, putDevice)
                 .toPromise()
                 .then(response => response.json() as Device)
                 .catch(this.handleError);
    }

    private handleError (error: any): Promise<any> {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Internal server error!';
      console.error(errMsg);
      return Promise.reject(errMsg);
    }
}
