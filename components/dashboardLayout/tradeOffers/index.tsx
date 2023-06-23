import React from "react";
import { data } from "./data";
import styles from "./tradeOffersCard.module.scss";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import MarketplaceCard from "../../_common/marketplaceCard";
const TradeOffersCardsComponent = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.heading}>
          <label>
            Trade <span>offers</span>
          </label>
        </div>
        <div className={styles.cardWrapper}>
          {data.map((item, index) => (
            <div className={styles.card} key={index}>
              <MarketplaceCard
                heading={item.heading}
                subHeading={item.subHeading}
                ranking={item.ranking}
                // img={item.img}
                imgHeading={item.imgHeading}
                height={item.height}
                weight={item.weight}
                experience={item.experience}
                age={item.age}
                current={item.current}
                price={item.price}
                btn="Accept"
              />
            </div>
          ))}
        </div>
        <div className={styles.loadingHeading}>
          <AiOutlineLoading3Quarters className={styles.ico} />
          Load more
        </div>
      </div>
    </div>
  );
};

export default TradeOffersCardsComponent;
