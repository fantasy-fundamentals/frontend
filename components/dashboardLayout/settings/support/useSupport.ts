import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useRef, useState } from "react";
import * as yup from "yup";
import { handleUserReports } from "../../../../services/user.services";
import { getNormalizedError } from "../../../../utilty/helpers";
import { changesImageUrl } from "../../../../services/imageUpload.servises";
const useSupport = () => {
  const [loading, setLoading] = useState(false);
  const [fileCheck, setFileCheck] = useState(false);
  const selectedFile = useRef(null);
  const [filterBy, setFilterBy] = useState("Select Subject");
  const filterOptions = ["How we can help?", "Report Bug"];
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      image: null,
    },
    validationSchema: yup.object({
      name: yup.string().max(255).required("Name is required"),
      subject: yup.string().max(255).required("Subject is required"),
      message: yup.string().max(255).required("Message is required"),
      image: yup.mixed(),
      email: yup
        .string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      handleReports(values, { resetForm });
    },
  });

  const handleImageUpload = async (file: any, type: string) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);
    const uploadRes = await changesImageUrl(formData);
    return uploadRes.data.url;
  };

  const handleReports = async (values, { resetForm }) => {
    try {
      setLoading(true);
      let params = {
        image:
          values.image != null &&
          (await handleImageUpload(values?.image[0], "NFT")),
        subject: values.subject,
        name: values.name,
        email: values.email,
        message: values.message,
      };

      const res = await handleUserReports(params);
      toast.success(res?.data?.message);
      formik.setFieldValue("image", null);
      setFilterBy("Select Subject");
      resetForm();
      setLoading(false);
      setFileCheck(true);
    } catch (error) {
      setLoading(false);
      const err = getNormalizedError(error);
      toast.error(err || error?.message);
    }
  };

  return {
    formik,
    loading,
    setFilterBy,
    filterBy,
    filterOptions,
    selectedFile,
    fileCheck,
  };
};

export default useSupport;
