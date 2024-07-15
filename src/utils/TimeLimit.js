export const TimeLimit = (startDate, endDate) => {
    const startDa = new Date(startDate);
    const endDa = new Date(endDate);
    const timeDifferenceInMilliseconds = endDa - startDa;

    // Convert milliseconds to hours, minutes, and seconds
    const hours = Math.floor(timeDifferenceInMilliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifferenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifferenceInMilliseconds % (1000 * 60)) / 1000);

    // console.log(`${hours} hours, ${minutes} minutes, ${seconds} seconds`);

    return (`${hours} hours, ${minutes} minutes, ${seconds} seconds`)

}