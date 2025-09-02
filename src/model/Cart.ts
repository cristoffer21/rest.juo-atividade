export interface CartItem {
  productId: string; // Certifique-se de que está em camelCase
  quantity: number;
}

export interface Cart {
  id: string;
  items: CartItem[];
}
