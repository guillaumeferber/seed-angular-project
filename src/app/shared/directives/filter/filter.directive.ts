import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2 } from '@angular/core';
import { filter } from 'rxjs/operators';
import { FilterListItem, FilterService } from './filter.service';

@Directive({ selector: '[filterable]' })
export class FilterDirective implements OnInit {
  @Input() filterable: boolean = false;
  @Input() column: string = '';
  private elementParent: HTMLElement = new HTMLElement();
  private button: HTMLButtonElement = new HTMLButtonElement();
  private reset: HTMLButtonElement = new HTMLButtonElement();
  private close: HTMLButtonElement = new HTMLButtonElement();
  private input: HTMLInputElement = new HTMLInputElement();
  private row: HTMLTableRowElement = new HTMLTableRowElement();
  private list: HTMLUListElement = new HTMLUListElement();

  @HostListener('document:keydown.enter')
  keyboardHandler() {
    this.validateNewValue();
  }

  @HostBinding('class.c-heading-filter') get filterClassName() { return this.filterable; }

  constructor(
    private renderer: Renderer2,
    private element: ElementRef,
    private filterService: FilterService
    ) {}

  ngOnInit(): void {
    this.init();
  }

  private init(): void {
    if (!this.filterable) { return; }
    this.createButton();
  }

  // === create elements === //
  private createRow(): void {
    this.row = this.renderer.createElement('tr');
    this.renderer.addClass(this.row, 'c-heading-filter__row');
    const parentHeight = this.elementParent.getBoundingClientRect();
    this.renderer.setStyle(this.row, 'height', `${parentHeight.height}px`);
    // create table heading
    const innerThDiv = this.renderer.createElement('div');
    this.renderer.addClass(innerThDiv, 'c-heading-filter__row-container');
    const theading = this.renderer.createElement('th');
    this.renderer.setAttribute(theading, 'colspan', String(this.elementParent?.firstChild?.childNodes.length));
    this.renderer.appendChild(theading, innerThDiv);
    this.renderer.appendChild(this.row, theading);
    // form field
    this.createInputField();
    // filter values list
    this.createList();
    // action buttons
    this.createActionButtonsGroup();
    this.renderer.appendChild(this.elementParent, this.row);
  }

  // main filter button + icon
  private createButton(): void {
    this.getParent();
    const button = this.renderer.createElement('button');
    this.renderer.addClass(button, 'c-heading-button');
    this.renderer.setAttribute(button, 'type', 'button');
    const icon = this.createIcon();
    this.renderer.appendChild(button, icon);
    this.button =  button as HTMLButtonElement;
    this.listenButtonClickEvent();
    this.renderer.appendChild(this.element.nativeElement, this.button);
  }

  private createIcon(): HTMLElement {
    const icon = this.renderer.createElement('span') as HTMLElement;
    this.renderer.addClass(icon, 'c-heading-button__icon');
    return icon;
  }

  // Input Field + controls (validate & reset)
  private createInputField(): void {
    this.input = this.renderer.createElement('input');
    this.renderer.setAttribute(this.input, 'type', 'text');
    this.renderer.setAttribute(this.input, 'placeholder', 'Ajouter un filtre');
    const container = this.createInputFieldControls();
    this.renderer.appendChild(this.row.firstChild?.firstChild, container);
    this.listenInputFieldInputEvent();
  }

  private createInputFieldControls(): HTMLElement {
    const controlContainer = this.renderer.createElement('div');
    this.renderer.addClass(controlContainer, 'c-input-control-container');
    const validateControl = this.createInputFieldValidateControl();
    const resetControl = this.createInputFieldResetControl();
    this.renderer.appendChild(controlContainer, this.input);
    this.renderer.appendChild(controlContainer, validateControl);
    this.renderer.appendChild(controlContainer, resetControl);
    return controlContainer;
  }

  private createInputFieldValidateControl(): HTMLButtonElement {
    const validateControl = this.renderer.createElement('button');
    this.renderer.addClass(validateControl, 'c-input-control__validate');
    this.renderer.setAttribute(validateControl, 'type', 'button');
    this.renderer.setAttribute(validateControl, 'disabled', 'disabled');
    const validatedControlIcon = this.renderer.createElement('span');
    this.renderer.addClass(validatedControlIcon, 'c-input-control__validate-icon');
    this.renderer.appendChild(validateControl, validatedControlIcon);
    this.renderer.listen(validateControl, 'click', (e) => {
      e.stopPropagation();
      this.validateNewValue();
      this.disableInputControls();
    });
    return validateControl;
  }

