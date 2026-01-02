# GitHub Actions YouTube Data Fetcher

## Setup Instructions

### 1. Get Your Channel ID
- Visit [YouTube Studio](https://studio.youtube.com)
- Go to Settings → Channel → Basic Info
- Copy your Channel ID

### 2. Update the Script
Edit [.github/scripts/fetch-youtube-data.js](.github/scripts/fetch-youtube-data.js) and replace:
```javascript
const CHANNEL_ID = 'YOUR_CHANNEL_ID_HERE';
```
with your actual Channel ID.

### 3. Add GitHub Secret
1. Go to your repository on GitHub
2. Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Name: `GOOGLE_API_SECRET`
5. Value: Paste the entire contents of your `client_secret_*.json` file

### 4. Enable GitHub Actions
1. Go to repository Settings → Actions → General
2. Ensure "Allow all actions and reusable workflows" is selected

## What It Does

The workflow:
- ⏰ Runs automatically every 6 hours (configurable via cron expression)
- 📊 Fetches your YouTube channel statistics
- ✨ Extracts "The Gold":
  - `subscriberCount` - Your social proof number
  - `viewCount` - Total reach
  - `thumbnailUrl` - Channel thumbnail
- 💾 Stores historical data in `src/data/youtube-metrics.json` (keeps last 30 data points)
- 🔄 Automatically commits and pushes data to your repo

## Manual Trigger

To run the workflow manually:
1. Go to GitHub → Actions → "Fetch YouTube Channel Data"
2. Click "Run workflow"

## Viewing Results

After the workflow runs:
1. Check `src/data/youtube-metrics.json` for the collected data
2. View workflow logs in GitHub Actions for detailed output

## Customization

### Change Schedule
Edit the cron expression in [.github/workflows/youtube-fetch.yml](.github/workflows/youtube-fetch.yml):
```yaml
- cron: '0 */6 * * *'  # Every 6 hours
```

Common patterns:
- `0 * * * *` - Every hour
- `0 0 * * *` - Daily at midnight
- `0 0 * * 0` - Weekly (Sunday)

### Modify Data Retention
In the script, change this line:
```javascript
if (existingData.length > 30) {
  existingData = existingData.slice(-30);
}
```

## Troubleshooting

**Authentication fails?**
- Verify your API key is valid
- Check the secret is properly set in GitHub Settings

**No data file created?**
- Ensure git push credentials are configured
- Check workflow logs for errors

**Rate limiting?**
- YouTube API has quotas; adjust frequency if needed
