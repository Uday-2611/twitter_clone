import { differenceInMinutes, differenceInHours, differenceInDays } from 'date-fns';

// format a numer to shorter format -> 1000 to 1K.
export const formatNumber = (num: number): string => {
    if (num >= 1000) return Math.floor(num / 1000) + 'K';
    return num.toString();
};

// format a date to a short relative format (e.g. 2m, 1h, 3d) -> 
export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();

    const minutes = differenceInMinutes(now, date);
    const hours = differenceInHours(now, date);
    const days = differenceInDays(now, date);

    if (minutes < 1) return 'now';
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    if (days < 7) return `${days}d`;

    return `${Math.floor(days / 7)}w`;

}