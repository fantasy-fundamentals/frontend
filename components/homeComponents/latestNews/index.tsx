import moment from "moment";
import { useRouter } from "next/router";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { SwiperSlide } from "swiper/react";
import { saveNewsDetails } from "../../../store/reducers/newsSlice";
import Slider from "../../_common/Slider/slider";
import styles from "./latestNews.module.scss";
import "react-loading-skeleton/dist/skeleton.css";
interface Props {
  newsData?: any[];
  topHeading?: any[];
  loading?: boolean;
}

const LatestNews = (prop: Props) => {
  const dispatch = useDispatch();
  const location = useRouter();
  const { latestNews, topHeading } = useSelector((state: any) => state?.home);

  const handleClicked = (item: any) => {
    dispatch(saveNewsDetails(item));
    location.push({
      pathname: `news/${item?.slug}`,
    });
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.heading}>
            <label>
              LATEST <span>NEWS</span>
            </label>
          </div>
          <div className={styles.cardWrapper}>
            <div className={styles.leftWrapper}>
              <div className={styles.cardWrapper} id="refgr">
                <Slider
                  navigation={false}
                  desktopWidth={3}
                  spaceBetween={20}
                  loop={true}
                  pagination={{
                    clickable: false,
                    dynamicBullets: false,
                  }}
                  autoplay={{
                    delay: 3000,
                  }}
                  slidesPerView={3}
                  className="swiper-wrapper"
                >
                  {prop?.loading && latestNews?.length === 0
                    ? [...Array(6)].map((item, index) => (
                        <div key={index}>
                          <SwiperSlide className={styles.card}>
                            <div className={styles.topWrapper}>
                              {" "}
                              <Skeleton height="284px" baseColor="#5f5f5f" />
                              <div className={styles.heading}>
                                <Skeleton baseColor="#5f5f5f" count={2} />
                              </div>
                            </div>

                            <div className={styles.textWrapper}>
                              <div className={styles.leftWrapper}>
                                <Skeleton baseColor="#5f5f5f" />
                              </div>
                              <div className={styles.rightWrapper}>
                                <Skeleton baseColor="#5f5f5f" />
                              </div>
                            </div>
                          </SwiperSlide>
                        </div>
                      ))
                    : topHeading?.map((item, index) => {
                        return (
                          <div key={index}>
                            <SwiperSlide
                              className={styles.card}
                              key={index}
                              // onClick={() => newTabFunction(item)}
                              onClick={() => handleClicked(item)}
                            >
                              <div className={styles.topWrapper}>
                                {" "}
                                <img
                                  src={
                                    item?.coverImage
                                      ? item?.coverImage
                                      : item?.temImg
                                  }
                                  alt="icon"
                                />
                                <div className={styles.heading}>
                                  {item?.detail?.Title}
                                </div>
                              </div>

                              <div className={styles.textWrapper}>
                                <div className={styles.leftWrapper}>
                                  {item?.detail?.Team}
                                </div>
                                <div className={styles.rightWrapper}>
                                  {moment(item?.createdAt).format("MMM Do YY")}
                                </div>
                              </div>
                            </SwiperSlide>
                            ;
                          </div>
                        );
                      })}
                </Slider>
              </div>
            </div>
            <div className={styles.cardRightWrapper}>
              <>
                <div className={styles.heading}>
                  <label>TOP HEADING</label>
                </div>

                <div className={styles.card}>
                  {prop?.loading && topHeading?.length === 0
                    ? [...Array(5)].map((item, index) => (
                        <div className={styles.subHeading} key={index}>
                          <Skeleton baseColor="#5f5f5f" />
                        </div>
                      ))
                    : topHeading?.map((item, index) => (
                        <div
                          key={index}
                          className={styles.subHeading}
                          onClick={() => {
                            handleClicked(item);
                            // window.open(
                            //   item?.detail?.Url,
                            //   "_blank",
                            //   "noopener,noreferrer"
                            // );
                          }}
                        >
                          {item?.detail?.Title ? item?.detail?.Title : "-"}
                        </div>
                      ))}
                </div>
              </>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LatestNews;
