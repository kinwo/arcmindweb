import { actor } from '../../canister/arcmindai';

export async function POST(req: Request) {
  const { messages } = await req.json();
  const question = messages[0].content;

  const result = await actor.ask(question);

  return new Response(result, {
    status: 200,
  });
}
