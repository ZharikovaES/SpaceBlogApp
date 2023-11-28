import axios from "axios";

export default class TranslatorService {
  
  // перевод текста
  static async translate(target: any): Promise<any> {
    const promises = [];

    for (const key in target) {
      promises.push(this.fetchTranslate(target[key]));
    }

    const keys = Object.keys(target);
    const result: Record<string, string> = { };
    const promisesValues = await Promise.all(promises);
    const convertedValues = TranslatorService.convertTranslateValue(promisesValues);
    
    convertedValues.forEach((value, index) => {
      const key = keys[index];      
      result[key] = value;
    });
    
    return result;
  }

  //запрос перевода
  private static fetchTranslate(text: string) {
    const TRANSLATE_API_URL = process.env.translateApiUrl;

    if (!TRANSLATE_API_URL) throw new Error("TRANSLATE_API_URL is empty");    
    
    const params = {
      client: "gtx",
      dt: "t",
      sl: "en",
      tl: "ru",
      q: text
    };

    return axios.get<any>(TRANSLATE_API_URL, {
      params
    }).then((response: any) => {
      return response.data;
    }).catch((err: any) => {
        console.error(err);
    });
  }

  private static convertTranslateValue(arrays: any[]): any[] {
    const result: any[] = [];
    arrays.forEach((array: any[]) => {
        const allStr = array?.[0]?.reduce((acc: string, el: any[]) => {
          return acc + el[0];
        }, '');
        result.push(allStr);
      }
    );

    return result;
  }
}