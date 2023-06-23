import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import {
  handleForgotPassword,
  handleUserLogin,
} from "../../../services/user.services";
import { saveAccessToken, saveUserData } from "../../../store/reducers/user";
import { getNormalizedError } from "../../../utilty/helpers";
import { toast } from "react-toastify";
const useForgotPassword = (popupvisible, setActiveModal) => {
  const dispatch = useDispatch();
  const location = useRouter();
  const [screenActive, setScreenActive] = useState<number>(0);
  const [email, setEmail] = useState();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
    }),
    onSubmit: (values, actions) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      let params = {
        email: values?.email,
      };
      const res = await handleForgotPassword(params);
      setEmail(values?.email);

      toast.success(res?.data?.message);
      setScreenActive(1);
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
    formik,
    setScreenActive,
    screenActive,
    loading,
    email,
  };
};

export default useForgotPassword;
