import axios from "axios";
import { IAPOD, contentAPODType } from "../types/APOD";
import TranslatorService from "./TranslatorService";

export default class NASAService {
  //получение астрономического фото/видео дня
  static async getAPOD(date: Date = new Date()): Promise<contentAPODType | null>{
    try {
      const options: Intl.DateTimeFormatOptions = { timeZone: 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit' };
      const arrDate = date.toLocaleString('en-US', options).split('/');
      const currentDate = `${arrDate[2]}-${arrDate[0]}-${arrDate[1]}`;
      
      const params = {
        start_date: currentDate,
        end_date: currentDate,
        thumbs: true,
        api_key: process.env.nasaKey 
      };

      const data =  await this.fetchAPOD(params);

      if (Array.isArray(data) && data?.length) {
        const translatedValues = await TranslatorService.translate({ 
                                                            title: data[0].title,
                                                            explanation: data[0].explanation
                                                           });
                                                           
        const result = {
          ...data[0],
          title: translatedValues.title,
          explanation: translatedValues.explanation
        }

        return result;
      }

      throw new Error("Error data");
    } catch(error: any) {
      
      console.error(error.message)
      return null;
    }
  }

  static async fetchAPOD(params: any): Promise<IAPOD> {
    const NASA_API_URL = process.env.nasaApiUrl;

    if (!NASA_API_URL) throw new Error("NASA_API_URL is empty");
    
    const response = await axios.get<IAPOD>(NASA_API_URL, {
                                                            params
                                                          });
    const data : IAPOD = response?.data;    

    return data;
  }
}