import { IUpdateSelectedDateAction } from "../types/actions";
import { DateTypes, StateDate } from "../types/store/date";

export const reducer = (state: StateDate = {
                                      selectedDate: getCurrentDate(), 
                                      currentDate: getCurrentDate().toISOString()
                                    }, 
                        action: IUpdateSelectedDateAction) => {
  switch (action.type) {
    case DateTypes.UPDATE_SELECTED_DATE:
      return { ...state, selectedDate: action.payload};
    default:
      return state;
  }
}

export const updateSelectedDate = (payload: Date) : IUpdateSelectedDateAction => ({type: DateTypes.UPDATE_SELECTED_DATE, payload})

export const getCurrentDate = () : Date => {
  const options = { timeZone: 'America/New_York' };
  const now = new Date();
  const currentDateStr = now.toLocaleString('en-US', options);
  const currentDate = new Date(currentDateStr);

  return currentDate;
}