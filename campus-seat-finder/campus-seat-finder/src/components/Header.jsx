export default function Header({ area, onAreaChange, student }) {
  const date = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  return (
    <header className="header">
      <select value={area} onChange={(e) => onAreaChange(e.target.value)}>
        <option value="All">All Areas</option>
        <option value="Main Library">Main Library</option>
        <option value="Computer Lab">Computer Lab</option>
      </select>
      <span className="date">{date}</span>
      <span className="profile">
        {student.name} ({student.rollNo})
      </span>
    </header>
  );
}
