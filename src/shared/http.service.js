function sleep(timeout) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve()
        }, timeout);
    });
}

export class HttpService {
    static async getRevenue() {
        // get data from server
        await sleep(10);

        return Promise.resolve({
            devices: [{device: "tablet", value: 120000, percent: 60}, {device: "smartphone", value: 80000, percent: 40}],
            details: [
                {date: "2018-01-10", close: 100},
                {date: "2018-02-10", close: 60},
                {date: "2018-03-10", close: 85},
                {date: "2018-04-10", close: 150}
            ]
        })
    }

    static async getImpressions() {
        // get data from server
        await sleep(10);

        return Promise.resolve({
            devices: [{device: "tablet", value: 20000000, percent: 40}, {device: "smartphone", value: 30000000, percent: 60}],
            details: [
                {date: "2018-01-10", close: 100},
                {date: "2018-02-10", close: 60},
                {date: "2018-03-10", close: 85},
                {date: "2018-04-10", close: 150}
            ]
        })
    }

    static async getVisits() {
        // get data from server
        await sleep(10);

        return Promise.resolve({
            devices: [{device: "tablet", value: 480000000, percent: 80}, {device: "smartphone", value: 120000000, percent: 20}],
            details: [
                {date: "2018-01-10", close: 100},
                {date: "2018-02-10", close: 60},
                {date: "2018-03-10", close: 85},
                {date: "2018-04-10", close: 150}
            ]
        })
    }
}