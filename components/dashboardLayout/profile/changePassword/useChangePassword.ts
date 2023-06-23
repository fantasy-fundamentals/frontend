import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import {
  handleChangePassword,
  handleUserLogin,
} from "../../../../services/user.services";
import { getNormalizedError } from "../../../../utilty/helpers";
const useChangePassword = () => {
  const [showPass, setShowPass] = useState(false);
  const [showOldPass, setShowOldPass] = useState(false);
  const [showRepPass, setShowRepPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: yup.object({
      oldPassword: yup
        .string()
        .max(255)
        .required("Old password is required")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
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
        .required("Repeat Password is required"),
    }),

    onSubmit: (values, { resetForm }) => {
      handleSubmit(values, { resetForm });
    },
  });
  const handleSubmit = async (values: any, { resetForm }) => {
    try {
      setLoading(true);
      let params = {
        oldPassword: values?.oldPassword,
        newPassword: values?.password,
      };
      const res = await handleChangePassword(params);
      toast.success(res?.data?.message || "Password updated");
      resetForm();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      const err = getNormalizedError(error);
      toast.error(err);
    }
  };

  return {
    showPass,
    setShowPass,
    setShowRepPass,
    setShowOldPass,
    showOldPass,
    showRepPass,
    formik,
    loading,
  };
};

export default useChangePassword;
