import { Component, Input } from '@angular/core';
import { Badge } from '../badge.model';

@Component({
  selector: 'app-badge-list',
  templateUrl: './badge-list.component.html',
  styleUrls: ['./badge-list.component.scss']
})
export class BadgeListComponent {
  @Input() list: Badge[] = [];

}
