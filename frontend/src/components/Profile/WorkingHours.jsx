import { FiClock } from "react-icons/fi";
import { workingHoursMock } from "../../utils/main";
import { useState } from "react";
import { useProfile } from "../../hooks/useProfile";
import toast from "react-hot-toast";

export function WorkingHours() {
  const { hoursData, hoursIsSet, updateUser, error } = useProfile();

  const getHours = () => {
    return hoursIsSet ? hoursData : workingHoursMock;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const inputs = [...e.target.elements].filter(
      (input) => input.tagName === "SELECT"
    );

    const reducedValues = inputs.reduce((object, input) => {
      const day = input.name.split("-")[0];
      const hours = Object.hasOwn(object, day)
        ? [...object[day], input.value]
        : [input.value];

      return { ...object, [day]: hours };
    }, {});

    const formattedValues = Object.entries(reducedValues).map(
      ([day, values]) => {
        const startHour = values.slice(0, 3);
        const endHour = values.slice(3, 6);

        const formatTo24 = ([hour, minute, period]) => {
          const hour24 = period === "AM" ? hour : Number(hour) + 12;
          return `${hour24}:${minute}`;
        };

        const hours = {
          start: formatTo24(startHour),
          end: formatTo24(endHour),
        };
        return [day, hours];
      }
    );

    const hoursObject = Object.fromEntries(formattedValues);

    const { success } = await updateUser({
      workingHours: { ...workingHoursMock, ...hoursObject },
    });

    if (success) {
      toast.success("Profile updated successfully");
    } else {
      toast.error(error);
    }
  };

  return (
    <main className="working-hours-container">
      {hoursData && (
        <form onSubmit={handleSubmit}>
          <div className="wh-header">
            <h1>Working Hours</h1>
            <p>Set your business operating hours</p>
          </div>
          <div>
            {Object.entries(getHours()).map(([day, hours]) => (
              <HoursInputs key={day} day={day} hours={hours} />
            ))}
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
