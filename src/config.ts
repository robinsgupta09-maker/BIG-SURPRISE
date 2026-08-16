export interface FoodOption {
  id: string;
  emoji: string;
  name: string;
  description: string;
}

export interface PhotoItem {
  id: string;
  src: string;
  caption: string;
  rotation: string; // Tailwind rotation class, e.g., 'rotate-2', '-rotate-3'
}

export interface AppConfig {
  friendName: string;
  myName: string;
  
  // Design System (Tailwind color classes for gradients)
  theme: {
    backgroundGradient: string; // e.g. "from-pink-100 via-purple-50 to-indigo-100"
    primaryColor: string; // Button colors, accent colors
    secondaryColor: string;
  };

  // Screen 1: Welcome
  welcome: {
    emoji: string;
    title: string;
    subtitle: string;
    buttonText: string;
    microText: string;
  };

  // Screen 2: Funny Question
  funnyQuestion: {
    title: string;
    subtitle: string;
    buttonObviously: string;
    buttonNope: string;
    nopePhrases: string[]; // Playful phrases shown when they try to click Nope
  };

  // Screen 3: Date Selector
  dateSelector: {
    title: string;
    subtitle: string;
    timeTitle: string;
    timeOptions: { id: string; label: string; emoji: string }[];
    buttonText: string;
  };

  // Screen 4: Vibe Selector
  vibeSelector: {
    title: string;
    subtitle: string;
    options: FoodOption[];
    successMessage: string;
    buttonText: string;
  };

  // Screen 5: Friendship Question
  friendshipQuestion: {
    title: string;
    options: { id: string; label: string; emoji: string }[];
    responses: {
      [key: string]: string; // Response for each option id
    };
    buttonText: string;
  };

  // Screen 6: Fake Payment Joke
  fakePayment: {
    title: string;
    subtitle: string;
    agreementName: string;
    price: string;
    details: string;
    buttonText: string;
    jokeTitle: string;
    jokeSubtitle: string;
    jokeButtonText: string;
  };

  // Screen 7: Final Screen
  finalScreen: {
    title: string;
    subtitle: string;
    outro: string;
    buttonText: string;
  };

  // Screen 8: Photo Gallery
  gallery: {
    title: string;
    photos: PhotoItem[];
  };

  // Secret Easter Egg
  secretSurprise: {
    requiredClicks: number;
    title: string;
    message: string;
  };

  // Audio configuration
  music: {
    url: string;
  };

  // Entry Experience configuration
  entryExperience: {
    enabled: boolean;
    loadingTitle: string;
    loadingMessages: string[];
    warningTitle: string;
    warningItems: string[];
    enterButtonText: string;
    finalIntroText: string;
  };

  // Photo configuration
  photos: {
    entry: string;
    welcome: string | null;
    final: string;
  };
  finalMessage: string;

  // Secret Access configuration
  secretAccess: {
    enabled: boolean;
    title: string;
    subtitle: string;
    question: string;
    placeholder: string;
    buttonText: string;
    successTitle: string;
    successMessage: string;
    incorrectMessages: string[];
  };
}

