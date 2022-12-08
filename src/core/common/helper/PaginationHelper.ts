export class PaginationHelper {

    static OFFSET_INIT = 0
    static PAGE_INIT = 1
    static DEFAULT_LIMIT = 15
    private totalRows
    private limit
    private currentPage
    private totalPages

    constructor (totalRows, currentPage, limit = PaginationHelper.DEFAULT_LIMIT) {
        this.totalRows = totalRows
        this.limit = limit
        this.currentPage = currentPage || 1
        this.totalPages = 0
        this.calculatePages()
    }

    private calculatePages () {
        this.totalPages =  Math.ceil(this.totalRows / this.limit)
    }

    private previous () {
        if (this.currentPage > PaginationHelper.PAGE_INIT) {
            return this.currentPage - PaginationHelper.PAGE_INIT
        }

        return null
    }

    private next () {
        if (this.currentPage < this.totalPages) {
            return this.currentPage + PaginationHelper.PAGE_INIT
        }

        return null
    }

    public paginate () {
        // Para scrool infinito
        // const offset = page * pageSize;
        // const limit = offset + pageSize;
        let offset = PaginationHelper.OFFSET_INIT

        if (this.currentPage > PaginationHelper.PAGE_INIT) {
            offset = ((this.currentPage - 1) * this.limit)
        }

        return {
            offset: offset,
            limit: this.limit,
        };
    }

    public toJson() {
        return {
            currentPage: this.currentPage,
            totalPages: this.totalPages,
            next: this.next(),
            prev: this.previous(),
            totalRows: this.totalRows,
            limit: this.limit
        }
    }
}