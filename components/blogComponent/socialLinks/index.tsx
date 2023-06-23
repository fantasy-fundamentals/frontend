import React from "react";
import styles from "./socialLinks.module.scss";
import { FaTelegramPlane } from "react-icons/fa";
import { GrFormNextLink } from "react-icons/gr";
import { FaLinkedinIn } from "react-icons/fa";
import { FaMediumM } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

interface Prop {
  blogDetails?: any;
}
const SocialLinks = (props: Prop) => {
  const { blogDetails } = props;
  const socialData = [
    {
      img: FaTelegramPlane,
      name: "Telegram",
      nextIcon: GrFormNextLink,
      link: `${blogDetails?.socialLinks?.telegram}`,
    },
    {
      img: FaTwitter,
      name: "Twitter",
      nextIcon: GrFormNextLink,
      link: `${blogDetails?.socialLinks?.twitter}`,
    },
    {
      img: FaMediumM,
      name: "Medium",
      nextIcon: GrFormNextLink,
      link: `${blogDetails?.socialLinks?.medium}`,
    },
    {
      img: FaLinkedinIn,
      name: "Linkedin",
      nextIcon: GrFormNextLink,
      link: `${blogDetails?.socialLinks?.linkedIn}`,
    },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.cardWrapper}>
          {socialData.map((item, index) => (
            <>
              <a
                className={styles.card}
                href={item.link}
                target="_blank"
                key={index}
              >
                <item.img className={styles.imgIcon} />
                <span>{item.name}</span>
                <item.nextIcon className={styles.rightIcon} color="#fff" />
              </a>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialLinks;
