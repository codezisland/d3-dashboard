import {Dashboard} from "../../src/dashboard";
import {RevenueChart} from "../../src/dashboard/revenue-chart";
import {ImpressionsChart} from "../../src/dashboard/impressions-chart";
import {VisitsChart} from "../../src/dashboard/visits-chart";

jest.mock("../../src/dashboard/revenue-chart", () => ({RevenueChart: {render: jest.fn()}}));
jest.mock("../../src/dashboard/impressions-chart", () => ({ImpressionsChart: {render: jest.fn()}}));
jest.mock("../../src/dashboard/visits-chart", () => ({VisitsChart: {render: jest.fn()}}));

describe("src/dashboard/index", () => {

    beforeEach(() => {
        RevenueChart.render.mockClear();
        ImpressionsChart.render.mockClear();
        VisitsChart.render.mockClear();
    });

    it("should render 'RevenueChart'", async () => {

        await Dashboard.render();

        expect(RevenueChart.render).toHaveBeenCalledTimes(1);
        // expect(RevenueChart.render).toHaveBeenCalledWith(d3.select("#chart-revenue"));
    });

    it("should render 'ImpressionsChart'", async () => {

        await Dashboard.render();

        expect(ImpressionsChart.render).toHaveBeenCalledTimes(1);
        // expect(RevenueChart.render).toHaveBeenCalledWith(d3.select("#chart-revenue"));
    });

    it("should render 'VisitsChart'", async () => {

        await Dashboard.render();

        expect(VisitsChart.render).toHaveBeenCalledTimes(1);
        // expect(RevenueChart.render).toHaveBeenCalledWith(d3.select("#chart-revenue"));
    });

});