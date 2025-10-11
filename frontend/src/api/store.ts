import api from "@/lib/api";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrls: string[];
  category?: string;
  stock: number;
  isAvailable?: boolean;
  organizationId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export async function getProducts(): Promise<{ success: boolean; products: Product[] }> {
  return api.get("/api/products");
}

export async function searchProducts(query: string): Promise<{ success: boolean; products: Product[] }> {
  return api.get(`/api/products/search?q=${encodeURIComponent(query)}`);
}

export async function getProductById(id: string): Promise<{ success: boolean; data: Product }> {
  return api.get(`/api/products/${id}`);
}

export async function getWhatsAppLink(productId: string, phone: string): Promise<{ success: boolean; whatsappLink: string }>{
  const res = await api.get(`/api/products/${productId}/whatsapp?phone=${encodeURIComponent(phone)}`);
  const { success, data } = res as any;
  return { success, whatsappLink: data?.whatsappLink ?? "" };
}

export async function createProduct(data: { name: string; description: string; price: number; category?: string; imageUrls: string[]; stock: number; }): Promise<{ success: boolean; product: Product; message: string }>{
  return api.post("/api/products", data);
}

export async function updateProduct(id: string, data: Partial<Omit<Product, "id"|"createdAt"|"updatedAt">>): Promise<{ success: boolean; product: Product; message: string }>{
  return api.put(`/api/products/${id}`, data);
}

export async function deleteProduct(id: string): Promise<{ success: boolean; message: string }>{
  return api.delete(`/api/products/${id}`);
}

export async function toggleProductAvailability(id: string): Promise<{ success: boolean; product: Product; message: string }>{
  return api.patch(`/api/products/${id}/toggle`);
}

export async function updateProductStock(id: string, stock: number): Promise<{ success: boolean; data: { id: string; name: string; stock: number; updatedAt: string }; message: string }>{
  return api.patch(`/api/products/${id}/stock`, { stock });
}

export async function getMyProducts(): Promise<{ success: boolean; products: Product[] }>{
  return api.get("/api/my-products");
}
