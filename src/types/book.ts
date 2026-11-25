export type Category =
  | 'Fiction'
  | 'Mystery & Thriller'
  | 'Fantasy'
  | 'Science Fiction'
  | 'Non-Fiction'
  | "Children's";

export interface Book {
  id: string;
  title: string;
  author: string;
  category: Category;
  price: number;
  originalPrice?: number;
  cover: string;
  hook: string;
  rating: number;
  reviewCount: number;
}

export interface ReaderReason {
  title: string;
  text: string;
}
