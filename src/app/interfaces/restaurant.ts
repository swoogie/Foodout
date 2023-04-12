export interface Restaurant {
  id: number;
  title: string;
  reviewCount: number;
  rating: number;
  img?: string;
  distance?: string;
  tags?: string[];
  about?: string;
}
