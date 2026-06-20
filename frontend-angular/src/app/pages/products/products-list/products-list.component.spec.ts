import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { ProductsListComponent } from './products-list.component';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { NzMessageService } from 'ng-zorro-antd/message';

describe('ProductsListComponent', () => {
  let mockProductService: { list: ReturnType<typeof vi.fn>; delete: ReturnType<typeof vi.fn> };
  let mockMessageService: { success: ReturnType<typeof vi.fn> };

  const mockProducts: Product[] = [
    { id: 1, name: 'Product A', price: 10, isActive: true, createdAtUtc: '2025-01-01T00:00:00Z' },
    { id: 2, name: 'Product B', price: 20, isActive: false, createdAtUtc: '2025-01-02T00:00:00Z' }
  ];

  beforeEach(async () => {
    mockProductService = {
      list: vi.fn().mockReturnValue(of(mockProducts)),
      delete: vi.fn().mockReturnValue(of(null))
    };
    mockMessageService = { success: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [ProductsListComponent],
      providers: [
        provideRouter([]),
        provideAnimations(),
        { provide: ProductService, useValue: mockProductService },
        { provide: NzMessageService, useValue: mockMessageService }
      ]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ProductsListComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should load products on init', () => {
    const fixture = TestBed.createComponent(ProductsListComponent);
    fixture.detectChanges();
    expect(mockProductService.list).toHaveBeenCalledOnce();
    expect(fixture.componentInstance.filteredProducts()).toEqual(mockProducts);
  });

  it('should render title Products', () => {
    const fixture = TestBed.createComponent(ProductsListComponent);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('h2')?.textContent).toContain('Products');
  });

  it('should compute metrics correctly', () => {
    const fixture = TestBed.createComponent(ProductsListComponent);
    fixture.detectChanges();
    const comp = fixture.componentInstance;
    expect(comp.totalCount()).toBe(2);
    expect(comp.activeCount()).toBe(1);
    expect(comp.inactiveCount()).toBe(1);
    expect(comp.averagePrice()).toBe(15);
  });

  it('should filter by search term', () => {
    const fixture = TestBed.createComponent(ProductsListComponent);
    fixture.detectChanges();
    const comp = fixture.componentInstance;

    comp.onSearchChange('Product A');
    expect(comp.filteredProducts().length).toBe(1);
    expect(comp.filteredProducts()[0].name).toBe('Product A');
  });

  it('should filter by status', () => {
    const fixture = TestBed.createComponent(ProductsListComponent);
    fixture.detectChanges();
    const comp = fixture.componentInstance;

    comp.onStatusFilterChange('inactive');
    expect(comp.filteredProducts().length).toBe(1);
    expect(comp.filteredProducts()[0].isActive).toBe(false);
  });
});
