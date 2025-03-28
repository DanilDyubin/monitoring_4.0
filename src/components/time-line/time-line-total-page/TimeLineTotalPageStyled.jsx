import { groupRendererTest } from '../custom-group/CustomGroup';
import { CustomItemTotalPageTest } from '../custom-items/CustomItems';
import { CustomSidebarHeader } from '../custom-sidebar-header/CustomSidebarHeader';
import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
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

import Calendar from '../../calendar/Calendar';

import '../../../styles/timeLine.css';

moment.locale('ru');

const TimeLineTotalPageStyled = () => {
  // const open = useSelector((state) => state.calendar.open);
  // const sliceItems = useSelector((state) => state.schedule.items);
  // const sliceGroups = useSelector((state) => state.schedule.groups);
  // const reportGroups = useSelector((state) => state.report.groupsReport);
  const reportGroupsTest = useSelector((state) => state.schedule.groups);
  // const reportItems = useSelector((state) => state.report.itemsReport);
  const reportItems = useSelector((state) => state.report.calendarItemsReport);
  // const filteredItems = reportItems.filter((stage) => stage.start_time !== null);
  // const sliceCurrentDate = useSelector((state) => state.schedule.currentDate);
  // const currentDate = useSelector((state) => state.report.total.current_date);
  const currentDateTest = 1741986000000;
  // const total = useSelector((state) => state.report.total);

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

  // const itemHandler = (itemId, e, time) => {
  //   // вызывается при клике на временной интервал
  //   // console.log('Item ID:', itemId);
  //   // console.log('Event:', e);
  //   // console.log('Time:', time);
  // };

  // const canvasHandler = (groupId, time, e) => {
  //   // вызывается при клике на сетку/таблицу canvas
  //   // console.log('groupId:', groupId);
  //   // console.log('Event:', e);
  //   // console.log('Time:', time);
  // };
  // console.log(`Ref - ${timelineRef.current}`);

  return (
    <div id="calendar" className="timeLineComponent">
      <div className="timeLineIcons">
        <TfiZoomIn onClick={handleZoomIn} className="timeLineIcon" />
        <TfiZoomOut onClick={handleZoomOut} className="timeLineIcon" />
      </div>
      <Timeline
        groups={reportGroupsTest}
        items={reportItems}
        lineHeight={20} // высота линии календаря
        itemHeightRatio={1} // сколько процентов занимает item от линии
        itemRenderer={CustomItemTotalPageTest} // добавляем кастомный компонент item
        groupRenderer={groupRendererTest} // добавляем кастомный компонент group
        canMove={false} // запретить перемещение
        canResize={false} // запретить изменение размера
        defaultTimeStart={moment(currentDateTest)
          .add(-15, 'days')
          .startOf('day')} //  moment().startOf('day')
        defaultTimeEnd={moment(currentDateTest).add(15, 'days').toDate()}
        // defaultTimeStart={moment().startOf('date')}
        // visibleTimeStart={sliceCurrentDate || moment().startOf('day')}
        // visibleTimeEnd={moment().startOf('day').add(1, 'month').toDate()}
        // defaultTimeStart={moment().add(-12, 'hour')}
        // defaultTimeEnd={moment().add(12, 'hour')}
        stackItems // 1 item под вторым
        canSelect={false}
        // minZoom={1000 * 60 * 60 * 24 * 90}
        sidebarWidth={320}
        // minZoom={moment.duration(1, 'day').asMilliseconds()}
        // maxZoom={moment.duration(5, 'year').asMilliseconds()}
        // onItemSelect={itemHandler}
        // itemRenderer={CustomItemTotalPage}
        minZoom={60 * 60 * 1000 * 24 * 14}
        maxZoom={1000 * 60 * 60 * 24 * 360}
        ref={timelineRef}
      >
        <TimelineHeaders>
          <SidebarHeader>
            {({ getRootProps }) => {
              return <CustomSidebarHeader getRootProps={getRootProps} />;
            }}
          </SidebarHeader>
          <DateHeader unit="primaryHeader" />
          <DateHeader />
        </TimelineHeaders>
        <TimelineMarkers>
          {/* <CustomMarker date={moment(currentDateTest).valueOf()}>
            {({ styles }) => {
              const newStyles = {
                ...styles,
                width: '2px',
                backgroundColor: '#036bfd',
                zIndex: '100',
              };
              return <div className="customMarkerLocale" style={newStyles} />;
            }}
          </CustomMarker> */}
        </TimelineMarkers>
      </Timeline>
      {/* {open && <Calendar />} */}
    </div>
  );
};

export default TimeLineTotalPageStyled;
