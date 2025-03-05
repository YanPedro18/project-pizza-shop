import { api } from "@/lib/axios";

export interface GetDayOrderAmountResponse {
 amount: number;
 diffFromYesterday: number
}

export async function getDayOrdersAmount(): Promise<GetDayOrderAmountResponse>  {
    const response = await api.get<GetDayOrderAmountResponse>('/metrics/day-orders-amount');

    return response.data;
}