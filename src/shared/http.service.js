export class HttpService {

    static sleep(timeout) {
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve()
            }, timeout);
        });
    }

    static async getRevenue() {
        // get data from server
        await HttpService.sleep(10);

        return Promise.resolve([
            {device: "tablet", value: 120000},
            {device: "smartphone", value: 80000}
        ])
    }
}