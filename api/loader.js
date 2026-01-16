const axios = require('axios');

export default async (req, res) => {
  try {
    const githubToken = process.env.GITHUB_TOKEN;
    
    if (!githubToken) {
      return res.status(500).send('-- GitHub token not configured');
    }
    
    const loaderUrl = 'https://api.github.com/repos/kyr2o/Crimson-Hub/contents/loader.lua?ref=main';
    
    const response = await axios.get(loaderUrl, {
      headers: {
        Authorization: `token ${githubToken}`,
        Accept: 'application/vnd.github.v3.raw'
      }
    });
    
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send(response.data);
  } catch (error) {
    console.error('[API] Loader error:', error.message);
    res.status(500).send('-- Error loading script');
  }
};
