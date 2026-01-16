const axios = require('axios');

export default async (req, res) => {
  try {
    const { path } = req.query;
    
    if (!path) {
      return res.status(400).send('-- Missing path parameter');
    }
    
    const githubToken = process.env.GITHUB_TOKEN;
    
    console.log('[DEBUG] GitHub token exists:', !!githubToken);
    console.log('[DEBUG] Requesting path:', path);
    
    if (!githubToken) {
      return res.status(500).send('-- GitHub token not configured');
    }
    
    const scriptUrl = `https://api.github.com/repos/kyr2o/Crimson-Hub/contents${path}`;
    
    console.log('[DEBUG] Full URL:', scriptUrl);
    
    const response = await axios.get(scriptUrl, {
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
    console.error('[ERROR] Script error:', error.message);
    if (error.response) {
      console.error('[ERROR] GitHub status:', error.response.status);
      console.error('[ERROR] GitHub error:', error.response.data);
    }
    res.status(404).send('-- Script not found');
  }
};
