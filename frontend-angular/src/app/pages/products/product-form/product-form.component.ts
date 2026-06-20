import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { catchError, finalize, of, timeout } from 'rxjs';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { AutofocusDirective } from '../../../shared/directives/autofocus/autofocus.directive';
import { CurrencyMaskDirective } from '../../../shared/directives/currency-mask/currency-mask.directive';
import { ProductService } from '../product.service';
import { ExternalProduct } from '../product.model';
import {
  buildProductSaveRequest$,
  validateProductForm
} from './product-form.helper';

@Component({
  selector: 'app-product-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'app-product-form' },
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PageHeaderComponent,
    AutofocusDirective,
    NzButtonModule,
    NzCheckboxModule,
    NzDividerModule,
    NzFormModule,
    NzInputModule,
    CurrencyMaskDirective,
    NzSelectModule,
    NzSpinModule
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnInit {
  private readonly productService = inject(ProductService);
  private readonly messageService = inject(NzMessageService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly requestTimeoutMs = 10_000;

  readonly isEdit = signal(false);
  readonly productId = signal<number | null>(null);
  readonly loading = signal(false);
  readonly submitting = signal(false);
  readonly importFromExternal = signal(false);
  readonly externalProducts = signal<ExternalProduct[]>([]);
  readonly loadingExternal = signal(false);
  readonly selectedExternalId = signal<number | null>(null);

  readonly currencyOptions = {
    prefix: '$ ',
    thousands: '.',
    decimal: ',',
    precision: 2,
    allowNegative: false
  };

  form = this.fb.nonNullable.group({
    id: [0],
    name: ['', [Validators.maxLength(120)]],
    description: [''],
    price: [0, [Validators.min(0)]],
    isActive: [true]
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit.set(true);
      this.productId.set(+id);
      this.loadProduct();
    } else {
      this.isEdit.set(false);
    }
  }

  private loadProduct(): void {
    const id = this.productId();
    if (id == null) return;
    this.loading.set(true);
    this.productService.getById(id).pipe(
      timeout(this.requestTimeoutMs),
      catchError(() => of(null)),
      finalize(() => this.loading.set(false))
    ).subscribe((product) => {
      if (product) {
        this.form.reset({
          id: product.id,
          name: product.name,
          description: product.description ?? '',
          price: product.price,
          isActive: product.isActive
        });
        this.updateFormFieldsState();
      } else {
        this.router.navigate(['/products']);
      }
    });
  }

  onImportFromExternalChange(checked: boolean): void {
    this.importFromExternal.set(checked);
    this.selectedExternalId.set(null);
    this.updateFormFieldsState();
    if (checked && this.externalProducts().length === 0) {
      this.loadExternalProducts();
    }
  }

  loadExternalProducts(): void {
    this.loadingExternal.set(true);
    this.productService.listExternal().pipe(
      timeout(this.requestTimeoutMs),
      catchError(() => of([] as ExternalProduct[])),
      finalize(() => this.loadingExternal.set(false))
    ).subscribe((list) => this.externalProducts.set(list));
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }

  onSave(): void {
    const options = {
      isEdit: this.isEdit(),
      importFromExternal: this.importFromExternal(),
      selectedExternalId: this.selectedExternalId()
    };
    if (!validateProductForm(this.form, options, this.messageService)) {
      return;
    }
    this.submitting.set(true);
    buildProductSaveRequest$(this.form, options, this.productService).pipe(
      timeout(this.requestTimeoutMs),
      finalize(() => this.submitting.set(false))
    ).subscribe({
      next: () => {
        this.messageService.success(this.isEdit() ? 'Product updated.' : 'Product created.');
        this.router.navigate(['/products']);
      },
      error: () => {}
    });
  }

  private updateFormFieldsState(): void {
    const shouldDisable = !this.isEdit() && this.importFromExternal();
    const fields = ['name', 'price', 'description', 'isActive'] as const;
    for (const field of fields) {
      const control = this.form.get(field);
      if (shouldDisable) control?.disable();
      else control?.enable();
    }
  }
}
