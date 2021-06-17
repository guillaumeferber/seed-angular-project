import { Action, createReducer, on } from '@ngrx/store';
import * as SeedActions from '../../actions/seed/seed.actions';
import { SeedAppState, SeedItem } from '../../models/seed-state.model';

const initialState: SeedAppState = {
  list: [],
  item: {id: ''},
  loading: false,
  errors: []
};

const add = (state: SeedAppState, payload: SeedItem) => ({
  ...state,
  list: [...state.list, payload],
  item:payload
});

const remove = (state: SeedAppState, id: string) => ({
  ...state,
  list: [...state.list].filter((item: SeedItem) => item.id !== id),
  item: initialState.item
});

const update = ((state: SeedAppState, payload: SeedItem) => {
  const updatedList = [...state.list] as SeedItem[];
  const index = updatedList.findIndex((item: SeedItem) => item.id === payload.id) as number;
  updatedList[index] = payload;
  return {
    ...state,
    list: updatedList,
    item: payload
  };
});

const seedReducers = createReducer(
  initialState,
  on(SeedActions.add, (state, {payload}: {payload: SeedItem}) => add(state, payload)),
  on(SeedActions.remove, (state, { id }) => remove(state, id)),
  on(SeedActions.update, (state, {payload}: {payload: SeedItem}) => update(state, payload)),
);

export function reducer(state: SeedAppState | undefined, action: Action) {
  return seedReducers(state, action);
}
