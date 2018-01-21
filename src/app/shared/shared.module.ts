import { KeysPipe } from './keys.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { DropdownDirective } from './dropdown.directive';

@NgModule({
  declarations: [
    DropdownDirective,
    KeysPipe
  ],
  exports: [
    CommonModule,
    DropdownDirective,
    KeysPipe
  ]
})
export class SharedModule {}
