import { FiClock } from "react-icons/fi";
import { useState } from "react";
import { useProfile } from "../../hooks/useProfile";

export function WorkingHours() {
  const { hoursData } = useProfile();

  return (
    <main className="working-hours-container">
      {hoursData && (
        <>
          <div className="wh-header">
            <h1>Working Hours</h1>
            <p>Set your business operating hours</p>
          </div>
          <div>
            {Object.entries(hoursData).map(([day, hours]) => (
              <HoursInputs key={day} day={day} hours={hours} />
            ))}
          </div>
        </>
      )}
    </main>
  );
}

function HoursInputs({ day, hours }) {
  const { handleHoursChange, resetDay, validHours } = useProfile();
  const [activeHours, setActiveHours] = useState(!!hours.start);
  const [checkedDay, setCheckedDay] = useState(!!hours.start);

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

  const formatDay = (day) => `${day.charAt(0).toUpperCase()}${day.slice(1)}`;

  const handleChange = (e) => {
    setActiveHours(!activeHours);
    setCheckedDay(!checkedDay);

    const element = e.target;
    if (!element.checked) {
      resetDay(element.name);
    }
  };

  return (
    <div
      className="day-group"
      style={{
        borderColor: validHours[day] ? "var(--transparent)" : "var(--error)",
      }}
    >
      <div>
        <input
          type="checkbox"
          name={`${day}`}
          id={`${day}`}
          checked={checkedDay}
          onChange={handleChange}
        />
        <label htmlFor={`${day}`}>{formatDay(day)}</label>
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
              onChange={handleHoursChange}
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
              onChange={handleHoursChange}
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
              onChange={handleHoursChange}
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
              onChange={handleHoursChange}
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
              onChange={handleHoursChange}
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
              onChange={handleHoursChange}
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
