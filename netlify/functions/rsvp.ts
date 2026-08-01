import { Resend } from "resend";

export const handler = async (event: any) => {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

  if (!RESEND_API_KEY || !GOOGLE_SCRIPT_URL) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server misconfiguration" }),
    };
  }

  const resend = new Resend(RESEND_API_KEY);

  let data;
  try {
    data = JSON.parse(event.body);
  } catch {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid JSON" }),
    };
  }

  const { name, email, plusOne, plusOneName, status } = data;

  if (!status) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing status" }),
    };
  }

  if (status === "accepts" && (!name || !email)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing name or email" }),
    };
  }

  // 📍 VENUE DETAILS
  const venueName = "Sebjeng";
  const mapsLink = "https://maps.google.com/?q=-24.021681,29.703306";

  const calendarLink = "https://rmunion.co.za/.netlify/functions/calendar";

  try {
    // ✉️ EMAIL
    if (status === "accepts" && email) {
      await resend.emails.send({
        from: "Ramy & Mamphara <hello@rmunion.co.za>",
        to: [email],
        subject: "RSVP Confirmation",
        html: `
<!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; background-color:#f7f5f2; font-family: Georgia, serif; color:#4d403a;">
    
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          
          <table width="100%" style="max-width:520px; margin:40px auto; background:#ffffff; border-radius:12px; padding:40px 30px;">
            
            <!-- Divider -->
            <tr>
              <td align="center" style="padding-bottom:20px;">
                <div style="width:40px; height:1px; background:#c8bfb6;"></div>
              </td>
            </tr>

            <!-- Title -->
            <tr>
              <td align="center">
                <h1 style="margin:0; font-size:28px; font-weight:400;">Thank You</h1>
              </td>
            </tr>

            <tr>
              <td align="center" style="padding:10px 0 20px;">
                <p style="margin:0; font-size:18px; letter-spacing:2px; text-transform:uppercase; color:#a3968d;">
                  Ramy & Mamphara
                </p>
              </td>
            </tr>

            <!-- Greeting -->
            <tr>
              <td align="center">
                <p style="font-size:15px;">Dear ${name},</p>
              </td>
            </tr>

            <tr>
              <td align="center" style="padding-bottom:20px;">
                <p style="font-size:15px; line-height:1.7;">
                  Your presence means more to us than words can express.<br/>
                  Thank you for confirming your attendance — we cannot wait<br/>
                  to celebrate with you.
                </p>
              </td>
            </tr>

            ${
              plusOne
                ? `
            <tr>
              <td align="center" style="padding-bottom:20px;">
                <p style="font-size:14px; color:#7a6f67;">
                  Guest: ${plusOneName}
                </p>
              </td>
            </tr>
            `
                : ""
            }

            <!-- ACTION BUTTONS -->
            <tr>
              <td align="center" style="padding:20px 0;">

                <!-- MAP -->
                <a href="${mapsLink}" target="_blank"
                  style="
                    display:inline-block;
                    padding:12px 20px;
                    margin:5px;
                    font-size:13px;
                    letter-spacing:1px;
                    text-transform:uppercase;
                    text-decoration:none;
                    border:1px solid #c8bfb6;
                    color:#4d403a;
                    border-radius:6px;
                  ">
                  View Directions
                </a>

                <!-- CALENDAR -->
                <a href="${calendarLink}" target="_blank"
                  style="
                    display:inline-block;
                    padding:12px 20px;
                    margin:5px;
                    font-size:13px;
                    letter-spacing:1px;
                    text-transform:uppercase;
                    text-decoration:none;
                    border:1px solid #c8bfb6;
                    color:#4d403a;
                    border-radius:6px;
                  ">
                  Add to Calendar
                </a>

              </td>
            </tr>

            <!-- Divider -->
            <tr>
              <td align="center" style="padding:25px 0;">
                <div style="width:60px; height:1px; background:#e5dfd8;"></div>
              </td>
            </tr>

            <!-- Date -->
            <tr>
              <td align="center">
                <p style="font-size:13px; letter-spacing:2px; text-transform:uppercase; color:#a3968d;">
                  26 September 2026
                </p>
              </td>
            </tr>

            <tr>
  <td align="center" style="padding-top:20px;">
    <p style="font-size:11px; color:#c0b7ae; line-height:1.6; margin:0;">
      Kindly note this is an automated confirmation message.<br/>
      Please do not reply.
    </p>
  </td>
</tr>
            <!-- Footer -->
            <tr>
              <td align="center" style="padding-top:20px;">
                <p style="font-size:14px;">
                  With love,<br/>
                  <span style="font-size:18px;">Ramy & Mamphara</span>
                </p>
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </body>
</html>
        `,
      });
    }

    // 📊 GOOGLE SHEETS
    const sheetRes = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        plusOne,
        plusOneName,
        status,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!sheetRes.ok) {
      console.error("Google Sheets error:", await sheetRes.text());
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error("RSVP ERROR:", err);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server error" }),
    };
  }
};
