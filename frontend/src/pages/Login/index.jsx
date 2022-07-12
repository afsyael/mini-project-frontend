import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {Button, Form, FormFeedback, Input, Label, FormGroup} from 'reactstrap';

const validation = yup.object().shape({
  email: yup.string().email().required("Email Salah"),
  password: yup.string().min(8).required(),
});

const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validation,
    onSubmit: () => handleLogin(),
  });


  const handleLogin = () => {
    alert('Test')
  };

  return (
    <div>
      <Form onSubmit={formik.handleSubmit}>
        <h1>Login</h1>
        <FormGroup>
          <Label>Email</Label>
          <Input
            value={formik.values.email}
            placeholder="Please Enter Your Email"
            onChange={formik.handleChange}
            name="email"
            id="email"
            invalid={formik.touched.email && Boolean(formik.errors.email)}
          />
          {formik.touched.email && Boolean(formik.errors.email) && (
            <FormFeedback>{formik.errors.email}</FormFeedback>
          )}
        </FormGroup>

        <FormGroup>
          <Label>Password</Label>
          <Input
            value={formik.values.password}
            placeholder="Please Enter Your password"
            onChange={formik.handleChange}
            name="password"
            id="password"
            invalid={formik.touched.password && Boolean(formik.errors.password)}
          />
          {formik.touched.password && Boolean(formik.errors.password) && (
            <FormFeedback>{formik.errors.password}</FormFeedback>
          )}
        </FormGroup>

        <Button onSubmit={() => handleLogin()}>Login</Button>
      </Form>
    </div>
  );
};

export default Login;
