import { ErrorMessage, Field, Form, Formik } from "formik";
import css from "./RegistrationForm.module.css";
import * as Yup from "yup";

import { useDispatch } from "react-redux";

import { register } from "../../redux/auth/operations";

const INITIAL_VALUE = {
  name: "",
  email: "",
  password: "",
};

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(10, "Too Long!")
    .required("Username is wrong"),
  email: Yup.string().email().required("Incorrect email"),
  password: Yup.string()
    .min(4, "Too Short!")
    .max(20, "Too Long!")
    .required("Wrong password"),
});

export default function RegistrationForm() {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(register(values));

    actions.resetForm();
  };

  return (
    <Formik
      initialValues={INITIAL_VALUE}
      validationSchema={ContactSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <label className={css.label}>
          <span className={css.title}>Name</span>
          <Field
            type="text"
            name="name"
            className={css.input}
            placeholder="John Smith"
          />
          <ErrorMessage name="name" component="span" />
        </label>
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
          Ad contact
        </button>
      </Form>
    </Formik>
  );
}
