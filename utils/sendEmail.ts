import { Resend } from 'resend';

type emailArgument = {
  to: string;
  subject: string;
  template: string;
};

const sendEmail = async ({ to, subject, template }: emailArgument) => {
  const resend = new Resend('re_evihpP2X_ES6gTRjXZQzhaS81o9nD2V3Z');

  const result = await resend.emails.send({
    from: 'Astra Agent <auth@astraagent.shivendra.site>',
    to,
    subject,
    html: template,
  });

  console.log(result);
};

export default sendEmail;
