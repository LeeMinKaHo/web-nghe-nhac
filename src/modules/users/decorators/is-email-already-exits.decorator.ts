import { Injectable } from '@nestjs/common';
import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
  } from 'class-validator';
import { UsersService } from '../services/users.services';
  
  @ValidatorConstraint({ async: true })
  @Injectable()
  export class IsEmailAlreadyExistConstraint implements ValidatorConstraintInterface {
    constructor (
        private readonly _UserService : UsersService
    ){}
    validate(email: any, args: ValidationArguments) {
      return this._UserService.findOneByEmail(email).then(user => {
        if (user) return false;
        return true;
      });
    }
  }
  
  export function IsEmailAlreadyExist(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsEmailAlreadyExistConstraint,
      });
    };
  }