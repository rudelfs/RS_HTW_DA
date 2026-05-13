export const translations = {
  de: {
    // Header & Global
    test_phase: "Test-Phase",
    current_group: "Aktuelle Gruppe",
    
    // Onboarding
    ob_title: "Willkommen",
    ob_age: "Ihr Alter:",
    ob_age_ph: "z.B. 25",
    ob_age_err: "Bitte geben Sie ein gültiges Alter zwischen 0 und 99 Jahren ein.",
    ob_tech: "Selbsteinschätzung Ihrer Internet-Erfahrung:",
    ob_tech_1: "Anfänger (1)",
    ob_tech_5: "Experte (5)",
    
    // NEU: Cookie-Vorwissen
    ob_cookie_q: "Wissen Sie, was Cookies im Internet sind und welche Bedeutung sie haben?",
    ob_cookie_yes: "Ja, das ist mir bekannt.",
    ob_cookie_no: "Nein, nicht genau.",
    ob_cookie_err: "Bitte beantworten Sie die Frage zu den Cookies.",
    ob_cookie_info_title: "Was sind Cookies?",
    ob_cookie_info_text: "Cookies sind kleine Textdateien, die Websites auf Ihrem Gerät speichern. Sie merken sich beispielsweise Ihre Einstellungen, was in Ihrem Warenkorb liegt, oder sammeln Daten darüber, wie Sie die Seite nutzen, um Ihnen passgenaue Werbung anzuzeigen.",
    ob_cookie_info_btn: "Verstanden",
    
    ob_start: "Studie Starten",

    // Task Setting
    ts_title: "Ihre Aufgabe",
    ts_p1_1: "Stellen Sie sich vor, Sie möchten schnell die ",
    ts_p1_2: "Wettervorhersage für morgen",
    ts_p1_3: " prüfen. Sie klicken auf einen Link und gelangen auf eine Wetter-Website.",
    ts_p2: "Bitte verhalten Sie sich so, wie Sie es auch im normalen Alltag auf Ihrem eigenen Gerät tun würden.",
    ts_btn: "Verstanden, los geht's!",

    // Cookie Scenario
    cs_site_title: "WetterMorgen.de",
    cs_site_h2: "Wettervorhersage Berlin",
    cs_modal_title: "Ihre Privatsphäre ist uns wichtig",
    cs_modal_text: "Wir und unsere Partner speichern und/oder greifen auf Informationen auf einem Gerät zu, z.B. auf eindeutige Kennungen in Cookies, um personenbezogene Daten zu verarbeiten.",
    cs_btn_accept: "Alle akzeptieren",
    cs_btn_settings: "Auswahl erlauben",
    cs_btn_deny: "Ablehnen",
    cs_link_hidden: "Nur essenzielle Cookies akzeptieren und Website mit starken Einschränkungen nutzen.",

    // Micro Survey
    mi_title: "Kurze Usability-Frage",
    mi_q1: "„Es war für mich sofort ersichtlich, welche Auswahlmöglichkeiten ich habe.“",
    mi_q2: "„Ich konnte meine gewünschte Auswahl schnell und ohne großen Aufwand treffen.“",
    mi_scale_1: "Gar nicht (1)",
    mi_scale_5: "Voll und ganz (5)",
    mi_btn: "Weiter zum nächsten Szenario",

    // Macro Survey (Auflösung)
    ma_rev_title: "Abschliessende Befragung",
    ma_rev_text: "Vielen Dank für Ihre bisherigen Antworten. Diese Studie testete nicht primär die allgemeine Nutzbarkeit, sondern die Wirkung sogenannter „Dark Patterns“ (manipulatives Design) auf Cookie-Bannern.",
    ma_rev_btn: "Zur abschließenden Befragung",
    
    ma_title: "Noch ein paar Fragen",
    ma_ref_title: "Referenz-Design für die Fragen",
    ma_ref_modal: "Privatsphäre",
    
    ma_q1: "Wie häufig begegnen Ihnen Cookie-Menüs in genau dieser oder einer sehr ähnlichen visuellen Gestaltung (farbiger Hauptbutton, farblose Alternativen) in Ihrem Alltag?",
    ma_q1_1: "Sehr selten (1)",
    ma_q1_5: "Sehr oft (5)",
    
    ma_q2: "Achten Sie im Alltag bewusst darauf, ob Sie Cookies akzeptieren oder ablehnen?",
    ma_q2_opts: ["Ja, immer", "Meistens", "Selten", "Nein, ich klicke einfach weg"],
    
    ma_q3: "Wenn Sie Cookies akzeptieren, tun Sie dies meistens aus inhaltlicher Überzeugung, oder eher, um das Menü so schnell wie möglich auszublenden?",
    ma_q3_opts: ["Inhaltliche Überzeugung", "Bequemlichkeit & Zeitersparnis", "Teils, teils"],
    
    ma_q4: "Wenn es eine zentrale Browser-Einstellung gäbe, die Cookie-Banner für immer überflüssig macht: Würden Sie standardmäßig „Alle ablehnen“ oder „Alle akzeptieren“ wählen?",
    ma_q4_opts: ["Alle ablehnen", "Alle akzeptieren"],
    
    ma_q5: "Betrachten Sie das oben eingeblendete Design. Empfinden Sie die farbliche Hervorhebung des Zustimmungs-Buttons primär als eine hilfreiche Navigation oder als eine bewusste, manipulative Lenkung?",
    ma_q5_1: "Hilfreiche Navigation (1)",
    ma_q5_4: "Neutral (4)",
    ma_q5_7: "Klare Manipulation (7)",
    
    ma_q6: "Haben Sie noch Anmerkungen zu Ihrer Bewertung im obigen Schieberegler? Warum haben Sie sich so entschieden? (Optional)",
    ma_q6_ph: "Ihre Gedanken hierzu...",
    
    ma_btn: "Studie abschließen & Daten senden",

    // Result Screen
    rs_title: "Ergebnisse (Für Datenbank)",
    rs_text: "Diese Daten würden nun an Supabase gesendet werden."
  },
  en: {
    // Header & Global
    test_phase: "Test Phase",
    current_group: "Current Group",
    
    // Onboarding
    ob_title: "Research Study",
    ob_age: "Your Age:",
    ob_age_ph: "e.g. 25",
    ob_age_err: "Please enter a valid age between 0 and 99.",
    ob_tech: "Self-assessment of your internet experience:",
    ob_tech_1: "Beginner (1)",
    ob_tech_5: "Expert (5)",
    
    // NEW: Cookie Knowledge
    ob_cookie_q: "Do you know what internet cookies are and what they mean?",
    ob_cookie_yes: "Yes, I know.",
    ob_cookie_no: "No, not exactly.",
    ob_cookie_err: "Please answer the question about cookies.",
    ob_cookie_info_title: "What are Cookies?",
    ob_cookie_info_text: "Cookies are small text files that websites store on your device. For example, they remember your settings, what's in your shopping cart, or collect data about how you use the site to show you targeted advertisements.",
    ob_cookie_info_btn: "Understood",
    
    ob_start: "Start Study",

    // Task Setting
    ts_title: "Your Task",
    ts_p1_1: "Imagine you quickly want to check the ",
    ts_p1_2: "weather forecast for tomorrow",
    ts_p1_3: ". You click a link and land on a weather website.",
    ts_p2: "Please behave exactly as you normally would on your own device.",
    ts_btn: "Understood, let's go!",

    // Cookie Scenario
    cs_site_title: "WeatherTomorrow",
    cs_site_h2: "Weather Forecast Berlin",
    cs_modal_title: "Your privacy is important to us",
    cs_modal_text: "We and our partners store and/or access information on a device, such as unique IDs in cookies, to process personal data.",
    cs_btn_accept: "Accept all",
    cs_btn_settings: "Allow selection",
    cs_btn_deny: "Deny",
    cs_link_hidden: "Only accept essential cookies and use the website with strong limitations.",

    // Micro Survey
    mi_title: "Short Usability Question",
    mi_q1: "\"It was immediately clear to me what choices I had.\"",
    mi_q2: "\"I was able to make my desired choice quickly and without much effort.\"",
    mi_scale_1: "Not at all (1)",
    mi_scale_5: "Completely (5)",
    mi_btn: "Continue to next scenario",

    // Macro Survey (Resolution)
    ma_rev_title: "The Resolution",
    ma_rev_text: "Thank you for your answers so far. This study primarily tested not general usability, but the effect of so-called \"Dark Patterns\" (manipulative design) on cookie banners.",
    ma_rev_btn: "To final survey",
    
    ma_title: "Final Survey",
    ma_ref_title: "Reference Design for questions",
    ma_ref_modal: "Privacy",
    
    ma_q1: "How often do you encounter cookie menus in this or a very similar visual design (colored main button, colorless alternatives) in your daily life?",
    ma_q1_1: "Very rarely (1)",
    ma_q1_5: "Very often (5)",
    
    ma_q2: "In your daily life, do you consciously pay attention to whether you accept or reject cookies?",
    ma_q2_opts: ["Yes, always", "Mostly", "Rarely", "No, I just click them away"],
    
    ma_q3: "If you accept cookies, do you usually do so out of conviction, or rather to hide the menu as quickly as possible?",
    ma_q3_opts: ["Conviction", "Convenience & time saving", "A bit of both"],
    
    ma_q4: "If there was a central browser setting that made cookie banners permanently obsolete: Would you choose 'Reject all' or 'Accept all' by default?",
    ma_q4_opts: ["Reject all", "Accept all"],
    
    ma_q5: "Look at the design above. Do you perceive the colored highlighting of the accept button primarily as helpful navigation or as deliberate, manipulative steering?",
    ma_q5_1: "Helpful Navigation (1)",
    ma_q5_4: "Neutral (4)",
    ma_q5_7: "Clear Manipulation (7)",
    
    ma_q6: "Do you have any comments on your rating in the slider above? Why did you decide this way? (Optional)",
    ma_q6_ph: "Your thoughts...",
    
    ma_btn: "Complete study & send data",

    // Result Screen
    rs_title: "Results (For Database)",
    rs_text: "This data would now be sent to Supabase."
  }
};