import type { APIRoute } from 'astro';
import sgMail from '@sendgrid/mail';
import { escapeHtml } from '../../lib/escape_html';

const apiKey = import.meta.env.SENDGRID_API_KEY
const originEmailAddress = import.meta.env.CONTACT_FORM_ORIGIN_EMAIL
const originName = import.meta.env.CONTACT_FORM_ORIGIN_NAME
const destinationEmailAddress = import.meta.env.CONTACT_FORM_DESTINATION_EMAIL

const sendContactMessageEmail = ({ email, message, lastname, name, company, subject }: {
  email: string, message: string, lastname: string, name: string, company: string, subject: string
}) => {
  sgMail.setApiKey(apiKey);

  const msg = {
    to: destinationEmailAddress,
    from: {
      name: originName,
      email: originEmailAddress
    },
    replyTo: {
      email: email,
      name: name
    },
    subject: `Contact Form: ${subject}`,
    html: `
      <html>
        <body>
          <div>Email: ${escapeHtml(email)}</div>
          <div>Name: ${escapeHtml(name)}</div>
          <div>Last Name: ${escapeHtml(lastname)}</div>
          <div>Company: ${escapeHtml(company)}</div>
          <br />
          <div>${escapeHtml(message)}</div>
        </body>
      </html>
    `,
  };
  return sgMail.send(msg)
}

export const post: APIRoute = async ({ request }) => {
  if (request.headers.get("Content-Type") === "application/json") {
    const { email, message, lastname, name, company, subject } = await request.json();

    return sendContactMessageEmail({ email, message, lastname, name, company, subject }).then((response) => {
      return new Response(JSON.stringify({
        status: 200,
        message: 'Contact message sent'
      }), {
        status: 200,
        statusText: "Contact message sent",
      });
    }).catch((error: any) => {
      console.log("ERROR SENDING CONTACT MESSAGE", error.response.body);
      return new Response(null, {
        status: 400,
        statusText: `ERROR SENDING CONTACT MESSAGE ${JSON.stringify(error)}`,
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