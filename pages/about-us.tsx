import Grind from "../components/aboutUsComponent/grind";
import HeaderHeading from "../components/aboutUsComponent/headerHeading";
import HeaderImg from "../components/aboutUsComponent/HeaderImg";
import Mission from "../components/aboutUsComponent/mission";
import Team from "../components/aboutUsComponent/team";
import TeamMembers from "../components/aboutUsComponent/teamComponent";
import styles from "../styles/aboutus.module.scss";
const AboutUs = () => {
  return (
    <>
      <HeaderImg />
      <div className={styles.container}>
        <HeaderHeading />
        <Grind />
        <Mission />
        <Team />
        <TeamMembers />
      </div>
    </>
  );
};

export default AboutUs;
