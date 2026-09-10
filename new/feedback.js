// ---------------------------------------------------------------------
// Sends the feedback form to a Google Apps Script Web App, which appends
// each submission as a new row in a Google Sheet.
//
// SETUP: replace SCRIPT_URL below with your deployed Apps Script Web App
// URL. See /apps-script/Code.gs and README.md for the full setup steps.
// ---------------------------------------------------------------------

const SCRIPT_URL = 'https://script.google.com/macros/s/REPLACE-WITH-YOUR-DEPLOYMENT-ID/exec';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('feedback-form');
  if (!form) return;

  const statusEl = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = new FormData(form);
    const payload = {
      name: data.get('name'),
      email: data.get('email'),
      service: data.get('service'),
      rating: data.get('rating'),
      message: data.get('message'),
    };

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    statusEl.className = '';
    statusEl.textContent = '';

    try {
      // Apps Script Web Apps don't return usable CORS headers, so this
      // request is sent in "no-cors" mode. That means we can't actually
      // read whether it succeeded — the browser blocks access to the
      // response. In practice, if the fetch doesn't throw (e.g. no
      // network error), the submission almost always went through.
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      statusEl.textContent = "Thanks — your feedback has been sent.";
      statusEl.className = 'is-success';
      form.reset();
    } catch (err) {
      statusEl.textContent = "Something went wrong sending your feedback. Please try again, or message us on Facebook.";
      statusEl.className = 'is-error';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send feedback';
    }
  });
});
