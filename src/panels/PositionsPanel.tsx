import React, {useState, useEffect} from "react";
import { Grid, GridColumn } from "@progress/kendo-react-grid";

import {CompanyData} from '../helpers/types'
import {ObjectData} from '../helpers/types'
import Loading from "../layout/Loading";

export default function PositionsPanel({companyData, companyName}: { companyData: CompanyData[], companyName: string | null }) {
  const [tableData, setTableData] = useState<ObjectData[]>([]);

  function formatDateTime(dateTimeString: string) {
    const options: ObjectData = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };
    const dateObject = new Date(dateTimeString);
    const formattedDateTime = dateObject.toLocaleDateString('en-US', options);
    return formattedDateTime;
  }

  useEffect(() => {
    if(companyData.length > 0) {
      const requiredData = companyData.filter(item => item.name === companyName ? decodeURIComponent(companyName) : null)
      if (requiredData.length == 0) {
        return
      }
      requiredData[0].stockData.map((item) => {
        item.date = formatDateTime(item.date)
      })
      setTableData(requiredData[0].stockData)
    }
  }, [companyData, companyName])

  console.log('tableData', tableData)

  return (
    <>
      {tableData.length === 0 && <Loading />}
      <Grid
        data={tableData}
        style={{ opacity: tableData.length > 0 ? "1" : "0" , marginTop: '50px'}}
      >
        <GridColumn title="Date" field="date" />
        <GridColumn title="Open" field="open" />
        <GridColumn title="High" field="high"  />
        <GridColumn title="Low" field="low" />
        <GridColumn title="Close" field="close" />
        <GridColumn title="Volume" field="volume" />
      </Grid>
    </>
  )
}
