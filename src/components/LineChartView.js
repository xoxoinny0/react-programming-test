import React, { memo, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getCovid } from "../slices/Covid19Slice";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import ErrorView from "../components/ErrorView";
import dayjs from "dayjs";
import {
  // 공통 항목들
  Chart,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  // 선 그래프  그래프 전용
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

Chart.register(
  // 공통 항목들
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  // 선 그래프
  PointElement,
  LineElement
);

const PlotContainer = styled.div`
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  height: 400px;
`;

const LineChartView = memo(() => {
    /** path 파라미터 받기 */
    const {subject} = useParams();
    console.log(useParams());
    console.log(subject);

    /** 리덕스 관련 초기화 */
  const dispatch = useDispatch();
  const { data, loading, error, lte, gte } = useSelector((state) => state.Covid19Slice);

  /** 최초 마운드 시 리덕스를 통해 데이터를 조회한다. */
  useEffect(() => {
    // console.log(gte,lte,"awdawdawdaw");
    dispatch(getCovid({
      lte, gte
    }))
  }, [lte, gte]);

  console.log(data);
  
  let dateArr = [];
  data?.map((v, i) => {
    dateArr.push(dayjs(v.date).format('MM/DD'));
  });

  let dataArr = [];
  data?.map((v, i) => {
    console.log(v[subject])
    dataArr.push(v[subject]);

  });

  console.log(dateArr);
  console.log(dataArr);
  

  //그래프 기본 옵션
  const defaultOption = {
      responsive: true,
      maintainAspectRation: false,
      plugins: {
          legend: {
              position: 'bottom',
          }
      },
  };

  // 선 그래프를 위한 데이터 정의
  const covid19 = {
      labels: dateArr,
      datasets: [{
          label: '명',
          data: dataArr,
          backgroundColor: 'rgba(17, 100, 255, 0.1)',
          borderColor: 'rgba(17, 100, 255, 1)',
          borderWidth: 1
      }]
  };
  
  return (
    <div>
      <Spinner loading={loading} />
      {error ? <ErrorView error={error} /> : <PlotContainer>
                <Line options={defaultOption} data={covid19} />
            </PlotContainer>}
    </div>
  );
});

export default LineChartView;
