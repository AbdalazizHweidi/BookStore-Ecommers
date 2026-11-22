import type { Category } from "../types/book";

export interface CategoryInfo {
  name: Category;
  icon: string;
  blurb: string;
}

export const categories: CategoryInfo[] = [
  { name: "Fiction", icon: "fa-feather-alt", blurb: "Stories that stay with you" },
  { name: "Mystery & Thriller", icon: "fa-search", blurb: "One more chapter before bed" },
  { name: "Fantasy", icon: "fa-dragon", blurb: "Discover another world" },
  { name: "Science Fiction", icon: "fa-rocket", blurb: "New futures await" },
  { name: "Non-Fiction", icon: "fa-lightbulb", blurb: "Ideas and true stories" },
  { name: "Children's", icon: "fa-child", blurb: "Small stories, big imagination" },
];
export const categoryNames: Category[] = categories.map(({ name }) => name);
