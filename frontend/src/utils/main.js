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
  { code: null, name: "Select", emoji: "", phoneCode: "" },
  { code: "US", name: "United States", emoji: "🇺🇸", phoneCode: "+1" },
  { code: "CA", name: "Canada", emoji: "🇨🇦", phoneCode: "+1" },
  { code: "MX", name: "Mexico", emoji: "🇲🇽", phoneCode: "+52" },
  { code: "GT", name: "Guatemala", emoji: "🇬🇹", phoneCode: "+502" },
  { code: "HN", name: "Honduras", emoji: "🇭🇳", phoneCode: "+504" },
  { code: "CR", name: "Costa Rica", emoji: "🇨🇷", phoneCode: "+506" },
  { code: "PA", name: "Panama", emoji: "🇵🇦", phoneCode: "+507" },
  { code: "BR", name: "Brazil", emoji: "🇧🇷", phoneCode: "+55" },
  { code: "AR", name: "Argentina", emoji: "🇦🇷", phoneCode: "+54" },
  { code: "CO", name: "Colombia", emoji: "🇨🇴", phoneCode: "+57" },
  { code: "CL", name: "Chile", emoji: "🇨🇱", phoneCode: "+56" },
  { code: "PE", name: "Peru", emoji: "🇵🇪", phoneCode: "+51" },
  { code: "VE", name: "Venezuela", emoji: "🇻🇪", phoneCode: "+58" },
  { code: "BO", name: "Bolivia", emoji: "🇧🇴", phoneCode: "+591" },
  { code: "PY", name: "Paraguay", emoji: "🇵🇾", phoneCode: "+595" },
  { code: "UY", name: "Uruguay", emoji: "🇺🇾", phoneCode: "+598" },
  { code: "EC", name: "Ecuador", emoji: "🇪🇨", phoneCode: "+593" },
];
