import Pipe from "../shared/pipe";
import {HttpService} from "../shared/http.service";
import CustomChart from "../shared/custom-chart";

export class RevenueChart {
    static async render(container){
        this.chart = CustomChart.create(container, HttpService.getRevenue(), {
            label: "Revenue",
            transforms: (v) => Pipe.money(v, 'EUR'),
            colors: ['#63D30C', '#215B00'],
            lineColor: "#CEE4BC",
            areaColor: "#F3FBF0"
        });
    }
}