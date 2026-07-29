// roles/importer/ImporterBookingDocuments.jsx
import React, { useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { ThemeContext } from '../../context/themeContext';
import DocumentViewer from '../../components/DocumentViewer';

const ImporterBookingDocuments = () => {
  const { id } = useParams();
  const location = useLocation();
  const { darkMode } = useContext(ThemeContext);
  const isDark = darkMode
  
  const documents = location.state?.documents || [];
  const booking = location.state?.booking || null;

  return (
    <div className="min-h-screen w-full p-4 md:p-6" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
      <div className="max-w-7xl mx-auto">
        <DocumentViewer 
          documents={documents}
          title={`Booking ${id} Documents`}
          backPath="/importer/freight-bookings"
          shipmentId={id}
        />
      </div>
    </div>
  );
};

export default ImporterBookingDocuments;