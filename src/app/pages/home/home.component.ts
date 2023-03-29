import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Catagory } from 'src/app/models/catagory.model';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';
const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  cols = 3;
  rowHeight = ROWS_HEIGHT[this.cols];

  category: Catagory | undefined;
  products: Array<Product> | undefined;
  sort = 'desc';
  count = '12';
  productsSubscription: Subscription | undefined;

  constructor(
    private cartService: CartService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }

  getProducts(): void {
    this.productsSubscription = this.storeService
      .getAllProducts(this.count, this.sort, this.category)
      .subscribe((_products) => {
        console.log(_products);
        this.products = this.sortByPrice(_products, this.sort);
      });
  }

  columnsCountChange(colNum: number): void {
    this.cols = colNum;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }

  sortChange(sort: string): void {
    if (this.products) this.products = this.sortByPrice(this.products, sort);
    console.log(this.products);
    
  }

  onShowCategory(newCategory: Catagory): void {
    this.category = newCategory;
    this.getProducts();
    console.log(this.category);
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      id: product.productId,
      name: product.productName,
      price: product.productPrice,
      quantity: 1,
      image: product.productImage,
    });
  }

  sortByPrice(_products: Array<Product>, sort: string): Array<Product> {
    if (sort === 'asc') {
      return _products.sort((a, b) => a.productPrice - b.productPrice);
      // this.products.sort((a,b) => (a.productName > b.productName) ? 1 : ((b.productName > a.productName) ? -1 : 0))
    } else {
      return _products.sort((a, b) => b.productPrice - a.productPrice);
    }
  }
}
