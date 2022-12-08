export class Validate {
    public static email (value) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(value).toLowerCase())
    }

    public static birthday (value) {
        const re = /^(\d{4})-(\d{1,2})-(\d{1,2})/
        return re.test(value)
    }
}