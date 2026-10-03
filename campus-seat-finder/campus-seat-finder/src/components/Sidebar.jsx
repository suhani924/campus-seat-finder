const items = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'seats', label: 'Seat Layout' },
  { key: 'bookings', label: 'My Bookings' },
  { key: 'settings', label: 'Settings' },
];

export default function Sidebar({ page, onChange }) {
  return (
    <aside className="sidebar">
      <h1>Seat Finder</h1>
      <nav>
        {items.map((i) => (
          <button
            key={i.key}
            className={page === i.key ? 'nav active' : 'nav'}
            onClick={() => onChange(i.key)}
          >
            {i.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
