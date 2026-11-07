// Everything the site says lives here. Edit this file, then run
// `node scripts/build.mjs` to regenerate the HTML pages.

export const site = {
  name: "Nguyen Truong Son",
  shortName: "Truong Son",
  url: "https://truongson.me",
  email: "contact@truongson.me",
  description:
    "Nguyen Truong Son is a high school senior in Hanoi building computer vision apps, research pipelines and small tools. Projects include AWARE, an on-device AI recycling app.",
  socials: [
    { label: "Email", value: "contact@truongson.me", href: "mailto:contact@truongson.me", copy: true },
    { label: "GitHub", value: "github.com/trawngson", href: "https://github.com/trawngson" },
    { label: "Facebook", value: "facebook.com/sonntt.az", href: "https://facebook.com/sonntt.az" },
  ],
  year: 2026,
}

// Public-domain paintings used behind the sneak-peek phone mockups.
export const artworks = {
  almond: { title: "Almond Blossom", artist: "Vincent van Gogh", year: "1890" },
  gleaners: { title: "The Gleaners", artist: "Jean-François Millet", year: "1857" },
  sower: { title: "The Sower", artist: "Vincent van Gogh", year: "1888" },
  waterlilies: { title: "Water Lilies", artist: "Claude Monet", year: "1906" },
  greatwave: { title: "The Great Wave off Kanagawa", artist: "Katsushika Hokusai", year: "c. 1831" },
  grandejatte: { title: "A Sunday on La Grande Jatte", artist: "Georges Seurat", year: "1884" },
  harvesters: { title: "The Harvesters", artist: "Pieter Bruegel the Elder", year: "1565" },
  sunrise: { title: "Impression, Sunrise", artist: "Claude Monet", year: "1872" },
  rhone: { title: "Starry Night Over the Rhône", artist: "Vincent van Gogh", year: "1888" },
  harvest: { title: "Wheat field with sheaves", artist: "Vincent van Gogh" },
}

// Sneak-peek marquee. Layered cards put a transparent foreground over a painting.
export const peek = [
  { project: "aware", label: "AWARE", screen: "Onboarding", art: "almond", fg: "aware/onboarding.webp", alt: "AWARE onboarding screen" },
  { project: "aware", label: "AWARE", screen: "Live detection", art: "gleaners", fg: "aware/scan-live.webp", alt: "AWARE outlining a plastic bottle live through the camera" },
  { project: "aware", label: "AWARE", screen: "Scan result", art: "sower", fg: "aware/scan-results.webp", alt: "AWARE scan result for a plastic bottle with the CO2e it saves" },
  { project: "aware-bin", label: "AWARE Smart Bin", screen: "Exploded CAD", art: "sunrise", fg: "bin/exploded.webp", alt: "Exploded CAD render of the AWARE smart sorting bin", object: true },
  { project: "aware", label: "AWARE", screen: "Home", art: "waterlilies", fg: "aware/home.webp", alt: "AWARE home dashboard with waste and CO2 saved" },
  { project: "walley", label: "Walley", screen: "Sign in", baked: "walley/rhone-login.webp", art: "rhone", alt: "Walley sign-in screen over Starry Night Over the Rhône" },
  { project: "aware", label: "AWARE", screen: "Waste saved", art: "greatwave", fg: "aware/waste-saved.webp", alt: "AWARE waste-saved insights chart" },
  { project: "aware", label: "AWARE", screen: "Gallery", art: "grandejatte", fg: "aware/gallery.webp", alt: "AWARE community gallery of upcycling ideas" },
  { project: "walley", label: "Walley", screen: "Expense log", baked: "walley/harvest-log.webp", art: "harvest", alt: "Walley expense log over a Van Gogh wheat field" },
  { project: "aware", label: "AWARE", screen: "Leaderboard", art: "harvesters", fg: "aware/leaderboard.webp", alt: "AWARE recycling leaderboard" },
]

export const skills = [
  { label: "Computer Vision", tone: "navy" },
  { label: "Swift & SwiftUI" },
  { label: "Core ML" },
  { label: "Python", tone: "orange" },
  { label: "Java" },
  { label: "TypeScript" },
  { label: "Flutter" },
  { label: "Data Pipelines", tone: "navy" },
  { label: "Object-oriented Programming" },
  { label: "Algorithm Optimization" },
  { label: "User Interface Design", tone: "orange" },
  { label: "User Experience Design" },
  { label: "User Research" },
  { label: "App Design" },
  { label: "Design Systems" },
  { label: "Visual Design", tone: "navy" },
  { label: "CAD & Prototyping" },
]

