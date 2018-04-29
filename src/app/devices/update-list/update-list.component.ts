import { Component, Input, OnChanges } from '@angular/core';
import { Device, Update } from '../data-model';
import { DeviceService } from '../device.service';

@Component({
  selector: 'update-list',
  templateUrl: './update-list.component.html',
  styleUrls: ['./update-list.component.css'],
  providers: [DeviceService]
})

export class UpdateListComponent implements OnChanges {
  @Input()
  device: Device;

  updates: Update[];
  selectedUpdate: Update;
  updateNumber: number;

  constructor(private deviceService: DeviceService) { }

  ngOnChanges() {
    /* Don't send HTTP request if ID is not defined. */
    if (this.device._id !== undefined) {
      this.deviceService
        .getUpdates(this.device._id)
        .then((updates: Update[]) => {
          this.updates = updates.map((update) => {
            return update;
          });
        });
    }
  }

  getUpdates() {
    this.ngOnChanges();
  }

  selectUpdate(update: Update) {
    this.selectedUpdate = update;
    this.selectedUpdateCount(update);
  }

  private getIndexOfUpdate = (updateId: Number) => {
    return this.updates.findIndex((update) => {
      return update.id === updateId;
    });
  }

  selectedUpdateCount(update: Update) {
    var idx = this.getIndexOfUpdate(update.id);
    if (idx !== -1) {
      console.log('Update index is at ' + idx);
      this.updateNumber = idx;
    }
  }
}
