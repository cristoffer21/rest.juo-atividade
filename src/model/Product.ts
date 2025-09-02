export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number; // Adicionado como opcional
  description?: string;   // Adicionado como opcional
}
