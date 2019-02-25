export default class Pipe {
    static money(value, currency){
        const symbols = {
            "EUR": "€",
            "USD": "$",
        };

        if (!symbols[currency]){
            throw new Error(`currency symbol for ${currency} is not defined`)
        }

        return Pipe.numberWithDots(value) + symbols[currency]
    }

    static percent(value){
        return `${value}%`;
    }

    static numberWithDots(x) {
        return x.toString().replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
}