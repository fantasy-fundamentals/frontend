import Link from "next/link";
import { AiFillCaretDown, AiOutlineMenu } from "react-icons/ai";
import { FaSignInAlt, FaUserTie } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { HiMenuAlt1 } from "react-icons/hi";
import { ImHome } from "react-icons/im";
import { IoMdWallet } from "react-icons/io";
import { toast } from "react-toastify";
import ConnectWallet from "../connectWallet";
import ForgotPassword from "../forgotPassword";
import Login from "../login";
import Modal from "../modal";
import SignUp from "../signUp";
import { navLink, sideBarLink } from "./data";
import styles from "./navBar.module.scss";
import useNavBar from "./useNavBar";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
const NavBar = () => {
  const {
    popupvisible,
    toggleData,
    handleClose,
    togglepopup,
    setActive,
    handleConnectModal,
    active,
    setActiveModal,
    activeModal,
    location,
    setpopupvisible,
    namiWalletConnect,
    state,
    accessToken,
    namiWalletAddress,
    handleWalletDisconnect,
    handleLogOut,
  } = useNavBar();

  return (
    <>
      <Modal visible={popupvisible} btn onClose={() => toggleData()}>
        {activeModal === 1 ? (
          <Login
            onClick={() => handleConnectModal("signUp")}
            onClickForgot={() => handleConnectModal("forgot")}
            popupvisible={setpopupvisible}
          />
        ) : activeModal === 2 ? (
          <SignUp
            onClick={() => handleConnectModal("login")}
            setActiveModal={setActiveModal}
          />
        ) : activeModal === 3 ? (
          <ForgotPassword
            onClickSignUp={() => handleConnectModal("signUp")}
            setActiveModal={setActiveModal}
          />
        ) : activeModal === 4 ? (
          <ConnectWallet
            onNamiWalletClick={() => namiWalletConnect()}
            // onWalletConnectClick={() => coinBaseWalletConnect()}
          />
        ) : null}
      </Modal>

      <div
        className={styles.container}
        style={
          location.asPath.includes("dashboard")
            ? { backgroundColor: "#232325" }
            : null
        }
      >
        {/* <div className={styles.alertWrapper}>
          <div className={styles.wrapper}>
            <button
              onClick={(e) => {
                if (!accessToken) {
                  !namiWalletAddress && togglepopup(e);
                } else {
                  location.push("/dashboard/settings");
                }
              }}
            >
              Report a Bug
            </button>
          </div>
        </div>
        <div className={styles.alertWrapper}>
          <div className={styles.wrapper}>
            <button onClick={() => location.push("/beta")}>
              Close Beta will be online starting February 05, 2023 till February
              25, 2023. Join now and win Fantastic rewards.
            </button>
          </div>
        </div> */}
        <div className={styles.wrapper}>
          <div className={styles.mainWrapper}>
            <div className={styles.left}>
              <Link href="/" prefetch={false}>
                <img src={"/logo.svg"} alt="" style={{ cursor: "pointer" }} />
              </Link>
            </div>
            <div className={styles.rightWrapper}>
              <div className={styles.linksWrapper}>
                {location.asPath.includes("dashboard") ? null : (
                  <>
                    {navLink.map((item: any, index) => (
                      <ul key={index}>
                        <Link href={item.link} prefetch={false} passHref>
                          <a
                            className={
                              location.asPath === item.link
                                ? styles.active
                                : styles.menuItem
                            }
                          >
                            {item.heading}
                          </a>
                        </Link>
                        {/* <div className={styles.leftBar}>/</div> */}
                      </ul>
                    ))}

                    <div className={styles.dropdown}>
                      <span
                      // style={
                      //   location.asPath === "/about-us" ||
                      //   location.asPath === "/roadmap"
                      //     ? { color: "#d80f29" }
                      //     : null
                      // }
                      >
                        More
                        <AiFillCaretDown />
                      </span>
                      <div className={styles.innerWrapper}>
                        {navLink.slice(-4).map((item: any, index) => (
                          <div key={index} className={styles.dropdownText}>
                            <Link href={item.link} prefetch={false}>
                              <span
                                style={
                                  location.asPath === item.link
                                    ? { color: "#d80f29" }
                                    : null
                                }
                              >
                                {item.heading}
                              </span>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className={styles.btnWrapper}>
                {state === 1 ? (
                  <>
                    <ReactTooltip
                      anchorId="dashboard"
                      place="bottom"
                      content="Dashboard"
                      variant="info"
                    />
                    <div
                      onClick={() => location.push("/dashboard")}
                      className={styles.dashboardBtn}
                      id="dashboard"
                    >
                      <MdDashboard />
                    </div>
                  </>
                ) : state === 0 ? (
                  <>
                    <ReactTooltip
                      anchorId="home"
                      place="bottom"
                      content="Home"
                      variant="info"
                    />
                    <div
                      onClick={() => location.push("/")}
                      className={styles.dashboardBtn}
                      id="home"
                    >
                      <ImHome />
                    </div>
                  </>
                ) : null}
                <button
                  onClick={(e: any) => !namiWalletAddress && togglepopup(e)}
                >
                  {namiWalletAddress ? (
                    <div
                      className={styles.ellipText}
                      onClick={handleWalletDisconnect}
                    >
                      {" "}
                      {namiWalletAddress}
                    </div>
                  ) : state === 2 ? (
                    <>
                      <FaSignInAlt className={styles.iconC} /> &nbsp; Login
                    </>
                  ) : (
                    <>
                      <IoMdWallet className={styles.iconC} />
                      Connect Wallet
                    </>
                  )}
                </button>
                <div className={styles.mobileIcon} onClick={handleClose}>
                  {active === false ? (
                    <AiOutlineMenu className={styles.iconC} />
                  ) : (
                    <HiMenuAlt1 className={styles.iconC} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* //**mobile Menu ** */}
      {active === true && (
        <div className={styles.mobileContainer}>
          <div className={styles.mobileIconWrapper}>
            <div className={styles.mobileLinksWrapper}>
              {location?.asPath?.includes("dashboard") ? (
                <>
                  {sideBarLink?.map((item: any, index) => (
                    <>
                      <ul
                        style={
                          location.asPath === item.link
                            ? { background: "rgba(128, 128, 128, 0.192)" }
                            : null
                        }
                        key={index}
                      >
                        <Link href={item.link} prefetch={false}>
                          <li
                            onClick={
                              item.heading === "Logout"
                                ? () => handleLogOut()
                                : null
                            }
                            style={
                              location.asPath === item.link
                                ? { color: "#d80f29" }
                                : null
                            }
                          >
                            {item.heading}
                          </li>
                        </Link>
                      </ul>
                    </>
                  ))}

                  <ul>
                    <li onClick={() => handleLogOut()}>Log out</li>
                  </ul>
                </>
              ) : (
                navLink.map((item: any, index) => (
                  <ul
                    style={
                      location.asPath === item.link
                        ? { background: "rgba(128, 128, 128, 0.192)" }
                        : null
                    }
                    key={index}
                  >
                    <Link href={item.link} prefetch={false}>
                      <li
                        style={
                          location.asPath === item.link
                            ? { color: "#d80f29" }
                            : null
                        }
                      >
                        {item.heading}
                      </li>
                    </Link>
                  </ul>
                ))
              )}
            </div>
          </div>
        </div>
      )}
      {/* //**mobile Menu ** */}
    </>
  );
};

export default NavBar;
