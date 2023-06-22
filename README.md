## Your personal changelog

A dead simple cloudflare worker that acts as a changelog for your life.

### Usage

1. Fork this repo
2. Generate a `wrangler.toml`
3. Authorization: To add a new entry, you need to be authorized. To do so, you need to set the `PASS` environment variable in your cloudflare worker (`wrangler.toml` file)
4. Add a new entry: `curl -X POST -H "Authorization: yourpassword" -d '{"data": "My new entry"}' https://your-worker.your-name.workers.dev/`


## Or, use this apple shortcut

https://www.icloud.com/shortcuts/3e0d409ed10f4126b2cb7bb608fa0bc9