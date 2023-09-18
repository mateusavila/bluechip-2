import type { APIRoute } from 'astro';
import sgMail from '@sendgrid/mail';
import { escapeHtml } from '../../lib/escape_html';

const apiKey = import.meta.env.SENDGRID_API_KEY
const originEmailAddress = import.meta.env.CONTACT_FORM_ORIGIN_EMAIL
const originName = import.meta.env.CONTACT_FORM_ORIGIN_NAME
const destinationEmailAddress = import.meta.env.CONTACT_FORM_DESTINATION_EMAIL

const sendContactMessageEmail = async ({ fullname, email, message, file }: {
  fullname: string, email: string, message: string, file: File | null
}) => {
  sgMail.setApiKey(apiKey);

  let msg = {
    to: destinationEmailAddress,
    from: {
      name: originName,
      email: originEmailAddress
    },
    replyTo: {
      email: email,
      name: fullname
    },
    subject: `Join The Team - ${fullname}`,
    html: `
      <html>
        <body>
          <div>Email: ${escapeHtml(email)}</div>
          <div>Fullname: ${escapeHtml(fullname)}</div>
          <br />
          <div>${escapeHtml(message)}</div>
          </body>
      </html>
    `
  };

  if (file) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const base64content = buffer.toString('base64');
    Object.assign(msg,
      {
        attachments: [
          {
            content: base64content,
            filename: file.name,
            type: file.type,
            disposition: "attachment"
          }
        ]
      });
  
  }

  return sgMail.send(msg)
}

export const post: APIRoute = async ({ request }) => {
  const contentType = request.headers.get("Content-Type")
  if (contentType && contentType.startsWith("multipart/form-data")) {
    const formData = await request.formData();

    const fullname = formData.get('fullname') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;
    const file = formData.get('file') as File;

    return sendContactMessageEmail({ fullname, email, message, file }).then(() => {
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
