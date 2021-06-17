import {
  style,
  animate,
  animation,
  query,
  stagger,
} from '@angular/animations';


export const fadeInAnimation = animation([
  query(':enter',
    [style({ opacity: 0 }), stagger('150ms', animate('{{ timings }}', style({ opacity: 1 })))], // stagger value is static
    { optional: true }
  )
]);
