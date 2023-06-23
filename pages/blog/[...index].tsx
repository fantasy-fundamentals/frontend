import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import BlogText from "../../components/blogComponent/blogText";
import BlogHeader from "../../components/blogComponent/header";
import BlogLatestNews from "../../components/blogComponent/latestNews";
import SocialLinks from "../../components/blogComponent/socialLinks";
import NewsLetter from "../../components/homeComponents/newsLetter";
import { handleBlogById } from "../../services/news.services";
import { handleArticleData } from "../../services/shopServices";
import { saveBlogDetails } from "../../store/reducers/blogSlice";
import { saveblog } from "../../store/reducers/homeSlice";
import styles from "../../styles/blog.module.scss";
import { getNormalizedError } from "../../utilty/helpers";

const Blog = () => {
  const dispatch = useDispatch();
  const location = useRouter();
  const { blogDetails } = useSelector((state: any) => state.blogDetail);
  const { blog } = useSelector((state: any) => state?.home);

  let filterBlogs = blog?.filter(
    (item) => item?.isActive && blogDetails?.title != item?.title
  );

  const handleBlog = async () => {
    try {
      const res = await handleBlogById(location?.query?.index[0]);
      dispatch(saveBlogDetails(res?.data));
    } catch (error) {
      const err = getNormalizedError(error);
      toast.error(err);
    }
  };

  const getArticleData = async () => {
    try {
      const blogRes = await handleArticleData();

      dispatch(saveblog(blogRes?.data?.data?.reverse()));
    } catch (error) {}
  };

  useEffect(() => {
    handleBlog();
    getArticleData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <BlogHeader blogDetails={blogDetails} />
        <div className={styles.innerWrapper}>
          <div className={styles.blogWrapper}>
            <div
              className={styles.textWrapper}
              style={filterBlogs?.length === 0 ? { width: "90%" } : null}
            >
              <div className={styles.leftWrapper}>
                <SocialLinks blogDetails={blogDetails} />
              </div>
              {""}
              <div className={styles.centerWrapper}>
                <BlogText blogDetails={blogDetails} />
              </div>
            </div>

            {filterBlogs?.length != 0 && (
              <div className={styles.rightWrapper}>
                <BlogLatestNews data={filterBlogs} />
              </div>
            )}
          </div>
        </div>

        <NewsLetter />
      </div>
    </div>
  );
};

export default Blog;
