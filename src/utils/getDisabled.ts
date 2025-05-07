type GetDisabledParams = {
  values: Record<string, string>;
  errors: Record<string, string>;
};

export const getDisabled = ({ values, errors }: GetDisabledParams) =>
  Object.values(values).some(value => !value) ||
  Object.values(errors).length > 0;
