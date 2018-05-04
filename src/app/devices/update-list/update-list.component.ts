import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Device, Update } from '../data-model';
import { DeviceService } from '../device.service';

@Component({
  selector: 'update-list',
  templateUrl: './update-list.component.html',
  styleUrls: ['./update-list.component.css'],
  providers: [DeviceService]
})

export class UpdateListComponent implements OnChanges, OnInit {
  @Input()
  device: Device;

  updates: Update[];
  selectedUpdate: Update;
  updateNumber: number;

  /* Properties */
  randomId: number;
  dateNow: number;
  romTypes: any[];
  romVersions: any[];

  constructor(private deviceService: DeviceService) { }

  ngOnInit() {
    this.generateProperties();
  }

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

  private getIndexOfUpdate = (updateId: any) => {
    return this.updates.findIndex((update) => {
      return update.id === updateId;
    });
  }

  selectedUpdateCount(update: Update) {
    const idx = this.getIndexOfUpdate(update.id);
    if (idx !== -1) {
      console.log('Update index is at ' + idx);
      this.updateNumber = idx;
    }
  }

  generateProperties() {
    /* ID */
    const ramdomId = Math.floor(100000 + Math.random() * 900000);
    this.randomId = ramdomId;
    console.log('Generated hash: ' + ramdomId);
    /* Timestamp */
    const dateNow = Math.floor(Date.now() / 1000);
    this.dateNow = dateNow;
    console.log('Generated timestamp: ' + dateNow);
    /* ROM Type */
    const romtypes = [
      {value: 'unofficial', viewValue: 'Unofficial'},
      {value: 'release', viewValue: 'Release'},
      {value: 'nightly', viewValue: 'Nightly'},
      {value: 'snapshot', viewValue: 'Snapshot'},
      {value: 'experimental', viewValue: 'Experimental'}
    ];
    this.romTypes = romtypes;
    /* ROM Versions */
    const romversions = [
      { value: '15.1' },
      { value: '14.1' }
    ];
    this.romVersions = romversions;
  }

  createNewUpdate() {
    this.generateProperties();
    const update: Update = {
      id: this.randomId,
      datetime: this.dateNow,
      filename: '',
      romtype: '',
      size: 0,
      url: '',
      version: ''
    };

    console.log('Creating new update:');
    console.log(update);

    // By default, the update number shall be null during creation.
    this.updateNumber = null;

    // By default, a newly-created update will have the selected state.
    this.selectUpdate(update);
  }

  addUpdate = (update: Update) => {
    this.updates.push(update);
    this.selectUpdate(update);
    return this.updates;
  }

  deleteUpdate = (delUpdateString: String, delUpdateId: String) => {
    console.log('Removing ID ' + delUpdateString + ', regenerating...');
    const idx = this.getIndexOfUpdate(delUpdateId);
    if (idx !== -1) {
      this.updates.splice(idx, 1);
      this.updateNumber = null;
    }
    return this.updates;
  }
}
