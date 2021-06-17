// update badge.component.scss accordingly

export interface Label {
  value: string;
  enumValue?: string;
}
// update BadgeService.BADGE_STATES accordingly
export interface Badge extends Label {
  color: 'warning' | 'error' | 'primary' | 'secondary' | 'success' | 'new' | 'info';
}
