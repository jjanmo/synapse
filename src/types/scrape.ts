export type WebApiItem = {
  title: string;
  url: string;
};

export type GroupedWebApiObject = {
  [key: string]: WebApiItem[];
};
