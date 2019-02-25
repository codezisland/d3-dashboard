import {RevenueChart} from "./revenue-chart";
import {ImpressionsChart} from "./impressions-chart";
import {VisitsChart} from "./visits-chart";
import * as d3 from "d3";

export class Dashboard{
    static async render(){
        await Promise.all([
            RevenueChart.render(d3.select("#chart-revenue")),
            ImpressionsChart.render(d3.select("#chart-impressions")),
            VisitsChart.render(d3.select("#chart-visits"))
        ])
    }
}