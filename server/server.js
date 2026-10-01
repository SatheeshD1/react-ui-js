const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // Install this package if needed for development
const app = express();
const port = 3001; // Choose a different port from your React app (e.g., 3000)

// Middleware to parse XML
app.use(bodyParser.text({ type: 'application/xml' }));

// Enable CORS for development
// This allows your React app on localhost:3000 to make requests to this server on localhost:3001
app.use(cors());

// The API endpoint to save the XML file
app.post('/api/save-xml', (req, res) => {
  let {xmlData,xmlPath} = JSON.parse(req.body);
  // const xmlPath = req.body.xmlPath;
  const userInput = xmlPath;

  // Define the target directory
  // const targetDir = 'D:\\SatheeshD\\NewsDesk\\VIZRT';
  const target = xmlPath.split("\\");
  let fileName = xmlPath.includes(".xml") ? `${target[target.length-1]}`  :'\TestReader.xml';
  const filePath = xmlPath.includes(".xml") ? xmlPath.replace(`\\${fileName}`,"") : xmlPath;
  // const safeFileName = path.basename(userInput).trim();
  const safeFileName = fileName.trim();
  const savePath = path.join(filePath,safeFileName);

  console.log(`sats ${filePath}||${safeFileName}`);

  // Check if the directory exists, and create it if it doesn't
  fs.mkdir(xmlPath, { recursive: true }, (err) => {
    if (err) {
      console.error('Failed to create directory:', err);
      return res.status(500).send('Error creating directory on server.');
    }

    // Write the XML data to the specified file path
    fs.writeFile(savePath, xmlData, (err) => {
      if (err) {
        console.error('Failed to save file on server:', err);
        return res.status(500).send('Error saving file.');
      }
      console.log(`File saved to ${savePath}`);
      res.status(200).send('File saved successfully.');
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
