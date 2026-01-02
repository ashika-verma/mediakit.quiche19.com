const axios = require('axios');
const fs = require('fs');
const path = require('path');

async function fetchYouTubeData() {
  try {
    // Parse the Google API secret from GitHub Secrets
    const secretJson = process.env.GOOGLE_API_SECRET;
    
    if (!secretJson) {
      throw new Error('GOOGLE_API_SECRET environment variable not set');
    }

    const secretData = JSON.parse(secretJson);
    const API_KEY = secretData.api_key || secretData.installed?.client_id;
    
    if (!API_KEY) {
      throw new Error('API key not found in secret');
    }

    // Replace with your channel ID
    const CHANNEL_ID = 'UCJ_Vbgoe1Px6s-jL9Sn57yA';
    
    // YouTube Data API v3 endpoint
    const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=${CHANNEL_ID}&key=${API_KEY}`;
    
    console.log('Fetching YouTube channel data...');
    const response = await axios.get(url);
    
    if (!response.data.items || response.data.items.length === 0) {
      throw new Error('No channel data found');
    }

    // Extract the "Gold" - the specific fields
    const channelData = response.data.items[0];
    const goldData = {
      timestamp: new Date().toISOString(),
      subscriberCount: channelData.statistics.subscriberCount,
      viewCount: channelData.statistics.viewCount,
      thumbnailUrl: channelData.snippet.thumbnails.high.url,
      channelTitle: channelData.snippet.title,
    };

    console.log('✨ The Gold Data:');
    console.log(JSON.stringify(goldData, null, 2));

    // Store the data in a JSON file for tracking
    const dataDir = path.join(process.cwd(), 'src', 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const dataFile = path.join(dataDir, 'youtube-metrics.json');
    let existingData = [];
    
    if (fs.existsSync(dataFile)) {
      existingData = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
    }

    // Keep last 30 data points
    existingData.push(goldData);
    if (existingData.length > 30) {
      existingData = existingData.slice(-30);
    }

    fs.writeFileSync(dataFile, JSON.stringify(existingData, null, 2));
    console.log(`\n✅ Data saved to ${dataFile}`);

  } catch (error) {
    console.error('❌ Error fetching YouTube data:', error.message);
    process.exit(1);
  }
}

fetchYouTubeData();
