import {
    isBefore,
    getDay,
    setHours,
    setMinutes,
    roundToNearestMinutes,
    format,
} from "date-fns";

// Returns true if valid date range
export const validateDateRange = (startDate, endDate) => {
    if (isBefore(endDate, startDate)) {
        return false;
    }
    return true;
};

export const isNotSunday = (date) => {
    const day = getDay(date);
    return day !== 0;
};

export const getIncludedTimes = (interval, startHour, endHour) => {
    const defaultDate = new Date();
    const includedTimes = [];

    for (let i = startHour; i <= endHour; i++) {
        includedTimes.push(setHours(setMinutes(defaultDate, 0), i));

        if (i < endHour) {
            for (let j = 0; j <= 60; j += interval) {
                includedTimes.push(setHours(setMinutes(defaultDate, j), i));
            }
        }
    }

    return includedTimes;
};

export const getDefaultDate = (interval) => {
    const defaultDate = new Date();
    const roundedDate = roundToNearestMinutes(defaultDate, {
        nearestTo: interval,
    });

    return roundedDate;
};

export const formatDate = (date) => {
    return format(new Date(date), "PPpp");
};
