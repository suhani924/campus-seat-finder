export default function SeatCard({ seat, selected, onSelect }) {
  return (
    <button
      className={`seat ${seat.status}${selected ? ' selected' : ''}`}
      onClick={() => onSelect(seat.id)}
      title={`${seat.seatId} - ${seat.status}`}
    >
      {seat.seatId}
    </button>
  );
}
