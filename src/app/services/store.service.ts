import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Catagory } from '../models/catagory.model';
import { Product } from '../models/product.model';

const STORE_BASE_URL = 'http://localhost:44383/api';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private httpClient: HttpClient) {}

  getAllProducts(
    limit = '12',
    sort = 'desc',
    catagory?: Catagory
  ): Observable<Product[]> {

    if(catagory == undefined){
      return this.httpClient.get<Product[]>(
        `/api/Product`
      );
    }
    else{
      return this.httpClient.get<Product[]>(
        `/api/Product/${catagory.catagoryId}`
      );
    }

    // return this.httpClient.get<Product[]>("/api/Product");
  }

  getAllCatagories(): Observable<Catagory[]> {
    return this.httpClient.get<Catagory[]>(`/api/Catagory`);
  }
}
