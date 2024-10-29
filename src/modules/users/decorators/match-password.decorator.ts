// match-password.decorator.ts
import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { SignUpDTO } from '../dto/signUp.dto';

@ValidatorConstraint({ name: 'matchPassword', async: false })
export class MatchPasswordConstraint implements ValidatorConstraintInterface {
  validate(confirmPassword: string, args: any) {
    const obj = args.object as SignUpDTO;
    return obj.password === confirmPassword; // so sánh mật khẩu
  }

  defaultMessage(args: any) {
    return 'Mật khẩu và xác nhận mật khẩu không khớp!';
  }
}

export function MatchPassword(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: 'matchPassword',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: MatchPasswordConstraint,
    });
  };
}
