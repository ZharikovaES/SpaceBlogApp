import axios from "axios";
import { IAPOD } from "../types/APOD";

export default class NASAService {
    //получение астрономического фото/видео дня
    static async getAPOD(currentDate: Date | null = null): Promise<IAPOD | null>{
        try {
            const date: Date = new Date();
            const month = date.getUTCMonth() + 1;
            const day = date.getUTCDate();
            const currentDate: string = `${date.getUTCFullYear()}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day}`    
            const NASA_API_URL = process.env.nasaApiUrl;

            if (!NASA_API_URL) throw new Error("NASA_API_URL is empty");
            const response = await axios.get<IAPOD>(NASA_API_URL, {
                                                params: {
                                                    start_date: currentDate,
                                                    end_date: currentDate,
                                                    thumbs: true,
                                                    api_key: process.env.nasaKey 
                                                }
                                            });
            const data : IAPOD = response?.data;
            if (Array.isArray(data))
                return data[0];
            throw new Error("Error data");
        } catch(error: any) {
            console.error(error.message)
            return null;
        }
    }
}