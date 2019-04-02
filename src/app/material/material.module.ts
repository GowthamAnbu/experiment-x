import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule, MatInputModule, MatAutocompleteModule, MatOptionModule } from '@angular/material';

const materialModules = [
  MatFormFieldModule,
  MatInputModule,
  MatAutocompleteModule,
  MatOptionModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...materialModules
  ],
  exports: [
    ...materialModules,
  ]
})
export class MaterialModule { }
