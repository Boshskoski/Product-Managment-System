export interface Product {
  id: number;
  productName: string;
  productCode: string;
  releaseDate: Date;
  price: number;
  description: string;
  starRating: number;
  imageUrl: string;
  categoryId:number;
  category: string;
}

export interface ProductResolved {
  product: Product;
  error?: any;
}
