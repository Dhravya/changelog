export interface Env {
	CHANGELOG : KVNamespace;
	PASS : string
}


export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method == 'POST') {
      if (env.PASS !== request.headers.get("Authorization")) {
        return new Response("Unauthorized", {
          status: 401,
          statusText: "Unauthorized"
        })
      }
      const body = await request.json() as { data: string };
      const now = new Date();
      now.setSeconds(0);
      now.setMilliseconds(0);

      await env.CHANGELOG.put(Math.floor(now.getTime()).toString(), body.data)
      return new Response('success');
    }

    let text = '';

    const value = await env.CHANGELOG.list()

    for (const key_ of value.keys.reverse()) {
      const value = await env.CHANGELOG.get(key_.name)

			// @ts-ignore
      const date = new Date(key_.name / 1);

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hour = String(date.getHours()).padStart(2, '0');
      const minute = String(date.getMinutes()).padStart(2, '0');

      const formattedDate = `${year}-${month}-${day} ${hour}:${minute}`;

      text += `${formattedDate} ${value}\n---\n`
    }

    return new Response(text, {
			headers: {
				'Cache-Control': 'max-age=300',
			}
		});
  },
};