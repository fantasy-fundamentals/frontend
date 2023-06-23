import React from "react";
import styles from "./Footer.module.scss";
import { iconData, navLink } from "./data";
import Link from "next/link";
import { useRouter } from "next/router";
import moment from "moment";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
const Footer = () => {
  const router = useRouter();
  const { accessToken, namiWalletAddress } = useSelector(
    (state: any) => state?.user
  );
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.topWrapper}>
            <div className={styles.left}>
              <img src={"/logo.svg"} alt="" />
            </div>
            <div className={styles.right}>
              {navLink.map((item, index) => (
                <ul key={index}>
                  <Link href={item.link}>
                    <li
                      style={
                        router.asPath === item.link ? { color: "red" } : null
                      }
                    >
                      {item.heading}
                    </li>
                  </Link>
                  <div className={styles.leftBar}>/</div>
                </ul>
              ))}
            </div>
          </div>

          <div className={styles.middleWrapper}>
            {iconData.map((item, index) => (
              <a
                href={item?.link}
                target="_blank"
                className={styles.iconWrapper}
                key={index}
              >
                <item.img />
              </a>
            ))}
          </div>
          <div className={styles.bottomWrapper}>
            <div className={styles.Content}>
              <div className={styles.left}>
                © {moment().format("YYYY")} FF. All rights reserved
              </div>
              <div className={styles.right}>
                <label>Terms of use </label>
                <label
                  onClick={() => {
                    if (accessToken) {
                      router.push({
                        pathname: "/dashboard/settings",
                        query: { name: "policy" },
                      });
                    } else {
                      toast.info("Please login first");
                    }
                  }}
                >
                  Privacy Policy
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
