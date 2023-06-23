import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Button from "../components/_common/Button";
import ShopPaymentModal from "../components/_common/currencyModal/shopPaymentModal";
import Modal1 from "../components/_common/modal/modal1";
import { handleShopDetails } from "../services/shopServices";
import { saveShopDetails } from "../store/reducers/shopSlice";
import styles from "../styles/productDetails.module.scss";
import { getNormalizedError } from "../utilty/helpers";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state: any) => state?.user);
  const { shopDetails } = useSelector((state: any) => state?.shopDetail);
  const { usdPrice } = useSelector((state: any) => state?.shopDetail);
  const location = useRouter();
  const [popupvisible, setpopupvisible] = useState(false);
  const [marketplaceData, setMarketplaceData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeImage, setActiveImage] = useState({
    imgSrc: shopDetails?.images[0],
    activeIndex: 0,
  });
  const [sizeActive, setSizeActive] = useState<any>({
    index: shopDetails?.availableVariants ? 0 : null,
    price: shopDetails?.availableVariants
      ? shopDetails?.availableVariants[0]
      : null,
  });

  const handleShopDetail = async () => {
    try {
      setLoading(true);
      const res = await handleShopDetails(location?.query?.id);
      dispatch(saveShopDetails(res?.data?.data));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      const err = getNormalizedError(error);
      toast.error(err);
    }
  };

  let param = {
    pricePlusDeliveryCharges:
      sizeActive?.price != null
        ? sizeActive?.price?.price + shopDetails?.deliveryCharges
        : shopDetails?.price + shopDetails?.deliveryCharges,
    deliveryCharges: shopDetails?.deliveryCharges,
    price: shopDetails?.price,
    hasVariants: shopDetails?.hasVariants,
    title: shopDetails?.title,
    productSize: sizeActive?.price?.size,
    _id: shopDetails?._id,
  };

  const togglepopup = (e: any, item?: any) => {
    e.preventDefault();
    setMarketplaceData(param);
    setpopupvisible((preview) => !preview);
  };

  const toggleData = () => {
    setpopupvisible(false);
  };

  useEffect(() => {
    handleShopDetail();
  }, []);

  return (
    <>
      <Modal1 visible={popupvisible} btn onClose={() => toggleData()}>
        <ShopPaymentModal
          data={marketplaceData}
          setpopupvisible={setpopupvisible}
        />
      </Modal1>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.leftWrapper}>
            <div className={styles.productGalleryWrapper}>
              <div className={styles.badge}>New</div>
              <div className={styles.selectedImage}>
                <img src={activeImage.imgSrc} alt="" />
              </div>
              <div className={styles.gallerySlider}>
                {shopDetails?.images?.map((item: string, index: number) => (
                  <div
                    className={
                      activeImage?.activeIndex === index
                        ? styles.activeimgWrapper
                        : styles.imgWrapper
                    }
                    key={index}
                    onClick={() =>
                      setActiveImage({
                        imgSrc: item,
                        activeIndex: index,
                      })
                    }
                  >
                    <img src={item} alt="icon" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.rightWrapper}>
            <div className={styles.topWrapper}>
              <div className={styles.heading}>
                <label>New</label>
                <p>{shopDetails?.title}</p>
              </div>
              <div className={styles.subHeading}>
                <label>Current Price</label>
                <p>
                  {shopDetails?.hasVariants
                    ? sizeActive?.price?.price
                      ? `${sizeActive?.price?.price} ADA`
                      : "-"
                    : shopDetails?.hasVariants === false
                    ? `${shopDetails.price} ADA`
                    : "-"}
                </p>
                <div className={styles.dollarPrice}>
                  {shopDetails?.hasVariants
                    ? sizeActive?.price?.price
                      ? `$${(
                          sizeActive?.price?.price * usdPrice
                        ).toLocaleString()}`
                      : "-"
                    : shopDetails?.hasVariants === false
                    ? `$${(shopDetails.price * usdPrice).toLocaleString()} USD`
                    : "-"}
                </div>
              </div>
            </div>
            {shopDetails?.availableVariants && (
              <div className={styles.middleWrapper}>
                <div className={styles.productSize}>
                  <label>Size</label>
                  <div className={styles.boxWrapper}>
                    {shopDetails?.availableVariants?.map(
                      (item: any, index: number) => (
                        <div
                          key={index}
                          className={
                            sizeActive.index === index
                              ? styles.activeBox
                              : styles.box
                          }
                          onClick={() =>
                            setSizeActive({
                              index: index,
                              price: item,
                            })
                          }
                        >
                          {item?.size}
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}
            <div className={styles.chargesPrice}>
              <label>Shopping Charges</label>
              <p>{shopDetails?.deliveryCharges} ADA</p>
            </div>

            {shopDetails?.stock === 0 || sizeActive?.price?.stock === 0 ? (
              <label>Out of stock</label>
            ) : (
              <Button
                name="Buy Now"
                onClick={(e) => {
                  if (!accessToken) {
                    toast.info("Please login first");
                  } else {
                    togglepopup(e, shopDetails);
                  }
                }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
