import { parseISO } from 'date-fns';
import { Context, MakeStore } from 'next-redux-wrapper';
import { legacy_createStore as createStore, Store } from 'redux';

export interface StateDate {
  selectedDate: Date,
  currentDate: string
}

interface Action {
  type: string;
  payload?: any;
}

const reducer = (state: StateDate = {
                                      selectedDate: new Date(new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })), 
                                      currentDate: new Date(new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })).toISOString()
                                    }, 
                                      action: Action) => {
  switch (action.type) {
    case 'UPDATE_SELECTED_DATE':
      return { ...state, selectedDate: action.payload};
    default:
      return state;
  }
}

export const makeDateStore : MakeStore<Store<StateDate, Action>> = (context: Context) => {
  const options = { timeZone: 'America/New_York' };
  const now = new Date();
  const currentDateStr = now.toLocaleString('en-US', options);
  const currentDate = new Date(currentDateStr).toISOString();
  
  const initialState: StateDate = {
    selectedDate: parseISO(currentDate),
    currentDate: currentDate
  };
  return createStore(reducer, initialState);
}