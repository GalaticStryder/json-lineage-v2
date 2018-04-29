import { Input, NgModule } from '@angular/core';
import { Component, OnChanges } from '@angular/core';
import { Device, Update } from '../data-model';
import { DeviceService } from '../device.service';
import { DeviceListComponent } from '../device-list/device-list.component';

@Component({
  selector: 'update-list',
  templateUrl: './update-list.component.html',
  styleUrls: ['./update-list.component.css'],
  providers: [DeviceService]
})

@NgModule({
  declarations: [ DeviceListComponent ]
})

export class UpdateListComponent implements OnChanges {
  @Input()
  device: Device;

  updates: Update[];
  selectedUpdate: Update;

  constructor(private deviceService: DeviceService,
              private deviceListComponent: DeviceListComponent) { }

  ngOnChanges() {
    // console.log(this.device._id);
     this.deviceService
      .getUpdates(this.device._id)
      .then((updates: Update[]) => {
        this.updates = updates.map((update) => {
          return update;
        });
      });
  }

  getUpdates() {
    this.ngOnChanges();
  }

  selectUpdate(update: Update) {
    this.selectedUpdate = update;
  }
}
