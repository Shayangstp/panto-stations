export type Station = {
  id: number;
  name: string;
  city: string;
  lat: number;
  lng: number;
};

export type FetchStatus = "loading" | "error" | "success";
