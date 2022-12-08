export class TypeTimeTranslate {
    public static YEAR = 'year'
    public static MONTH = 'month'

    public static translateSpanish (type) {
        switch (type) {
            case TypeTimeTranslate.YEAR:
                return 'Años'

            case TypeTimeTranslate.MONTH:
                return 'Meses'

            default:
                return 'Años'
        }
    }
}