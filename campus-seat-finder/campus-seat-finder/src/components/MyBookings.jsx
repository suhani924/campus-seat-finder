export default function MyBookings({ bookings, busy, onCancel }) {
  const active = bookings.filter((b) => b.status === 'active');
  return (
    <div className="card">
      <h2>My Bookings</h2>
      {active.length === 0 ? (
        <p className="empty">Aapki koi active booking nahi hai.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Seat</th>
              <th>Date</th>
              <th>Time</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {active.map((b) => (
              <tr key={b.id}>
                <td>{b.seatId}</td>
                <td>{b.date}</td>
                <td>{b.time || '-'}</td>
                <td>
                  <button className="danger" disabled={busy} onClick={() => onCancel(b)}>
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
