import { actor } from '../../canister/arcmindai';

export async function POST(req: Request) {
  const { messages } = await req.json();
  const question = messages[0].content;

  try {
    const result = await actor.ask(question);
    return new Response(result, {
      status: 200,
    });
  } catch (error) {
    console.error('Error in /api/chat', error);
    return new Response(String(error), {
      status: 500,
    });
  }
}
