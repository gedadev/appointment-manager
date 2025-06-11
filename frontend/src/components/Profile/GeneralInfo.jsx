import { useProfile } from "../../hooks/useProfile";
import { countries, getTimeZoneLabel, TimeZones } from "../../utils/main";
import {
  FiAlertCircle,
  FiGlobe,
  FiMail,
  FiMapPin,
  FiPhone,
  FiUpload,
  FiUsers,
} from "react-icons/fi";

export function GeneralInfo() {
  const { generalData, handleChange } = useProfile();

  return (
    <main className="general-info-container">
      {generalData && (
        <>
          <div className="general-info-header">
            <h1>General Information</h1>
            <p>Update your business details and contact information</p>
          </div>
          <div className="logo-form-section">
            <div>
              <img
                src={
                  generalData.businessLogo
                    ? generalData.businessLogo
                    : "https://placehold.co/200?text=Logo"
                }
                alt="Business Logo"
              />
            </div>
            <div className="logo-input-section">
              <p>Business Logo</p>
              <label htmlFor="imageInput">
                <FiUpload /> Upload Logo
              </label>
              <input type="file" id="imageInput" name="logo" accept="image/*" />
              <span>Recommended: Square image, at least 200x200px</span>
            </div>
          </div>
          <div className="profile-form-section">
            <div className="profile-form-group">
              <p>Business Name</p>
              <label htmlFor="businessName">
                <FiUsers />
              </label>
              <input
                type="text"
                id="businessName"
                name="businessName"
                value={generalData.businessName}
                onChange={handleChange}
              />
            </div>
            <div className="profile-form-group short">
              <p>Business Email</p>
              <label htmlFor="businessEmail">
                <FiMail />
              </label>
              <input
                type="email"
                id="businessEmail"
                name="businessEmail"
                value={generalData.businessEmail}
                onChange={handleChange}
              />
            </div>
            <div className="profile-form-group short">
              <p>Phone Number</p>
              <label htmlFor="phone">
                <FiPhone />
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={generalData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="profile-form-group short">
              <p>Location</p>
              <label htmlFor="location">
                <FiMapPin />
              </label>
              <select
                defaultValue={generalData.location}
                name="location"
                onChange={handleChange}
              >
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {`${country.emoji} ${country.name}`}
                  </option>
                ))}
              </select>
            </div>
            <div className="profile-form-group short">
              <p>Time Zone</p>
              <label htmlFor="timezone">
                <FiGlobe />
              </label>
              <select
                defaultValue={generalData.timezone}
                name="timezone"
                onChange={handleChange}
              >
                {TimeZones.map((tz) => (
                  <option key={tz} value={tz}>
                    {getTimeZoneLabel(tz)}
                  </option>
                ))}
              </select>
            </div>
            <div className="profile-form-group description">
              <p>Business Description</p>
              <label htmlFor="description">
                <FiAlertCircle />
              </label>
              <textarea
                id="description"
                name="businessDescription"
                value={generalData.businessDescription}
                onChange={handleChange}
              />
            </div>
          </div>
        </>
      )}
    </main>
  );
}
