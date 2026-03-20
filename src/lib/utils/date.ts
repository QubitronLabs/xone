import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";

dayjs.extend(relativeTime);
dayjs.extend(utc);

export { dayjs };

export function formatDate(
	date: string | Date,
	format = "MMM D, YYYY",
): string {
	return dayjs(date).format(format);
}

export function formatDateTime(date: string | Date): string {
	return dayjs(date).format("MMM D, YYYY h:mm A");
}

export function timeAgo(date: string | Date): string {
	return dayjs(date).fromNow();
}

export function toUTC(date: string | Date): string {
	return dayjs(date).utc().toISOString();
}
