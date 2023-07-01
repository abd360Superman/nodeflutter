const express = require('express');
const interrail = require('interrail')

const app = express();
const port = 3000;

// Middleware to parse JSON data
app.use(express.json());

// API endpoint to receive data
app.post('/api/data', async (req, res) => {
  try {
    // Assuming the incoming data is in JSON format
    const incomingData = req.body;

    // Process the data using the Node Interrail module
    const processedData = await processInterrailData(incomingData);

    // Send the processed data back as the response
    res.json(processedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Function to process Interrail data
async function processInterrailData(data) {
  const station = await interrail.stations.search(data['data'], {results: 1})

  // Return the processed data
  return {
    id: station[0]["id"],
    name: station[0]["name"],
    location: [station[0]["location"]["longitude"], station[0]["location"]["latitude"]]
  };
}

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});