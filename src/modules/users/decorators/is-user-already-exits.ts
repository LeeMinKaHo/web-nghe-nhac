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
  export class IsUserAlreadyExistConstraint implements ValidatorConstraintInterface {
    constructor (
        private readonly _UserService : UsersService
    ){}
    validate(userName: any, args: ValidationArguments) {
      return this._UserService.findOneByUserName(userName).then(user => {
        if (user) return false;
        return true;
      });
    }
  }
  
  export function IsUserAlreadyExist(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsUserAlreadyExistConstraint,
      });
    };
  }