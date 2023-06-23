import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { resetUserState } from "../../../../store/reducers/user";
import { iconData } from "../../Footer/data";
import { sideBarLink } from "../../navBar/data";
import styles from "./sideBarNav.module.scss";
// import { useMesh } from "@martifylabs/mesh";
import { connetWallet } from "../../../../services/namiWalletService";
const SideBarNav = () => {
  const dispatch = useDispatch();
  // const { disconnect } = useMesh();
  const location = useRouter();

  const handleLogOut = async () => {
    dispatch(resetUserState());

    location.push("/");
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.linksWrapper}>
          {sideBarLink.map((item: any, index) => (
            <ul key={index}>
              <Link href={item.link}>
                <li
                  className={
                    location.asPath === item.link ? styles.activeLi : null
                  }
                >
                  {item?.heading}
                </li>
              </Link>
            </ul>
          ))}
        </div>
        <div className={styles.logoutWrapper} onClick={() => handleLogOut()}>
          <RiLogoutCircleLine />
          <label>Log out</label>
        </div>
        <div className={styles.bottomWrapper}>
          <div className={styles.followLabel}>
            <label>Follow us</label>
          </div>
          <div className={styles.socLink}>
            {iconData?.map((item, index) => (
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
          <div className={styles.copyRight}>
            <label>© {moment().format("YYYY")} FF. All rights reserved</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBarNav;
