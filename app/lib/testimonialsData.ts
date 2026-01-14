/**
 * Testimonials data from Trustpilot reviews
 * All reviews are 5-star ratings from verified customers
 */

export interface Testimonial {
  name: string;
  country: string;
  rating: number; // 1-5
  date: string; // ISO date string
  headline: string;
  body: string;
  photo?: string; // For future implementation
}

export const testimonials: Testimonial[] = [
  {
    name: "Fabian Lumsden",
    country: "US",
    rating: 5,
    date: "2025-01-07",
    headline: "Fantastic product",
    body: "Fantastic product! A week in and can feel higher levels of energy and focus. Have seen the production go up this week at work massively as a result. Highly recommend.",
  },
  {
    name: "Rhob Connick",
    country: "GB",
    rating: 5,
    date: "2025-11-28",
    headline: "Legit results",
    body: "3 CONKA 1 shots down and they are legit! Taken fist CONKA 2 last night as well!\n\nIt's a strange awakening feeling with consistency when taken the CONKA 1 my eyes feel wider and bigger ready for everything and feel more alert\n\nLoving it",
  },
  {
    name: "Sienna",
    country: "GB",
    rating: 5,
    date: "2025-10-13",
    headline: "A great supplement",
    body: "A great supplement, improved my energy levels, focus & memory after I started taking it. Very easy to take/fit into daily life.\nHighly recommend!",
  },
  {
    name: "Jamie",
    country: "GB",
    rating: 5,
    date: "2025-10-13",
    headline: "Been taking CONKA for 4 months",
    body: "As someone who has lived with ADHD symptoms for many years, finding a product that genuinely eases the day-to-day challenges has been incredibly rewarding. I've never been one to rely on medication and have always preferred exploring natural approaches to managing my symptoms.\n\nAfter taking CONKA for four months, I can confidently say the results are far from a placebo effect. The short-term benefits appeared quickly, I felt noticeably calmer and less anxious in situations that would normally feel overwhelming. These early improvements soon developed into deeper, more lasting changes: greater focus, increased productivity, and a more methodical approach to both my work and daily life.\n\nAs a private performance chef in elite sport, my role demands intense concentration, adaptability, and the ability to handle last-minute changes. Recognising shifts in athletes energy expenditure and adjusting menus accordingly requires sharp attention to detail. Since incorporating CONKA into my routine, I've been able to approach my work with a greater sense of calm, clarity, and control.\n\nI genuinely believe that since taking CONKA, I've become less prone to hyperfocus on unrealistic ventures or side projects, and far better at recognising what truly deserves my attention.",
  },
  {
    name: "Tom Redican",
    country: "GB",
    rating: 5,
    date: "2025-09-11",
    headline: "Fantastic product",
    body: "fantastic product. very easy to take in just one quick shot. feel more dialed in at work and less sluggish in the afternoons. very good on hangovers too",
  },
  {
    name: "Will Glover",
    country: "AU",
    rating: 5,
    date: "2025-09-03",
    headline: "Been taking this for a while now",
    body: "Been taking this for a while now. Massive improvements in energy and alertness, can't wait to see what's next!",
  },
  {
    name: "Issy Glover",
    country: "GB",
    rating: 5,
    date: "2025-09-03",
    headline: "Huge benefits to my everyday",
    body: "CONKA has genuinely improved my day-to-day performance. The morning shot gives me sharper focus, clearer thinking, and sustained energy without the crash I'd usually get from coffee. I'm able to concentrate for longer, get through work faster, and stay mentally switched on throughout the day.\n\nIn the evenings, the recovery shot helps me wind down and recharge properly so I wake up feeling fresh and ready to go again. I love that it's all backed by science, and I can really feel the difference in my memory, focus, and energy levels.",
  },
  {
    name: "Oscar Beard",
    country: "GB",
    rating: 5,
    date: "2025-09-03",
    headline: "Increased focus and clarity",
    body: "I did a week worth of CONKA shots, and not only was it super easy to take, but also gave me a new sense of clarity and focus in my training. I really felt the difference and felt I was able to perform to a higher level because of this.",
  },
  {
    name: "Gustaf Smith",
    country: "GB",
    rating: 5,
    date: "2025-08-09",
    headline: "Absolutely loving CONKA",
    body: "Absolutely loving CONKA - the scientific combination of ingredients result in the best supplement I've tried. If I consciously think about a given day, and my productivity, focus, creativity and mental clarity, it's always a CONKA day!",
  },
  {
    name: "Dominic Tripp",
    country: "GB",
    rating: 5,
    date: "2025-08-03",
    headline: "Extremely values driven",
    body: "They're extremely values driven - which for me is key. They're doing the right thing for the health & wellbeing of sports people and I have found the product great!",
  },
  {
    name: "Will Ponty",
    country: "GB",
    rating: 5,
    date: "2025-08-01",
    headline: "Excellent brand",
    body: "CONKA is an excellent brand, that produces products which support recovery.\n\nAs someone who has had a concussion and been through full cycles of 1 & 2 in the early, middle and post recovery stages, I found the product worked during all three phases. I experienced a noticeable difference in symptoms.\n\nIf you're unsure about the product, I found the team helpful and quick to respond, which put me at ease to test out.",
  },
  {
    name: "George Key",
    country: "GB",
    rating: 5,
    date: "2025-07-31",
    headline: "I started taking CONKA this summer",
    body: "I started taking CONKA this summer as so far the results have been very impressive. I can't tell if its the weather or its my new girlfriend thats making me so happy but everything going well in my life RE job, health, relationships and it happens to coincide with when I started taking CONKA. So i aint gunna stop",
  },
  {
    name: "Fraser",
    country: "GB",
    rating: 5,
    date: "2025-07-31",
    headline: "Best Brain Health Supplement available",
    body: "Best Brain Health Supplement on the market in my opinion. It's specific, grounded in studies and you are actually able to measure difference yourself. Have played around with other supps but this feels like it has the most noticeable effect and then I can see the improvement through testing. Feel energised and love being able to adapt dependent on my training load too.",
  },
  {
    name: "Tom Brice",
    country: "GB",
    rating: 5,
    date: "2025-07-29",
    headline: "Mental edge that actually shows up in training",
    body: "I've been using CONKA for a few weeks and it's made a real difference in how I train. I'm more focused, quicker to react, and I don't hit that mental fatigue like I used to. No crash, just clean, steady clarity.\n\nThe app's brain tests are a nice bonus - simple, but you can actually see progress. If you're an athlete looking to level up your mental game, this is worth trying.",
  },
  {
    name: "Sam Turton",
    country: "GB",
    rating: 5,
    date: "2025-07-29",
    headline: "I was skeptical at first",
    body: "I was skeptical at first, but conka has made the world of difference to me consistently over the last month.\n\nAfter taking a conka 1 in the morning, the feeling is subtle, but about 3 mins in my brain fog has dissipated, and i'm locked into my work.\n\nPreviously post rugby training, even just shoulders on, id feel slightly groggy. I have had a history of concussions. Now i take a conka 2 straight after, and genuinely feel back to my normal self the next morning. Without it, it could take me up to a week.\n\nThe apps great too! The 2 min test lets me track my mental wellness alongside all my physical stats i get from my garmin. Useful for telling me what formula to take and when.",
  },
  {
    name: "SG",
    country: "GB",
    rating: 5,
    date: "2025-07-29",
    headline: "Highly impressed",
    body: "Highly impressed with CONKA's supplements for cognitive recovery and focus. Fast, helpful customer service, consistent delivery, and noticeable benefits. The app is intuitive and lets you track real improvements over time.",
  },
  {
    name: "Jamie Walters",
    country: "GB",
    rating: 5,
    date: "2025-07-29",
    headline: "Great product",
    body: "Great product being driven by top lads with passion for protecting and improving cognitive function in a variety of different sporting and health contexts.",
  },
  {
    name: "Jack Glover",
    country: "SG",
    rating: 5,
    date: "2025-07-29",
    headline: "CONKA is the best",
    body: "Has benefited me immensely from when I started it three months ago. Have felt more energised and switched on which has benefitted my ability to perform day to day tasks",
  },
  {
    name: "Finnlay",
    country: "GB",
    rating: 5,
    date: "2025-07-29",
    headline: "Highly recommend",
    body: "It's hard to know, without carrying out a comprehensive, scientific study on myself (working with professional athletes and crying out trials with them, is the next best thing!). I started taking conka in the acute phase of acquiring a third degree TBI (after getting into a life changing car crash, coming out of a comma for just under a month and being discharged from a Nero rehab hospital for 4 months).\n\nSo recovery has been HUGE both physically and cognitively. It would have been with or without conka; however I believe looking at the research, that it undoubtedly has hugely helped in this process! I look forward to having CONKA each day! It has also taken all of the leg work out of trying to collate all of the beneficial supplements for aiding the recovery process and put it into one easy to take, tasty shot. I highly recommend the product.",
  },
  {
    name: "Fergus Blount",
    country: "GB",
    rating: 5,
    date: "2025-07-29",
    headline: "Great product!",
    body: "Great team to deal with and great product. I take these supplements as part of my morning routine and feel clearer and more focused as a result. Nice to find a natural solution to my help sooth my TBI symptoms.",
  },
  {
    name: "Ed Coulson",
    country: "GB",
    rating: 5,
    date: "2025-07-29",
    headline: "Easy to use",
    body: "Easy to use and not any other all in one product on the market like it (that I've found anyway). Game changer",
  },
  {
    name: "Chris Billam-Smith",
    country: "GB",
    rating: 5,
    date: "2025-07-29",
    headline: "As a professional boxer",
    body: "As a professional boxer, CONKA provided me a superb product that I could trust due to their Informed Sport testing. It was the first nootropic product I found which was tested.\n\nIt is hugely beneficial and reassuring to have this product in a sport where looking after brain health is of paramount importance.",
  },
  {
    name: "George Harding",
    country: "GB",
    rating: 5,
    date: "2025-07-29",
    headline: "Unbelievable product",
    body: "Unbelievable product that's had a tangible impact on my energy and focus. Strongly recommend both CONKA 1 and 2 to take performance to the next level in all fields.",
  },
  {
    name: "Rudh Kurup",
    country: "GB",
    rating: 5,
    date: "2025-07-29",
    headline: "Actually helps me stay sharp and focused",
    body: "I've been using CONKA for a few weeks now, and it's genuinely become part of my daily routine. I usually take it in the morning, especially if I've got a busy or stressful day ahead, or if I haven't slept well. It helps me feel more focused and level-headed, without any weird side effects or crash.\n\nThere's also an app that comes with it, where you can track how you're doing and test your brain a bit. It's a nice touch and makes it feel like I'm not just taking something passively, I'm actually engaging with my brain health a bit more.",
  },
  {
    name: "Humphrey Bodington",
    country: "GB",
    rating: 5,
    date: "2025-07-29",
    headline: "More motivated and feeling better",
    body: "More motivated and feeling 10x better when using CONKA. Cured my concussion, now I just take it every day because I am operating at a higher RPM when I use CONKA. It makes me more motivated and capable of handling more stress and, therefore, more ambitious goals.",
  },
  {
    name: "ArdMoor",
    country: "GB",
    rating: 5,
    date: "2025-06-26",
    headline: "Great company! Great product!",
    body: "Great company to deal with. Pay on subscription and the supplements arrive like clockwork with great notifications at each step of the process.\n\nSupplements themselves are game changers giving me a much faster start to the day, no post lunch slump and generally a much better level of concentration throughout the day. Would highly recommend",
  },
  {
    name: "Will Homer",
    country: "AE",
    rating: 5,
    date: "2024-11-26",
    headline: "No morning fog",
    body: "Since I've been taking CONKA consistently I don't have any 'morning fog' and I feel cognitively sharper and more focused throughout the day.",
  },
  {
    name: "Jack Sylvester",
    country: "GB",
    rating: 5,
    date: "2024-07-07",
    headline: "Love the stuff",
    body: "Love the stuff, find when I get out of the habit of taking them I can really tell the difference. Originally thought they surely can't do that much but I 100% notice my focus improving and feel sharper. Would highly recommend!",
  },
  {
    name: "Leticia Hosang",
    country: "GB",
    rating: 5,
    date: "2024-07-01",
    headline: "Best natural brain-boost",
    body: "Lucky for me, I've been on CONKA for just under a year now. It's changed my day to day so much, and every time I forget to take it for a while, I feel the difference straight away. Best natural brain-boost out there.",
  },
  {
    name: "Harry Glover",
    country: "GB",
    rating: 5,
    date: "2024-07-01",
    headline: "What a game changer!",
    body: "What a game changer!\n\nI have never felt cognitively better than when I am taking CONKA consistently.",
  },
];

/**
 * Shuffle array using Fisher-Yates algorithm
 * Returns a new array (does not mutate original)
 */
export function shuffleTestimonials<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