  private createInputFieldResetControl(): HTMLButtonElement {
    const resetControl = this.renderer.createElement('button');
    this.renderer.addClass(resetControl, 'c-input-control__reset');
    this.renderer.setAttribute(resetControl, 'type', 'button');
    this.renderer.setAttribute(resetControl, 'disabled', 'disabled');
    const resetControlIcon = this.renderer.createElement('span');
    this.renderer.addClass(resetControlIcon, 'c-input-control__reset-icon');
    this.renderer.appendChild(resetControlIcon, this.renderer.createText('×'));
    this.renderer.appendChild(resetControl, resetControlIcon);
    this.renderer.listen(resetControl, 'click', (e) => {
      e.stopPropagation();
      this.resetInputValue();
      this.disableInputControls();
    });
    return resetControl;
  }

  // action button (Reset & Close)
  private createActionButtonsGroup(): void {
    // close button
    const closeSpan = this.renderer.createElement('span');
    this.close = this.renderer.createElement('button');
    this.renderer.setAttribute(this.close, 'type', 'button');
    this.renderer.appendChild(closeSpan, this.renderer.createText('Fermer'));
    this.renderer.appendChild(this.close, closeSpan);
    this.listenCloseButtonClickEvent();

    // reset button
    const resetSpan = this.renderer.createElement('span');
    this.reset = this.renderer.createElement('button');
    this.renderer.setAttribute(this.reset, 'type', 'button');
    this.renderer.setAttribute(this.reset, 'disabled', 'disabled');
    this.renderer.appendChild(resetSpan, this.renderer.createText('Réinitialiser'));
    this.renderer.appendChild(this.reset, resetSpan);
    this.listenResetButtonClickEvent();

    // button group
    const buttonGroup = this.renderer.createElement('div');
    this.renderer.addClass(buttonGroup, 'c-heading__button-group');
    this.renderer.appendChild(buttonGroup, this.reset);
    this.renderer.appendChild(buttonGroup, this.close);
    this.renderer.appendChild(this.row.firstChild?.firstChild, buttonGroup);
  }

  // List of filters
  private createList(): void {
    this.list = this.renderer.createElement('ul');
    this.renderer.appendChild(this.row.firstChild?.firstChild, this.list);
    this.updateList();
  }

  private updateList(): void {
    this.filterService.valuesList$
    .pipe(
      filter((list: FilterListItem[]): boolean => (
        list.every((item: FilterListItem): boolean => !!item.value) // make sure the list has values
      )),
    )
    .subscribe((list: FilterListItem[]) => {
      if (!this.list) { return; }
      this.resetInputValue();
      // last item has been deleted in values list but not in DOM
      if (list.length === 0 && this.list.childElementCount !== 0) {
        this.list.innerHTML = '';
        this.disableResetButton();
        return;
      }
      list.map((item: FilterListItem) => {
        const index = this.getListItemInList(item);
        if (!this.isListItemInList(index)) {
          this.createListItem(item);
        }
      });
    });
  }

  private createListItem({value, column}: FilterListItem): void {
    if (!this.list) { return; }
    const item = this.renderer.createElement('li') as HTMLElement;
    this.renderer.addClass(item, 'c-heading-filter__item');
    const itemText = this.renderer.createElement('span');
    this.renderer.appendChild(itemText, this.renderer.createText(String(value)));
    this.renderer.appendChild(item, itemText);
    this.renderer.setAttribute(item, 'data-col', column);
    const deleteButton = this.renderer.createElement('button');
    this.renderer.addClass(deleteButton, 'c-heading-filter__item-delete');
    this.renderer.appendChild(deleteButton, this.renderer.createText('×'));
    this.renderer.appendChild(item, deleteButton);
    this.renderer.appendChild(this.list, item);
    this.listenDeleteItemButtonClickEvent(deleteButton, String(value), column);
  }

  private deleteListItem({value, column}: FilterListItem): void {
    Array.from(this.list.children).map((child: Element) => {
      const comparedValue = String(value).toLowerCase().trim();
      const childValue = child.firstChild?.textContent?.toLowerCase().trim();
      const childColumn = child.getAttribute('data-col');
      if (childValue === comparedValue && childColumn === column) {
        this.renderer.addClass(child, 'blink'); // add css class for visual effect before being removed from parent
        setTimeout(() => this.renderer.removeChild(this.list, child), 300);
      }
    });
  }

