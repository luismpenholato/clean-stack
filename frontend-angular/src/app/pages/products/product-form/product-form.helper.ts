import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ProductService } from '../product.service';
import { Product } from '../product.model';

export interface ProductFormSubmitOptions {
  isEdit: boolean;
  importFromExternal: boolean;
  selectedExternalId: number | null;
}

export function validateProductForm(
  form: FormGroup,
  options: ProductFormSubmitOptions,
  messageService: NzMessageService
): boolean {
  const { isEdit, importFromExternal, selectedExternalId } = options;

  if (isEdit) {
    if (form.invalid) {
      form.markAllAsTouched();
      return false;
    }
    return true;
  }

  const useImport = importFromExternal && selectedExternalId != null;
  if (useImport) return true;

  const nameValue = form.get('name')?.value?.trim();
  const priceValue = form.get('price')?.value ?? 0;

  if (!nameValue || priceValue < 0) {
    form.markAllAsTouched();
    if (!nameValue) {
      messageService.warning('Enter the product name.');
    }
    return false;
  }

  return true;
}

export function buildProductSaveRequest$(
  form: FormGroup,
  options: ProductFormSubmitOptions,
  productService: ProductService
): Observable<Product> {
  const payload = form.getRawValue();
  const { isEdit, importFromExternal, selectedExternalId } = options;

  if (isEdit) {
    return productService.update({
      id: payload.id,
      name: payload.name,
      description: payload.description || null,
      price: payload.price,
      isActive: payload.isActive
    });
  }

  const useImport = importFromExternal && selectedExternalId != null;

  return productService.create(
    useImport
      ? { importFromExternalId: selectedExternalId!, isActive: payload.isActive }
      : {
          name: payload.name,
          description: payload.description || null,
          price: payload.price,
          isActive: payload.isActive
        }
  );
}
