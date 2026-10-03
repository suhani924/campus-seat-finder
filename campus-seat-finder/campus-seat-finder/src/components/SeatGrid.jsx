import SeatCard from './SeatCard';

export default function SeatGrid({ seats, selectedId, onSelect }) {
  if (seats.length === 0) {
    return <p className="empty">Is filter me koi seat nahi mili.</p>;
  }
  return (
    <div>
      <div className="legend">
        <span className="dot available" /> Available
        <span className="dot occupied" /> Occupied
        <span className="dot reserved" /> Reserved
      </div>
      <div className="seat-grid">
        {seats.map((seat) => (
          <SeatCard
            key={seat.id}
            seat={seat}
            selected={seat.id === selectedId}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}
