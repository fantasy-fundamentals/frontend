import React, { useState } from "react";
import styles from "./newsLetter.module.scss";
import { GrFormNext } from "react-icons/gr";
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { handleNewsLetter } from "../../../services/news.services";
import { getNormalizedError } from "../../../utilty/helpers";
import { useRouter } from "next/router";

const NewsLetter = () => {
  const [blogLoading, setBlogLoading] = useState(false);
  const location = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: yup.object({
      email: yup.string().email("not valid").max(255).required("required"),
    }),
    onSubmit: (values, { resetForm }) => {
      handleNewsletterData(values, { resetForm });
    },
  });

  const handleNewsletterData = async (values, { resetForm }) => {
    setBlogLoading(true);
    let params = {
      email: values?.email,
    };
    try {
      const res = await handleNewsLetter(params);
      toast.success(res?.data?.message);
      resetForm();
      setBlogLoading(false);
    } catch (error) {
      setBlogLoading(false);
      const err = getNormalizedError(error);
      toast.error(err);
    }
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <label>Newsletter</label>
          <div className={styles.heading}>
            <label>
              Subscribe <span>FANTASY FunDUHmentals</span>
            </label>
            <p>For our future update</p>
          </div>
          <div className={styles.bottomWrapper}>
            <form
              onSubmit={formik?.handleSubmit}
              style={
                formik?.touched?.email && formik?.errors?.email
                  ? { border: "1px solid red" }
                  : { border: "1px solid white" }
              }
              className={styles.inputWrapper}
            >
              <input
                type="text"
                placeholder="Your Email"
                {...formik?.getFieldProps("email")}
                className={
                  formik?.touched?.email && formik?.errors?.email
                    ? styles.errorInput
                    : null
                }
              />
              <button
                className={styles.btn}
                type={blogLoading ? "button" : "submit"}
              >
                {blogLoading ? (
                  <div style={{ padding: "5px" }}>
                    {" "}
                    <RotatingLines
                      strokeColor="#fff"
                      strokeWidth="5"
                      animationDuration="0.75"
                      width="20"
                      visible={true}
                    />
                  </div>
                ) : (
                  <GrFormNext color="white" fill="white" />
                )}
              </button>
            </form>
            <button
              className={styles.btn1}
              onClick={() => location.push("/about-us")}
            >
              WANT TO KNOW MORE ABOUT?
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsLetter;
