export type WebApiItem = {
  id: string;
  title: string;
  url: string;
};

export type GroupedWebApis = {
  [key: string]: WebApiItem[];
};
