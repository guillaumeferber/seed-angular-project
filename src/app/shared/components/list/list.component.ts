import { Component, Input } from '@angular/core';
import { transition, trigger, useAnimation } from '@angular/animations';
import { fadeInAnimation } from './list.animation';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [
    trigger('list', [
      transition('* <=> *', [
        useAnimation(fadeInAnimation, {
          params: { timings: '600ms ease-out' }
        })
      ])
    ])
  ]
})
export class ListComponent {
  @Input() length: number = 0;
  @Input() options?: boolean = false;
  @Input() large?: boolean = false;

  public getClassNames(): unknown {
      return {
        'c-list': true,
        'c-list-options': !!this.options,
        'c-list-options--full-page': !!this.large,
      }
  }
}
