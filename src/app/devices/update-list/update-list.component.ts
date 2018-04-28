import { Component, OnInit } from '@angular/core';
import { Update } from '../data-model';
import { DeviceService } from '../device.service';

@Component({
  selector: 'update-list',
  templateUrl: './update-list.component.html',
  styleUrls: ['./update-list.component.css'],
  providers: [DeviceService]
})

export class UpdateListComponent implements OnInit {
  updates: Update[]
  selectedUpdate: Update

  constructor(private deviceService: DeviceService) { }

  ngOnInit() {
     this.deviceService
      .getUpdates()
      .then((updates: Update[]) => {
        this.updates = updates.map((update) => {
          return update;
        });
      });
  }

  getUpdates() {
    this.ngOnInit();
  }

  selectUpdate(update: Update) {
    this.selectedUpdate = update;
  }
}
