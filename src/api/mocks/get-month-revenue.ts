import { http, HttpResponse } from "msw";
import { GetMounthRevenueResponse } from "../get-month-revenue"



export const getMonthRevenueMock = http.get<
never,
never,
GetMounthRevenueResponse
>('/metrics/month-receipt', () => {

    return HttpResponse.json({
        receipt: 20000,
        diffFromLastMonth: 10,
    })
})