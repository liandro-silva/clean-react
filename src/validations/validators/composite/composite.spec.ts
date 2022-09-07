import { FieldValidationSpy } from "@/validations/validators/mocks";
import { ValidationComposite } from ".";

describe("\n Validators - ValidationComposite \n", () => {
  it("should return error if any validation fails", () => {
    const fieldValidationSpy = new FieldValidationSpy("any_field");
    fieldValidationSpy.error = new Error("first_error");
    const fieldValidationSpy2 = new FieldValidationSpy("any_field");
    fieldValidationSpy2.error = new Error("second_error");
    const sut = new ValidationComposite([
      fieldValidationSpy,
      fieldValidationSpy2,
    ]);
    const error = sut.validate("any_field", "any_value");
    expect(error).toBe("first_error");
  });
});
