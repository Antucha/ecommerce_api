export class StringToObject {
    static convert(str) {
        return JSON.parse(JSON.stringify(str))
    }
}