export interface DataItem {
  id: number;
  title: string;
  info: string;
  date: string;
  protocol: string;
  class_view: string;
  username: string;
  account: string;
}

export interface DoneItem {
  id: number;
  title: string;
  class_id: number;
  class_view: string;
  account: string;
  username: string;
  status: number;
  homework_id: number;
}