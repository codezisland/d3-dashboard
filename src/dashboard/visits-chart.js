import Pipe from "../shared/pipe";
import {HttpService} from "../shared/http.service";
import CustomChart from "../shared/custom-chart";

export class VisitsChart {
    static async render(container){
        this.chart = CustomChart.create(container, HttpService.getVisits(), {
            label: "Visits",
            transforms: Pipe.numberWithDots,
            colors: ['#F8B300', '#C43B00'],
            lineColor: "#F3E8AE",
            areaColor: "#FDF9EF"
        });
    }
}