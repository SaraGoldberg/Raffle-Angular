import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl: './products-header.component.html',
})
export class ProductsHeaderComponent {
  @Output() columnsCountChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<string>();

  sort = 'desc';
  itemShowCount = 12;

  onSortUpdated(newSort: string): void {
    this.sort = newSort;
    this.sortChange.emit(this.sort);
  }

  onItemsUpdated(count: number): void {
    this.itemShowCount = count;
  }

  onColumnsUpdated(colNum: number): void {
    this.columnsCountChange.emit(colNum);
  }
}