export const community = {
  intro: "Finally, meet the high school senior who loves to be a part of his community:",
  items: [
    {
      photo: "people/vtec-vinsteam-2025.avif",
      width: 1620,
      height: 1080,
      caption: "At VTEC's VinSTEAM Innovation Challenge 2025",
      alt: "Son and VTEC members gathered around a robotics competition table",
      org: { name: "VTEC", href: "https://facebook.com/vscvtec" },
      role: "President, Harmony chapter",
      text: "we strive to create a supportive environment for Vinschool students to discuss and explore technology. As the President of VTEC's Harmony chapter, I co-host and facilitate tech-solution competitions with the school's Computer Science department, welcoming not just competing teams, but also fellow tech clubs to showcase their projects.",
    },
    {
      photo: "people/serenade-prom-2026.avif",
      width: 2048,
      height: 1365,
      caption: "At Student Council hosting Serenade Prom 2026",
      alt: "Son co-hosting Serenade Prom 2026 on a stage lit with red and gold spotlights",
      org: { name: "Harmony's Student Council", href: "https://www.facebook.com/vschar.studentcouncil" },
      role: "Vice President",
      text: "we collect opinions to push initiatives, and we also create events that are memorable for the whole student body. As the VP of the Student Council, I spearheaded a bi-annual meeting between all class representatives and the school's principal to voice concerns and address hardships in our learning environment.",
    },
    {
      photo: "people/vinmun-2025.avif",
      width: 2048,
      height: 1365,
      caption: "An unmoderated caucus with delegates at VINMUN '25",
      alt: "Son talking with delegates during an unmoderated caucus at VINMUN 2025",
      org: { name: "VINMUN", href: "https://www.facebook.com/VinschoolMUN" },
      role: "Chair, UNEP",
      text: "passion and curiosity are the factors that drive hours of debate, research and immersion in tackling global crises. As the chairman of UNEP, I have had the opportunity to foster a community where minds grow and develop in diplomacy.",
    },
  ],
}

export const filters = ["All", "Apps", "AI & Vision", "Hardware", "Web", "Tools & Games"]

