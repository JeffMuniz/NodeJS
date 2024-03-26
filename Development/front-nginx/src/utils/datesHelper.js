import DateManager from "src/modules/DateManager/DateManager";
import { dateHourFormats } from "@enums";

export const formatDatesToRange = (startDate, endDate, distanceDays) => {
  const startsAt = startDate
    ? startDate.startOf("day").format(dateHourFormats.fullDateHour)
    : DateManager()
        .startOf("day")
        .add(-distanceDays, "d")
        .format(dateHourFormats.fullDateHour);
  const endsAt = endDate
    ? endDate.endOf("day").format(dateHourFormats.fullDateHour)
    : DateManager()
        .endOf("day")
        .format(dateHourFormats.fullDateHour);

  return { startsAt, endsAt };
};

export const formatDate = dateFromDB =>
  dateFromDB
    ? DateManager(dateFromDB)
        .startOf("day")
        .format(dateHourFormats.longDateSlash)
    : "-";

export default formatDatesToRange;
