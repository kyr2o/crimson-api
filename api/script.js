const axios = require('axios');

export default async (req, res) => {
  try {
    const { path } = req.query;
    
    if (!path) {
      return res.status(400).send('-- Missing path parameter');
    }
    
    const githubToken = process.env.GITHUB_TOKEN;
    
    if (!githubToken) {
      return res.status(500).send('-- GitHub token not configured');
    }
    
    const scriptUrl = `https://api.github.com/repos/kyr2o/Crimson-Hub/contents${path}?ref=main`;
    
    const response = await axios.get(scriptUrl, {
      headers: {
        Authorization: `token ${githubToken}`,
        Accept: 'application/vnd.github.v3.raw'
      }
    });
    
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send(response.data);
  } catch (error) {
    console.error('[API] Script error:', error.message);
    res.status(404).send('-- Script not found');
  }
};
