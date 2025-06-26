import { FiInfo } from "react-icons/fi";
import { useProfile } from "../../hooks/useProfile";

export function AdvancedInfo() {
  const { generalData } = useProfile();

  return (
    <div className="advanced-info-container">
      {generalData && (
        <>
          <div className="advanced-info-header">
            <h1>Advanced Information</h1>
            <p>View system information about your business profile</p>
          </div>
          <span>
            <FiInfo />
            System Information
          </span>
          <div className="advanced-data-card">
            <div>
              <span>Account Email:</span>
              <span>{generalData.email}</span>
            </div>
            <div>
              <span>Business ID:</span>
              <span>{generalData._id}</span>
            </div>
            <div>
              <span>Created At:</span>
              <span>{generalData.createdAt}</span>
            </div>
            <div>
              <span>Last Updated:</span>
              <span>{generalData.updatedAt}</span>
            </div>
          </div>
          <span>
            This information is automatically managed by the system and cannot
            be modified.
          </span>
        </>
      )}
    </div>
  );
}
