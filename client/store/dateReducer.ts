import { Action } from "../types/actions";
import { StateDate } from "../types/store/date";

const UPDATE_SELECTED_DATE = 'UPDATE_SELECTED_DATE';


export const reducer = (state: StateDate = {
                                      selectedDate: getCurrentDate(), 
                                      currentDate: getCurrentDate().toISOString()
                                    }, 
                                      action: Action) => {
  switch (action.type) {
    case UPDATE_SELECTED_DATE:
      return { ...state, selectedDate: action.payload};
    default:
      return state;
  }
}

export const updateSelectedDate = (payload: any) : Action => ({type: UPDATE_SELECTED_DATE, payload})

export const getCurrentDate = () : Date => {
  const options = { timeZone: 'America/New_York' };
  const now = new Date();
  const currentDateStr = now.toLocaleString('en-US', options);
  const currentDate = new Date(currentDateStr);

  return currentDate;
}