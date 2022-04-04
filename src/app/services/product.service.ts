import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl = '';

  constructor(private httpClient: HttpClient) { }

  getProducts(filter: any):Observable<ListResponseModel<Product>> {
    let newPath = this.apiUrl + `product/GetProductsByFilter?${filter.toString()}`;
    return this.httpClient.get<ListResponseModel<Product>>(newPath);
  }

  deleteProduct(id: any):Observable<ListResponseModel<Product>> {
    let newPath = this.apiUrl + `product/${id}`;
    return this.httpClient.delete<ListResponseModel<Product>>(newPath);
  }
}
