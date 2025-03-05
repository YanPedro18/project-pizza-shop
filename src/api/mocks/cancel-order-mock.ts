import { http, HttpResponse } from "msw";
import { CancelOrderParams } from "../cancel-order"


export const cancelOrderMock = http.patch<CancelOrderParams, never, never>(
    '/orders/:orderId/cancel', 

 async ({ params }) => {
    if(params.orderId === 'error-order-id') {
        return new HttpResponse(null, { status: 404 })
    }
    
    return new HttpResponse(null, { status: 204 })
 },)