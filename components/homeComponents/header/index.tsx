import React, { useRef, useState } from "react";
import Button from "../../_common/Button";
import styles from "./header.module.scss";
import { secCard, card } from "./data";
import { useRouter } from "next/router";
import { saveBlogDetails } from "../../../store/reducers/blogSlice";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../_common/modal";
import ReactPlayer from "react-player";
import { RotatingLines } from "react-loader-spinner";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Slider from "../../_common/Slider/slider";
import { SwiperSlide } from "swiper/react";

interface Props {
  loading?: boolean;
}
const Header = (prop: Props) => {
  const { blog } = useSelector((state: any) => state?.home);
  const location = useRouter();
  const dispatch = useDispatch();
  const myRef = useRef(false);
  const [popupvisible, setpopupvisible] = useState(false);
  const [loadingVideo, setLoadingVideo] = useState(false);
  const [viewText, setViewText] = useState(false);

  const VideoEventHandler = (type: any) => {
    if (type === "buffer") {
      setLoadingVideo(true);
    } else if (type === "bufferEnd") {
      setLoadingVideo(false);
    } else if (type === "start") {
      setLoadingVideo(true);
    } else if (type === "play") {
      setLoadingVideo(false);
    }
  };

  let filterBlogs = blog?.filter((item) => item?.isActive);

  return (
    <>
      <Modal
        visible={popupvisible}
        showModal2
        onClose={() => setpopupvisible(false)}
      >
        <>
          {loadingVideo && (
            <div className={styles.loadingStyle}>
              <RotatingLines
                strokeColor="#d80f29"
                strokeWidth="5"
                animationDuration="0.75"
                width="30"
                visible={true}
              />
            </div>
          )}
          <ReactPlayer
            url={
              myRef.current
                ? "https://www.youtube.com/watch?v=pRUvULKUmmI&feature=youtu.be"
                : "https://d2pm667mw7y58b.cloudfront.net/tiktok_videos/Fantasy%20FunDUHmentals_7167972704392400170.mp4"
            }
            playing={true}
            controls={true}
            muted={!popupvisible}
            width="100%"
            height="400px"
            onBuffer={() => VideoEventHandler("buffer")}
            onBufferEnd={() => VideoEventHandler("bufferEnd")}
            onStart={() => VideoEventHandler("start")}
            onPlay={() => VideoEventHandler("play")}
          />
        </>
      </Modal>

      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.leftSide}>
            <label>
              The Power of
              <br /> <span>DUH</span> Sports
            </label>
            <p>
              Attention, sports fans! Looking to make your fantasy league
              experience even more exciting? Welcome to the fantasy
              funduhmentals – we started a new duh-vine way to play fantasy.
              Dive into our new platform to mint, burn, or trade nfts (the only
              fully liquid {!viewText && "..."}
              {viewText &&
                "service available) connected to athletes' performance in the real world. Predicting the next superstar or holding onto a one-game wonder,prepare for action-packed play. We provide all sorts of tools and inside information you won't find anywhere else. Take advantage of the analysis when betting on your favorite teams with our betting section, and we pick the spread at accuracy levels of up to 80%. What better way to prove you're an ace than to beat your friends in your league? Good thing we have articles breaking down rookies and protecting deep sleepers. So, join us in pushing the boundaries of what's possible regarding fantasy ...minus any heavy lifting like `research`! The funduhmantals has everything covered, so sit back and enjoy watching your winnings stack up."}
              <span onClick={() => setViewText(!viewText)}>
                {!viewText ? "read more" : "read less"}
              </span>
            </p>
            <div className={styles.btnWrapper}>
              <div className={styles.topWrapper}>
                <button
                  onClick={() => location.push("/about-us")}
                  className={styles.btn}
                >
                  Meet the team
                </button>
                <button
                  onClick={() => {
                    myRef.current = false;
                    setpopupvisible(true);
                  }}
                  className={styles.outlineBtn}
                >
                  WHY NFT
                </button>
                <button
                  onClick={() => {
                    myRef.current = true;
                    setpopupvisible(true);
                  }}
                >
                  Creating Account On Nami Wallet
                </button>
              </div>
            </div>
          </div>
          <div className={styles.rightSide}>
            <div className={styles.flexWrapper}>
              {card?.map((item, index) => (
                <div className={styles.card} key={index}>
                  <img src={item.imgOne} className={styles.imgOne} />
                  <div className={styles.overLay}>
                    {/* <img src={item.imgTwo} className={styles.imgTwo} /> */}
                    <div className={styles.content}>
                      <button
                        className={styles.btn}
                        onClick={() => location.push(item.link)}
                      >
                        {item.heading}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.secWrapper}>
          <div className={styles.cardWrapper}>
            <Slider
              navigation={false}
              desktopWidth={4}
              spaceBetween={10}
              loop={true}
              autoplay={{
                delay: 3000,
              }}
              slidesPerView={3}
            >
              {prop?.loading && blog?.length === 0
                ? [...Array(3)]?.map((item, index) => (
                    <SwiperSlide className={styles.card} key={index}>
                      <Skeleton height="220px" baseColor="#5f5f5f" />
                      <div className={styles.innerWrapper}>
                        <div className={styles.btnWrapper}>
                          <div className={styles.btn}>ARTICLE</div>
                        </div>
                        <label>
                          {" "}
                          <Skeleton baseColor="#5f5f5f" />
                        </label>
                      </div>
                    </SwiperSlide>
                  ))
                : filterBlogs?.map((item, index) => (
                    <SwiperSlide
                      className={styles.card}
                      key={index}
                      onClick={() => {
                        dispatch(saveBlogDetails(item)),
                          location.push({
                            pathname: `/blog/${item?.slug}`,
                            // query: { slug: item?.slug },
                          });
                      }}
                    >
                      <img src={item?.mediaUrl} alt="" />
                      <div className={styles.innerWrapper}>
                        <div className={styles.btnWrapper}>
                          <div className={styles.btn}>ARTICLE</div>
                        </div>
                        <label>{item?.title}</label>
                      </div>
                    </SwiperSlide>
                  ))}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
