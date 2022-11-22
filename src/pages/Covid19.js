import React, { memo } from 'react';
import { Routes, Route } from 'react-router-dom';
import LineChartView from '../components/LineChartView';
import MenuLink from '../components/MenuLink';
import Top from '../components/Top';

const Covid19 = memo(() => {
  return (
    <div>
        <Top />
        <nav>
          <MenuLink to='/confirmed'> 일일확진자</MenuLink>
          <MenuLink to='/confirmed_acc'> 누적확진자</MenuLink>
          <MenuLink to='/active'>격리환자</MenuLink>
          <MenuLink to='/released'>격리해제</MenuLink>
          <MenuLink to='/released_acc'>누적격리해제</MenuLink>
          <MenuLink to='/death'>사망자</MenuLink>
          <MenuLink to='/death_acc'>누적사망자</MenuLink>
        </nav>

       <Routes>
        <Route path='/:subject' element={<LineChartView  />} />
      </Routes>
    </div>
  )
});

export default Covid19;