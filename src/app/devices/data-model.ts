export class Device {
  _id? = '';
  name = '';
  codename = '';
  updates: Updates[];
}

export class Updates {
  id = '';
  datetime = '';
  filename = '';
  romtype = '';
  size = '';
  url = '';
  version = '';
}
