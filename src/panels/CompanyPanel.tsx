import React from "react";
import Loading from "../layout/Loading";
import {CompanyData} from '../helpers/types'
import { Link } from 'react-router-dom';

export default function CompanyPanel({companyData}: { companyData: CompanyData[] }) {

  return (
    <div className="company-panel">
      {!(companyData.length > 0) && <Loading />}
      {(companyData.length > 0) && (
        companyData.map((data, index) => {
          return (
            <Link key={index} to={`/dashboard?company=${data.name}`}>
              <div key={index} className="company-name">
                {data.name}
              </div>
            </Link>
          )
        })
        )
      }
    </div>
  );
}
