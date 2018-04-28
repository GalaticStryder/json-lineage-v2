export interface Device {
  _id?: string;
  name: string;
  codename: string;
  updates: Update[];
}

export interface Update {
  id: number;
  datetime: string;
  filename: string;
  romtype: string;
  size: string;
  url: string;
  version: string;
}
