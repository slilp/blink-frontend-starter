import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "redux/hook";
import { fetchTodayCovidCase } from "redux/covid/actions";

export interface CovidWithThunkProps {}

const CovidWithThunk = (props: CovidWithThunkProps) => {
  const dispatch = useAppDispatch();
  const covidData = useAppSelector((state) => state.covid);

  useEffect(() => {
    dispatch(fetchTodayCovidCase());
  }, []);

  return (
    <div>
      {covidData.today?.length > 0 && (
        <h1 data-testid="new-case">{covidData.today[0].new_case}</h1>
      )}
    </div>
  );
};

export default CovidWithThunk;
