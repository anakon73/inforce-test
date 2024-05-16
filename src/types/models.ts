export type ProductComment = {
  id: Product["id"];
  productId: number;
  description: string;
  date: string;
};

export interface Product {
  id: number;
  imageUrl: string;
  name: string;
  count: number;
  size: {
    width: number;
    height: number;
  };
  weight: string;
  comments: ProductComment[];
}
