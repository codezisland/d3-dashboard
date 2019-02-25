import Pipe from "../../src/shared/pipe";

describe("src/shared/pipe", () => {

    describe("money", () => {
        let  spyOnNumberWithDots;

        beforeAll(() => {
            spyOnNumberWithDots = jest.spyOn(Pipe, "numberWithDots");
            spyOnNumberWithDots.mockImplementation((number) => number.toString());
        });

        afterAll(() => {
            spyOnNumberWithDots.mockRestore();
        });

        beforeEach(() => {
            spyOnNumberWithDots.mockClear();
        });

        it("add 'euro' symbol", async () => {
            expect(Pipe.money(200, "EUR")).toBe("200€");
        });

        it("add 'dollar' symbol", async () => {
            expect(Pipe.money(150, "USD")).toBe("150$");
        });

        it("should call to 'numberWithDots'", async () => {
            Pipe.money(3800, "USD");

            expect(spyOnNumberWithDots).toHaveBeenCalledTimes(1);
            expect(spyOnNumberWithDots).toHaveBeenCalledWith(3800);
        });
    });

    describe("numberWithDots", () => {
        it("receive a number", async () => {
            expect(Pipe.numberWithDots(2034)).toBe("2.034");
        });

        it("receive a string", async () => {
            expect(Pipe.numberWithDots("2034")).toBe("2.034");
        });

        it("add dots", async () => {
            expect(Pipe.numberWithDots("1234567890")).toBe("1.234.567.890");
        });

        it("change decimal dots for comma", async () => {
            expect(Pipe.numberWithDots(1234.56)).toBe("1.234,56");
        });
    });
});