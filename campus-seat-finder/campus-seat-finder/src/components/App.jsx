import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import Header from './Header';
import Dashboard from './Dashboard';
import SeatGrid from './SeatGrid';
import SeatDetails from './SeatDetails';
import MyBookings from './MyBookings';

const API = 'http://localhost:5000';
const todayStr = () => new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD

const loadStudent = () => {
  try {
    const saved = JSON.parse(localStorage.getItem('student'));
    if (saved && saved.name && saved.rollNo) return saved;
  } catch (e) {}
  return { name: 'Rahul Shah', rollNo: 'RW001' };
};

export default function App() {
  const [page, setPage] = useState('dashboard');
  const [seats, setSeats] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [area, setArea] = useState('All');
  const [filter, setFilter] = useState('all');
  const [selectedId, setSelectedId] = useState(null);
  const [student, setStudent] = useState(loadStudent);
  const [busy, setBusy] = useState(false);

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      const [s, b] = await Promise.all([
        axios.get(`${API}/seats`),
        axios.get(`${API}/bookings`),
      ]);
      setSeats(s.data);
      setBookings(b.data);
    } catch (e) {
      setError('Server se data load nahi hua. Check karo ki JSON Server port 5000 par chal raha hai.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const flash = (msg) => {
    setNotice(msg);
    setTimeout(() => setNotice(''), 3000);
  };

  // seats / bookings of the selected campus area
  const areaSeats = seats.filter((s) => area === 'All' || s.location === area);
  const areaSeatIds = areaSeats.map((s) => s.seatId);
  const areaBookings = bookings.filter((b) => areaSeatIds.includes(b.seatId));

  const visibleSeats = areaSeats.filter((s) => filter === 'all' || s.status === filter);
  const selectedSeat = seats.find((s) => s.id === selectedId) || null;
  const selectedBooking = selectedSeat
    ? bookings.find((b) => b.seatId === selectedSeat.seatId && b.status === 'active')
    : null;

  const bookSeat = async (seat, form) => {
    if (seat.status !== 'available') return; // only available seats can be booked
    setBusy(true);
    try {
      const res = await axios.post(`${API}/bookings`, {
        seatId: seat.seatId,
        studentName: form.studentName,
        rollNo: form.rollNo,
        date: todayStr(),
        time: form.time || '',
        status: 'active',
      });
      await axios.patch(`${API}/seats/${seat.id}`, { status: 'reserved' });
      setBookings((prev) => [...prev, res.data]);
      setSeats((prev) => prev.map((s) => (s.id === seat.id ? { ...s, status: 'reserved' } : s)));
      flash(`Seat ${seat.seatId} book ho gayi.`);
    } catch (e) {
      flash('Booking fail ho gayi. Dobara try karo.');
    } finally {
      setBusy(false);
    }
  };

  const cancelBooking = async (booking) => {
    const seat = seats.find((s) => s.seatId === booking.seatId);
    setBusy(true);
    try {
      await axios.delete(`${API}/bookings/${booking.id}`);
      if (seat) {
        await axios.patch(`${API}/seats/${seat.id}`, { status: 'available' });
        setSeats((prev) => prev.map((s) => (s.id === seat.id ? { ...s, status: 'available' } : s)));
      }
      setBookings((prev) => prev.filter((b) => b.id !== booking.id));
      flash(`Booking cancel ho gayi (${booking.seatId}).`);
    } catch (e) {
      flash('Cancel fail ho gaya. Dobara try karo.');
    } finally {
      setBusy(false);
    }
  };

  const saveStudent = (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    const s = { name: f.get('name').trim(), rollNo: f.get('rollNo').trim() };
    if (!s.name || !s.rollNo) return;
    setStudent(s);
    localStorage.setItem('student', JSON.stringify(s));
    flash('Profile save ho gaya.');
  };

  const myBookings = bookings.filter((b) => b.rollNo === student.rollNo);

  let content;
  if (loading) {
    content = <p className="state">Loading...</p>;
  } else if (error) {
    content = (
      <div className="state error">
        <p>{error}</p>
        <button onClick={loadData}>Retry</button>
      </div>
    );
  } else if (page === 'dashboard') {
    content = (
      <Dashboard seats={areaSeats} bookings={areaBookings} today={todayStr()} />
    );
  } else if (page === 'seats') {
    content = (
      <div className="seat-page">
        <div className="seat-main">
          <div className="filters">
            {['all', 'available', 'occupied', 'reserved'].map((f) => (
              <button
                key={f}
                className={filter === f ? 'filter active' : 'filter'}
                onClick={() => setFilter(f)}
              >
                {f[0].toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          <SeatGrid seats={visibleSeats} selectedId={selectedId} onSelect={setSelectedId} />
        </div>
        <SeatDetails
          seat={selectedSeat}
          booking={selectedBooking}
          student={student}
          busy={busy}
          onBook={bookSeat}
          onCancel={cancelBooking}
          onClose={() => setSelectedId(null)}
        />
      </div>
    );
  } else if (page === 'bookings') {
    content = <MyBookings bookings={myBookings} busy={busy} onCancel={cancelBooking} />;
  } else {
    content = (
      <div className="card">
        <h2>Settings</h2>
        <form className="form" onSubmit={saveStudent}>
          <label>
            Student name
            <input name="name" defaultValue={student.name} required />
          </label>
          <label>
            Roll number
            <input name="rollNo" defaultValue={student.rollNo} required />
          </label>
          <button type="submit">Save</button>
        </form>
      </div>
    );
  }

  return (
    <div className="layout">
      <Sidebar page={page} onChange={setPage} />
      <div className="main">
        <Header area={area} onAreaChange={setArea} student={student} />
        {notice && <div className="notice">{notice}</div>}
        <div className="content">{content}</div>
      </div>
    </div>
  );
}
