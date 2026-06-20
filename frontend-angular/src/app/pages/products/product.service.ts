import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Product, ProductCreateRequest, ProductUpdateRequest, ExternalProduct } from './product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiBaseUrl}/api/products`;

  list(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  listExternal(): Observable<ExternalProduct[]> {
    return this.http.get<ExternalProduct[]>(`${this.baseUrl}/external`);
  }

  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  create(payload: ProductCreateRequest): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, payload);
  }

  update(payload: ProductUpdateRequest): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${payload.id}`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
