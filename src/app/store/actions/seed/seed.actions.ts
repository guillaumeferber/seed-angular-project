import { createAction, props } from '@ngrx/store';
import { SeedItem } from '../../models/seed-state.model';

export const STORE_ACTIONS = {
  ADD: '[Store Actions] Add',
  REMOVE: '[Store Actions] Remove',
  UPDATE: '[Store Actions] Update'
};

export interface Action {
  type: string;
}

export const add = createAction(
  STORE_ACTIONS.ADD,
  props<{payload: SeedItem}>()
);

export const remove = createAction(
  STORE_ACTIONS.REMOVE,
  props<{id: string}>()
);

export const update = createAction(
  STORE_ACTIONS.UPDATE,
  props<{payload: SeedItem}>()
);
