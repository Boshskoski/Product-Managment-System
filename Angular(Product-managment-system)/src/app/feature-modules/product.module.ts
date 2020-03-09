import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProductListComponent } from '../products/product-list/product-list.component';
import { ProductDetailComponent } from '../products/product-detail/product-detail.component';
import { ProductEditComponent } from '../products/product-edit/product-edit.component';
import { ProductEditInfoComponent } from '../products/product-edit/product-edit-info.component';

import { ProductResolver } from '../services/product-service/product-resolver.service';

import { SharedModule } from '../shared/shared.module';
import { ProductEditGuard } from '../guards/product-edit.guard';
import { ProductEditMoreInfoComponent } from '../products/product-edit/product-edit-more-info.component';


@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProductListComponent
      },
      {
        path: ':id',
        component: ProductDetailComponent,
        resolve: { resolvedData: ProductResolver }
      },
      {
        path: ':id/edit',
        component: ProductEditComponent,
        canDeactivate: [ProductEditGuard],
        resolve: { resolvedData: ProductResolver },
        children: [
          { path: '', redirectTo: 'info', pathMatch: 'full' },
          { path: 'info', component: ProductEditInfoComponent },
          { path: 'more-info', component: ProductEditMoreInfoComponent }
        ]
      }
    ])
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ProductEditInfoComponent,
    ProductEditMoreInfoComponent
  ]
})
export class ProductModule { }
