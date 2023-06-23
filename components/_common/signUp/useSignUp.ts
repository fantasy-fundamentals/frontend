import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { handleUserRegister } from "../../../services/user.services";
import { getNormalizedError } from "../../../utilty/helpers";
const useSignUp = (setActiveModal) => {
  const [showPass, setShowPass] = useState(false);
  const [showRepPass, setShowRepPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [humanValidation, setHumanValidation] = useState(false);
  const [show, setShow] = useState(false);
  // ----------Validate google recaptcha--------
  const googlerecaptcha = (e) => {
    if (e) {
      setHumanValidation(true);
      setShow(false);
    } else {
      setShow(true);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: yup.object({
      name: yup
        .string()
        .trim()
        .matches(
          /^\S(?:.*\S)?$/,
          "Name should contain only alphabets and number"
        )
        .required("Name is required"),
      email: yup
        .string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      password: yup
        .string()
        .max(255)
        .required("Password is required")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
      passwordConfirmation: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: (values: any, actions) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values: any) => {
    try {
      if (!humanValidation) {
        setLoading(false);

        return;
      }
      setLoading(true);
      let params = {
        name: String(values.name)?.trim(),
        email: String(values.email)?.trim(),
        // fcmToken: "",
        password: values.password,
      };

      const res = await handleUserRegister(params);
      toast.success(
        res?.data?.message || "Verification email successfully sent!"
      );
      setLoading(false);
      setActiveModal(1);
    } catch (error) {
      setLoading(false);
      const err = getNormalizedError(error);
      toast.error(err || error?.data?.message);
    }
  };

  return {
    showPass,
    setShowPass,
    setShowRepPass,
    showRepPass,
    formik,
    loading,
    googlerecaptcha,
    show,
  };
};

export default useSignUp;
