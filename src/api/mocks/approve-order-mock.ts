import { http, HttpResponse } from "msw";
import {ApproveOrderParams} from "../approve-order"


export const approveOrderMock = http.patch<ApproveOrderParams, never, never>(
    '/orders/:orderId/approve', 

 async ({ params }) => {
    if(params.orderId === 'error-order-id') {
        return new HttpResponse(null, { status: 404 })
    }
    
    return new HttpResponse(null, { status: 204 })
 },)