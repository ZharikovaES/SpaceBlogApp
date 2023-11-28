import { DateTypes } from "../store/date";

export interface IUpdateSelectedDateAction {
  type: DateTypes.UPDATE_SELECTED_DATE;
  payload: Date;
}