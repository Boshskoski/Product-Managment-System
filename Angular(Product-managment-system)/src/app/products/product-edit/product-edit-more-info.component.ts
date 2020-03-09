import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from '../../models/product';
import { CategoryService } from 'src/app/services/category-service/category.service';
import { ICategory } from 'src/app/models/ICategory';
import { FormGroup } from '@angular/forms';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { ProductService } from '../../services/product-service/product.service';

@Component({
  templateUrl: './product-edit-more-info.component.html'
})
export class ProductEditMoreInfoComponent implements OnInit {
  errorMessage: string = '';
  newTags: string = '';
  product: Product;
  productCategoryName: string = '';
  categories: ICategory[] = [];
  selectedCategory: string = '';
  productReleaseDate;


  constructor(private route: ActivatedRoute,
    private categoryService: CategoryService,
    private http:HttpClient,
    private productService:ProductService) { }

  ngOnInit(): void {

    this.route.parent.data.subscribe(data => {
      this.product = data['resolvedData'].product;
      this.productReleaseDate = this.product["releaseDate"];
      this.categoryService.GetGategories()
        .subscribe(categories => {
          this.categories = categories;
          if (this.product.id != 0) {
            this.categoryService.GetCategoryNameByTheCategoryId(this.product.categoryId)
              .subscribe(categoryName => {
                this.selectedCategory = categoryName;
                this.product.category = categoryName;
              })
          }

          else {
            this.selectedCategory = this.categories[0].categoryName;
            this.product.category = this.categories[0].categoryName;
          }
        })
    });
  }


  getReleaseDate(event)
  {
    this.product["releaseDate"] = event.target.value;
  }

  //upload section
  fileName: string;
  private uploadUrl = 'http://localhost:44364/api/upload';
  formData: FormData;
  public progress: number;
  imageUrl:string = "";
  message:string = "";
  @Output() public onUploadFinished = new EventEmitter();
  isTheImageNotUploaded:boolean = true;

  

  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
 
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
 
    this.http.post('https://localhost:44364/api/upload', formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.isTheImageNotUploaded = false;
          this.imageUrl = Object.values(event.body).toString();
          this.product["imageUrl"] = this.imageUrl;
          this.productService.imageUrl = this.imageUrl;
          this.productService.isTheImageNotUploaded = false;
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
        }
      });
  }


  selectedCategoryName() {
    this.categoryService.GetCategoryIdByTheCategoryName(this.selectedCategory)
      .subscribe(categoryId => {
        this.product.categoryId = +categoryId;
      })
  }

  createImgPath(serverPath: string) {
    return `https:/localhost:44364/${serverPath}`;
  }
}
