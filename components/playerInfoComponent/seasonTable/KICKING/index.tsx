import styles from "./kickingTable.module.scss";
interface props {
  kickingData?: any[];
  name?: string;
}
const KickingTableComponent = (prop: props) => {
  const { kickingData, name } = prop;
  return (
    <div className={styles.wrapper}>
      <div className={styles.headingWrapper}>
        <label>{name}</label>
      </div>

      <table cellSpacing="0">
        <thead>
          <tr>
            <th>Kick Return Long</th>
            <th>Kick Return Touchdowns</th>
            <th>Kick Return Yards</th>
            <th>Kick Returns</th>
          </tr>
        </thead>
        {kickingData?.map((item, index) => (
          <tbody key={index}>
            <tr>
              <td>{item?.KickReturnLong}</td>

              <td>{item?.KickReturnTouchdowns}</td>

              <td>{item?.KickReturnYards}</td>

              <td>{item?.KickReturns}</td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default KickingTableComponent;
