import {HttpService} from "./http.service";

class CustomChart extends Chart {
    constructor(ctx, config) {
        super(ctx, config);
        this.config = config;
    }

    static async create(ctx) {
        const revenue = await HttpService.getRevenue();

        /*return new CustomChart(ctx,  {
            type: 'line',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [{
                    label: 'My First dataset',
                    backgroundColor: window.chartColors.red,
                    borderColor: window.chartColors.red,
                    data: [
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor()
                    ],
                    fill: 'start',
                    lineTension: 0
                }]
            },
            options: {
                responsive: true,
                title: {
                    display: false,
                    text: 'Chart.js Line Chart'
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
                scales: {
                    xAxes: [{
                        display: false
                    }],
                    yAxes: [{
                        display: false
                    }]
                }
            }
        });*/

        return new CustomChart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [{
                    data: revenue.map(r => r.value),
                    backgroundColor: [
                        "red",
                        "orange"
                    ],
                    borderWidth: [0, 0],
                    label: 'Dataset 1'
                },
                    {
                        type: 'line',
                        label: 'My First dataset',
                        backgroundColor: window.chartColors.red,
                        borderColor: window.chartColors.red,
                        data: [
                            randomScalingFactor(),
                            randomScalingFactor(),
                            randomScalingFactor(),
                            randomScalingFactor(),
                            randomScalingFactor(),
                            randomScalingFactor(),
                            randomScalingFactor()
                        ],
                        fill: 'start',
                        lineTension: 0
                    }],
                // labels: revenue.map(r => r.device)
            },
            options: {
                cutoutPercentage: 75,
                responsive: true,
                legend: {
                    display: false,
                    position: 'top',
                },
                scales: {
                    xAxes: [{
                        display: false
                    }],
                    yAxes: [{
                        display: false
                    }]
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                }
            }
        });

        // window.myDoughnut.update();
    }
}

export default CustomChart;