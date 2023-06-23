import React from "react";
import style from "./barChart.module.scss";
import data from "./data";
import {
  AreaChart,
  Area,
  XAxis,
  // YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
interface prop {
  defaultColor?: any;
  data?: any[];
  // height?: Boolean;
  dataKey?: string;
  height?: any;
  styles?: any;
}
const BarChart = (Props: prop) => {
  const { defaultColor, data, height, dataKey } = Props;
  return (
    <div
      className={style.container}
      style={height ? { height: Props.height } : Props.styles}
    >
      <ResponsiveContainer width="100%" height="90%">
        <AreaChart
          width={1000}
          height={350}
          data={data}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: -30,
          }}
        >
          <XAxis tick={false} axisLine={false} />

          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="80%" stopColor="#C70038" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#C70038" stopOpacity={0.1} />
            </linearGradient>

            <linearGradient id="colorUvW" x1="0" y1="0" x2="0" y2="1">
              <stop offset="70%" stopColor="#C70038" stopOpacity={1} />
              <stop offset="100%" stopColor="#C70038" stopOpacity={0} />
            </linearGradient>
          </defs>

          <Tooltip />
          <Area
            className={style.wrapper}
            type="monotone"
            dataKey={dataKey}
            stackId="1"
            stroke={`${defaultColor ? "#C70038 " : "#C70038"}`}
            fill={`url(#${defaultColor ? "colorUv " : "colorUvW"})`}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart;
