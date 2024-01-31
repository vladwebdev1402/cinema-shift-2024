export const formateDate = (date: string): Date => {
    const [day, month, year] = date.split('.');
    return new Date(2000 + +year, +month - 1, +day);
    
}