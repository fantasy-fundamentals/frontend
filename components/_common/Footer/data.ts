import { ImFacebook2 } from "react-icons/im";
import { BsLinkedin } from "react-icons/bs";
import { FaTwitterSquare } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import { SiDiscord } from "react-icons/si";
import { BsYoutube } from "react-icons/bs";
const iconData = [
  {
    link: "https://www.facebook.com/groups/935371320290773",
    img: ImFacebook2,
  },
  {
    link: "https://www.linkedin.com/in/football-funduhmentals/",
    img: BsLinkedin,
  },
  {
    link: "https://twitter.com/FFunduhmentals",
    img: FaTwitterSquare,
  },
  {
    link: "https://www.tiktok.com/@ffunduhmentals",
    img: SiTiktok,
  },
  {
    link: "https://discord.gg/qEnHnnKEvY?fbclid=IwAR2TY4h9Y8UdaJRdfoOnAfCuGbyYPWvONnbS6R0cLnRN0AJR1fI7l4MfKIM",
    img: SiDiscord,
  },
  {
    link: "https://www.youtube.com/channel/UCFZQCwRiOlttNrt94lW9FKA",
    img: BsYoutube,
  },
];

const navLink = [
  {
    heading: "Home",
    link: "/",
  },
  {
    heading: "Score",
    link: "/score",
  },
  {
    heading: "Players",
    link: "/players",
  },
  {
    heading: "Marketplace",
    link: "/marketplace",
  },
];

export { iconData, navLink };
