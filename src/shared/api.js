import CustomChart from "./custom-chart";

window.onload = function () {
    const ctx1 = document.getElementById('chart-revenue').getContext('2d');
    // const ctx2 = document.getElementById('chart-impressions').getContext('2d');

    Promise.all([ CustomChart.create(ctx1)])
    /// window.myDoughnut = new CustomChart(ctx);
   ;

};