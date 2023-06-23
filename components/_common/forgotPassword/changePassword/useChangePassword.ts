import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as yup from "yup";

import { toast } from "react-toastify";
import { handleCreateNewPassword } from "../../../../services/user.services";
import { getNormalizedError } from "../../../../utilty/helpers";
import { saveAccessToken } from "../../../../store/reducers/user";
import defaultConfig from "../../../../utilty/config";
import axios from "axios";
const useChangePassword = (popupvisible, setActiveModal, saveAuthToken) => {
  const [showPass, setShowPass] = useState(false);
  const [showOldPass, setShowOldPass] = useState(false);
  const [showRepPass, setShowRepPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: yup.object({
      password: yup
        .string()
        .max(255)
        .required("New Password is required")
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

      var config: any = {
        method: "post",
        url: `${defaultConfig?.Base_URL}auth/create-new-password`,
        headers: {
          Authorization: `Bearer ${saveAuthToken}`,
        },
        data: {
          password: values?.password,
        },
      };
      const response = await axios(config);
      resetForm();
      setLoading(false);
      toast.success(response?.data?.message);
      setActiveModal(1);
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
