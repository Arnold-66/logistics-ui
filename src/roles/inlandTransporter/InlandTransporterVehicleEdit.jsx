// roles/inlandTransporter/InlandTransporterVehicleEdit.jsx
import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../../context/themeContext';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Truck, Package, MapPin, Calendar, Clock, User, Building,
  Phone, Mail, FileText, Save, X, Users, Navigation, AlertCircle,
  CheckCircle, Search, Star, Edit2, Fuel, Wrench, Shield, Gauge
} from 'lucide-react';

const InlandTransporterVehicleEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState(null);

  const colors = {
    primary: '#714b67',
    primaryLight: '#8a5f7e',
    primaryDark: '#5a3a52',
    primaryBg: '#f5f0f4',
    primaryBgDark: '#2d1f29',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#3b82f6',
    teal: '#14b8a6',
  };

  const isDark = darkMode

  useEffect(() => {
    setTimeout(() => {
      setFormData({
        id: id || 'VEH-001',
        plateNo: 'UAB 1234',
        type: '40ft Flatbed',
        model: 'Mercedes Actros',
        year: 2022,
        capacity: '25 tons',
        fuelType: 'Diesel',
        mileage: '45,230 km',
        status: 'Active',
        driverName: 'Robert Ssali',
        driverPhone: '+256 700 123456',
        driverEmail: 'robert@importflow.com',
        lastMaintenance: '2026-07-15',
        nextMaintenance: '2026-09-15',
        insurance: 'Active',
        insuranceExpiry: '2026-12-31',
        registration: '2026-01-15',
        registrationExpiry: '2027-01-14',
        color: 'White',
        rating: 4.5,
        fuelEfficiency: '8.5 km/L',
        engineType: 'V8 Diesel',
        transmission: 'Automatic',
        vin: 'WDB12345678901234',
        currentLocation: 'Kampala Warehouse',
        capacity: '25 tons'
      });
      setLoading(false);
    }, 500);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      console.log('Updated Vehicle Data:', formData);
      setSaving(false);
      navigate(`/inland-transporter/vehicle/${id}`);
    }, 1500);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style={{ borderColor: colors.primary }}></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full p-4 md:p-6" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(`/inland-transporter/vehicle/${id}`)} className="p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700">
            <ArrowLeft className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
          </button>
          <div>
            <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Edit Vehicle</h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{formData.plateNo} • {formData.model}</p>
          </div>
          <div className="ml-auto flex gap-2">
            <button onClick={() => navigate(`/inland-transporter/vehicle/${id}`)} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border" style={{ borderColor: colors.primary, color: colors.primary }}><X className="w-4 h-4" />Cancel</button>
            <button onClick={handleSubmit} disabled={saving} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-lg disabled:opacity-50" style={{ backgroundColor: colors.primary }}>
              {saving ? <><div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>Saving...</> : <><Save className="w-4 h-4" />Save Changes</>}
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Vehicle Details */}
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-sm'}`}>
            <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <Truck className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
              Vehicle Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>License Plate *</label>
                <input type="text" name="plateNo" value={formData.plateNo} onChange={handleChange} className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`} style={{ focusRingColor: colors.primary }} required />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Model *</label>
                <input type="text" name="model" value={formData.model} onChange={handleChange} className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`} style={{ focusRingColor: colors.primary }} required />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Type</label>
                <select name="type" value={formData.type} onChange={handleChange} className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`} style={{ focusRingColor: colors.primary }}>
                  <option value="20ft Container Truck">20ft Container Truck</option>
                  <option value="40ft Container Truck">40ft Container Truck</option>
                  <option value="40ft Flatbed">40ft Flatbed</option>
                  <option value="Refrigerated Truck">Refrigerated Truck</option>
                  <option value="Tanker">Tanker</option>
                  <option value="Curtain Sider">Curtain Sider</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Year</label>
                <input type="number" name="year" value={formData.year} onChange={handleChange} className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`} style={{ focusRingColor: colors.primary }} />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Color</label>
                <input type="text" name="color" value={formData.color} onChange={handleChange} className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`} style={{ focusRingColor: colors.primary }} />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>VIN</label>
                <input type="text" name="vin" value={formData.vin} onChange={handleChange} className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`} style={{ focusRingColor: colors.primary }} />
              </div>
            </div>
          </div>

          {/* Driver Details */}
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-sm'}`}>
            <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <User className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
              Driver Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Driver Name *</label>
                <input type="text" name="driverName" value={formData.driverName} onChange={handleChange} className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`} style={{ focusRingColor: colors.primary }} required />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Driver Phone *</label>
                <input type="tel" name="driverPhone" value={formData.driverPhone} onChange={handleChange} className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`} style={{ focusRingColor: colors.primary }} required />
              </div>
              <div className="md:col-span-2">
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Driver Email</label>
                <input type="email" name="driverEmail" value={formData.driverEmail} onChange={handleChange} className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`} style={{ focusRingColor: colors.primary }} />
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-sm'}`}>
            <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <Gauge className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
              Specifications
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Capacity</label>
                <input type="text" name="capacity" value={formData.capacity} onChange={handleChange} className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`} style={{ focusRingColor: colors.primary }} />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Fuel Type</label>
                <select name="fuelType" value={formData.fuelType} onChange={handleChange} className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`} style={{ focusRingColor: colors.primary }}>
                  <option value="Diesel">Diesel</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Electric">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Mileage</label>
                <input type="text" name="mileage" value={formData.mileage} onChange={handleChange} className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`} style={{ focusRingColor: colors.primary }} />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Fuel Efficiency</label>
                <input type="text" name="fuelEfficiency" value={formData.fuelEfficiency} onChange={handleChange} className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`} style={{ focusRingColor: colors.primary }} />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Engine Type</label>
                <input type="text" name="engineType" value={formData.engineType} onChange={handleChange} className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`} style={{ focusRingColor: colors.primary }} />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Transmission</label>
                <select name="transmission" value={formData.transmission} onChange={handleChange} className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`} style={{ focusRingColor: colors.primary }}>
                  <option value="Manual">Manual</option>
                  <option value="Automatic">Automatic</option>
                  <option value="Semi-Automatic">Semi-Automatic</option>
                </select>
              </div>
            </div>
          </div>

          {/* Insurance & Registration */}
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-sm'}`}>
            <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <Shield className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
              Insurance & Registration
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Insurance Status</label>
                <select name="insurance" value={formData.insurance} onChange={handleChange} className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`} style={{ focusRingColor: colors.primary }}>
                  <option value="Active">Active</option>
                  <option value="Expired">Expired</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Insurance Expiry</label>
                <input type="date" name="insuranceExpiry" value={formData.insuranceExpiry} onChange={handleChange} className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`} style={{ focusRingColor: colors.primary }} />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Registration</label>
                <input type="text" name="registration" value={formData.registration} onChange={handleChange} className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`} style={{ focusRingColor: colors.primary }} />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Registration Expiry</label>
                <input type="date" name="registrationExpiry" value={formData.registrationExpiry} onChange={handleChange} className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`} style={{ focusRingColor: colors.primary }} />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Last Maintenance</label>
                <input type="date" name="lastMaintenance" value={formData.lastMaintenance} onChange={handleChange} className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`} style={{ focusRingColor: colors.primary }} />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Next Maintenance</label>
                <input type="date" name="nextMaintenance" value={formData.nextMaintenance} onChange={handleChange} className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`} style={{ focusRingColor: colors.primary }} />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
            <button type="button" onClick={() => navigate(`/inland-transporter/vehicle/${id}`)} className="px-6 py-2 rounded-lg text-sm font-medium border" style={{ borderColor: colors.primary, color: colors.primary }}>Cancel</button>
            <button type="submit" disabled={saving} className="px-6 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-lg disabled:opacity-50 flex items-center gap-2" style={{ backgroundColor: colors.primary }}>
              {saving ? <><div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>Saving...</> : <><Save className="w-4 h-4" />Save Changes</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InlandTransporterVehicleEdit;