import { groupRendererSinglePage } from '../custom-group/CustomGroup';
import { CustomItemTotalPage } from '../custom-items/CustomItems';
import { CustomSidebarHeaderWithoutColls } from '../custom-sidebar-header/CustomSidebarHeader';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import 'moment/locale/ru';
import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader,
  TimelineMarkers,
  CustomMarker,
} from 'react-calendar-timeline';
import { TfiZoomIn, TfiZoomOut } from 'react-icons/tfi';

import '../../../styles/timeLine.css';

moment.locale('ru');

const TimeLineSinglePageStyled = () => {
  const currentDate = useSelector((state) => state.report.total.current_date);
  const reportItems = useSelector((state) => state.report.itemsReport);
  const index = useSelector((state) => state.report.index);

  const byImageTest = useSelector((state) => state.report.groupsReportByImage);

  let groupsByImage = [];
  if (byImageTest[index]?.stages) {
    groupsByImage = byImageTest[index].stages;
  }

  const timelineRef = useRef(null);

  const handleZoomIn = () => {
    if (timelineRef.current) {
      timelineRef.current.changeZoom(0.5); // уменьшаем масштаб на 25%
    }
  };

  const handleZoomOut = () => {
    if (timelineRef.current) {
      timelineRef.current.changeZoom(1.5); // увеличиваем масштаб на 25%
    }
  };

  return (
    <div id="calendar" className="timelinecomponent">
      <div className="timeLineIcons">
        <TfiZoomIn onClick={handleZoomIn} className="timeLineIcon" />
        <TfiZoomOut onClick={handleZoomOut} className="timeLineIcon" />
      </div>
      <Timeline
        groups={groupsByImage}
        items={reportItems}
        lineHeight={40} // высота линии календаря
        itemHeightRatio={1} // сколько процентов занимает item от линии
        // defaultTimeStart={moment().startOf('date')}
        defaultTimeStart={moment(currentDate).add(-15, 'days').startOf('day')} //  moment().startOf('day')
        defaultTimeEnd={moment(currentDate).add(15, 'days').toDate()}
        // defaultTimeStart={moment(currentDate).startOf('day')} //  moment().startOf('day')
        // defaultTimeEnd={moment().startOf('day').add(1, 'month').toDate()}
        // visibleTimeStart={sliceCurrentDate || moment().startOf('day')}
        // visibleTimeEnd={moment().startOf('day').add(1, 'month').toDate()}
        // defaultTimeStart={moment().add(-12, 'hour')}
        // defaultTimeEnd={moment().add(12, 'hour')}
        // stackItems // 1 item под вторым
        canMove={false} // запретить перемещение
        canResize={true} // запретить изменение размера
        // canSelect={false}
        // minZoom={1000 * 60 * 60 * 24 * 90}
        sidebarWidth={310}
        // minZoom={moment.duration(1, 'day').asMilliseconds()}
        // maxZoom={moment.duration(5, 'year').asMilliseconds()}
        // onItemSelect={itemHandler}
        groupRenderer={groupRendererSinglePage}
        itemRenderer={CustomItemTotalPage}
        minZoom={60 * 60 * 1000 * 24 * 14}
        maxZoom={1000 * 60 * 60 * 24 * 360}
        ref={timelineRef}
      >
        <TimelineHeaders>
          <SidebarHeader>
            {({ getRootProps }) => {
              return (
                <CustomSidebarHeaderWithoutColls getRootProps={getRootProps} />
              );
            }}
          </SidebarHeader>
          <DateHeader unit="primaryHeader" />
          <DateHeader />
        </TimelineHeaders>
        <TimelineMarkers>
          <CustomMarker date={moment(currentDate).valueOf()}>
            {({ styles }) => {
              const newStyles = {
                ...styles,
                width: '2px',
                backgroundColor: '#036bfd',
                zIndex: '100',
              };
              return <div className="customMarkerLocale" style={newStyles} />;
            }}
          </CustomMarker>
        </TimelineMarkers>
      </Timeline>
    </div>
  );
};

export default TimeLineSinglePageStyled;
