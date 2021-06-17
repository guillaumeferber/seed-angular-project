import { createSelector } from '@ngrx/store';
import { AppState } from '../../app.state';
import { SeedItem } from '../../models/seed-state.model';

export const selectList = createSelector(
  (state: AppState) => state.seed.list,
  (list: SeedItem[]) => list
);

export const selectItem = createSelector(
  (state: AppState) => state.seed.item,
  (item: SeedItem) => item
);
