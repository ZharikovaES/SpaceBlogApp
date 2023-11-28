export interface IAPOD {
  media_type: "video" | "image",
  title: string,
  explanation: string,
  url: string,
  urlImg: string,
}
export interface IImageAPOD extends IAPOD {
  hdurl: string,
}
export interface IVideoAPOD extends IAPOD {
  thumbnail_url: string,
  urlVideo: string,
}

export type contentAPODType = IImageAPOD | IVideoAPOD;

export enum mediaType {
  IMAGE = "image",
  VIDEO = "video"
}

export type PositionBackground = {
  x: number,
  y: number
}