  // can be triggered by key pressed Enter or validate button
  private validateNewValue(): void {
    if (!this.input || !this.input.value || this.filterService.isValueInList(this.input.value, this.column)) { return; }
    this.filterService.newValue = this.input.value;
    this.disableInputControls();
    this.resetInputValue();
  }

  // === Event listeners === //
  private listenButtonClickEvent(): void {
    this.renderer.listen(this.button, 'click', (event) => {
      event.stopPropagation();
      this.filterService.newColumn = this.column;
      this.toggleHeadingActiveClassName();
      this.toggleFilterRow();
      const input = document.querySelector('.c-heading-filter__row input') as HTMLInputElement;
      input.value = '';
    });
  }

  private listenInputFieldInputEvent(): void {
    this.renderer.listen(this.input, 'input', (e) => {
      const newValue = e.target.value;
      if (!newValue) {
        this.disableResetButton();
        this.disableInputControls();
      } else {
        this.enableResetButton();
        this.enableInputControls();
      }
      this.toggleButtonActiveClassName();
    });
  }

  private listenDeleteItemButtonClickEvent(button: HTMLButtonElement, value: string, column: string): void {
    this.renderer.listen(button, 'click', () => {
      const item = this.filterService.deleteListItem(value as unknown, column) as FilterListItem;
      this.deleteListItem(item);
      this.resetInputValue();
      this.disableInputControls();
    });
  }

  private listenResetButtonClickEvent(): void {
    this.renderer.listen(this.reset, 'click', () => {
      this.resetInputValue();
      this.disableResetButton();
      this.disableInputControls();
      this.filterService.resetValuesList();
    });
  }

  private listenCloseButtonClickEvent(): void {
    this.renderer.listen(this.close, 'click', () => {
      if (!this.input.value) {
        document.querySelectorAll('.c-heading-button').forEach(item => this.renderer.removeClass(item, 'active'));
      }
      this.renderer.addClass(this.row, 'd-none');
      this.toggleHeadingActiveClassName(true);
    });
  }

  // === Helpers & utilities === //
  private getParent(): void {
    this.elementParent = this.renderer.parentNode(this.element.nativeElement).parentNode as HTMLElement;
  }

  private getListItemInList({value, column}: FilterListItem): number {
    return !!this.list && Array.from(this.list.children).findIndex((item: Element) => {
      const itemValue = item.firstChild?.textContent?.toLowerCase().trim();
      const comparedValue = String(value).toLowerCase().trim();
      return itemValue === comparedValue && item.getAttribute('data-col') === column;
    });
  }

  private isListItemInList = (index: number): boolean => index > -1;

  private resetInputValue = () => this.input.value = '';

  // === Element attributes togglers === //
  private disableResetButton() {
    this.renderer.setAttribute(this.reset, 'disabled', 'disabled');
  }

  private enableResetButton() {
    this.renderer.removeAttribute(this.reset, 'disabled');
  }

  private disableInputControls() {
    this.renderer.setAttribute(this.input.parentNode?.querySelector('.c-input-control__reset'), 'disabled', 'disabled');
    this.renderer.setAttribute(this.input.parentNode?.querySelector('.c-input-control__validate'), 'disabled', 'disabled');
  }

  private enableInputControls() {
    this.renderer.removeAttribute(this.input.parentNode?.querySelector('.c-input-control__reset'), 'disabled');
    this.renderer.removeAttribute(this.input.parentNode?.querySelector('.c-input-control__validate'), 'disabled');
  }

  // === css classNames togglers === //
  private toggleButtonActiveClassName(): void {
    if (!this.button.classList.contains('active')) {
      this.renderer.addClass(this.button, 'active');
    }
  }

  private toggleHeadingActiveClassName(isClosed: boolean = false): void {
    if (document.querySelectorAll('.c-heading-filter')) {
      document.querySelectorAll('.c-heading-filter').forEach(item => this.renderer.removeClass(item, 'active'));
    }
    if (isClosed) {
      this.renderer.removeClass(this.button.parentElement, 'active');
    } else {
      this.renderer.addClass(this.button.parentElement, 'active');
    }
  }

  private toggleFilterRow(): void {
    const row = document.querySelector('.c-heading-filter__row');
    if (!row) {
      this.createRow();
    } else if (row.classList.contains('d-none')){
      this.renderer.removeClass(row, 'd-none');
    }
  }
}
