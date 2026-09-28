
const express = require('express');
const app = express();

app.get('/api/:date?', (req, res) => {
  const dateParam = req.params.date;
  let date;

  if (dateParam === undefined || dateParam === '') {
    date = new Date();
  } else if (/^-?\d+$/.test(dateParam)) {
    date = new Date(Number(dateParam));
  } else {
    date = new Date(dateParam);
  }

  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  return res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});