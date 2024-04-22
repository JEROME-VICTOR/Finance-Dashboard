import React, {useState, useEffect} from "react";
import {
  Chart,
  ChartSeries,
  ChartSeriesItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartTitle,
} from "@progress/kendo-react-charts";

import Loading from "../layout/Loading";
import {CompanyData} from '../helpers/types'

export default function PerformancePanel({companyData, companyName}: { companyData: CompanyData[], companyName: string | null }) {
  const [dateData, setDateData] = useState<string[]>([]);
  const [highData, setHighData] = useState<string[]>([]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const month = monthNames[date.getMonth()];
    const formattedDate = `${day} ${month}`;
    return formattedDate;
  }

  useEffect(() => {
    if(companyData.length > 0) {
      const requiredData = companyData.filter(item => item.name === companyName ? decodeURIComponent(companyName) : null)
      if (requiredData.length == 0) {
        return
      }
      const stockData = requiredData[0].stockData
      const dates = stockData.map(item => formatDate(item.date));
      const highPrices = stockData.map(item => item.high);
      setDateData(dates)
      setHighData(highPrices)
    }
  }, [companyData, companyName])

  return (
    <>
      {highData.length == 0 && <Loading />}
      <Chart style={{ opacity: highData.length > 0 ? "1" : "0" }}>
        <ChartTitle text="Fund Performance" />
        <ChartCategoryAxis>
          <ChartCategoryAxisItem categories={dateData} />
        </ChartCategoryAxis>
        <ChartSeries>
          <ChartSeriesItem type="line" data={highData} />
        </ChartSeries>
      </Chart>
    </>
  )
}
