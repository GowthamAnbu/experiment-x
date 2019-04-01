import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule, MatInputModule } from '@angular/material';

const materialModules = [
  MatFormFieldModule,
  MatInputModule,
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
