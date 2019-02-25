import Pipe from "../shared/pipe";
import {HttpService} from "../shared/http.service";
import CustomChart from "../shared/custom-chart";

export class ImpressionsChart {
    static async render(container){
        this.chart = CustomChart.create(container, HttpService.getImpressions(), {
            label: "Impressions",
            transforms: Pipe.numberWithDots,
            colors: ['#46BFE0', '#1C445B'],
            lineColor: "#CAE2EC",
            areaColor: "#F3F9FA"
        });
    }
}