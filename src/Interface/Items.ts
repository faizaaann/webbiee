export interface IItem {
  parentCategoryId: string;
  parentCategoryName: string;
  id: string;
  [key: string]: string;
}

export interface IItems {
  [key: string]: Array<IItem>;
}
