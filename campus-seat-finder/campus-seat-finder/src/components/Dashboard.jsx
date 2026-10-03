import StatsCards from './StatsCards';

export default function Dashboard({ seats, bookings, today }) {
  const todays = bookings.filter((b) => b.date === today);
  return (
    <div>
      <h2>Dashboard</h2>
      <StatsCards seats={seats} bookings={bookings} today={today} />
      <div className="card">
        <h3>Today's Bookings</h3>
        {todays.length === 0 ? (
          <p className="empty">Aaj koi booking nahi hai.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Seat</th>
                <th>Student</th>
                <th>Roll No</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {todays.map((b) => (
                <tr key={b.id}>
                  <td>{b.seatId}</td>
                  <td>{b.studentName}</td>
                  <td>{b.rollNo}</td>
                  <td>{b.time || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