export const CONFIG: AppConfig = {
  friendName: "Deepa",
  myName: "Robins",
  
  theme: {
    backgroundGradient: "from-rose-100 via-violet-50 to-sky-100",
    primaryColor: "bg-rose-400 hover:bg-rose-500 text-white focus:ring-rose-300",
    secondaryColor: "bg-violet-400 hover:bg-violet-500 text-white focus:ring-violet-300"
  },

  welcome: {
    emoji: "👀✨",
    title: "Okay... I have a very important question for you",
    subtitle: "And before you ask, yes, this website was completely necessary.",
    buttonText: "Okay, tell me →",
    microText: "Made unnecessarily, but exclusively for you. ♡"
  },

  funnyQuestion: {
    title: "Wait... you actually came here? 😭",
    subtitle: "I was fully prepared for you to ignore this.",
    buttonObviously: "Obviously 🙄",
    buttonNope: "Nope 😌",
    nopePhrases: [
      "Nice try 😂",
      "That answer has been rejected by the Friendship Department.",
      "Excuse me?? We're not done yet 😭",
      "Try again! 🌸",
      "Access Denied 🚫",
      "Error: Button broken, click 'Obviously' instead! 💖"
    ]
  },

  dateSelector: {
    title: "So... when are you free? 📅",
    subtitle: "Pick a day. Don't overthink it.",
    timeTitle: "And what time are we thinking? 👀",
    timeOptions: [
      { id: "afternoon", label: "Afternoon", emoji: "☀️" },
      { id: "evening", label: "Evening", emoji: "🌇" },
      { id: "night", label: "Night", emoji: "🌙" },
      { id: "surprise", label: "Surprise me", emoji: "✨" }
    ],
    buttonText: "That works! ♡"
  },

  vibeSelector: {
    title: "What are we feeling? 🍕✨",
    subtitle: "Pick your vibe.",
    options: [
      { id: "pizza", emoji: "🍕", name: "Pizza", description: "Cheesy goodness & deep talks" },
      { id: "sushi", emoji: "🍣", name: "Sushi", description: "Fancy rolls & good vibes" },
      { id: "burgers", emoji: "🍔", name: "Burgers", description: "Messy, delicious & classic" },
      { id: "pasta", emoji: "🍝", name: "Pasta", description: "Carbs, cozy talk & comfort" },
      { id: "tacos", emoji: "🌮", name: "Tacos", description: "Spicy, crunchy & fun times" },
      { id: "ramen", emoji: "🍜", name: "Ramen", description: "Warm broth, noodles & comfort food" }
    ],
    successMessage: "Perfect choice 😌",
    buttonText: "Continue →"
  },

  friendshipQuestion: {
    title: "Who is obviously the cooler friend?",
    options: [
      { id: "me", label: "Me 😌", emoji: "✨" },
      { id: "you", label: "You 🙄", emoji: "👑" }
    ],
    responses: {
      me: "Correct answer. I knew I could trust you.",
      you: "Interesting... we'll discuss this over food."
    },
    buttonText: "Continue →"
  },

  fakePayment: {
    title: "One tiny little thing...",
    subtitle: "To officially confirm this extremely important friendship appointment, please complete the following transaction.",
    agreementName: "Best Friend Agreement™",
    price: "₹499",
    details: "one-time fee • non-refundable • absolutely worth it",
    buttonText: "Pay ₹499 & Confirm 💳",
    jokeTitle: "HAHAHAHA YOU ACTUALLY CLICKED IT 😭",
    jokeSubtitle: "Relax. Your money is safe. I just wanted to see if you would actually click it. Free food is on me anyway!",
    jokeButtonText: "Okay okay →"
  },

  finalScreen: {
    title: "Okay, you're officially stuck with me 🫶",
    subtitle: "Thanks for being my best friend, my unpaid therapist, my partner in nonsense, and the person I can annoy 24/7.",
    outro: "It's a date. Best-friend date, obviously. 😂❤️",
    buttonText: "One more thing →"
  },

  gallery: {
    title: "Proof that we've survived each other",
    photos: [
      { id: "photo1", src: "/assets/photo1.png", caption: "Certified chaos", rotation: "rotate-2" },
      { id: "photo2", src: "/assets/photo2.png", caption: "Why did we think this was a good idea?", rotation: "-rotate-3" },
      { id: "photo3", src: "/assets/photo3.png", caption: "Peak friendship", rotation: "rotate-1" },
      { id: "photo4", src: "/assets/photo4.png", caption: "Another questionable decision", rotation: "-rotate-2" }
    ]
  },

  secretSurprise: {
    requiredClicks: 5,
    title: "You found the secret 👀",
    message: "Okay fine...\n\nYou're actually one of\nmy favorite people. ❤️"
  },

  music: {
    url: "/assets/cozy-music.mp3"
  },

  entryExperience: {
    enabled: true,
    loadingTitle: "Preparing something for",
    loadingMessages: [
      "Gathering important friendship data...",
      "Checking our questionable memories...",
      "Calculating friendship compatibility...",
      "Collecting embarrassing moments...",
      "Adding unnecessary amounts of cuteness...",
      "Okay... this might be too cute."
    ],
    warningTitle: "Warning: Excessive cuteness detected.",
    warningItems: [
      "unnecessary affection",
      "questionable humor",
      "embarrassing memories",
      "extremely high friendship levels"
    ],
    enterButtonText: "ENTER THE CHAOS →",
    finalIntroText: "Okay... let's begin. ❤️"
  },

  photos: {
    entry: "/assets/photos/photo-1.jpg",
    welcome: "/assets/photos/photo-2.jpg",
    final: "/assets/photos/photo-3.jpg"
  },

  finalMessage: `You're officially stuck with me.

Thanks for being my best friend,
my unpaid therapist,
my partner in nonsense,
and the person I can annoy 24/7.

Unfortunately...

there is no cancellation option. 😂❤️`,

  secretAccess: {
    enabled: true,
    title: "Wait... This isn't for everyone.",
    subtitle: "This little surprise was made specifically for you.",
    question: "Do you know the secret?",
    placeholder: "Enter the secret code",
    buttonText: "UNLOCK ❤️",
    successTitle: "ACCESS GRANTED ❤️",
    successMessage: "I knew you'd know it. ✨",
    incorrectMessages: [
      "Nice try 😂",
      "Nope... that's not it.",
      "You're going to have to think harder 👀"
    ]
  }
};
