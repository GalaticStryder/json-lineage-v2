export class Device {
  _id?: string;
  name: string;
  codename: string;
  updates: [
    {
      id: string;
      datetime: string;
      filename: string;
      romtype: string;
      size: string;
      url: string;
      version: string;
    }
  ]
}
