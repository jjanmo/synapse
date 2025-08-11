export type WebApiItem = {
  id: string;
  title: string;
  url: string;
};

export type GroupedWebApiObject = {
  [key: string]: WebApiItem[];
};
