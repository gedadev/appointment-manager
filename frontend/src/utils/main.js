export const TimeZones = [
  "UTC",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "America/Phoenix",
  "America/Toronto",
  "America/Mexico_City",
  "America/Sao_Paulo",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Europe/Madrid",
  "Europe/Rome",
  "Europe/Athens",
  "Europe/Moscow",
  "Asia/Dubai",
  "Asia/Kolkata",
  "Asia/Bangkok",
  "Asia/Hong_Kong",
  "Asia/Tokyo",
  "Asia/Seoul",
  "Asia/Singapore",
  "Australia/Sydney",
  "Australia/Melbourne",
  "Pacific/Auckland",
  "Africa/Johannesburg",
  "Africa/Cairo",
  "America/Bogota",
  "Asia/Shanghai",
];

export const getTimeZoneLabel = (tz) => {
  const now = new Date();
  const offset = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    timeZoneName: "short",
  })
    .formatToParts(now)
    .find((part) => part.type === "timeZoneName").value;

  return `${tz.replace("_", " ")} (${offset})`;
};

export const workingHoursMock = {
  monday: { start: null, end: null },
  tuesday: { start: null, end: null },
  wednesday: { start: null, end: null },
  thursday: { start: null, end: null },
  friday: { start: null, end: null },
  saturday: { start: null, end: null },
  sunday: { start: null, end: null },
};

export const countries = [
  { code: null, name: "Select", emoji: "🏴" },
  { code: "US", name: "United States", emoji: "🇺🇸" },
  { code: "CA", name: "Canada", emoji: "🇨🇦" },
  { code: "MX", name: "Mexico", emoji: "🇲🇽" },
  { code: "GT", name: "Guatemala", emoji: "🇬🇹" },
  { code: "HN", name: "Honduras", emoji: "🇭🇳" },
  { code: "CR", name: "Costa Rica", emoji: "🇨🇷" },
  { code: "PA", name: "Panama", emoji: "🇵🇦" },
  { code: "BR", name: "Brazil", emoji: "🇧🇷" },
  { code: "AR", name: "Argentina", emoji: "🇦🇷" },
  { code: "CO", name: "Colombia", emoji: "🇨🇴" },
  { code: "CL", name: "Chile", emoji: "🇨🇱" },
  { code: "PE", name: "Peru", emoji: "🇵🇪" },
  { code: "VE", name: "Venezuela", emoji: "🇻🇪" },
  { code: "BO", name: "Bolivia", emoji: "🇧🇴" },
  { code: "PY", name: "Paraguay", emoji: "🇵🇾" },
  { code: "UY", name: "Uruguay", emoji: "🇺🇾" },
  { code: "EC", name: "Ecuador", emoji: "🇪🇨" },
];