// Covers: "phones" (painting + phones), "object" (painting + cutout),
// "image", "browser" (screenshot in a window), or an animated "tool-*" cover.
export const projects = [
  {
    slug: "aware",
    title: "AWARE",
    featured: true,
    year: "2026",
    kind: "iOS app + ML pipeline",
    categories: ["Apps", "AI & Vision"],
    tags: ["Computer Vision", "SwiftUI", "Core ML"],
    summary:
      "AWARE (AI Waste-sorting and Recycling Enhancement) is an iOS app that recognises household waste through the camera, fully on-device, and shows how to recycle it in Hanoi.",
    tagline:
      "AI Waste-sorting and Recycling Enhancement. Point your phone at a piece of waste and AWARE tells you what it is and how to recycle it, entirely on-device.",
    cover: {
      type: "phones",
      art: "greatwave",
      phones: ["aware/home.webp", "aware/scan-results.webp", "aware/gallery.webp"],
      alt: "Three AWARE screens over Hokusai's The Great Wave off Kanagawa",
    },
    meta: [
      ["Role", "Full-stack technical developer"],
      ["With assistance from", "Vietnam Academy of Science and Technology"],
      ["Stack", "SwiftUI, Core ML, Ultralytics YOLO26n, Python, PyTorch"],
      ["Status", "In development, with a research paper in progress"],
    ],
    links: [{ label: "View on GitHub", href: "https://github.com/trawngson/aware" }],
    overview: [
      "AWARE is a collaboration project that's been the most fun to work on, and it's also the one project I've put the most into. From automated waste identification to novel recycling ideas residing in a small gallery within your palm, AWARE aims to make recycling feel effortless and push initiative in my community.",
      "A YOLO26n detector runs on the iPhone through Core ML. It recognises seven kinds of household waste, waits until a detection is confident and steady, then opens guidance that follows Hanoi's household waste-sorting rules, with an estimate of the CO₂e avoided based on the U.S. EPA's Waste Reduction Model.",
      "The model comes from a reproducible, fail-closed training pipeline I wrote in Python: approved data from TACO v1.0 and a reviewed Open Images V7 subset, a versioned label ontology with a mapping ledger, duplicate detection, leakage-checked splits and immutable dataset releases. A research paper on the pipeline is in progress.",
    ],
    highlights: [
      ["7", "classes, frozen", "Plastic bottle, glass container, metal can, cardboard, plastic bag, disposable cup and styrofoam. Class IDs are never reordered or reused; changes are recorded as errata."],
      ["100%", "on-device detection", "An NMS-free YOLO26n Core ML model runs on the phone itself, so scanning works offline."],
      ["2", "approved data sources", "TACO and a reviewed Open Images subset flow through mapping, box-size policy, audits, exact and perceptual de-duplication, and group-aware splits."],
      ["XR", "real-device benchmark", "Trained on a remote GPU server with a memory watchdog, then measured on a real iPhone XR under a written benchmark protocol."],
    ],
    gallery: {
      type: "phones",
      title: "Every screen, start to finish",
      items: [
        ["aware/onboarding.webp", "Onboarding"],
        ["aware/scan-live.webp", "Live detection"],
        ["aware/scan-results.webp", "Result and CO₂e saved"],
        ["aware/scan-guidance.webp", "How to recycle it"],
        ["aware/home.webp", "Home dashboard"],
        ["aware/waste-saved.webp", "Waste saved"],
        ["aware/co2-saved.webp", "CO₂ saved"],
        ["aware/leaderboard.webp", "Leaderboard"],
        ["aware/recycling-map.webp", "Recycling map"],
        ["aware/gallery.webp", "Community gallery"],
        ["aware/post.webp", "A post and its replies"],
        ["aware/new-post.webp", "Share what you made"],
        ["aware/more.webp", "Guidance and settings"],
      ],
    },
  },
  {
    slug: "aware-bin",
    title: "AWARE Smart Bin",
    featured: true,
    year: "2026",
    kind: "Hardware + computer vision",
    categories: ["Hardware", "AI & Vision"],
    tags: ["Hardware", "CAD", "Computer Vision"],
    summary:
      "AWARE's physical sibling: a sorting bin you simply throw things into. A camera identifies each item on a tipping plate, which tilts it into one of four liners.",
    tagline:
      "A sorting bin you simply throw things into. A camera identifies each item on a tipping plate, and the plate tilts it into the right liner.",
    cover: {
      type: "object",
      art: "sunrise",
      object: "bin/exploded.webp",
      width: 417,
      height: 900,
      alt: "Exploded CAD render of the smart bin over Monet's Impression, Sunrise",
    },
    meta: [
      ["Role", "CAD, model training and firmware"],
      ["Stack", "Python, CadQuery, Ultralytics YOLO26n, ESP32-S3"],
      ["Output", "STEP and STL parts, plus an interactive 3D preview"],
      ["Status", "Prototype in progress"],
    ],
    links: [{ label: "AWARE on GitHub", href: "https://github.com/trawngson/aware" }],
    overview: [
      "People don't sort carefully; they throw. So the bin is designed around a throw: a funnel guides each item onto one central tipping plate. A camera on the rear console looks down at the plate, identifies the item, and the plate tips toward one of four quarter-circle liners.",
      "Each liner goes whole to a single recycling partner, so nobody has to re-sort anything by hand. The bin has its own seven-class label set for what students actually throw away at school (paper, plastic bottles, paper cups, plastic containers, plastic cutlery, tissues and food wrappers) and a routing table that maps each class to a liner.",
      "The first detector, a YOLO26n model trained on online data, is done. The first controller prototype is an ESP32-S3 driving a servo, with detection running on a server. The next phase retrains the model on photos from the bin's own camera.",
    ],
    highlights: [
      ["v3", "designed for a throw", "Version 3 replaced an open plate after feedback that people throw items in rather than set them down carefully."],
      ["2", "perpendicular hinges", "Two limited-travel hinges let a single plate tip toward all four sectors; one fixed axis could only reach two."],
      ["7", "school-waste classes", "A separate ontology for school waste, with each class routed to one of four liners."],
      ["STEP", "parametric CAD", "The whole bin is generated from parameters in Python, exported as STEP and STL, and checked by an automatic geometry validator."],
    ],
    gallery: {
      type: "renders",
      title: "Inside the bin",
      items: [
        ["bin/assembled.webp", "Assembled"],
        ["bin/exploded.webp", "Exploded"],
        ["bin/internals.webp", "Funnel and plate"],
        ["bin/section-tilted.webp", "Plate tilted"],
      ],
      viewer: "../../assets/bin-viewer/index.html",
    },
  },
  {
    slug: "walley",
    title: "Walley",
    featured: true,
    year: "2024–26",
    kind: "Cross-platform app",
    categories: ["Apps"],
    tags: ["Flutter", "Personalized AI"],
    summary:
      "A cross-platform smart digital wallet designed to streamline personal expense tracking, budget management, and financial data visualization.",
    tagline:
      "A smart wallet for teenagers: expense tracking, budgets and receipt scanning, with a personalised AI roadmap for spending and investing pocket money.",
    cover: { type: "image", src: "walley/cover.webp", alt: "Walley's sign-in screen over Starry Night Over the Rhône", width: 1400, height: 788 },
    meta: [
      ["Role", "Full-stack technical developer"],
      ["Team", "Two high school students"],
      ["Stack", "Flutter, Dart, Firebase"],
      ["Platforms", "iOS, iPadOS, Android, Web"],
      ["Status", "Work in progress"],
    ],
    links: [{ label: "View on GitHub", href: "https://github.com/trawngson/walley" }],
    overview: [
      "Walley is a powerful, Flutter-based, cross-platform finance management app with a personalized AI roadmap and receipt-scanning capabilities. The project is built by two enthusiastic high schoolers who wish to push change in the way teenagers spend and invest their pocket money.",
      "One Flutter codebase targets iOS 14+, iPadOS, Android 9+ and the web, backed by Firebase.",
    ],
    highlights: [
      ["4", "platforms, one codebase", "iOS, iPadOS, Android and the web from a single Flutter project."],
      ["AI", "personal roadmap", "A personalized roadmap toward smarter spending and investment choices."],
      ["Scan", "your receipts", "Capture a receipt instead of typing every expense in by hand."],
    ],
    gallery: {
      type: "phones",
      title: "A look inside",
      items: [
        ["walley/screen-home.webp", "Home and lesson progress"],
        ["walley/screen-log.webp", "Logging an expense"],
        ["walley/screen-login-dark.webp", "Sign in, dark"],
        ["walley/screen-login-light.webp", "Sign in, light"],
      ],
    },
  },
  {
    slug: "lunch",
    title: "Lunch",
    featured: true,
    year: "2026",
    kind: "Web app",
    categories: ["Web"],
    tags: ["Next.js", "TypeScript"],
    summary:
      "lunch.truongson.me: the school lunch menu on one quiet page, today's meals and the next week at a glance, with calories for every dish.",
    tagline:
      "The school lunch menu on one quiet page: today's meals and the week ahead at a glance, with calories for every dish.",
    cover: { type: "browser", src: "projects/lunch.webp", width: 1341, height: 845, bar: "#dedbd4", url: "lunch.truongson.me", alt: "The Lunch menu site showing Friday's meals with calories", tone: "paper" },
    meta: [
      ["Role", "Designer and developer"],
      ["Stack", "Next.js, React, TypeScript, Tailwind CSS"],
      ["Status", "Live"],
    ],
    links: [
      { label: "Open lunch.truongson.me", href: "https://lunch.truongson.me" },
      { label: "View on GitHub", href: "https://github.com/trawngson/lunch" },
    ],
    overview: [
      "Lunch takes the school's weekly menu and puts it on one fast, desktop-friendly page: weekdays through the same day next week, every dish with its calories, and today highlighted.",
      "A server endpoint calls one fixed upstream menu endpoint using credentials kept in protected environment variables, sanitizes the response and returns only the menu, so the student code and token never reach visitors. Without credentials, the site falls back to a checked-in sample menu.",
      "It keeps itself current each morning and counts how many hungry visitors stopped by.",
    ],
    highlights: [
      ["0", "secrets sent to visitors", "Credentials stay on the server; the browser only ever sees the sanitized menu."],
      ["6", "weekdays at a glance", "Today through the same day next week, with calories for every dish."],
    ],
  },
  {
    slug: "teacher-day",
    title: "Teacher Day",
    year: "2026",
    kind: "Web app for VTEC",
    categories: ["Web"],
    tags: ["Vue", "Firebase", "GSAP"],
    summary:
      "A wishing tree for Vietnamese Teachers' Day (20/11): students write kind words to their teachers and hang them on the tree.",
    tagline:
      "A wishing tree for Vietnamese Teachers' Day: students write kind words to their teachers and hang them on the tree.",
    cover: { type: "browser", src: "projects/teacher-day.webp", width: 1356, height: 845, bar: "#a8afdb", url: "vtec-teacher-day.web.app", alt: "The Teacher Day wishing tree with notes hanging from its branches", tone: "lilac" },
    meta: [
      ["Role", "Co-developer"],
      ["With", "VTEC teammates"],
      ["Stack", "Vue 3, Vite, Firebase, GSAP"],
      ["Status", "Live"],
    ],
    links: [
      { label: "Open the wishing tree", href: "https://vtec-teacher-day.web.app" },
      { label: "View on GitHub", href: "https://github.com/KernelxD/Teacher-Day" },
    ],
    overview: [
      "For Vietnamese Teachers' Day on 20 November, VTEC built a site where students can send kind words to their teachers. Every message becomes a little note on a wishing tree, and anyone can browse them all or search through them.",
      "I built the wishing-tree homepage, fixed bugs in the wish form, and set up Firebase Hosting for the single-page app.",
    ],
    highlights: [
      ["20/11", "Vietnamese Teachers' Day", "Launched for the day students traditionally thank their teachers."],
      ["1", "tree for the whole school", "Write a wish, browse every note, or search for one."],
    ],
  },
  {
    slug: "mediacontrol",
    title: "MediaControl",
    year: "2024",
    kind: "Computer vision tool",
    categories: ["AI & Vision", "Tools & Games"],
    tags: ["Python", "OpenCV", "MediaPipe"],
    summary:
      "Control Spotify with your hand: point your fingers one way to skip, the other way to go back, and raise your hand to play or pause.",
    tagline:
      "Control Spotify with your hand. Point your fingers one way to skip, the other way to go back, and raise your hand to play or pause.",
    cover: { type: "tool-media", alt: "Animated hand skeleton switching Spotify tracks" },
    meta: [
      ["Role", "Solo project"],
      ["Stack", "Python, OpenCV, MediaPipe Hands, AppleScript"],
      ["Platform", "macOS"],
    ],
    links: [{ label: "View on GitHub", href: "https://github.com/trawngson/mediacontrol" }],
    demo: {
      title: "See it in action",
      video: "projects/mediacontrol-demo.mp4",
      poster: "projects/mediacontrol-demo.webp",
      width: 812,
      height: 480,
      label: "Son in front of his webcam with 21 hand landmarks drawn on his hand, switching Spotify tracks with gestures",
      caption: "The original demo from the repo: raising my hand plays or pauses, and pointing my fingers left or right skips forward or back.",
    },
    overview: [
      "MediaControl reads a webcam feed with OpenCV, tracks the 21 landmarks of one hand with MediaPipe, and turns simple hand poses into Spotify commands sent through AppleScript.",
      "A two-second cooldown keeps one gesture from firing twice, and the live FPS and the last command are drawn on top of the video.",
    ],
    highlights: [
      ["21", "hand landmarks", "Fingertips and the wrist decide which way the hand is turned."],
      ["3", "gestures", "Next track, previous track, and play or pause."],
      ["2 s", "cooldown", "So one wave of the hand is one command."],
    ],
    code: {
      lang: "Python",
      file: "TrackingModel.py",
      body: `# Left
if (
    max(lmList[0][1], lmList[4][1], lmList[8][1], lmList[12][1], lmList[16][1], lmList[20][1]) == lmList[0][1]
):
    lastControl = time.time()
    subprocess.call(['osascript', '-e', 'tell application "Spotify" to next track'])
    status = "NEXT TRACK"`,
    },
  },
  {
    slug: "blur-canvas-grades",
    title: "Blur Canvas Grades",
    year: "2024",
    kind: "Userscript",
    categories: ["Tools & Games", "Web"],
    tags: ["JavaScript", "Tampermonkey"],
    summary:
      "A Tampermonkey script that blurs the grades in Canvas LMS's Recent Feedback panel so nobody can peek, and reveals each one only while you hover it.",
    tagline:
      "Blurs the grades in Canvas LMS's Recent Feedback panel so classmates can't peek at your screen, and reveals each one while you hover it.",
    cover: { type: "tool-blur", alt: "A Recent Feedback panel with blurred grades, one revealed under the cursor" },
    meta: [
      ["Role", "Solo project"],
      ["Stack", "JavaScript, Tampermonkey, Greasy Fork"],
      ["License", "MIT"],
    ],
    links: [{ label: "View on GitHub", href: "https://github.com/trawngson/blurcanvasgrades" }],
    overview: [
      "The home page of our school's Canvas LMS lists your latest grades in a Recent Feedback panel, in plain view of anyone glancing at your screen. This userscript blurs them and unblurs a grade only while your cursor is over it.",
      "Canvas loads its content dynamically, so a MutationObserver re-applies the blur whenever the page changes.",
    ],
    highlights: [
      ["3 px", "of privacy", "Just enough blur to hide a grade at a glance."],
      ["0", "setup", "Install it in Tampermonkey and it runs on every LMS page."],
    ],
    code: {
      lang: "JavaScript",
      file: "Blur Canvas Grades.user.js",
      body: `const blurGrades = () => {
    const feedbackElements = document.querySelectorAll('.recent_feedback_icon'); // Adjust selector as needed
    feedbackElements.forEach(element => {
        element.style.transition = 'filter 0.2s ease';
        element.style.filter = 'blur(3px)';
        element.addEventListener('mouseover', function() {
            element.style.filter = 'blur(0)';
        });
        element.addEventListener('mouseout', function() {
            element.style.filter = 'blur(3px)';
        });
    });
};

// Mutation observer to handle dynamic content updates
const observer = new MutationObserver(blurGrades);
observer.observe(document.body, { childList: true, subtree: true });`,
    },
  },
  {
    slug: "mathchamp",
    title: "MathChamp",
    year: "2025",
    kind: "Java game",
    categories: ["Tools & Games"],
    tags: ["Java", "Algorithms"],
    summary:
      "A console game for wise mathematicians: guess whether a random sequence is arithmetic, quadratic, cubic or prime, and climb ten levels.",
    tagline:
      "A console game for wise mathematicians: is this sequence arithmetic, quadratic, cubic or prime? Guess right to climb ten levels.",
    cover: { type: "tool-math", alt: "A terminal running MathChamp, cycling through sequences" },
    meta: [
      ["Role", "Solo project"],
      ["Stack", "Java"],
    ],
    links: [{ label: "View on GitHub", href: "https://github.com/trawngson/mathchamp" }],
    overview: [
      "Each round generates a random sequence. Answer correctly to level up and see the sequence's nth-term formula; answer wrong and you drop a level.",
      "Harder sequence types unlock as you climb: quadratic at level 3, cubic at level 5 and primes at level 7. Reach level 10 to win.",
    ],
    highlights: [
      ["4", "sequence types", "Arithmetic, quadratic, cubic and prime."],
      ["10", "levels", "New types unlock at levels 3, 5 and 7."],
    ],
    code: {
      lang: "Java",
      file: "SequenceType.java",
      body: `public enum SequenceType {
    ARITHMETIC("Arithmetic", 1), // an + b
    QUADRATIC("Quadratic", 3), // an^2 + bn + c
    CUBIC("Cubic", 5), // an^3 + bn^2 + cn + d
    PRIME("Prime", 7); // sequence of prime numbers

    final String typeName;

    /**
     * Denotes the level of the user that will trigger the appearance of the sequence
     */
    final int startingLevel;`,
    },
  },
  {
    slug: "morse",
    title: "Morse",
    year: "2022",
    kind: "Java utility",
    categories: ["Tools & Games"],
    tags: ["Java"],
    summary:
      "A tiny Java class that encodes text to Morse code and decodes it back. One of my very first public repositories.",
    tagline:
      "A tiny Java class that encodes text to Morse code and decodes it back. One of my very first public repositories.",
    cover: { type: "tool-morse", alt: "A lamp blinking S-O-N in Morse code" },
    meta: [
      ["Role", "Solo project"],
      ["Stack", "Java"],
    ],
    links: [{ label: "View on GitHub", href: "https://github.com/trawngson/morse" }],
    overview: [
      "Morse.toMorse(text) encodes letters, digits and a little punctuation; Morse.reverse(code) decodes them back, with a slash between words.",
      "It's a small project, but it's where I started sharing code on GitHub, back in 2022.",
    ],
    highlights: [
      ["40", "symbols", "Letters, digits, spaces and common punctuation."],
      ["2022", "where it started", "One of the first repositories on my GitHub."],
    ],
    code: {
      lang: "Java",
      file: "Morse.java",
      body: `public static String toMorse(String str) {
    StringBuilder result = new StringBuilder();
    str = str.toLowerCase(Locale.ROOT);

    char[] characters = str.toCharArray();
    for (int i = 0; i < characters.length; i++) {
        String c = String.valueOf(characters[i]);

        if (alphabet.containsKey(c))
            result.append(alphabet.get(c));

        if (i != characters.length - 1)
            result.append(" ");
    }

    return String.valueOf(result);
}`,
    },
  },
]
