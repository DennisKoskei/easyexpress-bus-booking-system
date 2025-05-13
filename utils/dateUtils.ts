// Format Date and Time

//** FORMAT DATE **//
export const formatDate = (dateString: string | Date | null): string => {
  if (!dateString) {
    return "";
  }

  const date =
    typeof dateString === "string" ? new Date(dateString) : dateString;

  const weekday = date.toLocaleDateString("en-US", { weekday: "long" }); // Get weekday
  const month = date.toLocaleDateString("en-US", { month: "2-digit" }); // Get 2-digit month
  const year = date.toLocaleDateString("en-US", { year: "numeric" }); // Get year

  return `${weekday} ${month}-${year}`;
};

//** FORMAT TIME **//
export const formatTime = (timeString: string | null | undefined): string => {
  if (!timeString) {
    return "";
  }

  // Regular expression to match HH:MM AM/PM or HH:MM am/pm
  const timeRegex = /^(\d{1,2}):(\d{2})\s*([AP]M?|[ap]m?)?$/;
  const match = timeString.match(timeRegex);

  if (!match) {
    return "Invalid Time"; // Handle invalid format
  }

  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const period = match[3]?.toUpperCase() || ""; // AM or PM (case-insensitive)

  if (isNaN(hours) || isNaN(minutes) || minutes < 0 || minutes > 59) {
    return "Invalid Time";
  }

  if (period === "PM" && hours !== 12) {
    hours += 12; // Convert PM to 24-hour format (except for 12 PM)
  } else if (period === "AM" && hours === 12) {
    hours = 0; // Convert 12 AM to 0 (midnight)
  }

  const formattedHours = hours % 12 || 12; // 12-hour format
  const formattedPeriod = hours < 12 || hours === 24 ? "AM" : "PM";

  return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${formattedPeriod}`;
};

//** PARSE DATETIME **//
export const parseDateTime = (dateStr: string, timeStr: string): Date => {
  const fallback = new Date(dateStr); // fallback to just the date

  if (!timeStr || typeof timeStr !== "string") return fallback;

  const [time, modifier] = timeStr.split(" ");
  if (!time || !modifier || !["AM", "PM"].includes(modifier)) return fallback;

  const [hourStr, minuteStr] = time.split(":");
  const hours = parseInt(hourStr, 10);
  const minutes = parseInt(minuteStr, 10);

  if (
    isNaN(hours) ||
    isNaN(minutes) ||
    hours < 0 ||
    hours > 12 ||
    minutes < 0 ||
    minutes > 59
  ) {
    return fallback;
  }

  let adjustedHours = hours;
  if (modifier === "PM" && hours < 12) adjustedHours += 12;
  if (modifier === "AM" && hours === 12) adjustedHours = 0;

  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return new Date(); // fallback if dateStr is invalid

  date.setHours(adjustedHours, minutes, 0, 0);
  return date;
};
