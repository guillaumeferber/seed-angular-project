import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent {
  @Input() type: string = '';
  @Input() first?: boolean;
  @Input() last?: boolean;
  @Input() rounded?: boolean;
}
