import { PaginationMetaDataDto } from "./pagination-metadata.dto"

export class pageDto{
    readonly data : Array<any>
    readonly metadata : PaginationMetaDataDto
    constructor(data :  Array<any>, metaData: PaginationMetaDataDto){
        this.data = data
        this.metadata = metaData
    }
}