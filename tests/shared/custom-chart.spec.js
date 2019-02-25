import CustomChart from "../../src/shared/custom-chart";
import * as d3 from "d3";

jest.mock('d3');

describe("src/shared/custom-chart", () => {

    beforeEach(() => {
        d3.append.mockClear();
        d3.text.mockClear();
    });

    it("fail loading data should render error message", async () => {
        const LOAD_DATA_PROMISE = new Promise(function(resolve, reject){
            setTimeout(function(){reject(new Error("testing error"))}, 3);
        });

        await expect(CustomChart.create(d3.container(), LOAD_DATA_PROMISE, {})).rejects.toThrow("testing error");

        expect(d3.text).toHaveBeenCalledTimes(1);
        expect(d3.text).toHaveBeenCalledWith("cannot render chart");
    });

    it("success loading data should create an instance of 'CustomChart'", async () => {
        const LOAD_DATA_PROMISE = new Promise(function(resolve, reject){
            setTimeout(function(){resolve({ devices: [], details: []})}, 3);
        });

        const chart = await CustomChart.create(d3.container(), LOAD_DATA_PROMISE, {});

        expect(chart).toBeInstanceOf(CustomChart);
    })
});