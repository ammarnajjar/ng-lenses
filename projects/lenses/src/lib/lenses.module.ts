import { NgModule } from '@angular/core';
import { IpModule } from './ip/ip.module';
import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [],
  imports: [IpModule, MaterialModule],
  exports: [IpModule, MaterialModule],
})
export class LensesModule {}
