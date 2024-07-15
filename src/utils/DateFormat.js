
const DateFormat = (date) => {
    // Assuming createdAt is the date string fetched from the database
    const createdAtFromDB = date; // Replace this with the date from your database

    // Convert the fetched string to a JavaScript Date object
    const dateObject = new Date(createdAtFromDB);

    // Format the date using JavaScript's built-in methods
    const formattedDate = `${dateObject.getFullYear()}-${(dateObject.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${dateObject.getDate().toString().padStart(2, '0')}`;

    return (formattedDate)
}

export default DateFormat