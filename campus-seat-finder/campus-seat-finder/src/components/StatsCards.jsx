export default function StatsCards({ seats, bookings, today }) {
  const count = (status) => seats.filter((s) => s.status === status).length;
  const todays = bookings.filter((b) => b.date === today).length;

  const cards = [
    { label: 'Total Seats', value: seats.length, cls: '' },
    { label: 'Available', value: count('available'), cls: 'available' },
    { label: 'Occupied', value: count('occupied'), cls: 'occupied' },
    { label: 'Reserved', value: count('reserved'), cls: 'reserved' },
    { label: "Today's Bookings", value: todays, cls: '' },
  ];

  return (
    <div className="stats">
      {cards.map((c) => (
        <div key={c.label} className={`stat ${c.cls}`}>
          <div className="stat-value">{c.value}</div>
          <div className="stat-label">{c.label}</div>
        </div>
      ))}
    </div>
  );
}
