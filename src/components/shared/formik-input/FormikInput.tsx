import TextField from "@material-ui/core/TextField";
import { FieldHookConfig, useField } from "formik";

type FieldVariant = "standard" | "filled" | "outlined"
const FormikInput = ({ variant = "standard", width = 200, ...rest }) => {
  const [field, meta] = useField(rest as FieldHookConfig<string>);
  //generic formik input error handling
  const errorMsg = meta.touched && meta.error ? meta.error : null;

  return (
    <TextField
      style={{ width: width }}
      {...rest}
      {...field}
      variant={variant as FieldVariant}
      error={!!errorMsg}
      helperText={errorMsg}
    />
  );
};
export default FormikInput;