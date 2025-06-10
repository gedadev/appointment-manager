import { useProfile } from "../../hooks/useProfile";
import { getTimeZoneLabel, TimeZones } from "../../utils/main";
import {
  FiAlertCircle,
  FiGlobe,
  FiMail,
  FiPhone,
  FiUpload,
  FiUsers,
} from "react-icons/fi";

export function GeneralInfo() {
  const { generalData, handleChange } = useProfile();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = [...e.target.elements];

    const dataObject = data.reduce((object, input) => {
      if (!input.value) return object;

      const key = input.name;
      const value = input.value;
      return { ...object, [key]: value };
    }, {});

    console.log(dataObject);
  };

  return (
    <main className="general-info-container">
      {console.log(generalData)}
      {generalData && (
        <form onSubmit={handleSubmit}>
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
            <div className="profile-form-group email">
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
            <div className="profile-form-group phone">
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
            <div className="profile-form-group">
              <p>Time Zone</p>
              <label htmlFor="timezone">
                <FiGlobe />
              </label>
              <select defaultValue={generalData.timezone} name="timezone">
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
          <div className="profile-form-buttons">
            <button type="button" className="cancel-button">
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Save Changes
            </button>
          </div>
        </form>
      )}
    </main>
  );
}
