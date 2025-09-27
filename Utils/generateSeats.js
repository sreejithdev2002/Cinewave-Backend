function generateSeats(rows = 12, seatsPerRow = 20) {
  const seatLayout = [];

  for (let i = 0; i < rows; i++) {
    const rowLetter = String.fromCharCode(65 + i);
    for (let j = 1; j <= seatsPerRow; j++) {
      seatLayout.push({
        seatNumber: `${rowLetter}${j}`,
        isBooked: false,
      });
    }
  }
  return seatLayout;
}

module.exports = generateSeats;