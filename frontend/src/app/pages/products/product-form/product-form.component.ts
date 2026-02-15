import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { catchError, finalize, of, timeout } from 'rxjs';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { AutofocusDirective } from '../../../shared/directives/autofocus/autofocus.directive';
import { ProductService } from '../product.service';
import { ExternalProduct } from '../product.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
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
    NzInputNumberModule,
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
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly requestTimeoutMs = 10_000;

  isEdit = false;
  productId: number | null = null;
  loading = false;
  submitting = false;

  importFromExternal = false;
  externalProducts: ExternalProduct[] = [];
  loadingExternal = false;
  selectedExternalId: number | null = null;

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
      this.isEdit = true;
      this.productId = +id;
      this.loadProduct();
    } else {
      this.isEdit = false;
    }
  }

  private loadProduct(): void {
    if (!this.productId) return;
    this.loading = true;
    this.productService.getById(this.productId).pipe(
      timeout(this.requestTimeoutMs),
      catchError(() => of(null)),
      finalize(() => {
        this.loading = false;
        this.cdr.markForCheck();
      })
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
        this.router.navigate(['/produtos']);
      }
    });
  }

  onImportFromExternalChange(checked: boolean): void {
    this.importFromExternal = checked;
    this.selectedExternalId = null;
    this.updateFormFieldsState();
    if (checked && this.externalProducts.length === 0) {
      this.loadExternalProducts();
    }
  }

  loadExternalProducts(): void {
    this.loadingExternal = true;
    this.productService.listExternal().pipe(
      timeout(this.requestTimeoutMs),
      catchError(() => of([] as ExternalProduct[])),
      finalize(() => {
        this.loadingExternal = false;
        this.cdr.markForCheck();
      })
    ).subscribe((list) => {
      this.externalProducts = list;
    });
  }

  cancel(): void {
    this.router.navigate(['/produtos']);
  }

  onSave(): void {
    if (!this.validateBeforeSubmit()) {
      return;
    }

    this.submitting = true;
    const request$ = this.buildSaveRequest$();

    request$.pipe(
      timeout(this.requestTimeoutMs),
      finalize(() => {
        this.submitting = false;
        this.cdr.markForCheck();
      })
    ).subscribe({
      next: () => {
        this.messageService.success(this.isEdit ? 'Produto atualizado.' : 'Produto criado.');
        this.router.navigate(['/produtos']);
      },
      error: () => {}
    });
  }

  private validateBeforeSubmit(): boolean {
    if (this.isEdit) {
      if (this.form.invalid) {
        this.form.markAllAsTouched();
        return false;
      }
      return true;
    }

    const useImport = this.importFromExternal && this.selectedExternalId != null;

    if (useImport) {
      return true;
    }

    const nameValue = this.form.get('name')?.value?.trim();
    const priceValue = this.form.get('price')?.value ?? 0;

    if (!nameValue || priceValue < 0) {
      this.form.markAllAsTouched();
      if (!nameValue) {
        this.messageService.warning('Preencha o nome do produto.');
      }
      return false;
    }

    return true;
  }

  private buildSaveRequest$() {
    const payload = this.form.getRawValue();

    if (this.isEdit) {
      return this.productService.update({
        id: payload.id,
        name: payload.name,
        description: payload.description || null,
        price: payload.price,
        isActive: payload.isActive
      });
    }

    const useImport = this.importFromExternal && this.selectedExternalId != null;

    return this.productService.create(
      useImport
        ? { importFromExternalId: this.selectedExternalId!, isActive: payload.isActive }
        : {
            name: payload.name,
            description: payload.description || null,
            price: payload.price,
            isActive: payload.isActive
          }
    );
  }

  private updateFormFieldsState(): void {
    const shouldDisable = !this.isEdit && this.importFromExternal;
    const fields = ['name', 'price', 'description', 'isActive'] as const;

    for (const field of fields) {
      const control = this.form.get(field);
      if (shouldDisable) {
        control?.disable();
      } else {
        control?.enable();
      }
    }
  }
}
