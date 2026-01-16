export default async (req, res) => {
  try {
    const githubToken = process.env.GITHUB_TOKEN;
    
    if (!githubToken) {
      return res.status(500).send('ERROR: GitHub token not configured');
    }
    
    const response = await fetch('https://api.github.com/repos/kyr2o/Crimson-Hub/contents/loader.lua', {
      headers: {
        'Authorization': `token ${githubToken}`,
        'Accept': 'application/vnd.github.v3.raw'
      }
    });
    
    if (!response.ok) {
      return res.status(response.status).send(`-- GitHub API error: ${response.status}`);
    }
    
    const data = await response.text();
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send(data);
  } catch (error) {
    console.error('Loader error:', error.message);
    res.status(500).send('-- Error loading script');
  }
};
