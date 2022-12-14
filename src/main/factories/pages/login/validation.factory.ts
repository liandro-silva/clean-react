import {
  ValidationBuilder,
  ValidationComposite
} from '@/validations/validators'

export const makeLoginValidations = (): ValidationComposite => {
  return new ValidationComposite([
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().min(5).build()
  ])
}
