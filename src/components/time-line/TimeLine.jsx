import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader,
  TimelineMarkers,
  TodayMarker,
  CustomMarker,
  CursorMarker,
} from 'react-calendar-timeline';
import moment from 'moment';
import 'moment/locale/ru';

import { groupRendererColored } from './custom-group/CustomGroup';
import { CustomItemMain } from './custom-items/CustomItems';
import { CustomSidebarHeaderMain } from './custom-sidebar-header/CustomSidebarHeader';

import Calendar from '../calendar/Calendar';
import { setOpen, setGroupId } from '../../redux/slices/calendarSlice';
import { clearItems, deleteItem } from '../../redux/slices/scheduleSlice';
import useApiService from '../../service/useApiService';

import { TfiZoomIn, TfiZoomOut } from 'react-icons/tfi';
import { GoTrash } from 'react-icons/go';

import '../../styles/timeLine.css';

moment.locale('ru');

const TimeLine = ({ items, projectId }) => {
  const open = useSelector((state) => state.calendar.open);
  // const sliceItems = useSelector((state) => state.schedule.items);
  const sliceGroups = useSelector((state) => state.schedule.groups);
  const sliceCurrentDate = useSelector((state) => state.schedule.currentDate);

  const fixedItemsIds = items.map((item) => ({
    ...item,
    id: String(item.id),
  })); // для react-timeline-calendar нужно перевести id в строку (иначе id 0 будет восприниматься как false)

  const dispatch = useDispatch();

  const timelineRef = useRef(null);

  const { deleteRowCalendar } = useApiService();

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

  const itemHandler = (itemId, e, time) => {
    // вызывается при клике на временной интервал и удаляет item из календаря
    console.log('Клик по item с id:', itemId);
    dispatch(deleteItem(Number(itemId)));
    if (projectId) {
      deleteRowCalendar(projectId, itemId).catch((err) =>
        console.error('Ошибка при удалении', err)
      );
    }
  };

  const canvasHandler = (groupId, time, e) => {
    // вызывается при клике на сетку/таблицу canvas
    dispatch(setOpen(true));
    dispatch(setGroupId(groupId));
    // console.log('groupId:', groupId);
    // console.log('Event:', e);
    // console.log('Time:', time);
  };

  const handleClear = () => {
    dispatch(clearItems());
  };

  const onVisibleTimeChange = () => {
    // когда введена дата съемки, перебрасываем пользователя на CustomMarker
    if (sliceCurrentDate && timelineRef.current) {
      const visibleTimeStart = moment(sliceCurrentDate)
        .add(-15, 'days')
        .valueOf(); // видимые 15 дней до currentDate
      const visibleTimeEnd = moment(sliceCurrentDate).add(15, 'days').valueOf(); // 15 дней после currentDate

      timelineRef.current.updateScrollCanvas(visibleTimeStart, visibleTimeEnd);
    }
  };

  useEffect(() => {
    onVisibleTimeChange();
  }, [sliceCurrentDate]);

  return (
    <div id="calendar" className="timeLineComponent">
      <div className="timeLineIcons">
        {!projectId && (
          <GoTrash className="timeLineIcon trash" onClick={handleClear} />
        )}
        <TfiZoomIn className="timeLineIcon" onClick={handleZoomIn} />
        <TfiZoomOut className="timeLineIcon" onClick={handleZoomOut} />
      </div>
      <Timeline
        groups={sliceGroups} // названия этапов
        items={fixedItemsIds} // временные отрезки
        lineHeight={40} // высота линии календаря (задает высоту item или линии под которую будет подстраиваться св-во itemHeightRatio={1}, важно учитывать ее и height у group, т/к при stackItems могут быть конфликты отрисовки из-за разных размеров)
        itemHeightRatio={1} // сколько процентов занимает item от линии
        canMove={false} // запретить перемещение items
        canResize={false} // запретить изменение размера
        // defaultTimeStart={moment().startOf('date')}
        defaultTimeStart={moment().startOf('day')} //  moment().startOf('day')
        defaultTimeEnd={moment().startOf('day').add(1, 'month').toDate()}
        // visibleTimeStart={sliceCurrentDate || moment().startOf('day')}
        // visibleTimeEnd={moment().startOf('day').add(1, 'month').toDate()}
        // defaultTimeStart={moment().add(-12, 'hour')}
        // defaultTimeEnd={moment().add(12, 'hour')}
        // stackItems // 1 item под вторым
        // canSelect={true}
        // minZoom={1000 * 60 * 60 * 24 * 90}
        sidebarWidth={223} // ширина левого сайдбара
        // minZoom={moment.duration(1, 'day').asMilliseconds()}
        // maxZoom={moment.duration(5, 'year').asMilliseconds()}
        // onItemSelect={itemHandler}
        onItemClick={itemHandler}
        onCanvasClick={canvasHandler}
        groupRenderer={groupRendererColored}
        itemRenderer={CustomItemMain}
        minZoom={60 * 60 * 1000 * 24 * 14}
        maxZoom={1000 * 60 * 60 * 24 * 360}
        ref={timelineRef}
      >
        <TimelineHeaders>
          <SidebarHeader>
            {({ getRootProps }) => {
              return <CustomSidebarHeaderMain getRootProps={getRootProps} />;
            }}
          </SidebarHeader>
          <DateHeader unit="primaryHeader" />
          <DateHeader />
        </TimelineHeaders>
        <TimelineMarkers>
          <CustomMarker date={sliceCurrentDate}>
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
      {open && <Calendar />}
    </div>
  );
};

export default TimeLine;
