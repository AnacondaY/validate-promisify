export const isEmptyObject = (obj: Object): Boolean => {
    for(const key in obj){
        return false;
    }
    return true;
};

export const parseDate = (date: Date): Object => {
    return {
        date: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
        week: date.getDay(),
        time: date.getTime()
    }
}