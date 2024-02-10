import { PayloadAction, Slice, createSlice } from "@reduxjs/toolkit";
import { getCurrentDate } from "../services/util";
import { StateDate } from "../types/store/date";

const currentDate = getCurrentDate()?.toISOString();

const initialState: StateDate = {
  selectedDate: currentDate, 
  currentDate: currentDate
};

export const apodSlice = createSlice({
  name: 'apod',
  initialState,
  reducers: {
    updateSelectedDate: (state, action: PayloadAction<StateDate['selectedDate']>) => {
      state.selectedDate = action.payload
    }
  }
});

export const { updateSelectedDate } = apodSlice.actions;

export default apodSlice.reducer;