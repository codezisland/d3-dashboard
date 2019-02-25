import CustomChart from "../../src/shared/custom-chart";
import {RevenueChart} from "../../src/dashboard/revenue-chart";
import {HttpService} from "../../src/shared/http.service";

jest.mock("../../src/shared/custom-chart", () => ({create: jest.fn()}));
jest.mock("../../src/shared/http.service", () => ({ HttpService: {getRevenue: jest.fn()}}));

describe("src/dashboard/revenue-chart", () => {

    it("should render 'CustomChart' with rights params", async () => {
        const CONTAINER = { field: "testing"};
        const GET_REVENUE_PROMISE = new Promise((resolve) => { resolve("testing")});

        HttpService.getRevenue.mockImplementationOnce(() => GET_REVENUE_PROMISE);

        await RevenueChart.render(CONTAINER);

        expect(CustomChart.create).toHaveBeenCalledTimes(1);
        expect(CustomChart.create.mock.calls[0][0]).toBe(CONTAINER);
        expect(CustomChart.create.mock.calls[0][1]).toBe(GET_REVENUE_PROMISE);
        expect(CustomChart.create.mock.calls[0][2]).toMatchObject({
            label: "Revenue",
            // transforms: (v) => Pipe.money(v, '€'),
            colors: ['#63D30C', '#215B00'],
            lineColor: "#CEE4BC",
            areaColor: "#F3FBF0"
        });
    });

});