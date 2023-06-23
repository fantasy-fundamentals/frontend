import React, { useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import { getNormalizedError } from "../../../utilty/helpers";
import data from "../../dashboardLayout/dashboard/graph/data";
import Button from "../../_common/Button";
import DropDownTab from "../../_common/DropDownTab";
import styles from "./activity.module.scss";
const Comment = () => {
  const commentRef: any = useRef(null);

  const handleComments = (e: any) => {
    e?.preventDefault();
    try {
      if (commentRef?.current?.value === "") {
        return;
      }

      let param = {
        value: commentRef?.current?.value,
      };
      e?.target?.reset();
    } catch (error) {
      const err = getNormalizedError(error);
      toast.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* {Array?.length > 1 ? ( */}
        {[...Array(9)].map((item, index, array) => (
          <div className={styles.topWrapper}>
            <div className={styles.profileImage}>FM</div>
            <div className={styles.chatWrapper}>
              <div className={styles.border} />
              <div className={styles.chat}>
                <label>EB-95</label>
                <p>
                  I was so excited about SuperDoge's solid foundation that I
                  sold all my $DOGE $SHIB $CATE $ELON. I was so excited about
                  SuperDoge's solid foundation that I sold all my $DOGE $SHIB
                  $CATE $ELON.
                </p>
              </div>
            </div>
          </div>
        ))}
        {/* ) : (
          <span>No Data Available</span>
        )} */}
      </div>
      <div className={styles.bottomWrapper}>
        <form className={styles.inputWrapper} onSubmit={handleComments}>
          <input
            type="text"
            placeholder="Add Comment...!"
            ref={commentRef}
            onChange={(e) => e?.target?.value}
          />

          <Button type="submit" name="Comment" style={{ padding: "10px 0" }} />
        </form>
      </div>
    </div>
  );
};

export default Comment;
