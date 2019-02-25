import CustomChart from "../../src/shared/custom-chart";
import {HttpService} from "../../src/shared/http.service";
import {ImpressionsChart} from "../../src/dashboard/impressions-chart";
import Pipe from "../../src/shared/pipe";

jest.mock("../../src/shared/custom-chart", () => ({create: jest.fn()}));
jest.mock("../../src/shared/http.service", () => ({ HttpService: {getImpressions: jest.fn()}}));

describe("src/dashboard/impressions-chart", () => {
    it("should render 'CustomChart' with rights params", async () => {
        const CONTAINER = { field: "testing"};
        const GET_REVENUE_PROMISE = new Promise((resolve) => { resolve("testing")});

        HttpService.getImpressions.mockImplementationOnce(() => GET_REVENUE_PROMISE);

        await ImpressionsChart.render(CONTAINER);

        expect(CustomChart.create).toHaveBeenCalledTimes(1);
        expect(CustomChart.create.mock.calls[0][0]).toBe(CONTAINER);
        expect(CustomChart.create.mock.calls[0][1]).toBe(GET_REVENUE_PROMISE);
        expect(CustomChart.create.mock.calls[0][2]).toMatchObject({
            label: "Impressions",
            transforms: Pipe.numberWithDots,
            colors: ['#46BFE0', '#1C445B'],
            lineColor: "#CAE2EC",
            areaColor: "#F3F9FA"
        });
    });

});