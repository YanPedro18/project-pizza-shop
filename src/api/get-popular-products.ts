import { api } from "@/lib/axios";


export type GetPopularProductsProps = {
    product: string;
    amount: number;
}[]

export async function getPopularProducts() {
 const response = await api.get<GetPopularProductsProps>("/metrics/popular-products");

 return response.data;
}