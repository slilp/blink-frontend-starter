import React, { useEffect, useState } from "react";
import { getTodayCovidCase } from "api/covidServicePartial";

export interface CovidProps {}

const Covid: React.FC<CovidProps> = (props) => {
  const [covidData, setCovidData] = useState<any>({ today: [] });

  useEffect(() => {
    const init = async () => {
      const response = await getTodayCovidCase();
      setCovidData(response);
    };
    init();
  }, []);

  return (
    <div>
      {covidData && (
        <h1 data-testid="covid-data">{JSON.stringify(covidData)}</h1>
      )}
    </div>
  );
};

export default Covid;
