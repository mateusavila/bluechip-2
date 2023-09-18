import client from "@mailchimp/mailchimp_marketing";
import type { APIRoute } from 'astro';

const apiKey = import.meta.env.MAILCHIMP_API_KEY
const serverPrefix = import.meta.env.MAILCHIMP_SERVER_PREFIX
const listId = import.meta.env.MAILCHIMP_LIST_ID

const addMemberToMailchimpList = async (email: string) => {
  client.setConfig({
    apiKey: apiKey,
    server: serverPrefix,
  });

  return client.lists.addListMember(listId, {
    email_address: email,
    status: "pending"
  });
}

export const post: APIRoute = async ({ request }) => {
  if (request.headers.get("Content-Type") === "application/json") {
    const { email } = await request.json();

    return addMemberToMailchimpList(email).then((response) => {
      return new Response(JSON.stringify({
        status: 200,
        message: 'User subscribed'
      }), {
        status: 200,
        statusText: "User subscribed",
      });
    }).catch((error: any) => {
      console.log("ERROR SUBSCRIBING USER", error);
      return new Response(null, {
        status: 400,
        statusText: `Error subscribing user ${JSON.stringify(error)}`,
      });
    })
  } else {
    return new Response(JSON.stringify({
      status: 400,
      statusText: "Invalid content-type",
    }), {
      status: 400,
      statusText: "Invalid content-type",
    });
  }
}


