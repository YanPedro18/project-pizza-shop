import { getMonthOrdersAmount } from "@/api/get-month-orders-amount"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useQuery } from "@tanstack/react-query"
import { Utensils } from "lucide-react"
import MetricCardSkeleton from "./metric-card-skeleton"


function MonthOrdersAmountCard() {

    const { data: monthOrdersAmount } = useQuery({
        queryFn: async () => {
          const data = await getMonthOrdersAmount();
          return {
            amount: data.amount ?? 0, // Fallback para 0
            diffFromLastMonth: data.diffFromLastMonth ?? 0 // Fallback para 0
          };
        },
        queryKey: ['metrics', 'month-orders-amount']
      });
      

    return (
        <Card>
            <CardHeader className="flex-row items-center space-y-0 justify-between pb-2">

                <CardTitle className="text-base font-semibold">Pedidos (mês)</CardTitle>
                <Utensils className="h-4 w-4 text-muted-foreground" />

            </CardHeader>

            <CardContent className="space-y-1">
                {monthOrdersAmount ? (
                    <>
                        <span className="text-2xl font-bold tracking-tight">{monthOrdersAmount?.amount?.toLocaleString('pt-BR') ?? "0"}</span>

                        <p className="text-xs text-muted-foreground">
                            {monthOrdersAmount.diffFromLastMonth >= 0 ? (
                                <>
                                    <span className="text-emerald-500 dark:text-emerald-400 pr-1">+{monthOrdersAmount.diffFromLastMonth}</span>
                                    em relação ao mês passado
                                </>
                            ) : (
                                <>
                                    <span className="text-rose-500 dark:text-rose-400 pr-1">{monthOrdersAmount.diffFromLastMonth}</span>
                                    em relação ao mês passado
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

export default MonthOrdersAmountCard