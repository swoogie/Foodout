export interface Food {
  restaurant_id: number;
  category: string;
  meals: [{
    name: string;
    price: number;
    info: string;
    img: string;
  }]
}
