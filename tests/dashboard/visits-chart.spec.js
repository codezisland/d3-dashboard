import CustomChart from "../../src/shared/custom-chart";
import {HttpService} from "../../src/shared/http.service";
import {VisitsChart} from "../../src/dashboard/visits-chart";
import Pipe from "../../src/shared/pipe";

jest.mock("../../src/shared/custom-chart", () => ({create: jest.fn()}));
jest.mock("../../src/shared/http.service", () => ({ HttpService: {getVisits: jest.fn()}}));

describe("src/dashboard/visits-chart", () => {
    it("should render 'CustomChart' with rights params", async () => {
        const CONTAINER = { field: "testing"};
        const GET_REVENUE_PROMISE = new Promise((resolve) => { resolve("testing")});

        HttpService.getVisits.mockImplementationOnce(() => GET_REVENUE_PROMISE);

        await VisitsChart.render(CONTAINER);

        expect(CustomChart.create).toHaveBeenCalledTimes(1);
        expect(CustomChart.create.mock.calls[0][0]).toBe(CONTAINER);
        expect(CustomChart.create.mock.calls[0][1]).toBe(GET_REVENUE_PROMISE);
        expect(CustomChart.create.mock.calls[0][2]).toMatchObject({
            label: "Visits",
            transforms: Pipe.numberWithDots,
            colors: ['#F8B300', '#C43B00'],
            lineColor: "#F3E8AE",
            areaColor: "#FDF9EF"
        });
    });

});