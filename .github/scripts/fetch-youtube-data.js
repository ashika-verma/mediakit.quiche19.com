import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
import dotenv from 'dotenv';
dotenv.config({ path: path.join(__dirname, '../../.env') });

async function fetchYouTubeData() {
  try {
    // Get the YouTube API key from environment
    const API_KEY = process.env.YOUTUBE_API_KEY;
    console.log('Using YouTube API Key:', API_KEY );
    
    if (!API_KEY) {
      throw new Error('YOUTUBE_API_KEY not found in .env or environment');
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
    const dataDir = path.join(__dirname, '../../src', 'data');
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
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', JSON.stringify(error.response.data, null, 2));
    }
    process.exit(1);
  }
}

fetchYouTubeData();
