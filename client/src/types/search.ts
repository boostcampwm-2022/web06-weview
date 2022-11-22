export interface Label {
  type: string;
  value: string;
}

export interface SearchQuery {
  lastId?: string;
  tags?: string[];
  authors?: string[];
  category?: string;
  reviews?: number;
  likes?: number;
  detail?: string;
}
