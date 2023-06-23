import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { handleUserLogin } from "../../../services/user.services";
import { saveAccessToken, saveUserData } from "../../../store/reducers/user";
import { getNormalizedError } from "../../../utilty/helpers";
import { toast } from "react-toastify";
const useLogin = (popupvisible) => {
  const dispatch = useDispatch();
  const location = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [humanValidation, setHumanValidation] = useState(true);
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
      email: "",
      password: "",
    },
    validationSchema: yup.object({
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
    }),
    onSubmit: (values, actions) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values: any) => {
    try {
      // if (!humanValidation) {
      //   setLoading(false);

      //   return;
      // }
      setLoading(true);
      let params = {
        email: values?.email,
        password: values?.password,
        fcmToken: "",
      };
      const res = await handleUserLogin(params);
      dispatch(saveAccessToken(res?.data?.accessToken));
      dispatch(saveUserData(res?.data));
      toast.success("Login successful!");
      setLoading(false);
      popupvisible(false);
      // location.push("/dashboard");
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
    loading,
    googlerecaptcha,
    show,
  };
};

export default useLogin;
