import { PaginationDto } from "./pagination.dto"

export class PaginationMetaDataDto{
    readonly totalPage:number
    readonly page : number
    readonly hasNextPage : boolean
    readonly hasPrevPage : boolean
    readonly totalItem : number
    constructor(paginationDto :PaginationDto , totalItems : number){
        this.totalPage = Math.ceil(totalItems / paginationDto.limit)
        this.page = paginationDto.page
        this.hasNextPage = this.page < this.totalPage
        this.hasPrevPage = this.page > 1
        this.totalItem = totalItems
    }
}