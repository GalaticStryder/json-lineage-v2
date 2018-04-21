export class Device {
  _id?: string;
  name: string;
  supported: string;
  updates: {
    datetime: string;
    filename: string;
    romtype: string;
    size: string;
    url: string;
    version: string;
  }
}
