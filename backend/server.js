const express = require('express');
const multer = require('multer');
const cors = require('cors');
const csv = require('csvtojson');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;

app.use(cors());

const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), async (req, res) => {
  const filePath = path.join(__dirname, req.file.path);
  try {
    const jsonArray = await csv().fromFile(filePath);
    fs.unlinkSync(filePath); // remove file after processing
    res.json({ data: jsonArray });
  } catch (error) {
    res.status(500).json({ error: 'CSV parsing failed.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

