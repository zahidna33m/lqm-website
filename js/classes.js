/* ==========================================================================
   LQM Mississauga — Class Data
   Edit this file to add, remove, or update classes.

   STATUS OPTIONS:
     "active"               — registration open; set registrationUrl
     "waitlist"             — registration closed; directs user to contact form
     "registration-closed"  — registration closed; no action
     "coming-soon"          — not yet open for registration

   VIDEO:
     videoId — YouTube video ID only (the part after ?v= or youtu.be/)
               e.g. https://youtu.be/n7NGWiMbW-M  →  videoId: "n7NGWiMbW-M"
               Set to null if there is no video.

   REGISTRATION URL:
     registrationUrl — full Zoom or Google Form link (opens in a new tab).
                       Set to null if not applicable.

   REGULATIONS URL:
     regulationsUrl — link to the class regulations page shown on the card.
                      Use "/class-regulations/" for online classes.
                      Set to null for in-person classes.

   PREREQUISITES:
     prerequisite — list of requirements shown on the card.
                    Each item goes on its own line between the [ ] brackets.
                    Keep each item in double quotes, separated by commas.
   ========================================================================== */

const classes = [
  {
    slug:            "al-falah-26",
    code:            "Al-Falah 26",
    level:           "Level 1",
    format:          "In Person",
    schedule:        "Sundays 10:30 AM – 1:15 PM",
    instructor:      "Zahid Naeem",
    scheduleDetail:  "Sundays @ 10:30 AM – 1:15 PM (Toronto)",
    prerequisite: [
      "Ability to read the Holy Qur\u2019an and write Arabic alphabets",
      "Strong desire, motivation, and dedication",
      "Commitment for regular attendance and completion of homework",
      "Must be 15 years or older"
    ],
    comments:        "In-Person at Al-Falah Islamic Centre.",
    videoId:         "n7NGWiMbW-M",
    regulationsUrl:  null,
    registrationUrl: null,
    status:          "waitlist"
  },
  {
    slug:            "baku-25",
    code:            "Baku 25",
    level:           "Level 1",
    format:          "Online",
    schedule:        "Sundays 6:30 AM – 9:15 AM",
    instructor:      "Javid Sheikh",
    scheduleDetail:  "Sundays @ 6:30 AM – 9:15 AM (Toronto)",
    prerequisite: [
      "Ability to read the Holy Qur\u2019an and write Arabic alphabets",
      "Strong desire, motivation, and dedication",
      "Commitment for regular attendance and completion of homework",
      "Must be 15 years or older"
    ],
    comments:        "Started Sept 14, 2025",
    videoId:         null,
    regulationsUrl:  "/class-regulations/",
    registrationUrl: "https://us02web.zoom.us/meeting/register/D5xedYFvTp6UZ5XWTAd6ag",
    status:          "active"
  },
  {
    slug:            "baghdad-24",
    code:            "Baghdad 24",
    level:           "Level 2",
    format:          "Online",
    schedule:        "Sundays 10:00 AM – 12:45 PM",
    instructor:      "Javid Sheikh",
    scheduleDetail:  "Sundays @ 10:00 AM – 12:45 PM (Toronto)",
    prerequisite: [
      "Completion of Level 1 (Madinah Book 1)",
      "Strong desire, motivation, and dedication",
      "Commitment for regular attendance and completion of homework",
      "Must be 15 years or older"
    ],
    comments:        "Started Aug 03, 2025",
    videoId:         null,
    regulationsUrl:  "/class-regulations/",
    registrationUrl: "https://us02web.zoom.us/meeting/register/tZ0uduGoqzMuHN2Q1XsFnNIa9-3i98LYCC20",
    status:          "active"
  },
  {
    slug:            "ankara-24",
    code:            "Ankara 24",
    level:           "Level 3",
    format:          "Online",
    schedule:        "Saturdays 10:00 AM – 12:45 PM",
    instructor:      "Javid Sheikh",
    scheduleDetail:  "Saturdays @ 10:00 AM – 12:45 PM (Toronto)",
    prerequisite: [
      "Completion of Level 2 (Madinah Book 2)",
      "Strong desire, motivation, and dedication",
      "Commitment for regular attendance and completion of homework",
      "Must be 15 years or older"
    ],
    comments:        "Started Dec 06, 2025",
    videoId:         null,
    regulationsUrl:  "/class-regulations/",
    registrationUrl: "https://us02web.zoom.us/meeting/register/tZYkdO6hqjIrGdxL54DTcIUejzEmKbIOsKlJ#/registration",
    status:          "active"
  },
  {
    slug:            "amman-23",
    code:            "Amman 23",
    level:           "Level 3",
    format:          "Online",
    schedule:        "Saturdays 9:00 AM – 11:15 AM",
    instructor:      "Qasim Iqbal",
    scheduleDetail:  "Saturdays @ 9:00 AM – 11:15 AM (Toronto)",
    prerequisite: [
      "Completion of Level 2 (Madinah Book 2)",
      "Strong desire, motivation, and dedication",
      "Commitment for regular attendance and completion of homework",
      "Must be 15 years or older"
    ],
    comments:        "Started Dec 06, 2025",
    videoId:         null,
    regulationsUrl:  "/class-regulations/",
    registrationUrl: "https://us02web.zoom.us/meeting/register/tZMude6vrDouGtE6iTSiLH7Vr3-nVMJAiFts",
    status:          "active"
  },
  {
    slug:            "algiers-22",
    code:            "Algiers 22",
    level:           "Level 3",
    format:          "Online",
    schedule:        "Saturdays 6:30 AM – 9:15 AM",
    instructor:      "Javid Sheikh",
    scheduleDetail:  "Saturdays @ 6:30 AM – 9:15 AM (Toronto)",
    prerequisite: [
      "Completion of Level 2 (Madinah Book 2)",
      "Strong desire, motivation, and dedication",
      "Commitment for regular attendance and completion of homework",
      "Must be 15 years or older"
    ],
    comments:        "Started Aug 03, 2024",
    videoId:         null,
    regulationsUrl:  "/class-regulations/",
    registrationUrl: null,
    status:          "registration-closed"
  }
];
