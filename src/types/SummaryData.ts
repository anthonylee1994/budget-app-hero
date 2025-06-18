import {DonutChart} from "./DonutChart";
import {Period} from "./Period";

export interface SummaryData {
    total_income: number;
    total_expenses: number;
    net_balance: number;
    donut_chart: DonutChart;
    bar_chart: BarChartItem[];
    period: Period;
}
