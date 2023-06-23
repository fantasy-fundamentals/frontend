import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import * as yup from "yup";

import { toast } from "react-toastify";
import { handlePinVerification } from "../../../../services/user.services";
import { getNormalizedError } from "../../../../utilty/helpers";
import { saveAccessToken } from "../../../../store/reducers/user";
import Input from "../../Input/input";
const useConfirmCode = (
  popupvisible,
  setScreenActive,
  setSaveAuthToken,
  email
) => {
  const dispatch = useDispatch();
  const location = useRouter();
  const secRef: any = useRef();
  const theRef: any = useRef();
  const fourRef: any = useRef();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  const ChangeHandler = (e: any) => {
    let { name, value } = e.target;
    setData({ ...data, [name]: value });
    if (value != "") {
      name === "numberOne" && secRef?.current?.focus();
      name === "numberTwo" && theRef?.current?.focus();
      name === "numberThree" && fourRef?.current?.focus();
    }
  };

  const handleSubmit = async () => {
    try {
      if (Object.keys(data).length <= 3) {
        toast.error("Confirmation Pin Required");
        return;
      }
      setLoading(true);
      let params = {
        code: Object?.values(data).join(""),
        email: email,
      };

      const res = await handlePinVerification(params);
      setSaveAuthToken(res?.data?.authToken);
      toast.success(res?.data?.message);
      setScreenActive(2);
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
    handleSubmit,
    loading,
    secRef,
    theRef,
    fourRef,
    ChangeHandler,
  };
};

export default useConfirmCode;
