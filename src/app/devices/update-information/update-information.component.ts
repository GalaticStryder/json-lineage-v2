import { Component, Input } from '@angular/core';
import { Update, Device } from '../data-model';
import { DeviceService } from '../device.service';

@Component({
  selector: 'update-information',
  templateUrl: './update-information.component.html',
  styleUrls: ['./update-information.component.css']
})

export class UpdateInformationComponent {
  @Input()
  update: Update;

  @Input()
  device: Device;

  @Input()
  romTypes: any[];

  @Input()
  romVersions: any[];

  @Input()
  updateNumber: number;

  @Input()
  createHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor(private deviceService: DeviceService) { }

  createUpdate(update: Update) {
    this.deviceService.createUpdate(this.device._id, update).then((newUpdate: Update) => {
      this.createHandler(newUpdate);
    });
  }

  deleteUpdate(updateNumber: Number): void {
    const updateId = this.update.id;
    this.deviceService.deleteUpdate(this.device._id, updateNumber.toString()).then((deletedUpdateString: String) => {
      this.deleteHandler(deletedUpdateString, updateId);
    });
  }
}
