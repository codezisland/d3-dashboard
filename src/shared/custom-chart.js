import * as _ from "lodash";
import Pipe from "./pipe";
import * as d3 from "d3";

class CustomChart {
    constructor(container, data, config) {
        this.container = container;
        this.data = data;
        this.config = config;

        if (_.isEmpty(data.devices) || _.isEmpty(data.details)){
            return;
        }

        const node = container.node();
        node.innerHTML = "";

        const width = 250,
            height = 250,
            borderWidth = 10,
            radius = Math.min(width, height) / 2;

        const center = {x: width / 2, y: height / 2};

        const svg = container.append("svg");

        svg.attr("height", height)
            .attr("width", width);

        const transforms = _.get(config, "transforms", val => val);

        const color = d3.scaleOrdinal(config.colors);

        const legend = document.createElement("div");
        legend.className = "chart-w-legend";
        legend.innerHTML = "";

        for (const d of data.devices) {
            legend.innerHTML += `<div class="chart-w-legend-i">
                        <p class="chart-w-legend-i-title" style="color: ${color(d.device)}">${d.device}</p>
                        <p class="chart-w-legend-i-value"><strong>${Pipe.percent(d.percent)}</strong>${transforms(d.value)}</p>
                    </div>`;
        }

        node.append(legend);

        // parse the date / time
        const parseTime = d3.timeParse("%Y-%m-%d");

        // format the data
        data.details.forEach((d) => {
            d.date = parseTime(d.date);
            d.close = +d.close;
        });


        //#region Title & total
        svg.append("text")
            .text(config.label)
            .attr("x", center.x)
            .attr("y", center.y - 35)
            .attr("class", "chart-w-label");

        svg.append("text")
            .text(transforms(_.sumBy(data.devices, s => s.value)))
            .attr("x", center.x)
            .attr("y", center.y)
            .attr("class", "chart-w-total");

        //#endregion

        const g = svg.append("g")
            .attr("transform", "translate(" + center.x + "," + center.y + ")");

        const pie = d3.pie().value((d) => d.percent);

        const path = d3.arc()
            .outerRadius(radius)
            .innerRadius(radius - borderWidth);

        const arc = g.selectAll(".arc")
            .data(pie(data.devices))
            .enter().append("g")
            .attr("class", "arc");

        arc.append("path")
            .attr("d", path)
            .attr("fill", (d) => color(d.data.device));


        //#region Draw Chart Lines
        const linesInfo = {
            width: radius * 1.25,
            height: radius / 2.5
        };

        const linesOrigin = {
            x: center.x - linesInfo.width / 2,
            y: center.y + linesInfo.height / 2
        };

        // set the ranges
        const x = d3.scaleTime().range([0, linesInfo.width]);
        const y = d3.scaleLinear().range([linesInfo.height, 0]);

        // define the area
        const area = d3.area().x((d) => x(d.date)).y0(linesInfo.height).y1((d) => y(d.close));

        // define the line
        const valueline = d3.line().x((d) => x(d.date)).y((d) => y(d.close));

        // scale the range of the data
        x.domain(d3.extent(data.details, (d) => d.date));
        y.domain([0, d3.max(data.details, (d) => d.close)]);

        // add the area
        svg.append("path")
            .data([data.details])
            .attr("transform", "translate(" + linesOrigin.x + "," + linesOrigin.y + ")")
            .attr("class", "area")
            .attr("fill", config.areaColor)
            .attr("d", area);

        // add the valueline path.
        svg.append("path")
            .data([data.details])
            .attr("transform", "translate(" + linesOrigin.x + "," + linesOrigin.y + ")")
            .attr("class", "line")
            .attr("stroke", config.lineColor)
            .attr("d", valueline);

        //#endregion

        //#region Draw Target Lines
        const targetLines = [
            {x: [center.x, center.x], y: [borderWidth + 3, borderWidth + 8]},
            {x: [center.x, center.x], y: [height - borderWidth - 8, height - borderWidth - 3]},
            {x: [borderWidth + 3, borderWidth + 8], y: [center.y, center.y]},
            {x: [width - borderWidth - 8, width - borderWidth - 3], y: [center.y, center.y]},
        ];

        for (let t of targetLines) {
            svg.append("line")
                .attr("class", "target-line")
                .attr("x1", t.x[0])
                .attr("y1", t.y[0])
                .attr("x2", t.x[1])
                .attr("y2", t.y[1]);
        }

        //#endregion
    }

    static create(container, loadData, config) {
        return new Promise(function (resolve, reject) {
            loadData.then(function (data) {
                resolve(new CustomChart(container, data, config));
            }).catch(function (err) {
                container.append("text").text("cannot render chart");

                reject(err);
            });
        });

    }
}

export default CustomChart;