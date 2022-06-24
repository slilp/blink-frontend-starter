import React, { useEffect } from "react";
import { useAppDispatch } from "redux/hook";
import { fetchTodayCovidCase } from "redux/covid/actions";

export interface CovidWithThunkProps {}

const CovidWithThunk: React.FC<CovidWithThunkProps> = (props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTodayCovidCase());
  }, []);

  return <div>Covid</div>;
};

export default CovidWithThunk;
