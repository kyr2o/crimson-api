const axios = require('axios');

export default async (req, res) => {
  try {
    const githubToken = process.env.GITHUB_TOKEN;
    
    console.log('[DEBUG] GitHub token exists:', !!githubToken);
    console.log('[DEBUG] Token length:', githubToken ? githubToken.length : 0);
    
    if (!githubToken) {
      return res.status(500).json({ error: 'GitHub token not configured' });
    }
    
    const loaderUrl = 'https://api.github.com/repos/kyr2o/Crimson-Hub/contents/loader.lua';
    
    console.log('[DEBUG] Fetching from:', loaderUrl);
    
    const response = await axios.get(loaderUrl, {
      headers: {
        'Authorization': `token ${githubToken}`,
        'Accept': 'application/vnd.github.v3.raw',
        'User-Agent': 'Crimson-Hub-API'
      }
    });
    
    console.log('[DEBUG] GitHub response status:', response.status);
    
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send(response.data);
  } catch (error) {
    console.error('[ERROR] Loader error:', error.message);
    if (error.response) {
      console.error('[ERROR] GitHub response status:', error.response.status);
      console.error('[ERROR] GitHub response data:', error.response.data);
    }
    res.status(500).send('-- Error loading script');
  }
};
