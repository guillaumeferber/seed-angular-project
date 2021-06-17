import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListItemComponent implements OnInit {
  public pseudoGuid: string = '';
  ngOnInit(): void {
    this.pseudoGuid = this.generatePseudoGuid();
  }

  /**
   * /!\ WARNING This function is only made to generate a string
   * in order to associate the radio button and the label with the
   * DO NOT USE TO GENERATE A GUID IN FRONT-END
   */
  private generatePseudoGuid = (nbChars: number = 16): string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * nbChars | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(nbChars);
    });
  }

}
