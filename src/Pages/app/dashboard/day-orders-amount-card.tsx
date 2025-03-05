import { getDayOrdersAmount } from "@/api/get-day-orders-amount"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useQuery } from "@tanstack/react-query"
import { Utensils } from "lucide-react"
import MetricCardSkeleton from "./metric-card-skeleton"


function DayOrdersAmountCard() {
    const { data: dayOrdersAmount } = useQuery({
        queryFn: getDayOrdersAmount,
        queryKey: ['metrics', 'day-orders-amount']
    })
    return (
        <Card>
            <CardHeader className="flex-row items-center space-y-0 justify-between pb-2">

                <CardTitle className="text-base font-semibold">Pedidos (dia)</CardTitle>
                <Utensils className="h-4 w-4 text-muted-foreground" />

            </CardHeader>

            <CardContent className="space-y-1">
                {dayOrdersAmount ? (
                    <>
                        <span className="text-2xl font-bold tracking-tight">{dayOrdersAmount.amount?.toLocaleString('pt-BR') ?? "0"}</span>

                        <p className="text-xs text-muted-foreground">
                            {dayOrdersAmount.diffFromYesterday >= 0 ? (
                                <>
                                <span className="text-emerald-500 dark:text-emerald-400 pr-1">+{dayOrdersAmount.diffFromYesterday}</span>
                                em relação a ontem
                                </>
                            ) : (
                               <>
                                <span className="text-rose-500 dark:text-rose-400 pr-1">-{dayOrdersAmount.diffFromYesterday}</span>
                                em relação a ontem
                               </>
                            )}

                        </p>
                    </>
                ) : (
                    <MetricCardSkeleton />
                )}

            </CardContent>
        </Card>
    )
}

export default DayOrdersAmountCard