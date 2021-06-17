export interface SeedItem {
  id: string
}

export interface SeedAppState {
  list: SeedItem[],
  item: SeedItem,
  loading: boolean;
  errors: string[];
}
