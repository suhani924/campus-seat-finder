import { useState } from 'react';

export default function BookingForm({ student, busy, onSubmit }) {
  const [studentName, setStudentName] = useState(student.name);
  const [rollNo, setRollNo] = useState(student.rollNo);
  const [time, setTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!studentName.trim() || !rollNo.trim()) return;
    onSubmit({ studentName: studentName.trim(), rollNo: rollNo.trim(), time });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label>
        Student name
        <input value={studentName} onChange={(e) => setStudentName(e.target.value)} required />
      </label>
      <label>
        Roll number
        <input value={rollNo} onChange={(e) => setRollNo(e.target.value)} required />
      </label>
      <label>
        Booking time (optional)
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
      </label>
      <button type="submit" disabled={busy}>
        {busy ? 'Booking...' : 'Book this seat'}
      </button>
    </form>
  );
}
