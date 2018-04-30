export interface Device {
  _id?: string;
  name: string;
  codename: string;
  updates: Update[];
}

export interface Update {
  id: number;
  datetime: number;
  filename: string;
  romtype: string;
  size: number;
  url: string;
  version: string;
}
