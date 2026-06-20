import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { Product } from './product.model';
import { environment } from '../../../environments/environment';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;
  const baseUrl = `${environment.apiBaseUrl}/api/products`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    TestBed.resetTestingModule();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('list() should GET /api/products and return array', () => {
    const mockProducts: Product[] = [
      {
        id: 1,
        name: 'Produto A',
        price: 10,
        isActive: true,
        createdAtUtc: '2025-01-01T00:00:00Z'
      }
    ];

    service.list().subscribe((data) => {
      expect(data).toEqual(mockProducts);
    });

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('getById(id) should GET /api/products/:id', () => {
    const mock: Product = {
      id: 1,
      name: 'Produto A',
      price: 10,
      isActive: true,
      createdAtUtc: '2025-01-01T00:00:00Z'
    };

    service.getById(1).subscribe((data) => {
      expect(data).toEqual(mock);
    });

    const req = httpMock.expectOne(`${baseUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mock);
  });

  it('create(payload) should POST /api/products', () => {
    const payload = { name: 'Novo', description: null, price: 5, isActive: true };
    const created: Product = {
      id: 2,
      name: 'Novo',
      price: 5,
      isActive: true,
      createdAtUtc: '2025-01-01T00:00:00Z'
    };

    service.create(payload).subscribe((data) => {
      expect(data).toEqual(created);
    });

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);
    req.flush(created);
  });

  it('update(payload) should PUT /api/products/:id', () => {
    const payload = {
      id: 1,
      name: 'Atualizado',
      description: null,
      price: 20,
      isActive: false
    };
    const updated: Product = {
      ...payload,
      createdAtUtc: '2025-01-01T00:00:00Z'
    };

    service.update(payload).subscribe((data) => {
      expect(data).toEqual(updated);
    });

    const req = httpMock.expectOne(`${baseUrl}/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(payload);
    req.flush(updated);
  });

  it('delete(id) should DELETE /api/products/:id', () => {
    service.delete(1).subscribe((data) => {
      expect(data).toBeNull();
    });

    const req = httpMock.expectOne(`${baseUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
