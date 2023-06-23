import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { saveBlogDetails } from "../../../store/reducers/blogSlice";
import styles from "./latestNews.module.scss";

interface Props {
  data?: any[];
}
const BlogLatestNews = (prop: Props) => {
  const { data } = prop;
  const dispatch = useDispatch();
  const location = useRouter();
  const blogData = data?.sort(() => 0.5 - Math?.random());

  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.heading}>
            <label>
              LATEST <span>Blogs</span>
            </label>
          </div>

          <div className={styles.cardWrapper} id="refgr">
            {blogData?.slice(-3)?.map((item: any, index: number) => (
              <div
                className={styles.card}
                key={index}
                onClick={() => {
                  dispatch(saveBlogDetails(item)),
                    location.push({
                      pathname: `/blog/${item?.slug}`,
                    });
                }}
              >
                <div className={styles.topWrapper}>
                  <img src={item?.mediaUrl} alt="" />
                  <div className={styles.heading}>{item?.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogLatestNews;
