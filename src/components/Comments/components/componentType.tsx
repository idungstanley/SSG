import { AnyObject, OptionalObjectSchema } from 'yup/lib/object';
import { RequiredStringSchema } from 'yup/lib/string';

export interface selectedUserType {
  id: string;
  name?: string;
}

export interface formikConfig {
  initValues: {
    name?: string;
    email: string;
    password: string;
  };
  validationSchema: OptionalObjectSchema<
    {
      name?: RequiredStringSchema<string | undefined, AnyObject>;
      email: RequiredStringSchema<string | undefined, AnyObject>;
      password: RequiredStringSchema<string | undefined, AnyObject>;
    },
    AnyObject
  >;
  buttonTitle: string;
}
