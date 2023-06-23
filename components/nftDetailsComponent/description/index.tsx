import styles from "./description.module.scss";

type Props = {
  description?: string;
  tokenID?: string;
  creatorEarnings?: number;
};

const Description = (props: Props) => {
  return (
    <div className={styles.decWrapper}>
      <div className={styles.header}>Description</div>
      <div className={styles.textWrapper}>
        {/* <label>By Avrill15</label> */}
        <p>{props.description}</p>
      </div>
      <div className={styles.contractClass}>
        <div className={styles.textWrapper}>
          <label>Contract Address</label>
          <span>-</span>
        </div>
        <div className={styles.textWrapper}>
          <label>Token ID</label>
          <span>{props.tokenID}</span>
        </div>
        <div className={styles.textWrapper}>
          <label>Token Standard</label>
          <span>-</span>
        </div>
        <div className={styles.textWrapper}>
          <label>Blockchain</label>
          <span>Cardano</span>
        </div>
        <div className={styles.textWrapper}>
          <label>Metadata</label>
          <span>-</span>
        </div>
        <div className={styles.textWrapper}>
          <label>Creator Earnings</label>
          <span>-</span>
        </div>
      </div>
    </div>
  );
};

export default Description;
