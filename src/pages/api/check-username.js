export const prerender = false;

let existingUsers = ["admin", "test", "user123"]; // Peab olema VÄLJASPOOLE funktsiooni, et see jääks meelde!

export async function POST({ request }) {
  let body;
  try {
    body = await request.json();
  } catch (e) {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { username, register } = body;

  if (register) {
    existingUsers.push(username);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } else {
    const usernameExists = existingUsers.includes(username);
    return new Response(
      JSON.stringify({ exists: usernameExists }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
