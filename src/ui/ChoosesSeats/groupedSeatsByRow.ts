interface GroupedSeats {
    row: number;
    columns: number[]
}



export const groupedSeatsByRow = (chooseSeats: {row: number, column: number}[]) => {
    return chooseSeats.reduce((acc: GroupedSeats[], seat) => {
        const row = seat.row;
        const rowInGroup = acc.find((seat) => seat.row === row);
        if (!rowInGroup)
          acc.push({
            row,
            columns: [seat.column],
          });
        else {
            rowInGroup.columns.push(seat.column);
        }
    
        return acc;
    }, [])
}