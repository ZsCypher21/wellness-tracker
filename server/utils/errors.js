// Turns database errors into sensible HTTP responses.
// Postgres error codes starting with "22" are bad input (e.g. "abc" for a number,
// an invalid date), so they become 400s instead of 500s.
function sendDbError(res, err) {
  if (err && typeof err.code === 'string' && err.code.startsWith('22')) {
    return res.status(400).json({ message: "Invalid value in request" });
  }
  if (err && err.code === '23502') {
    return res.status(400).json({ message: "A required field is missing" });
  }
  return res.status(500).json({ message: "Server error" });
}

module.exports = { sendDbError };
