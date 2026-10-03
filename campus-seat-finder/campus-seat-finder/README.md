# Campus Seat Finder

React + JSON Server seat booking app.

## Run

```
npm install
```

Terminal 1 (API):
```
npm run server
```

Terminal 2 (React app):
```
npm start
```

- App: http://localhost:3000
- API: http://localhost:5000 (/seats, /bookings)

## Features
- Dashboard cards (counts derived from seats + bookings)
- Seat grid A1-D10 with All / Available / Occupied / Reserved filter
- Seat details, booking form (POST booking + PATCH seat to reserved)
- Cancel booking (DELETE booking + PATCH seat to available)
- My Bookings (for the student set in Settings)
- Area selector: All Areas / Main Library / Computer Lab
- Loading, empty and API-error states

Default student: Rahul Shah (RW001). Change it in Settings.
