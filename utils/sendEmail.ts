import { Resend } from 'resend';

type emailArgument = {
  to: string;
  subject: string;
  template: string;
};

const sendEmail = async ({ to, subject, template }: emailArgument) => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: 'Astra Agent <auth@astraagent.shivendra.site>',
    to,
    subject,
    html: template,
  });
};

export default sendEmail;
