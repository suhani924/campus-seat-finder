import BookingForm from './BookingForm';

export default function SeatDetails({ seat, booking, student, busy, onBook, onCancel, onClose }) {
  if (!seat) {
    return (
      <aside className="card details">
        <p className="empty">Details dekhne ke liye koi seat select karo.</p>
      </aside>
    );
  }

  const isMine = booking && booking.rollNo === student.rollNo;

  return (
    <aside className="card details">
      <div className="details-top">
        <h3>Seat {seat.seatId}</h3>
        <button className="link" onClick={onClose}>Close</button>
      </div>
      <p>Location: {seat.location}</p>
      <p>Type: {seat.type}</p>
      <p>
        Status: <span className={`badge ${seat.status}`}>{seat.status}</span>
      </p>

      {booking && (
        <div className="booking-info">
          <p>Booked by: {booking.studentName} ({booking.rollNo})</p>
          <p>Date: {booking.date}{booking.time ? ` at ${booking.time}` : ''}</p>
        </div>
      )}

      {seat.status === 'available' && (
        <BookingForm key={seat.id} student={student} busy={busy} onSubmit={(f) => onBook(seat, f)} />
      )}

      {seat.status === 'reserved' && booking && (
        isMine ? (
          <button className="danger" disabled={busy} onClick={() => onCancel(booking)}>
            Cancel my booking
          </button>
        ) : (
          <p className="empty">Ye seat kisi aur ne reserve ki hai.</p>
        )
      )}

      {seat.status === 'occupied' && <p className="empty">Ye seat abhi occupied hai.</p>}
    </aside>
  );
}
