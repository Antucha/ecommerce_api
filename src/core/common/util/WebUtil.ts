import {XMLHttpRequest} from 'xmlhttprequest-ts'
import {URL} from "url";

export class WebUtil {
    static WORLDWIDEWEB = 'www.'
    static isWebAvailable (url):boolean {
        var http = new XMLHttpRequest();
        http.open('HEAD', url, false)
        http.send()
        console.log(http.status)
        // ! ($response->getStatusCode() >= 200 && $response->getStatusCode() < 300)
        if ((http.status >= 200   && http.status <= 301)) {
            return true
        }
        return false
    }

    static getHref (url:string) {
        const domain = new URL(url)
        return domain.protocol
            .replace(':', '')
            .replace('/','')
    }

    static getPathDomain(url:string) {
        const domain = (new URL(url)).pathname
        return domain
    }

    static getDomainName (url:string) {
        const domain = (new URL(url)).hostname.replace(WebUtil.WORLDWIDEWEB,'')
        const position = domain.indexOf(".")
        return domain.substr(0, position)
    }

    static getDomainBase (url:string) {
        const domain = (new URL(url)).origin

        return domain
    }

    static getTLD (url:string) {
        const domain = (new URL(url)).hostname.replace(WebUtil.WORLDWIDEWEB,'')
        return WebUtil.subtractDot(domain)
    }

    static subtractDot (str:string) {
        const position = str.indexOf(".")
        const subtract = str.substr(position + 1, str.length)
        if (subtract.indexOf(".") == -1) {
            return subtract
        } else {
            return WebUtil.subtractDot(subtract)
        }
    }

    static urlFix (str?: string, domain? : string) {
        if (str == null) {
            return null
        }
        const doubleSlash = str.substr(0, 2)
        switch (doubleSlash) {
            case '//':
                return WebUtil.getHref(domain) + '://' + str.substr(2, str.length)
            default:
                if (str.substr(0, 1) == '/') {
                    return domain + str
                }

                return str
        }

    }
}