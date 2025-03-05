import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { TableCell, TableRow } from "@/components/ui/table"
import { ArrowRight, Search, X } from "lucide-react"
import OrderDetails from "./order-details"
import { OrderStatus } from "@/components/order-status"
import OrderStatusComp from "@/components/order-status"
import { formatDistanceToNow } from 'date-fns'
import { ca, ptBR } from 'date-fns/locale'
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CancelOrder } from "@/api/cancel-order"
import { GetOrdersResponse } from "@/api/getOrders"
import { ApproveOrder } from "@/api/approve-order"
import { DeliverOrder } from "@/api/deliver-order"
import { DispatchOrder } from "@/api/dispatch-order"

export interface OrderTableRowProps {
    order: {
        orderId: string;
        createdAt: string;
        status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
        customerName: string;
        total: number;
    }
}

function OrderTableRow({ order }: OrderTableRowProps) {

    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const queryClient = useQueryClient();

    function updateOrderStatusOnCache(orderId: string, status: OrderStatus) {

        const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
            queryKey: ['orders'],
        })

        ordersListCache.forEach(([cacheKey, cacheData]) => {

            if (!cacheData) {
                return;
            }

            queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
                ...cacheData,
                orders: cacheData.orders.map(order => {

                    if (order.orderId === orderId) {
                        return { ...order, status: status }
                    }

                    return order;
                })
            })
        })
    }



    const { mutateAsync: cancelOrderFn, isPending: isCancelingOrder } = useMutation({
        mutationFn: CancelOrder,
        async onSuccess(_, { orderId }) {
            updateOrderStatusOnCache(orderId, 'canceled')

        }
    })
    const { mutateAsync: approveOrderFn, isPending: isApproveOrder } = useMutation({
        mutationFn: ApproveOrder,
        async onSuccess(_, { orderId }) {
            updateOrderStatusOnCache(orderId, 'processing')

        }
    })
    const { mutateAsync: dispatchOrderFn, isPending: isDispatchOrder } = useMutation({
        mutationFn: DispatchOrder,
        async onSuccess(_, { orderId }) {
            updateOrderStatusOnCache(orderId, 'delivering')

        }
    })
    const { mutateAsync: deliverOrderFn, isPending: isDeliverOrder } = useMutation({
        mutationFn: DeliverOrder,
        async onSuccess(_, { orderId }) {
            updateOrderStatusOnCache(orderId, 'delivered')

        }
    })


    return (
        <TableRow>
            <TableCell>
                <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline" size="xs">
                            <Search className="h-3 w-3" />
                            <span className="sr-only">Detalhes do pedido </span>
                        </Button>
                    </DialogTrigger>

                    <OrderDetails open={isDetailsOpen} orderId={order.orderId} />
                </Dialog>
            </TableCell>
            <TableCell className="font-mono text-xs font-medium">
                {order.orderId}
            </TableCell>
            <TableCell className="text-muted-foreground">
                {formatDistanceToNow(order.createdAt, {
                    locale: ptBR,
                    addSuffix: true
                })}
            </TableCell>
            <TableCell>
                <OrderStatusComp status={order.status} />
            </TableCell>
            <TableCell className="font-medium">
                {order.customerName}
            </TableCell>
            <TableCell className="font-medium">{(order.total / 100).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            })}</TableCell>
            <TableCell>
                {order.status === 'pending' && (
                    <Button
                        onClick={() => approveOrderFn({ orderId: order.orderId })}
                        variant="outline" size="xs"
                        disabled={isApproveOrder}>
                        <ArrowRight className="h-3 w-3 mr-2" />
                        Aprovar
                    </Button>
                )}
                {order.status === 'processing' && (
                    <Button
                        onClick={() => dispatchOrderFn({ orderId: order.orderId })}
                        variant="outline" size="xs"
                        disabled={isDispatchOrder}>
                        <ArrowRight className="h-3 w-3 mr-2" />
                        Em entrega
                    </Button>
                )}
                {order.status === 'delivering' && (
                    <Button
                        onClick={() => deliverOrderFn({ orderId: order.orderId })}
                        variant="outline" size="xs"
                        disabled={isDeliverOrder}>
                        <ArrowRight className="h-3 w-3 mr-2" />
                        Entregue
                    </Button>
                )}
            </TableCell>
            <TableCell>
                <Button
                    onClick={() => cancelOrderFn({ orderId: order.orderId })}
                    disabled={!['pending', 'processing'].includes(order.status) ||
                        isCancelingOrder
                    }
                    variant="ghost" size="xs">
                    <X className="h-3 w-3 mr-2" />
                    Cancelar
                </Button>
            </TableCell>
        </TableRow>
    )
}

export default OrderTableRow