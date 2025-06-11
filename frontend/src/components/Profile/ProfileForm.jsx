import { Outlet } from "react-router-dom";
import { useProfile } from "../../hooks/useProfile";

export function ProfileForm() {
  const { handleSubmit } = useProfile();

  return (
    <form onSubmit={handleSubmit}>
      <Outlet />
      <FormButtons />
    </form>
  );
}

function FormButtons() {
  const { formChanged } = useProfile();

  return (
    <div className="profile-form-buttons">
      <button type="button" className="cancel-button">
        Cancel
      </button>
      <button type="submit" className="submit-button" disabled={!formChanged}>
        Save Changes
      </button>
    </div>
  );
}
