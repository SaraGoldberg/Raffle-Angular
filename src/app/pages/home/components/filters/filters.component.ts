import { Component, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Catagory } from 'src/app/models/catagory.model';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
})
export class FiltersComponent {
  @Output()
  showCategory = new EventEmitter<Catagory>();

  categoriesSubscription: Subscription | undefined;
  categories: Array<Catagory> | undefined;

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.categoriesSubscription = this.storeService
      .getAllCatagories()
      .subscribe((_categories) => {
        console.log(_categories);

        this.categories = _categories;
      });
  }

  ngOnDestroy(): void {
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }
  }

  // getCategories(): void {
  //   this.categoriesSubscription = this.storeService
  //     .getAllCatagories()
  //     .subscribe((_categories) => {
  //       console.log(_categories);

  //       this.categories = _categories;
  //     });
  // }

  onShowCategory(category: Catagory): void {
    this.showCategory.emit(category);
  }
}
