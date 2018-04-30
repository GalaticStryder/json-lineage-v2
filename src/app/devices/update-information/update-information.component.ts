import {Component, Input, Pipe} from '@angular/core';
import {Update, Device} from '../data-model';
import {DeviceService} from '../device.service';

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
  updateNumber: number;

  @Input()
  createHandler: Function;

  /* Properties */
  randomId: number;

  constructor(private deviceService: DeviceService) { }

  createUpdate(update: Update) {
    this.deviceService.createUpdate(this.device._id, update).then((newUpdate: Update) => {
      this.createHandler(newUpdate);
    });
  }
}
