import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import colors from "tailwindcss/colors";

import {
  ResponsiveContainer,
  Pie,
  PieChart,
  Cell,
} from "recharts";
import { BarChart } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getPopularProducts } from "@/api/get-popular-products";

const COLORS = [
  colors.sky[500],
  colors.amber[500],
  colors.violet[500],
  colors.emerald[500],
  colors.rose[500],
];

function PopularProductsChart() {
  const { data: popularProducts, isLoading, error } = useQuery({
    queryKey: ["metrics", "popular-products"],
    queryFn: getPopularProducts,
  });

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  if (error || !Array.isArray(popularProducts)) {
    return <p>Erro ao carregar os produtos populares.</p>;
  }

  return (
    <Card className="col-span-3">
      <CardHeader className="pb-8">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            Produtos populares
          </CardTitle>
          <BarChart className="w-4 h-4 text-muted-foreground" />
        </div>
      </CardHeader>

      <CardContent>
        <ResponsiveContainer width="100%" height={248}>
          <PieChart style={{ fontSize: 12 }}>
            <Pie
              data={popularProducts}
              dataKey="amount"
              nameKey="product"
              cx="50%"
              cy="50%"
              outerRadius={86}
              innerRadius={64}
              strokeWidth={8}
              labelLine={false}
              label={({
                cx,
                cy,
                midAngle,
                innerRadius,
                outerRadius,
                value,
                index,
              }) => {
                const RADIAN = Math.PI / 180;
                const radius =
                  12 + innerRadius + (outerRadius - innerRadius);
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);

                return (
                  <text
                    x={x}
                    y={y}
                    className="fill-muted-foreground text-xs"
                    textAnchor={x > cx ? "start" : "end"}
                    dominantBaseline="central"
                  >
                    {popularProducts[index].product.length > 12
                      ? popularProducts[index].product
                          .substring(0, 12)
                          .concat("...")
                      : popularProducts[index].product}{" "}
                    ({value})
                  </text>
                );
              }}
            >
              {popularProducts.map((_, index) => {
                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index]}
                    className="stroke-background hover:opacity-80"
                  />
                );
              })}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default PopularProductsChart;
