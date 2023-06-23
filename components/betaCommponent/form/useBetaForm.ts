import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import {
  handleCloseBeta,
  handleUserRegister,
} from "../../../services/user.services";
import { getNormalizedError } from "../../../utilty/helpers";
const useBetaForm = () => {
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      address: "",
      name: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      name: yup.string().max(255).required("Name is required"),
      address: yup.string().max(255).required("Address is required"),
    }),
    onSubmit: (values: any, actions) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      let params = {
        discord: values.name,
        email: values.email,
        walletAddress: values.address,
      };
      const res = await handleCloseBeta(params);
      toast.success(res?.data?.message);
      formik.resetForm();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      const err = getNormalizedError(error);
      toast.error(err || error?.data?.message);
    }
  };

  return {
    formik,
    loading,
  };
};

export default useBetaForm;
