import { FormControl } from '@angular/forms';

export interface ProductForm {
    supplierId: FormControl<string>;
    name: FormControl<string>;
    description: FormControl<string>;
    imageUpload: FormControl<string>;
    image: FormControl<string>;
    value: FormControl<number>;
    active: FormControl<boolean>;
    supplierName: FormControl<string>;
}