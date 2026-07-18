export type ProductResponse = {
  id: number;
  price: number;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  rating: number;
};


export type GetProductResponse = {
  products: ProductResponse[];
  total: number;
  skip: number;
  limit: number;
}