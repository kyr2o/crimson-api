# Crimson Hub API

Serverless API for hosting Crimson Hub scripts with private GitHub repository support.

## Deployment

Deploy to Vercel:

```
vercel
```

## Environment Variables

- `GITHUB_TOKEN` - Personal access token with `repo` scope for private repository access

## Endpoints

- `GET /api/loader` - Returns loader.lua from private GitHub repo
- `GET /api/script?path=/168556275/main.lua` - Returns any script from private GitHub repo

## Usage

```lua
loadstring(game:HttpGet("https://YOUR_VERCEL_URL/api/loader"))()
```
