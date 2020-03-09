import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product, ProductResolved } from '../../models/product';
import { CategoryService } from '../../services/category-service/category.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle = 'Product Detail';
  product: Product;
  errorMessage: string = "";
  productCategoryName:string = "";

  constructor(private route: ActivatedRoute,
    private categoryService: CategoryService) { }

  ngOnInit(): void {
    const resolvedData: ProductResolved =
      this.route.snapshot.data['resolvedData'];
    this.errorMessage = resolvedData.error;
    this.onProductRetrieved(resolvedData.product);
  }

  onProductRetrieved(product: Product): void {
    this.product = product;

    this.categoryService.GetCategoryNameByTheCategoryId(this.product.categoryId)
      .subscribe(categoryName => {
        this.productCategoryName = categoryName;
        this.product.category = categoryName;

        if (this.product) {
          this.pageTitle = `Product Detail: ${this.product.productName}`;
        } else {
          this.pageTitle = 'No product found';
        }
      })
  }

  createImgPath(serverPath: string) {
    return `https:/localhost:44364/${serverPath}`;
  }
}
