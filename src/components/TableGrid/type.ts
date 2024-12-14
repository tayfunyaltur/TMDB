import { ReactNode } from "react";

export interface Column<T> {
  accessor: keyof T;
  render?: (val: T) => ReactNode;
  header?: string;
  onClick?: (val: T) => void;
}

export interface TableProps<T> {
  data: T[];
  onEntityClick?: (value: T) => void;
  columns: Column<T>[];
  isPaginated?: boolean;
  page?: number;
  pageCount?: number;
  onPageChange?: (newPage: number) => void;
  isSeachable?: boolean;
  searchKey?: string;
  onSearch?: (newKey: string) => void;
  isLoading?: boolean; 
}

export interface TableGridProps<T> extends TableProps<T> {
  cardRenderer: (val: T) => ReactNode;
}
