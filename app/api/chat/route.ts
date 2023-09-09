// TODO: Create an ArcMind AI API client

// Set the runtime to edge to use the Vercel Edge Functions feature
export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages } = await req.json();

  return new Response(`I am an Edge Function by Henry Chan!`, {
    status: 200,
  });
}
