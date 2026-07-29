import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ThemeContext } from '../context/themeContext';
import {
  Ship,
  Package,
  MapPin,
  Calendar,
  Clock,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  FileText
} from 'lucide-react';
import Loading from '../components/Loading';

const ShipmentDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { theme } = useContext(ThemeContext);
  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(true);

  const isDark = theme === 'dark';

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setShipment({
        id: id || '#458',
        origin: 'Shanghai, China',
        destination: 'Port of Mombasa',
        status: 'In Transit',
        progress: 70,
        eta: '12 Aug 2026',
        items: 450,
        weight: '12.5 tons',
        container: 'MSKU-458921',
        currentLocation: 'Indian Ocean'
      });
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) return <Loading />;
  if (!shipment) return <div>Shipment not found</div>;

  return (
    <div className="min-h-screen p-4 md:p-6" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/shipments')}
          className="flex items-center gap-2 text-sm hover:underline mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shipments
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <Ship className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold">Shipment {shipment.id}</h1>
              <p className="text-gray-500 dark:text-gray-400">
                {shipment.origin} → {shipment.destination}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <p className="font-medium">{shipment.status}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Progress</p>
              <p className="font-medium">{shipment.progress}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Items</p>
              <p className="font-medium">{shipment.items}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">ETA</p>
              <p className="font-medium">{shipment.eta}</p>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-medium mb-2">Current Location</h3>
            <p>{shipment.currentLocation}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipmentDetails;