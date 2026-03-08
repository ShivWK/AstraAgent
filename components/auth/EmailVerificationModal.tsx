import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import Modal from '../common/Modal';

type PropsType = {
  open: boolean;
  setOpen: (val: boolean) => void;
  email: string | null | undefined;
};

const EmailVerificationModal = ({ open, setOpen, email }: PropsType) => {
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailSend, setEmailSend] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const closeClickHandler = () => {
    setOpen(false);
    window.history.back();
  };

  const EmailSendClickHandler = async () => {
    try {
      setEmailLoading(true);

      await fetch('api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          purpose: 'reset_password',
          email: 'shivendrawk@gmail.com',
        }),
      });

      setEmailSend(true);
      setSeconds(30);
    } catch (err) {
      console.log(err);
    } finally {
      setEmailLoading(false);
    }
  };

  useEffect(() => {
    if (seconds === 0) return;

    const timer = setInterval(() => {
      setSeconds((prv) => prv - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  return (
    <Modal
      open={open}
      onClose={closeClickHandler}
      showClasses="opacity-100 scale-100"
      hideClasses="opacity-0 scale-0"
      className="fixed top-1/2 left-1/2 w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-blue-900 p-6 text-center shadow-lg md:w-[30%]"
    >
      <>
        <button
          aria-label="Close Modal"
          onClick={closeClickHandler}
          className="absolute top-3 right-3 rounded-full bg-gray-900/50 p-1 text-lg font-semibold text-white/70 transition hover:text-white"
        >
          <X aria-hidden="true" size={20} />
        </button>
        <h2 className="my-2 text-xl font-semibold text-gray-900 select-none dark:text-white">
          Email Verification Required
        </h2>

        <p className="mb-4 text-gray-600 select-none dark:text-gray-200">
          Your email address is not verified yet. Please verify your email to
          continue using your account.
        </p>

        <div className="mx-auto mb-5 w-fit rounded-md border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700">
          <span className="font-medium">Email: </span>
          {email || 'Your Email Address'}
        </div>

        <button
          onClick={EmailSendClickHandler}
          disabled={emailSend || emailLoading}
          id="sendVerificationBtn"
          className={`flex w-full items-center justify-center gap-2 rounded-md py-2.5 font-medium text-white transition ${
            emailSend
              ? 'cursor-not-allowed bg-gray-500'
              : 'bg-blue-600 hover:bg-blue-700'
          } ${emailLoading ? 'cursor-wait opacity-80' : ''} `}
        >
          {emailLoading && (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
          )}

          {emailLoading
            ? 'Sending...'
            : emailSend
              ? 'Email Sent'
              : 'Send Verification Email'}
        </button>

        {emailSend && (
          <p className="mt-4 text-sm text-green-400 select-none">
            Verification email sent. Check your inbox to verify your account. If
            not found, check spam or promotions.
          </p>
        )}

        {emailSend && (
          <button
            onClick={() => {}}
            disabled={seconds > 0}
            className={`mt-3 text-sm font-medium underline-offset-3 transition select-none ${
              seconds > 0
                ? 'cursor-not-allowed text-white/50'
                : 'text-white hover:underline'
            }`}
          >
            {seconds > 0
              ? `Resend in ${seconds}s`
              : emailSend
                ? 'Resend Email'
                : 'Send Verification Email'}
          </button>
        )}
      </>
    </Modal>
  );
};

export default EmailVerificationModal;
