
import { getMonthRevenue } from "@/api/get-month-revenue"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useQuery } from "@tanstack/react-query"
import { DollarSign } from "lucide-react"
import MetricCardSkeleton from "./metric-card-skeleton"


function MonthRevenueCard() {

    
    const { data: monthRevenue } = useQuery({
        queryFn: getMonthRevenue,
        queryKey: ['metrics', 'month-revenue']
    })
    return (
        <Card>
            <CardHeader className="flex-row items-center space-y-0 justify-between pb-2">

                <CardTitle className="text-base font-semibold">Receita total (mês)</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />

            </CardHeader>

            <CardContent className="space-y-1">
            {monthRevenue ? (
                    <>
                        <span className="text-2xl font-bold tracking-tight">{(monthRevenue?.receipt / 100).toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                        }) ?? '0'}</span>

                        <p className="text-xs text-muted-foreground">
                            {monthRevenue.diffFromLastMonth >= 0 ? (
                                <>
                                <span className="text-emerald-500 dark:text-emerald-400 pr-1">+{monthRevenue.diffFromLastMonth}%</span>
                                em relação a ontem
                                </>
                            ) : (
                               <>
                                <span className="text-rose-500 dark:text-rose-400 pr-1">{monthRevenue.diffFromLastMonth}%</span>
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

export default MonthRevenueCard