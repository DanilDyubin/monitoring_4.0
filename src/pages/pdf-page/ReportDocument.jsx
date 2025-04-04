import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  PDFViewer,
  Image,
} from '@react-pdf/renderer';
import moment from 'moment';

// Font.register({
//   family: 'ALS Gorizont Expanded 2.1',
//   src: '/fonts/ALS_Gorizont_Medium_Expanded_2.1.otf',
//   fontStyle: 'normal',
//   fontWeight: 500,
// });

// Font.register({
//   family: 'ALS Hauss',
//   fonts: [
//     { src: '/fonts/ALS_Hauss_Regular_1.002.otf', fontWeight: 400 }, // font-style: normal, font-weight: normal
//     { src: '/fonts/ALS_Hauss_Medium_1.2.otf', fontWeight: 500 },
//     { src: '/fonts/ALS_Hauss_Bold_1.002.otf', fontWeight: 700 },
//   ],
// });

Font.register({
  family: 'ALS Gorizont Expanded 2.1',
  src: process.env.PUBLIC_URL + '/fonts/ALS_Gorizont_Medium_Expanded_2.1.otf',
  fontStyle: 'normal',
  fontWeight: 500,
});

Font.register({
  family: 'ALS Hauss',
  fonts: [
    {
      src: process.env.PUBLIC_URL + '/fonts/ALS_Hauss_Regular_1.002.otf',
      fontWeight: 400,
    }, // font-style: normal, font-weight: normal
    {
      src: process.env.PUBLIC_URL + '/fonts/ALS_Hauss_Medium_1.2.otf',
      fontWeight: 500,
    },
    {
      src: process.env.PUBLIC_URL + '/fonts/ALS_Hauss_Bold_1.002.otf',
      fontWeight: 700,
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    // padding: '40px 40px 20px 40px',
    paddingTop: 40,
    paddingRight: 40,
    paddingBottom: 20,
    paddingLeft: 40,
    color: '#131313',
    backgroundColor: '#FFFFFF',
  },
  forms: {
    flexDirection: 'column',
    marginBottom: 32,
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    marginBottom: 16,
  },
  form: {
    flexDirection: 'column',
    flexBasis: 1,
    flexGrow: 1,
    flexShrink: 1,
  },
  title: {
    fontFamily: 'ALS Gorizont Expanded 2.1',
    fontWeight: 500,
    fontSize: 20,
    marginBottom: 24,
    color: '#131313',
  },
  label: {
    fontFamily: 'ALS Hauss',
    fontWeight: 400,
    fontSize: 12,
    lineHeight: 1.3,
    color: '#858585',
  },
  text: {
    fontFamily: 'ALS Hauss',
    fontWeight: 400,
    fontSize: 12,
    lineHeight: 1.3,
    color: '#131313',
  },
  input: {
    marginTop: 8,
    paddingTop: 12,
    paddingBottom: 12,
    paddingRight: 16,
    paddingLeft: 16,
    fontFamily: 'ALS Hauss',
    fontWeight: 400,
    fontSize: 12,
    lineHeight: 1.3,
    color: '#131313',
    backgroundColor: '#daeaff',
  },
  subtitle: {
    fontFamily: 'ALS Gorizont Expanded 2.1',
    fontWeight: 500,
    fontSize: 16,
    marginBottom: 16,
    color: '#131313',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerStages: {
    width: 140,
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: 'start',
    fontFamily: 'ALS Hauss',
    fontWeight: 400,
    fontSize: 12,
    lineHeight: 1.3,
    color: '#858585',
  },
  headerDate: {
    width: 150,
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: 'center',
    fontFamily: 'ALS Hauss',
    fontWeight: 400,
    fontSize: 12,
    lineHeight: 1.3,
    color: '#858585',
  },
  headerPlan: {
    width: 63,
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: 'center',
    fontFamily: 'ALS Hauss',
    fontWeight: 400,
    fontSize: 12,
    lineHeight: 1.3,
    color: '#858585',
  },
  headerFact: {
    width: 63,
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: 'center',
    fontFamily: 'ALS Hauss',
    fontWeight: 400,
    fontSize: 12,
    lineHeight: 1.3,
    color: '#858585',
  },
  headerDeviation: {
    width: 81,
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: 'center',
    fontFamily: 'ALS Hauss',
    fontWeight: 400,
    fontSize: 12,
    lineHeight: 1.3,
    color: '#858585',
  },
  colStages: {
    width: 140,
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: 'start',
    borderTop: 2,
    borderColor: '#edf6fa',
    borderStyle: 'solid',
    fontFamily: 'ALS Hauss',
    fontWeight: 400,
    fontSize: 12,
    lineHeight: 1.3,
    color: '#131313',
  },
  colDate: {
    width: 150,
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: 'center',
    borderTop: 2,
    borderColor: '#edf6fa',
    borderStyle: 'solid',
    fontFamily: 'ALS Hauss',
    fontWeight: 500,
    fontSize: 12,
    lineHeight: 1.3,
    color: '#131313',
  },
  colPlan: {
    width: 63,
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: 'center',
    borderTop: 2,
    borderColor: '#edf6fa',
    borderStyle: 'solid',
    fontFamily: 'ALS Hauss',
    fontWeight: 400,
    fontSize: 12,
    lineHeight: 1.3,
    color: '#131313',
  },
  colFact: {
    width: 63,
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: 'center',
    borderTop: 2,
    borderColor: '#edf6fa',
    borderStyle: 'solid',
    fontFamily: 'ALS Hauss',
    fontWeight: 400,
    fontSize: 12,
    lineHeight: 1.3,
    color: '#131313',
  },
  colDeviation: {
    width: 81,
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: 'center',
    borderTop: 2,
    borderColor: '#edf6fa',
    borderStyle: 'solid',
    fontFamily: 'ALS Hauss',
    fontWeight: 500,
    fontSize: 12,
    lineHeight: 1.3,
    color: '#00c974',
  },
  warning: {
    color: '#ff2e00',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  col: {
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: 'center',
    borderTop: 2,
    borderColor: '#edf6fa',
    borderStyle: 'solid',
    fontFamily: 'ALS Hauss',
    fontWeight: 400,
    fontSize: 12,
    lineHeight: 1.3,
    color: '#131313',
  },
  titleSmall: {
    fontFamily: 'ALS Gorizont Expanded 2.1',
    fontWeight: 500,
    fontSize: 16,
    marginBottom: 24,
    color: '#131313',
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  card: {
    width: 246,
  },
  img: {
    height: 230,
    width: '100%',
    objectFit: 'cover',
  },
  cardSubtitles: {
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontFamily: 'ALS Hauss',
    fontWeight: 400,
    fontSize: 12,
    lineHeight: 1.3,
    color: '#858585',
    borderBottom: 2,
    borderColor: '#edf6fa',
    borderStyle: 'solid',
  },
  cardSubtitleDone: {
    width: 96,
    textAlign: 'center',
  },
  item: {
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontFamily: 'ALS Hauss',
    fontWeight: 400,
    fontSize: 12,
    lineHeight: 1.3,
    color: '#131313',
    borderBottom: 2,
    borderColor: '#edf6fa',
    borderStyle: 'solid',
  },
  itemDoneTxt: {
    width: 96,
    textAlign: 'center',
  },
});

const ReportDocument = ({ formData, stages, reportByImage }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.title}>
        <Text>Отчет о выполненных работах</Text>
      </View>
      <View style={styles.forms}>
        <View style={styles.wrapper}>
          <View style={styles.form}>
            <Text style={styles.label}>УИН *</Text>
            <View style={styles.input}>
              <Text style={styles.text}>{formData.UIN}</Text>
            </View>
          </View>
          <View style={styles.form}>
            <Text style={styles.label}>Дата съемки *</Text>
            <View style={styles.input}>
              <Text style={styles.text}>
                {moment(stages[0].stage.calendars[0].report_date).format(
                  'DD.MM.YYYY'
                )}
                {/* {stages[3].percent} */}
              </Text>
            </View>
          </View>
          <View style={styles.form}>
            <Text style={styles.label}>Этажность *</Text>
            <View style={styles.input}>
              <Text style={styles.text}>{formData.floor_count}</Text>
            </View>
          </View>
        </View>
        <View style={styles.textarea}>
          <Text style={styles.label}>Адрес *</Text>
          <View style={styles.input}>
            <Text style={styles.text}>{formData.address}</Text>
          </View>
        </View>
      </View>
      <View style={styles.schedule}>
        <View style={styles.subtitle}>
          <Text>График строительных работ</Text>
        </View>
        <View style={styles.table}>
          <View style={styles.header}>
            <View style={styles.headerStages}>
              <Text>Этапы</Text>
            </View>
            <View style={styles.headerDate}>
              <Text>Начало — завершение</Text>
            </View>
            {/* <View style={styles.headerPlan}>
              <Text>План</Text>
            </View> */}
            <View style={styles.headerFact}>
              <Text>Факт</Text>
            </View>
            {/* <View style={styles.headerDeviation}>
              <Text>Отклонение</Text>
            </View> */}
          </View>
          {stages.map((stage, i) => (
            <View style={styles.row}>
              <View style={styles.colStages}>
                <Text style={styles.stages}>{stage.stage.name}</Text>
              </View>
              <View style={styles.colDate}>
                <Text style={styles.date}>
                  {stage.stage.calendars.length
                    ? `${moment(stage.stage.calendars[0].plan_start).format(
                        'DD.MM'
                      )} - ${moment(stage.stage.calendars[0].plan_end).format(
                        'DD.MM'
                      )}`
                    : `-`}
                  {/* {stage.stage.calendars[0].plan_start
                    ? stage.stage.calendars[0].plan_start
                    : '-'} */}
                </Text>
              </View>
              {/* <View style={styles.colPlan}>
                <Text style={styles.done}>{Math.round(stage.planValue)}%</Text>
              </View> */}
              <View style={styles.colFact}>
                <Text style={styles.done}>
                  {stage.percent ? Math.round(stage.percent) : 0}%
                </Text>
              </View>
              {/* <View style={styles.colDeviation}>
                <Text style={stage.progress_diff < 0 ? styles.warning : null}>
                  {Math.round(stage.progress_diff)}%
                </Text>
              </View> */}
            </View>
          ))}
        </View>
      </View>
    </Page>
    <Page size="A4" style={styles.page}>
      <View style={styles.titleSmall}>
        <Text>Отчёт по каждому снимку</Text>
      </View>
      <View style={styles.container}>
        {reportByImage.map((item, i) => (
          <View style={styles.card}>
            <Image
              src={
                `https://msi.construction-monitoring.contextmachine.cloud/get_one_mask?image_id=${item.photoId}` ||
                null
              }
              style={styles.img}
            />
            <View style={styles.cardSubtitles}>
              <View>
                <Text>Этапы</Text>
              </View>
              <View style={styles.cardSubtitleDone}>
                <Text>Выполнено</Text>
              </View>
            </View>
            <View style={styles.list}>
              {item.report.map((stage, i) => (
                <View style={styles.item}>
                  <View>
                    <Text>{stage.stage.name}</Text>
                  </View>
                  <View style={styles.itemDoneTxt}>
                    <Text>{Math.round(stage.percent)}%</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default ReportDocument;

{
  /* {stages[0].stage.calendars.report_date} */
}
{
  /* {Array.isArray(stages) && stages.length > 0
                  ? stages[0].percent
                  : '—'} */
}
