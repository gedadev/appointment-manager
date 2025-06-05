import { FiClock } from "react-icons/fi";
import { useAuth } from "../../hooks/useAuth";
import { workingHoursMock } from "../../utils/main";
import { useState } from "react";

export function WorkingHours() {
  const { userData } = useAuth();
  const hoursIsSet =
    userData && Object.prototype.hasOwnProperty.call(userData, "workingHours");

  const getHours = () => {
    return hoursIsSet ? userData.workingHours : workingHoursMock;
  };

  return (
    <main className="working-hours-container">
      {userData && (
        <form>
          <div className="wh-header">
            <h1>Working Hours</h1>
            <p>Set your business operating hours</p>
          </div>
          <div>
            {Object.entries(getHours()).map(([day, hours]) => (
              <HoursInputs key={day} day={day} hours={hours} />
            ))}
          </div>
        </form>
      )}
    </main>
  );
}

function HoursInputs({ day, hours }) {
  const [activeHours, setActiveHours] = useState(!!hours.start);

  const hoursOptions = [...Array(12)].map((_, i) => String(i + 1));
  const minutesOptions = ["00", "15", "30", "45"];
  const periodOptions = ["AM", "PM"];

  return (
    <div className="day-group">
      <div>
        <input
          type="checkbox"
          name={`${day}-isOpen`}
          id={`${day}-isOpen`}
          checked={hours.start}
          onClick={() => setActiveHours(!activeHours)}
        />
        <label htmlFor={`${day}-isOpen`}>{day}</label>
      </div>
      {activeHours ? (
        <>
          <div>
            <span>
              <FiClock /> From
            </span>
            <select name={`${day}-startHour`} id={`${day}-startHour`}>
              {hoursOptions.map((hour) => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))}
            </select>
            <span>:</span>
            <select name={`${day}-startMinute`} id={`${day}-startMinute`}>
              {minutesOptions.map((minute) => (
                <option key={minute} value={minute}>
                  {minute}
                </option>
              ))}
            </select>
            <select name={`${day}-startPeriod`} id={`${day}-startPeriod`}>
              {periodOptions.map((period) => (
                <option key={period} value={period}>
                  {period}
                </option>
              ))}
            </select>
          </div>
          <div>
            <span>To</span>
            <select name={`${day}-endHour`} id={`${day}-endHour`}>
              {hoursOptions.map((hour) => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))}
            </select>
            <span>:</span>
            <select name={`${day}-endMinute`} id={`${day}-endMinute`}>
              {minutesOptions.map((minute) => (
                <option key={minute} value={minute}>
                  {minute}
                </option>
              ))}
            </select>
            <select name={`${day}-endPeriod`} id={`${day}-endPeriod`}>
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
  );
}
