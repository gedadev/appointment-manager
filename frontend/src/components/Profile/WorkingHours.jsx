import { FiClock } from "react-icons/fi";
import { useAuth } from "../../hooks/useAuth";

export function WorkingHours() {
  const { userData } = useAuth();

  const hoursOptions = [...Array(12)].map((_, i) => String(i + 1));
  const minutesOptions = ["00", "15", "30", "45"];
  const periodOptions = ["AM", "PM"];

  return (
    <main className="working-hours-container">
      {userData && (
        <form>
          <div className="wh-header">
            <h1>Working Hours</h1>
            <p>Set your business operating hours</p>
          </div>
          <div>
            {Object.entries(userData.workingHours).map(([day, hours]) => (
              <div key={day} className="day-group">
                <div>
                  <input
                    type="checkbox"
                    name="isOpen"
                    id="isOpen"
                    checked={hours.start}
                  />
                  <label htmlFor="isOpen">{day}</label>
                </div>
                {hours.start ? (
                  <>
                    <div>
                      <span>
                        <FiClock /> From
                      </span>
                      <select name="startHour" id="startHour">
                        {hoursOptions.map((hour) => (
                          <option key={hour} value={hour}>
                            {hour}
                          </option>
                        ))}
                      </select>
                      <span>:</span>
                      <select name="startMinute" id="startMinute">
                        {minutesOptions.map((minute) => (
                          <option key={minute} value={minute}>
                            {minute}
                          </option>
                        ))}
                      </select>
                      <select name="startPeriod" id="startPeriod">
                        {periodOptions.map((period) => (
                          <option key={period} value={period}>
                            {period}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <span>To</span>
                      <select name="endHour" id="endHour">
                        {hoursOptions.map((hour) => (
                          <option key={hour} value={hour}>
                            {hour}
                          </option>
                        ))}
                      </select>
                      <span>:</span>
                      <select name="endMinute" id="endMinute">
                        {minutesOptions.map((minute) => (
                          <option key={minute} value={minute}>
                            {minute}
                          </option>
                        ))}
                      </select>
                      <select name="endPeriod" id="endPeriod">
                        {periodOptions.map((period) => (
                          <option key={period} value={period}>
                            {period}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                ) : (
                  <span>
                    <FiClock />
                    Closed
                  </span>
                )}
              </div>
            ))}
          </div>
        </form>
      )}
    </main>
  );
}
