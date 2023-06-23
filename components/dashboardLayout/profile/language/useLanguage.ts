import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as yup from "yup";
import { EditUserEmail, UserInfo } from "../../../../services/user.services";
import { getNormalizedError } from "../../../../utilty/helpers";
const useLanguage = () => {
  const [filterBy, setFilterBy] = useState("Select Your Language");
  const [data, setData] = useState<any>();
  const filterOptions = ["English (United States)", "Urdu"];
  const [active, setActive] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: data ? data?.name : "",
      email: data ? data?.email : "",
      // language: "",
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      name: yup.string().max(255).required("Name is required"),
      // email: yup
      //   .string()
      //   .email("Must be a valid email")
      //   .max(255)
      //   .required("Email is required"),
      // language: yup.string().max(255).required("language is required"),
    }),

    onSubmit: (values, actions) => {
      handleSubmit(values);
      setActive(false);
    },
  });

  const handleSubmit = async (values) => {
    try {
      const params = {
        name: values.name,
        email: values.email,
        // profilePicture: "",
      };
      const res = await EditUserEmail(params);
      toast.success("Updated successfully!");
    } catch (error) {
      const err = getNormalizedError(error);
      toast.error(error?.message);
    }
  };

  const GetUserData = async () => {
    try {
      const res = await UserInfo();
      setData(res?.data?.user);
    } catch (error) {
      const err = getNormalizedError(error);
      toast.error(err || error?.message);
    }
  };

  useEffect(() => {
    GetUserData();
  }, []);

  return {
    formik,
    setFilterBy,
    filterBy,
    filterOptions,
    active,
    setActive,
    data,
  };
};

export default useLanguage;
