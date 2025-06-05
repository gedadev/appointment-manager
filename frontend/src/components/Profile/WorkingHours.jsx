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

  const formatHour = (hour24) => {
    const hour = hour24 ? hour24.split(":")[0] : "1";
    const minute = hour24 ? hour24.split(":")[1] : "0";
    const period = Number(hour) < 12 ? "AM" : "PM";

    return {
      hour: hour > 12 ? Number(hour) - 12 : Number(hour),
      minute: Number(minute),
      period,
    };
  };

  return (
    <div className="day-group">
      <div>
        <input
          type="checkbox"
          name={`${day}-isOpen`}
          id={`${day}-isOpen`}
          checked={hours.start}
          onChange={() => setActiveHours(!activeHours)}
        />
        <label htmlFor={`${day}-isOpen`}>{day}</label>
      </div>
      {activeHours ? (
        <>
          <div>
            <span>
              <FiClock /> From
            </span>
            <select
              name={`${day}-startHour`}
              id={`${day}-startHour`}
              defaultValue={formatHour(hours.start).hour}
            >
              {hoursOptions.map((hour) => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))}
            </select>
            <span>:</span>
            <select
              name={`${day}-startMinute`}
              id={`${day}-startMinute`}
              defaultValue={formatHour(hours.start).minute}
            >
              {minutesOptions.map((minute) => (
                <option key={minute} value={minute}>
                  {minute}
                </option>
              ))}
            </select>
            <select
              name={`${day}-startPeriod`}
              id={`${day}-startPeriod`}
              defaultValue={formatHour(hours.start).period}
            >
              {periodOptions.map((period) => (
                <option key={period} value={period}>
                  {period}
                </option>
              ))}
            </select>
          </div>
          <div>
            <span>To</span>
            <select
              name={`${day}-endHour`}
              id={`${day}-endHour`}
              defaultValue={formatHour(hours.end).hour}
            >
              {hoursOptions.map((hour) => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))}
            </select>
            <span>:</span>
            <select
              name={`${day}-endMinute`}
              id={`${day}-endMinute`}
              defaultValue={formatHour(hours.end).minute}
            >
              {minutesOptions.map((minute) => (
                <option key={minute} value={minute}>
                  {minute}
                </option>
              ))}
            </select>
            <select
              name={`${day}-endPeriod`}
              id={`${day}-endPeriod`}
              defaultValue={formatHour(hours.end).period}
            >
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
