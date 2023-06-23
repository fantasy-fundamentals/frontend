import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from "recharts";
import styles from "./chart.module.scss";
const dataFile = [{ name: "chart", value: 10 }];
const DoughnutChart = () => {
  return (
    <div className={styles.container}>
      <ResponsiveContainer className={styles.wrapper}>
        <PieChart className={styles.chartWrapper}>
          <Pie
            data={dataFile}
            innerRadius={42}
            outerRadius={50}
            fill="#fff"
            paddingAngle={5}
            dataKey="value"
            cx="50%"
            cy="50%"
            // startAngle={90}
          />
        </PieChart>
      </ResponsiveContainer>
      {dataFile.map((item) => (
        <div className={styles.textWrapper}>{item.value}%</div>
      ))}
    </div>
  );
};

export default DoughnutChart;
