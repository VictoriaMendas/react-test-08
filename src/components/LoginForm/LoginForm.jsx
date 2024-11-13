import { ErrorMessage, Field, Formik } from "formik";
import * as Yup from "yup";
import { Form } from "react-router-dom";
import css from "./LoginForm.module.css";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";

const INITIAL_VALUE = {
  email: "",
  password: "",
};

const LoginSchema = Yup.object().shape({
  email: Yup.string().required("Incorrect email"),
  password: Yup.string()
    .min(6, "Too Short!")
    .max(20, "Too Long!")
    .required("Wrrong password"),
});

export default function LoginForm() {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(logIn(values));

    actions.resetForm();
  };

  return (
    <Formik
      initialValues={INITIAL_VALUE}
      validationSchema={LoginSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <label className={css.label}>
          <span className={css.title}> Email</span>

          <Field
            type="text"
            name="email"
            className={css.input}
            plceholder="JohnS@gmail.com"
          />
          <ErrorMessage name="email" component="span" />
        </label>
        <label className={css.label}>
          <span className={css.title}>Password</span>

          <Field
            type="text"
            name="password"
            className={css.input}
            placeholder="....."
          />
          <ErrorMessage name="password" component="span" />
        </label>
        <button type="submit" className={css.btn}>
          Login
        </button>
      </Form>
    </Formik>
  );
}
