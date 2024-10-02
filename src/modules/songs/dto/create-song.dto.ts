import { IsNotEmpty, IsNumber } from "class-validator"

export class createSongDTO{
    @IsNotEmpty()
    title : string
    @IsNotEmpty()
    album_id:string
    @IsNotEmpty()
    genre : string
    
    @IsNotEmpty()
    artistId:number
    duration : number
}