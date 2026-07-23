import React, { useState } from 'react';
import { X, MapPin, Navigation, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './LocationModal.css';

const HYD_NEIGHBORHOODS = [
  { name: 'Madhapur, Hyderabad', pincode: '500081' },
  { name: 'Gachibowli, Hyderabad', pincode: '500032' },
  { name: 'Jubilee Hills, Hyderabad', pincode: '500033' },
  { name: 'Banjara Hills, Hyderabad', pincode: '500034' },
  { name: 'Secunderabad, Hyderabad', pincode: '500003' },
  { name: 'Kondapur, Hyderabad', pincode: '500084' }
];

const LocationModal = () => {
  const { isLocationModalOpen, setIsLocationModalOpen, deliveryLocation, setDeliveryLocation } = useCart();
  const [customLocation, setCustomLocation] = useState('');
  const [detecting, setDetecting] = useState(false);

  if (!isLocationModalOpen) return null;

  const handleSave = (locationStr) => {
    if (locationStr && locationStr.trim() !== '') {
      setDeliveryLocation(locationStr);
      setIsLocationModalOpen(false);
    }
  };

  const handleDetectLocation = () => {
    setDetecting(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Simulate reverse geocoding to Hyderabad for theme consistency,
          // or use coordinates if user is outside Hyderabad but we keep it HYD-focused
          setTimeout(() => {
            const randomNeighborhood = HYD_NEIGHBORHOODS[Math.floor(Math.random() * HYD_NEIGHBORHOODS.length)];
            const detected = `${randomNeighborhood.name} (${randomNeighborhood.pincode})`;
            setDeliveryLocation(detected);
            setDetecting(false);
            setIsLocationModalOpen(false);
          }, 1500);
        },
        (error) => {
          console.error(error);
          // Fallback if permission denied
          setTimeout(() => {
            setDeliveryLocation('Madhapur, Hyderabad 500081');
            setDetecting(false);
            setIsLocationModalOpen(false);
          }, 1000);
        }
      );
    } else {
      setDetecting(false);
      alert('Geolocation is not supported by your browser.');
    }
  };

  return (
    <div className="location-modal-overlay" onClick={() => setIsLocationModalOpen(false)}>
      <div className="location-modal-card" onClick={e => e.stopPropagation()}>
        <div className="location-modal-header">
          <div className="location-modal-title">
            <MapPin size={20} className="text-cyan" />
            <h3>Select Delivery Location</h3>
          </div>
          <button className="close-modal-btn" onClick={() => setIsLocationModalOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="location-modal-body">
          <button 
            className="detect-btn" 
            onClick={handleDetectLocation}
            disabled={detecting}
          >
            <Navigation size={16} className={detecting ? 'animate-spin' : ''} />
            <span>{detecting ? 'Detecting Location...' : 'Detect Current Location'}</span>
          </button>

          <div className="divider">
            <span>OR ENTER MANUALLY</span>
          </div>

          <div className="input-group">
            <input 
              type="text" 
              placeholder="Enter Pincode or Locality (e.g. Madhapur)" 
              value={customLocation}
              onChange={(e) => setCustomLocation(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSave(customLocation);
              }}
            />
            <button className="save-loc-btn" onClick={() => handleSave(customLocation)}>
              Save
            </button>
          </div>

          <div className="popular-locations">
            <h4>Popular Hyderabad Areas</h4>
            <div className="location-grid">
              {HYD_NEIGHBORHOODS.map(loc => {
                const fullLocStr = `${loc.name} ${loc.pincode}`;
                const isSelected = deliveryLocation.includes(loc.pincode);

                return (
                  <button 
                    key={loc.pincode}
                    className={`loc-grid-item ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleSave(fullLocStr)}
                  >
                    <div className="loc-item-text">
                      <span className="loc-name">{loc.name.split(',')[0]}</span>
                      <span className="loc-pin">{loc.pincode}</span>
                    </div>
                    {isSelected && <Check size={14} className="text-green" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;
