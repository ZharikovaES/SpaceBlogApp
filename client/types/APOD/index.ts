export interface IAPOD {
    media_type: "video" | "image",
    title: string,
    explanation: string,
    url: string,
}
export interface IImageAPOD extends IAPOD {
    hdurl: string,
}
export interface IVideoAPOD extends IAPOD {
    thumbnail_url: string,
}
export enum mediaType {
    IMAGE = "image",
    VIDEO = "video"
}
