// Session modules data for all 10 days
// Each day has 4-6 modules totaling 15-20 minutes minimum

export interface SessionModule {
  id: string;
  title: string;
  description?: string;
  type: 'STORY_VIDEO' | 'ANIMATED_SLIDES' | 'COACH_VIDEO' | 'GUIDED_PRACTICE' | 'CHECKPOINT' | 'CRAVING_TOOL';
  estimatedSeconds: number;
  gatingRequired: boolean;
  practiceType?: 'BREATHING' | 'URGE_SURFING' | 'BODY_SCAN' | 'TRIGGER_SCAN' | 'THOUGHT_REFRAME' | 'VISUALIZATION';
  content?: {
    slides?: Array<{ id: string; title: string; content: string; backgroundGradient?: string; icon?: string }>;
    videoUrl?: string;
    transcript?: string;
    practiceConfig?: Record<string, unknown>;
  };
}

export interface DaySession {
  dayNumber: number;
  title: string;
  subtitle: string;
  modules: SessionModule[];
}

export const daySessions: DaySession[] = [
  {
    dayNumber: 1,
    title: "A New Journey Begins",
    subtitle: "Building Motivation and Hope",
    modules: [
      {
        id: 'd1m1',
        title: "Welcome to Your Freedom Journey",
        description: "Discover how thousands have quit smoking without willpower or suffering.",
        type: 'ANIMATED_SLIDES',
        estimatedSeconds: 210, // 3:30
        gatingRequired: true,
        content: {
          slides: [
            {
              id: 's1',
              title: "Welcome to UnCrave",
              content: "Hello and welcome! Today marks Day 1 of your journey to becoming completely smoke-free. You've made an incredible decision.",
              backgroundGradient: "bg-gradient-to-br from-primary/80 to-freedom/80",
              icon: "👋"
            },
            {
              id: 's2',
              title: "You're Not Alone",
              content: "Millions have walked this path before you. Over 1.3 billion people smoke, but every day, thousands break free—for good.",
              backgroundGradient: "bg-gradient-to-br from-success/80 to-primary/80",
              icon: "🌍"
            },
            {
              id: 's3',
              title: "This Is Different",
              content: "Forget willpower. Forget suffering. This program works by changing how you THINK about smoking, not by fighting cravings.",
              backgroundGradient: "bg-gradient-to-br from-accent/80 to-coral/80",
              icon: "🧠"
            },
            {
              id: 's4',
              title: "The 10-Day Promise",
              content: "In just 10 days, you'll go from smoker to non-smoker—not through deprivation, but through understanding and freedom.",
              backgroundGradient: "bg-gradient-to-br from-freedom/80 to-success/80",
              icon: "✨"
            },
            {
              id: 's5',
              title: "Keep Smoking (For Now)",
              content: "Yes, you read that right. For the first 5 days, keep smoking as usual. We're rewiring your brain, not torturing it.",
              backgroundGradient: "bg-gradient-to-br from-coral/80 to-primary/80",
              icon: "🚬"
            },
          ]
        }
      },
      {
        id: 'd1m2',
        title: "The Science of Freedom",
        description: "Learn why this method works when others have failed.",
        type: 'ANIMATED_SLIDES',
        estimatedSeconds: 300, // 5:00
        gatingRequired: true,
        content: {
          slides: [
            {
              id: 's1',
              title: "Why Willpower Fails",
              content: "98% of cold-turkey attempts fail. Not because smokers are weak, but because they're fighting the wrong battle.",
              backgroundGradient: "bg-gradient-to-br from-muted/80 to-primary/80",
              icon: "💪"
            },
            {
              id: 's2',
              title: "The Belief Trap",
              content: "You don't smoke because you're addicted. You smoke because you BELIEVE cigarettes give you something. That belief is the trap.",
              backgroundGradient: "bg-gradient-to-br from-primary/80 to-accent/80",
              icon: "🪤"
            },
            {
              id: 's3',
              title: "Nicotine's Small Secret",
              content: "Nicotine withdrawal is incredibly mild—like a slight itch. The mental 'need' you feel is 95% psychological, not physical.",
              backgroundGradient: "bg-gradient-to-br from-success/80 to-freedom/80",
              icon: "🔬"
            },
            {
              id: 's4',
              title: "Changing Your Mind",
              content: "When you truly understand that cigarettes give you NOTHING—no relaxation, no pleasure, no benefit—quitting becomes effortless.",
              backgroundGradient: "bg-gradient-to-br from-freedom/80 to-primary/80",
              icon: "💡"
            },
            {
              id: 's5',
              title: "The Path Forward",
              content: "Over the next 10 days, we'll examine every reason you think you smoke. One by one, we'll dissolve the illusions.",
              backgroundGradient: "bg-gradient-to-br from-primary/80 to-success/80",
              icon: "🛤️"
            },
            {
              id: 's6',
              title: "Your Only Task Today",
              content: "Smoke as usual, but start noticing. When do you reach for a cigarette? What do you expect to feel? Just observe.",
              backgroundGradient: "bg-gradient-to-br from-accent/80 to-freedom/80",
              icon: "👁️"
            },
          ]
        }
      },
      {
        id: 'd1m3',
        title: "First Breathing Practice",
        description: "Learn the breathing technique you'll use to handle any urge.",
        type: 'GUIDED_PRACTICE',
        estimatedSeconds: 180, // 3:00
        gatingRequired: true,
        practiceType: 'BREATHING',
      },
      {
        id: 'd1m4',
        title: "Your Coach's Message",
        description: "Personal encouragement for your journey.",
        type: 'ANIMATED_SLIDES',
        estimatedSeconds: 240, // 4:00
        gatingRequired: true,
        content: {
          slides: [
            {
              id: 's1',
              title: "I Believe In You",
              content: "I was exactly where you are. After 15 years of smoking, I tried everything. Pills, patches, hypnosis. Nothing worked—until I understood.",
              backgroundGradient: "bg-gradient-to-br from-primary/80 to-coral/80",
              icon: "❤️"
            },
            {
              id: 's2',
              title: "The Moment It Clicked",
              content: "When I finally saw through the illusion, quitting wasn't hard—it was a relief. That same clarity is coming for you.",
              backgroundGradient: "bg-gradient-to-br from-coral/80 to-freedom/80",
              icon: "✨"
            },
            {
              id: 's3',
              title: "Trust The Process",
              content: "Some days you'll be skeptical. Some days excited. Both are normal. Just keep showing up, keep watching, keep listening.",
              backgroundGradient: "bg-gradient-to-br from-freedom/80 to-success/80",
              icon: "🙏"
            },
            {
              id: 's4',
              title: "Tomorrow Awaits",
              content: "Day 2, we'll dive into how nicotine actually works—and why everything you think you know about addiction is probably wrong.",
              backgroundGradient: "bg-gradient-to-br from-success/80 to-primary/80",
              icon: "🌅"
            },
          ]
        }
      },
      {
        id: 'd1m5',
        title: "Urge Surfing Introduction",
        description: "A powerful technique to ride out cravings without fighting them.",
        type: 'GUIDED_PRACTICE',
        estimatedSeconds: 150, // 2:30
        gatingRequired: true,
        practiceType: 'URGE_SURFING',
      },
    ]
  },
  {
    dayNumber: 2,
    title: "Understanding Your Addiction",
    subtitle: "The Science of Nicotine",
    modules: [
      {
        id: 'd2m1',
        title: "How Nicotine Hooks You",
        type: 'ANIMATED_SLIDES',
        estimatedSeconds: 360, // 6:00
        gatingRequired: true,
        content: {
          slides: [
            {
              id: 's1',
              title: "The Nicotine Cycle",
              content: "When you smoke, nicotine reaches your brain in 7 seconds. It triggers dopamine release, creating a brief 'reward' feeling.",
              backgroundGradient: "bg-gradient-to-br from-primary/80 to-accent/80",
              icon: "🧪"
            },
            {
              id: 's2',
              title: "But Here's The Truth",
              content: "That 'reward' only relieves the withdrawal that the PREVIOUS cigarette created. You're not getting pleasure—you're getting RELIEF from your own addiction.",
              backgroundGradient: "bg-gradient-to-br from-accent/80 to-coral/80",
              icon: "🎭"
            },
            {
              id: 's3',
              title: "The Addiction Loop",
              content: "Smoke → Brief relief → Nicotine leaves → Withdrawal → Smoke again. You're not enjoying cigarettes. You're treating withdrawal.",
              backgroundGradient: "bg-gradient-to-br from-coral/80 to-muted/80",
              icon: "🔄"
            },
            {
              id: 's4',
              title: "Non-Smokers Don't Need Relief",
              content: "Non-smokers don't wake up with withdrawal pangs. They don't 'need' cigarettes after meals. The only 'need' cigarettes create is more cigarettes.",
              backgroundGradient: "bg-gradient-to-br from-success/80 to-freedom/80",
              icon: "💭"
            },
            {
              id: 's5',
              title: "What You're Actually Doing",
              content: "Imagine wearing tight shoes just for the relief of taking them off. That's what smoking is—creating discomfort to relieve it.",
              backgroundGradient: "bg-gradient-to-br from-freedom/80 to-primary/80",
              icon: "👟"
            },
            {
              id: 's6',
              title: "The Physical Truth",
              content: "Pure nicotine withdrawal is incredibly mild—equivalent to mild hunger. The intense 'cravings' are 95% psychological, not physical.",
              backgroundGradient: "bg-gradient-to-br from-primary/80 to-success/80",
              icon: "📊"
            },
          ]
        }
      },
      {
        id: 'd2m2',
        title: "Breaking The Cycle",
        type: 'ANIMATED_SLIDES',
        estimatedSeconds: 240, // 4:00
        gatingRequired: true,
        content: {
          slides: [
            {
              id: 's1',
              title: "The Great Revelation",
              content: "Cigarettes don't give you anything positive. They only temporarily relieve the negative state they themselves created.",
              backgroundGradient: "bg-gradient-to-br from-primary/80 to-freedom/80",
              icon: "💡"
            },
            {
              id: 's2',
              title: "True Relaxation",
              content: "Cigarettes don't relax you. Nicotine is a stimulant—it increases heart rate and blood pressure. The 'relaxation' is just withdrawal relief.",
              backgroundGradient: "bg-gradient-to-br from-freedom/80 to-success/80",
              icon: "😌"
            },
            {
              id: 's3',
              title: "Concentration Myth",
              content: "Cigarettes don't help you concentrate. They briefly restore what nicotine withdrawal took away. Non-smokers concentrate just fine—better, actually.",
              backgroundGradient: "bg-gradient-to-br from-success/80 to-accent/80",
              icon: "🎯"
            },
            {
              id: 's4',
              title: "Today's Realization",
              content: "Every 'benefit' of smoking is actually just temporary relief from the problem smoking created. There is no genuine benefit. None.",
              backgroundGradient: "bg-gradient-to-br from-accent/80 to-primary/80",
              icon: "🌟"
            },
          ]
        }
      },
      {
        id: 'd2m3',
        title: "Deep Breathing Practice",
        type: 'GUIDED_PRACTICE',
        estimatedSeconds: 180, // 3:00
        gatingRequired: true,
        practiceType: 'BREATHING',
      },
      {
        id: 'd2m4',
        title: "Body Awareness Scan",
        description: "Notice how your body feels as a smoker.",
        type: 'GUIDED_PRACTICE',
        estimatedSeconds: 300, // 5:00
        gatingRequired: true,
        practiceType: 'BODY_SCAN',
      },
    ]
  },
  // Days 3-10 follow similar structure...
  {
    dayNumber: 3,
    title: "Know Your Triggers",
    subtitle: "Mapping Your Habit Loops",
    modules: [
      {
        id: 'd3m1',
        title: "The Habit Loop Explained",
        type: 'ANIMATED_SLIDES',
        estimatedSeconds: 300,
        gatingRequired: true,
        content: {
          slides: [
            { id: 's1', title: "Cue → Routine → Reward", content: "Every habit follows this pattern. Understanding yours is the first step to breaking free.", backgroundGradient: "bg-gradient-to-br from-primary/80 to-accent/80", icon: "🔄" },
            { id: 's2', title: "Your Smoking Cues", content: "Coffee. Stress. After meals. Phone calls. These aren't needs—they're associations your brain has learned.", backgroundGradient: "bg-gradient-to-br from-accent/80 to-freedom/80", icon: "☕" },
            { id: 's3', title: "The Fake Reward", content: "Remember: the 'reward' is just relief from withdrawal. The same relief non-smokers feel all the time.", backgroundGradient: "bg-gradient-to-br from-freedom/80 to-success/80", icon: "🎁" },
            { id: 's4', title: "Breaking Associations", content: "Over the next days, we'll systematically break these false connections.", backgroundGradient: "bg-gradient-to-br from-success/80 to-primary/80", icon: "⛓️‍💥" },
          ]
        }
      },
      {
        id: 'd3m2',
        title: "Trigger Identification",
        type: 'ANIMATED_SLIDES',
        estimatedSeconds: 420,
        gatingRequired: true,
        content: {
          slides: [
            { id: 's1', title: "Common Triggers", content: "Let's explore the situations where you typically reach for a cigarette.", backgroundGradient: "bg-gradient-to-br from-primary/80 to-coral/80", icon: "📋" },
            { id: 's2', title: "Morning Routine", content: "The first cigarette of the day feels 'needed' only because you've gone hours without nicotine during sleep.", backgroundGradient: "bg-gradient-to-br from-coral/80 to-accent/80", icon: "🌅" },
            { id: 's3', title: "Stress Response", content: "Cigarettes don't reduce stress—they add to it. You'll feel genuinely calmer as a non-smoker.", backgroundGradient: "bg-gradient-to-br from-accent/80 to-freedom/80", icon: "😰" },
            { id: 's4', title: "Social Situations", content: "Many smokers feel less confident without cigarettes. But that confidence was always yours—not the cigarette's.", backgroundGradient: "bg-gradient-to-br from-freedom/80 to-success/80", icon: "👥" },
            { id: 's5', title: "After Meals", content: "This is pure association. Food doesn't create nicotine craving—habit does.", backgroundGradient: "bg-gradient-to-br from-success/80 to-primary/80", icon: "🍽️" },
          ]
        }
      },
      {
        id: 'd3m3',
        title: "Urge Surfing Deep Dive",
        type: 'GUIDED_PRACTICE',
        estimatedSeconds: 240,
        gatingRequired: true,
        practiceType: 'URGE_SURFING',
      },
      {
        id: 'd3m4',
        title: "Alternative Behaviors",
        type: 'ANIMATED_SLIDES',
        estimatedSeconds: 300,
        gatingRequired: true,
        content: {
          slides: [
            { id: 's1', title: "New Responses", content: "For every trigger, we can create a new, healthier response.", backgroundGradient: "bg-gradient-to-br from-primary/80 to-success/80", icon: "🔄" },
            { id: 's2', title: "Stress → Breathe", content: "Three deep breaths give you more calm than any cigarette ever did.", backgroundGradient: "bg-gradient-to-br from-success/80 to-freedom/80", icon: "🧘" },
            { id: 's3', title: "Coffee → Enjoy", content: "Without smoke, coffee actually tastes better. Enjoy it fully.", backgroundGradient: "bg-gradient-to-br from-freedom/80 to-accent/80", icon: "☕" },
            { id: 's4', title: "Boredom → Move", content: "A quick walk, stretch, or dance gives you energy cigarettes never could.", backgroundGradient: "bg-gradient-to-br from-accent/80 to-primary/80", icon: "🚶" },
          ]
        }
      },
    ]
  },
  {
    dayNumber: 4,
    title: "Mindful Smoking",
    subtitle: "Experiencing the Truth",
    modules: [
      {
        id: 'd4m1',
        title: "The Mindfulness Approach",
        type: 'ANIMATED_SLIDES',
        estimatedSeconds: 240,
        gatingRequired: true,
        content: {
          slides: [
            { id: 's1', title: "A Different Exercise", content: "Today we try something powerful: smoking with complete awareness.", backgroundGradient: "bg-gradient-to-br from-primary/80 to-accent/80", icon: "🧠" },
            { id: 's2', title: "Break The Autopilot", content: "You've been smoking unconsciously for years. Today, we bring it into full consciousness.", backgroundGradient: "bg-gradient-to-br from-accent/80 to-freedom/80", icon: "✨" },
            { id: 's3', title: "The Goal", content: "To experience what smoking actually is—without the illusions your mind has built around it.", backgroundGradient: "bg-gradient-to-br from-freedom/80 to-coral/80", icon: "🎯" },
          ]
        }
      },
      {
        id: 'd4m2',
        title: "Guided Mindful Smoking",
        type: 'ANIMATED_SLIDES',
        estimatedSeconds: 720,
        gatingRequired: true,
        content: {
          slides: [
            { id: 's1', title: "Get A Cigarette Ready", content: "Light your cigarette, but don't smoke yet. Just hold it.", backgroundGradient: "bg-gradient-to-br from-muted/80 to-primary/80", icon: "🚬" },
            { id: 's2', title: "Observe The Smoke", content: "Watch the smoke rise. This is what goes into your lungs, your blood, your cells.", backgroundGradient: "bg-gradient-to-br from-primary/80 to-accent/80", icon: "💨" },
            { id: 's3', title: "Smell It", content: "Really smell the cigarette. The paper burning. The chemicals. Is this pleasant?", backgroundGradient: "bg-gradient-to-br from-accent/80 to-coral/80", icon: "👃" },
            { id: 's4', title: "Take One Puff", content: "Slowly inhale. Hold it. What does it actually taste like? Feel the heat.", backgroundGradient: "bg-gradient-to-br from-coral/80 to-muted/80", icon: "🌬️" },
            { id: 's5', title: "Notice Your Body", content: "How does your throat feel? Your chest? Your heart rate? This is reality.", backgroundGradient: "bg-gradient-to-br from-muted/80 to-freedom/80", icon: "💗" },
            { id: 's6', title: "Where Is The Pleasure?", content: "Search for genuine pleasure. Not relief. Not habit. Actual enjoyment. Is it there?", backgroundGradient: "bg-gradient-to-br from-freedom/80 to-success/80", icon: "🔍" },
            { id: 's7', title: "Continue If You Want", content: "Finish the cigarette if you choose, staying fully present. Or put it out. Either is fine.", backgroundGradient: "bg-gradient-to-br from-success/80 to-primary/80", icon: "🎭" },
            { id: 's8', title: "What Did You Notice?", content: "Many people find that mindful smoking reveals something unexpected: there's no genuine pleasure.", backgroundGradient: "bg-gradient-to-br from-primary/80 to-accent/80", icon: "💡" },
          ]
        }
      },
      {
        id: 'd4m3',
        title: "Breathing Reset",
        type: 'GUIDED_PRACTICE',
        estimatedSeconds: 180,
        gatingRequired: true,
        practiceType: 'BREATHING',
      },
      {
        id: 'd4m4',
        title: "Reflection On Experience",
        type: 'CHECKPOINT',
        description: "Take a moment to process what you discovered during the mindful smoking exercise.",
        estimatedSeconds: 120,
        gatingRequired: false,
      },
    ]
  },
  {
    dayNumber: 5,
    title: "Reframing Your Mind",
    subtitle: "Cognitive Restructuring",
    modules: [
      {
        id: 'd5m1',
        title: "Common Smoking Myths",
        type: 'ANIMATED_SLIDES',
        estimatedSeconds: 360,
        gatingRequired: true,
        content: {
          slides: [
            { id: 's1', title: "Myth: I Enjoy Smoking", content: "Do you enjoy the taste? The smell? The coughing? Or just the relief from withdrawal?", backgroundGradient: "bg-gradient-to-br from-primary/80 to-coral/80", icon: "🤔" },
            { id: 's2', title: "Myth: It Helps Me Relax", content: "Nicotine is a stimulant. The 'relaxation' is just relief from the stress smoking itself caused.", backgroundGradient: "bg-gradient-to-br from-coral/80 to-accent/80", icon: "😌" },
            { id: 's3', title: "Myth: It Helps Me Concentrate", content: "It just relieves the concentration loss caused by withdrawal. Non-smokers focus fine.", backgroundGradient: "bg-gradient-to-br from-accent/80 to-freedom/80", icon: "🎯" },
            { id: 's4', title: "Myth: I'm Too Stressed To Quit", content: "Smoking adds stress—constant worry about when, where, cost, health. Quitting removes stress.", backgroundGradient: "bg-gradient-to-br from-freedom/80 to-success/80", icon: "😰" },
            { id: 's5', title: "Myth: I'll Gain Weight", content: "Some do, many don't. And even if true, the health benefits of quitting far outweigh any weight gain.", backgroundGradient: "bg-gradient-to-br from-success/80 to-primary/80", icon: "⚖️" },
            { id: 's6', title: "Myth: It's Too Hard", content: "When you truly understand that smoking gives you nothing, quitting is a relief, not a sacrifice.", backgroundGradient: "bg-gradient-to-br from-primary/80 to-freedom/80", icon: "💪" },
          ]
        }
      },
      {
        id: 'd5m2',
        title: "Your New Beliefs",
        type: 'ANIMATED_SLIDES',
        estimatedSeconds: 300,
        gatingRequired: true,
        content: {
          slides: [
            { id: 's1', title: "The Truth About Cigarettes", content: "Cigarettes give you nothing—not relaxation, not pleasure, not help. Only temporary relief from their own withdrawal.", backgroundGradient: "bg-gradient-to-br from-primary/80 to-success/80", icon: "✨" },
            { id: 's2', title: "You're Not Giving Up Anything", content: "You're not sacrificing pleasure. You're escaping a trap. There's nothing to 'give up.'", backgroundGradient: "bg-gradient-to-br from-success/80 to-freedom/80", icon: "🎉" },
            { id: 's3', title: "Freedom Is Coming", content: "Imagine never needing a cigarette again. Never worrying about running out. Never feeling controlled.", backgroundGradient: "bg-gradient-to-br from-freedom/80 to-accent/80", icon: "🕊️" },
            { id: 's4', title: "You Are Already A Non-Smoker", content: "The mindset shift is everything. You're not 'trying to quit.' You're becoming who you really are.", backgroundGradient: "bg-gradient-to-br from-accent/80 to-primary/80", icon: "👤" },
          ]
        }
      },
      {
        id: 'd5m3',
        title: "Body Scan Awareness",
        type: 'GUIDED_PRACTICE',
        estimatedSeconds: 300,
        gatingRequired: true,
        practiceType: 'BODY_SCAN',
      },
      {
        id: 'd5m4',
        title: "Urge Surfing Practice",
        type: 'GUIDED_PRACTICE',
        estimatedSeconds: 180,
        gatingRequired: true,
        practiceType: 'URGE_SURFING',
      },
    ]
  },
  // Remaining days with similar comprehensive structure
  {
    dayNumber: 6,
    title: "Your Last Cigarette",
    subtitle: "The Final Goodbye",
    modules: [
      {
        id: 'd6m1',
        title: "Preparing for Freedom",
        type: 'ANIMATED_SLIDES',
        estimatedSeconds: 300,
        gatingRequired: true,
        content: {
          slides: [
            { id: 's1', title: "Today Is The Day", content: "Today, you'll smoke your last cigarette. Not with regret—with celebration.", backgroundGradient: "bg-gradient-to-br from-primary/80 to-success/80", icon: "🎯" },
            { id: 's2', title: "You're Ready", content: "Over the past 5 days, you've seen through the illusions. You know cigarettes give you nothing.", backgroundGradient: "bg-gradient-to-br from-success/80 to-freedom/80", icon: "✨" },
            { id: 's3', title: "No Sacrifice", content: "You're not giving up a friend. You're escaping a captor. This is liberation.", backgroundGradient: "bg-gradient-to-br from-freedom/80 to-accent/80", icon: "🕊️" },
            { id: 's4', title: "What To Expect", content: "The next few days may have mild physical sensations. They're tiny—like a slight itch. Mental cravings are just old habits calling.", backgroundGradient: "bg-gradient-to-br from-accent/80 to-primary/80", icon: "📋" },
          ]
        }
      },
      {
        id: 'd6m2',
        title: "The Goodbye Ritual",
        type: 'ANIMATED_SLIDES',
        estimatedSeconds: 480,
        gatingRequired: true,
        content: {
          slides: [
            { id: 's1', title: "Your Last Cigarette", content: "Light your final cigarette. This is not sad—it's a celebration of your freedom.", backgroundGradient: "bg-gradient-to-br from-coral/80 to-primary/80", icon: "🚬" },
            { id: 's2', title: "Smoke It Mindfully", content: "Notice everything. The smell, taste, how it makes you feel. Really experience it.", backgroundGradient: "bg-gradient-to-br from-primary/80 to-accent/80", icon: "🧘" },
            { id: 's3', title: "Thank It", content: "Thank this cigarette for showing you the truth—that there's nothing here you need.", backgroundGradient: "bg-gradient-to-br from-accent/80 to-freedom/80", icon: "🙏" },
            { id: 's4', title: "Release It", content: "As you finish, feel the relief. Not of nicotine—of freedom. You never have to do this again.", backgroundGradient: "bg-gradient-to-br from-freedom/80 to-success/80", icon: "💨" },
            { id: 's5', title: "You Are Free", content: "Put it out. Throw away your cigarettes. You are now a non-smoker. Congratulations.", backgroundGradient: "bg-gradient-to-br from-success/80 to-primary/80", icon: "🎉" },
            { id: 's6', title: "What Now?", content: "Tomorrow begins your first full day of freedom. We'll be here every step of the way.", backgroundGradient: "bg-gradient-to-br from-primary/80 to-freedom/80", icon: "🌅" },
          ]
        }
      },
      {
        id: 'd6m3',
        title: "Freedom Breathing",
        type: 'GUIDED_PRACTICE',
        estimatedSeconds: 240,
        gatingRequired: true,
        practiceType: 'BREATHING',
      },
      {
        id: 'd6m4',
        title: "Celebration Practice",
        type: 'GUIDED_PRACTICE',
        estimatedSeconds: 180,
        gatingRequired: true,
        practiceType: 'BODY_SCAN',
      },
    ]
  },
  {
    dayNumber: 7,
    title: "Staying Smoke-Free",
    subtitle: "Coping with Cravings",
    modules: [
      {
        id: 'd7m1',
        title: "Your First Smoke-Free Day",
        type: 'ANIMATED_SLIDES',
        estimatedSeconds: 300,
        gatingRequired: true,
        content: {
          slides: [
            { id: 's1', title: "Congratulations!", content: "You woke up as a non-smoker. How does it feel? Any discomfort is just the last of the nicotine leaving.", backgroundGradient: "bg-gradient-to-br from-success/80 to-primary/80", icon: "🌟" },
            { id: 's2', title: "What You Might Feel", content: "Slight restlessness. Occasional thoughts of smoking. These are normal and temporary.", backgroundGradient: "bg-gradient-to-br from-primary/80 to-accent/80", icon: "💭" },
            { id: 's3', title: "The 5 D's Strategy", content: "Delay, Deep Breathe, Drink Water, Do Something, Discuss It. These tools work.", backgroundGradient: "bg-gradient-to-br from-accent/80 to-freedom/80", icon: "✋" },
            { id: 's4', title: "Remember The Truth", content: "Any craving is just an empty habit calling. There's no genuine need—just a conditioned response.", backgroundGradient: "bg-gradient-to-br from-freedom/80 to-success/80", icon: "💡" },
          ]
        }
      },
      {
        id: 'd7m2',
        title: "Handling Triggers",
        type: 'ANIMATED_SLIDES',
        estimatedSeconds: 360,
        gatingRequired: true,
        content: {
          slides: [
            { id: 's1', title: "Coffee Without Cigarettes", content: "Your first coffee as a non-smoker might feel strange. That's just an old association dying.", backgroundGradient: "bg-gradient-to-br from-coral/80 to-primary/80", icon: "☕" },
            { id: 's2', title: "Stress Happens", content: "When stress comes, breathe. Walk. Talk to someone. You'll handle it better without nicotine.", backgroundGradient: "bg-gradient-to-br from-primary/80 to-accent/80", icon: "😤" },
            { id: 's3', title: "Social Situations", content: "You can still be around smokers. Their cigarettes have no power over you. You're free.", backgroundGradient: "bg-gradient-to-br from-accent/80 to-freedom/80", icon: "👥" },
            { id: 's4', title: "Each Trigger Conquered", content: "Every trigger you face without smoking weakens its power. Soon, they'll mean nothing.", backgroundGradient: "bg-gradient-to-br from-freedom/80 to-success/80", icon: "🏆" },
            { id: 's5', title: "Celebrate Every Victory", content: "First coffee, first stress, first social event—each one smoke-free is a triumph.", backgroundGradient: "bg-gradient-to-br from-success/80 to-primary/80", icon: "🎉" },
          ]
        }
      },
      {
        id: 'd7m3',
        title: "Urge Surfing Mastery",
        type: 'GUIDED_PRACTICE',
        estimatedSeconds: 300,
        gatingRequired: true,
        practiceType: 'URGE_SURFING',
      },
      {
        id: 'd7m4',
        title: "Evening Check-in",
        type: 'CHECKPOINT',
        description: "You've made it through Day 1 smoke-free. How do you feel?",
        estimatedSeconds: 120,
        gatingRequired: false,
      },
    ]
  },
  {
    dayNumber: 8,
    title: "Building New Habits",
    subtitle: "Creating Your Smoke-Free Identity",
    modules: [
      {
        id: 'd8m1',
        title: "Identity Shift",
        type: 'ANIMATED_SLIDES',
        estimatedSeconds: 300,
        gatingRequired: true,
        content: {
          slides: [
            { id: 's1', title: "You Are A Non-Smoker", content: "Not 'trying to quit.' Not 'an ex-smoker.' You are, simply, someone who doesn't smoke.", backgroundGradient: "bg-gradient-to-br from-primary/80 to-success/80", icon: "👤" },
            { id: 's2', title: "Identity Matters", content: "When you see yourself as a non-smoker, cigarettes become irrelevant—not tempting.", backgroundGradient: "bg-gradient-to-br from-success/80 to-freedom/80", icon: "✨" },
            { id: 's3', title: "New Habits Forming", content: "Your brain is already creating new pathways. Every day without smoking strengthens them.", backgroundGradient: "bg-gradient-to-br from-freedom/80 to-accent/80", icon: "🧠" },
            { id: 's4', title: "Who Do You Want To Be?", content: "Picture yourself in a year. Healthy, free, energetic. That person is emerging now.", backgroundGradient: "bg-gradient-to-br from-accent/80 to-primary/80", icon: "🔮" },
          ]
        }
      },
      {
        id: 'd8m2',
        title: "Your New Routines",
        type: 'ANIMATED_SLIDES',
        estimatedSeconds: 360,
        gatingRequired: true,
        content: {
          slides: [
            { id: 's1', title: "Morning Ritual", content: "Replace the morning cigarette with something nourishing—tea, stretching, fresh air.", backgroundGradient: "bg-gradient-to-br from-coral/80 to-primary/80", icon: "🌅" },
            { id: 's2', title: "Work Breaks", content: "Step outside for fresh air, not smoke. Your lungs are healing with every breath.", backgroundGradient: "bg-gradient-to-br from-primary/80 to-accent/80", icon: "💼" },
            { id: 's3', title: "After Meals", content: "Have a mint, take a walk, call a friend. The old habit is fading.", backgroundGradient: "bg-gradient-to-br from-accent/80 to-freedom/80", icon: "🍽️" },
            { id: 's4', title: "Evening Wind-Down", content: "Herbal tea, reading, meditation. You're learning to relax naturally, deeply.", backgroundGradient: "bg-gradient-to-br from-freedom/80 to-success/80", icon: "🌙" },
            { id: 's5', title: "Reward Yourself", content: "Use the money you're saving for something wonderful. You've earned it.", backgroundGradient: "bg-gradient-to-br from-success/80 to-primary/80", icon: "🎁" },
          ]
        }
      },
      {
        id: 'd8m3',
        title: "Body Scan Healing",
        type: 'GUIDED_PRACTICE',
        estimatedSeconds: 300,
        gatingRequired: true,
        practiceType: 'BODY_SCAN',
      },
      {
        id: 'd8m4',
        title: "Affirmation Breathing",
        type: 'GUIDED_PRACTICE',
        estimatedSeconds: 180,
        gatingRequired: true,
        practiceType: 'BREATHING',
      },
    ]
  },
  {
    dayNumber: 9,
    title: "Long-Term Success",
    subtitle: "Preventing Relapse Forever",
    modules: [
      {
        id: 'd9m1',
        title: "Dangerous Thoughts",
        type: 'ANIMATED_SLIDES',
        estimatedSeconds: 360,
        gatingRequired: true,
        content: {
          slides: [
            { id: 's1', title: "The 'Just One' Trap", content: "There's no such thing as 'just one.' One cigarette reawakens the addiction.", backgroundGradient: "bg-gradient-to-br from-coral/80 to-primary/80", icon: "⚠️" },
            { id: 's2', title: "Romanticizing The Past", content: "Your mind might remember 'good times' with cigarettes. Those were illusions—relief, not pleasure.", backgroundGradient: "bg-gradient-to-br from-primary/80 to-accent/80", icon: "💭" },
            { id: 's3', title: "Stress Relapse", content: "Some think, 'I'll smoke during this crisis and quit again.' This never works.", backgroundGradient: "bg-gradient-to-br from-accent/80 to-freedom/80", icon: "😰" },
            { id: 's4', title: "Social Pressure", content: "Others might offer cigarettes. Saying 'No thanks, I don't smoke' is powerful and true.", backgroundGradient: "bg-gradient-to-br from-freedom/80 to-success/80", icon: "👥" },
            { id: 's5', title: "The Defense", content: "Whenever tempted, remember: cigarettes gave you nothing. There's nothing to go back to.", backgroundGradient: "bg-gradient-to-br from-success/80 to-primary/80", icon: "🛡️" },
          ]
        }
      },
      {
        id: 'd9m2',
        title: "Future Planning",
        type: 'ANIMATED_SLIDES',
        estimatedSeconds: 300,
        gatingRequired: true,
        content: {
          slides: [
            { id: 's1', title: "High-Risk Moments", content: "Think ahead: parties, stress, celebrations. How will you stay free?", backgroundGradient: "bg-gradient-to-br from-primary/80 to-accent/80", icon: "📋" },
            { id: 's2', title: "Your Toolkit", content: "Breathing, urge surfing, calling a friend, this app. You have everything you need.", backgroundGradient: "bg-gradient-to-br from-accent/80 to-freedom/80", icon: "🧰" },
            { id: 's3', title: "Support Network", content: "Tell people you've quit. Their support matters. Let them celebrate with you.", backgroundGradient: "bg-gradient-to-br from-freedom/80 to-success/80", icon: "❤️" },
            { id: 's4', title: "Forever Free", content: "You're not on a 10-day program. You're free for life. This is your new reality.", backgroundGradient: "bg-gradient-to-br from-success/80 to-primary/80", icon: "🌟" },
          ]
        }
      },
      {
        id: 'd9m3',
        title: "Urge Surfing Mastery",
        type: 'GUIDED_PRACTICE',
        estimatedSeconds: 240,
        gatingRequired: true,
        practiceType: 'URGE_SURFING',
      },
      {
        id: 'd9m4',
        title: "Commitment Breathing",
        type: 'GUIDED_PRACTICE',
        estimatedSeconds: 180,
        gatingRequired: true,
        practiceType: 'BREATHING',
      },
    ]
  },
  {
    dayNumber: 10,
    title: "Your Smoke-Free Future",
    subtitle: "Graduation & Celebration",
    modules: [
      {
        id: 'd10m1',
        title: "Celebrating Your Journey",
        type: 'ANIMATED_SLIDES',
        estimatedSeconds: 360,
        gatingRequired: true,
        content: {
          slides: [
            { id: 's1', title: "You Did It!", content: "10 days ago, you started a journey. Today, you graduate as a non-smoker.", backgroundGradient: "bg-gradient-to-br from-success/80 to-primary/80", icon: "🎓" },
            { id: 's2', title: "What You've Achieved", content: "You've broken free from nicotine addiction. Your body is healing. Your mind is clear.", backgroundGradient: "bg-gradient-to-br from-primary/80 to-freedom/80", icon: "🏆" },
            { id: 's3', title: "The Changes Happening", content: "Your lungs are recovering. Your senses are sharper. Your energy is returning.", backgroundGradient: "bg-gradient-to-br from-freedom/80 to-accent/80", icon: "✨" },
            { id: 's4', title: "The Money Saved", content: "Calculate how much you'll save in a year. Treat yourself. You deserve it.", backgroundGradient: "bg-gradient-to-br from-accent/80 to-coral/80", icon: "💰" },
            { id: 's5', title: "The Life Gained", content: "Every day smoke-free adds hours to your life. Time with loved ones. Time for dreams.", backgroundGradient: "bg-gradient-to-br from-coral/80 to-success/80", icon: "⏳" },
          ]
        }
      },
      {
        id: 'd10m2',
        title: "Your Future Self",
        type: 'ANIMATED_SLIDES',
        estimatedSeconds: 300,
        gatingRequired: true,
        content: {
          slides: [
            { id: 's1', title: "One Month From Now", content: "Easier breathing. Better sleep. More money. Deeper pride.", backgroundGradient: "bg-gradient-to-br from-primary/80 to-success/80", icon: "📅" },
            { id: 's2', title: "One Year From Now", content: "Heart disease risk cut in half. Thousands saved. Complete freedom.", backgroundGradient: "bg-gradient-to-br from-success/80 to-freedom/80", icon: "🌟" },
            { id: 's3', title: "The Rest Of Your Life", content: "Never again a slave to cigarettes. Never again worried about your health. Free.", backgroundGradient: "bg-gradient-to-br from-freedom/80 to-accent/80", icon: "🕊️" },
            { id: 's4', title: "Thank Yourself", content: "You showed incredible courage. You faced the truth. You won.", backgroundGradient: "bg-gradient-to-br from-accent/80 to-primary/80", icon: "🙏" },
          ]
        }
      },
      {
        id: 'd10m3',
        title: "Graduation Breathing",
        type: 'GUIDED_PRACTICE',
        estimatedSeconds: 180,
        gatingRequired: true,
        practiceType: 'BREATHING',
      },
      {
        id: 'd10m4',
        title: "Final Body Scan",
        type: 'GUIDED_PRACTICE',
        estimatedSeconds: 300,
        gatingRequired: true,
        practiceType: 'BODY_SCAN',
      },
      {
        id: 'd10m5',
        title: "Your Graduation",
        type: 'CHECKPOINT',
        description: "You've completed the UnCrave program. You are now officially a non-smoker!",
        estimatedSeconds: 60,
        gatingRequired: false,
      },
    ]
  },
];
