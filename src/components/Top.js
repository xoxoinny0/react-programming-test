import React, { memo, useCallback, useRef } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { useSelector, useDispatch } from "react-redux";
import { setGte, setLte } from "../slices/Covid19Slice";

const Top = memo(() => {
  /** 리덕스 관련 초기화 */
  const dispatch = useDispatch();
  const { gte, lte } = useSelector(
    (state) => state.Covid19Slice
  );

  const startDay = useRef();
  const endDay = useRef();

  const submit = useCallback((e) => {
    e.preventDefault();
    dispatch(setGte({gte: dayjs(startDay.current.value).format("YYYY-MM-DD")}));
    dispatch(setLte({lte:dayjs(endDay.current.value).add(1, 'day').format("YYYY-MM-DD")}));
  }, [startDay.current?.value, endDay.current?.value ]);

  return (
    <div>
      <h1>Covid19 현황</h1>

      <hr />
      <form onSubmit={submit}>
        <input type="date" ref={startDay} defaultValue={gte} />
        ~
        <input type="date" ref={endDay} defaultValue={lte} />
        <button type="submit">검색</button>
      </form>
      <hr />
    </div>
  );
});

export default Top;
