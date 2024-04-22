import React, { useEffect, useState } from "react";
import {
  Chart,
  ChartLegend,
  ChartSeries,
  ChartSeriesItem,
  ChartSeriesLabels,
  ChartTitle,
  ChartTooltip
} from "@progress/kendo-react-charts";
import {CompanyData} from '../helpers/types'
import {ObjectData} from '../helpers/types'
import Loading from "../layout/Loading";

const labelContent = (e: any) => (`${e.value}%`);

const renderTooltip = (e: any) => {
  return <div>{e.point ? e.point.category : ""}</div>;
};

export default function AllocationPanel({companyData, companyName}: { companyData: CompanyData[], companyName: string | null }) {
  const [assetData, setAssetData] = useState<ObjectData[]>([]);

  useEffect(() => {
    if(companyData.length > 0) {
      const requiredData = companyData.filter(item => item.name === companyName ? decodeURIComponent(companyName) : null)
      if (requiredData.length == 0) {
        return
      }
      const transformedData = requiredData[0].assetsData.map((item: ObjectData)=> {
        const { cash, bonds, International, domestic } = item;
        return [
          { category: "Domestic", value: parseFloat(domestic.slice(0, -1)) },
          { category: "International", value: parseFloat(International.slice(0, -1)) },
          { category: "Bonds", value: parseFloat(bonds.slice(0, -1)) },
          { category: "Cash", value: parseFloat(cash.slice(0, -1)) },
        ];
      });
      setAssetData(transformedData[0])
    }
  }, [companyData, companyName])
  
  return (
    <>
      {(assetData.length === 0)  && <Loading />}
      {
        assetData && assetData.length > 0 && (
        <Chart style={{ opacity: assetData.length > 0 ? "1" : "0" }}>
          <ChartTitle text={"Asset Allocation"}></ChartTitle>
            <ChartSeries>
              <ChartSeriesItem type="donut" data={assetData}>
                <ChartSeriesLabels content={labelContent} background="none" color="#fff" />
              </ChartSeriesItem>
            </ChartSeries>
          <ChartLegend position={"bottom"} visible={true} />
          <ChartTooltip render={renderTooltip} />
        </Chart>
      )}
    </>
  )
}
