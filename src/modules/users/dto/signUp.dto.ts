import { IsEmail, IsNotEmpty, Validate } from "class-validator"
import { IsUserAlreadyExist, IsUserAlreadyExistConstraint } from "../decorators/is-user-already-exits"
import { MatchPassword } from "../decorators/match-password.decorator"
import { IsEmailAlreadyExist } from "../decorators/is-email-already-exits.decorator"


export class SignUpDTO{
    @IsNotEmpty()
    @IsUserAlreadyExist({
        message:"User name already exits"
    })
    username : string
    @IsNotEmpty()
    password:string 
    @IsNotEmpty()
    @MatchPassword({
        message : "Please confirm that your password matches the one you entered earlier"
    })
    confirmPassword : string
    @IsEmail()
    @IsEmailAlreadyExist({
        message:"Email already register"
    })
    email:string
}