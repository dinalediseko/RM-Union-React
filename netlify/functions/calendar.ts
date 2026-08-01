export const handler = async () => {
  const venueName = "Sebjeng";
  const venueAddress = "Polokwane, Limpopo, South Africa";
  const mapsLink = "https://maps.google.com/?q=-24.021681,29.703306";

  const start = "20260926T120000Z";
  const end = "20260926T220000Z";

  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
PRODID:-//Ramy & Mamphara//Wedding Invitation//EN
METHOD:PUBLISH
BEGIN:VEVENT
SUMMARY:Ramy & Mamphara Wedding
DTSTART:${start}
DTEND:${end}
LOCATION:${venueName}, ${venueAddress}
DESCRIPTION:Join us to celebrate Ramy & Mamphara's wedding.\\n\\nDirections: ${mapsLink}
URL:${mapsLink}
END:VEVENT
END:VCALENDAR`;

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": "attachment; filename=rmunion-wedding.ics",
    },
    body: icsContent,
  };
};