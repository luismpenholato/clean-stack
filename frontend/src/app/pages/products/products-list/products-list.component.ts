import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef, Component, OnInit, inject, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';
import { catchError, finalize, of, timeout } from 'rxjs';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { TruncatePipe } from '../../../shared/pipes/truncate/truncate.pipe';
import { ProductService } from '../product.service';
import { Product } from '../product.model';

type StatusFilter = 'all' | 'active' | 'inactive';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    PageHeaderComponent,
    TruncatePipe,
    NzAvatarModule,
    NzButtonModule,
    NzEmptyModule,
    NzInputModule,
    NzPopconfirmModule,
    NzSelectModule,
    NzSpinModule,
    NzTableModule,
    NzTagModule,
    NzTooltipModule
  ],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent implements OnInit {
  private readonly productService = inject(ProductService);
  private readonly messageService = inject(NzMessageService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly requestTimeoutMs = 10_000;

  private readonly allProducts = signal<Product[]>([]);

  searchTerm = signal('');
  statusFilter = signal<StatusFilter>('all');
  loading = false;

  readonly filteredProducts = computed(() => {
    let items = this.allProducts();
    const term = this.searchTerm().toLowerCase().trim();
    const status = this.statusFilter();

    if (term) {
      items = items.filter(p =>
        p.name.toLowerCase().includes(term) ||
        (p.description ?? '').toLowerCase().includes(term)
      );
    }

    if (status === 'active') {
      items = items.filter(p => p.isActive);
    } else if (status === 'inactive') {
      items = items.filter(p => !p.isActive);
    }

    return items;
  });

  readonly totalCount = computed(() => this.allProducts().length);
  readonly activeCount = computed(() => this.allProducts().filter(p => p.isActive).length);
  readonly inactiveCount = computed(() => this.allProducts().filter(p => !p.isActive).length);
  readonly averagePrice = computed(() => {
    const products = this.allProducts();
    if (products.length === 0) return 0;
    return products.reduce((sum, p) => sum + p.price, 0) / products.length;
  });

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.list().pipe(
      timeout(this.requestTimeoutMs),
      catchError(() => of([] as Product[])),
      finalize(() => {
        this.loading = false;
        this.cdr.markForCheck();
      })
    ).subscribe((items) => {
      this.allProducts.set(items ?? []);
    });
  }

  onSearchChange(value: string): void {
    this.searchTerm.set(value);
  }

  onStatusFilterChange(value: StatusFilter): void {
    this.statusFilter.set(value);
  }

  getInitial(name: string): string {
    return (name?.charAt(0) ?? '?').toUpperCase();
  }

  getAvatarColor(name: string): string {
    const colors = [
      '#4f46e5', '#0891b2', '#059669', '#d97706',
      '#dc2626', '#7c3aed', '#db2777', '#2563eb'
    ];
    const index = (name ?? '').split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    return colors[index % colors.length];
  }

  delete(product: Product): void {
    this.loading = true;
    this.productService.delete(product.id).pipe(
      timeout(this.requestTimeoutMs),
      finalize(() => {
        this.loading = false;
        this.cdr.markForCheck();
      })
    ).subscribe({
      next: () => {
        this.messageService.success('Produto removido.');
        this.loadProducts();
      },
      error: () => {}
    });
  }
}
