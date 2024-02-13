export const formateDate = (date: string, time?: string): Date => {
    const [day, month, year] = date.split('.');
    const [hours, minute] = time?.split(":") || ['00', '00']
    return new Date(2000 + +year, +month - 1, +day, +hours, +minute);
}