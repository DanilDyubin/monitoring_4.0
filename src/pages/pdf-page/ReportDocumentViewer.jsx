import { PDFViewer } from '@react-pdf/renderer';
import ReportDocument from './ReportDocument';

const ReportDocumentViewer = ({
  formData,
  reportDate,
  stages,
  reportByImage,
}) => {
  console.log(`Stages - ${JSON.stringify(stages)}`);
  return (
    <div style={{ width: '595px', height: '842px' }}>
      <PDFViewer style={{ width: '100%', height: '100%' }}>
        <ReportDocument
          formData={formData}
          reportDate={reportDate}
          stages={stages}
          reportByImage={reportByImage}
        />
      </PDFViewer>
    </div>
  );
};

export default ReportDocumentViewer;
