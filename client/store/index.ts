import { Context, MakeStore } from 'next-redux-wrapper';
import { legacy_createStore as createStore, Store } from 'redux';
import { IUpdateSelectedDateAction } from '../types/actions';
import { StateDate } from '../types/store/date';
import { getCurrentDate, reducer } from './dateReducer';

export const makeDateStore : MakeStore<Store<StateDate, IUpdateSelectedDateAction>> = (_: Context) => {
  const currentDate = getCurrentDate();
  const initialState: StateDate = {
    selectedDate: currentDate,
    currentDate: currentDate.toISOString()
  };
  return createStore(reducer, initialState);
}
