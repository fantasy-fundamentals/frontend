import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { toast } from "react-toastify";
import { getNormalizedError } from "../../../../utilty/helpers";
const useCheckout = () => {
  const dispatch = useDispatch();
  const location = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      cardNumber: "",
      name: "",
      expiry: "",
      cvv: "",
    },
    validationSchema: yup.object({
      cardNumber: yup
        .number()
        .min(999999999999999, "Card Number must be equal to 16 Charactor")
        .required("Card Number is required"),
      expiry: yup
        .number()
        .min(999, "Expiry must be equal to 4 Charactor")
        .required("Expiry is required"),
      cvv: yup
        .number()
        .min(99, "min 3 Charactor required")
        .max(9999, "cvv must be less than 5 Charactor")
        .required("CVV is required"),
      name: yup.string().max(255).uppercase().required("Card Name is required"),
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
        password: values?.password,
        fcmToken: "",
      };
      return;
      // const res = await handleUserLogin(params);
      toast.success("login successful");
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
    loading,
  };
};

export default useCheckout;
