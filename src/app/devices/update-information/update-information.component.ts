import {Component, Input} from '@angular/core';
import {Update} from '../data-model';
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
  updateNumber: number;

  constructor(private deviceService: DeviceService) { }

}
