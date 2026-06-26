// Session modules data for all 10 days
// Each day has 4-6 modules totaling 15-20 minutes minimum

export interface SessionModule {
  id: string;
  title: string;
  description?: string;
  type: 'STORY_VIDEO' | 'ANIMATED_SLIDES' | 'COACH_VIDEO' | 'GUIDED_PRACTICE' | 'CHECKPOINT' | 'CRAVING_TOOL' | 'TRIGGER_ALTERNATIVES';
  estimatedSeconds: number;
  gatingRequired: boolean;
  practiceType?: 'BREATHING' | 'URGE_SURFING' | 'BODY_SCAN' | 'TRIGGER_SCAN' | 'THOUGHT_REFRAME' | 'VISUALIZATION';
  content?: {
    slides?: Array<{ 
      id: string; 
      title: string; 
      content: string; 
      backgroundGradient?: string; 
      backgroundImage?: string;
      textPosition?: 'top' | 'center' | 'bottom' | 'top-left' | 'bottom-left';
      icon?: string; 
      narration?: string;
    }>;
    videoUrl?: string;
    transcript?: string;
    practiceConfig?: Record<string, unknown>;
    // Checkpoint-specific content
    checkpointType?: 'GOODBYE_LETTER' | 'REFLECTION' | 'COMMITMENT';
    title?: string;
    description?: string;
    promptText?: string;
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
        description: "Introduction to the program and what to expect over 10 days.",
        type: 'ANIMATED_SLIDES',
        estimatedSeconds: 360, // 6:00 - more time for rich content
        gatingRequired: true,
        content: {
          slides: [
            // Text-first slides for narration impact
            {
              id: 's1',
              title: "Welcome",
              content: "Hello, and welcome. I'm so glad you're here.",
              backgroundGradient: "bg-gradient-to-br from-primary/90 to-coral/80",
              icon: "👋",
              narration: "Hello, and welcome. I'm so glad you're here. Today marks Day 1 of your journey to becoming completely smoke-free."
            },
            {
              id: 's2',
              title: "A New Journey Begins",
              content: "Today marks Day 1 of your journey to becoming completely smoke-free.",
              backgroundImage: "/__l5e/assets-v1/b79561c8-6a41-4265-9c5a-022dece6c86f/slide1-journey-begins.jpg",
              textPosition: 'bottom',
              narration: "Before we go any further, I want you to pause and really appreciate this moment. You made a choice. You chose to be here. That might sound simple, but it's not. Every single person who has ever quit smoking started exactly where you are right now – making that first decision to try. So congratulations. Seriously. Give yourself credit. You've already done something that millions of smokers never do: you've taken action."
            },
            {
              id: 's3',
              title: "I Know What It's Like",
              content: "The constant planning around smoke breaks. The guilt after every cigarette. The fear that you can't quit.",
              backgroundGradient: "bg-gradient-to-br from-muted/90 to-primary/80",
              icon: "💭",
              narration: "I know what it's like. I really do. I know what it feels like to wake up in the morning and reach for a cigarette before your feet even touch the floor. I know the way you plan your entire day around smoke breaks – meetings, car rides, dinners, all scheduled around when you can slip away to light up."
            },
            {
              id: 's4',
              title: "You're Not Alone",
              content: "You're not weaker or more addicted than everyone else. And over the next 10 days, I'm going to prove it.",
              backgroundImage: "/__l5e/assets-v1/4b864420-6fb5-44b9-95a2-bccaf990e87b/slide2-not-alone.jpg",
              textPosition: 'bottom',
              narration: "I know the guilt that washes over you after every single cigarette, that voice in your head that says 'I should quit' while your hand is already reaching for the pack. And I know the fear. The fear that you can't do it. That you've tried before and failed. That you're somehow different, weaker, more addicted than everyone else. You're not. And over the next 10 days, I'm going to prove it to you."
            },
            {
              id: 's5',
              title: "The Real Secret",
              content: "We don't start by changing your behavior. We start by changing your mind.",
              backgroundGradient: "bg-gradient-to-br from-success/80 to-freedom/80",
              icon: "🧠",
              narration: "Here's the secret that changed everything for me, and for the millions of people who have successfully quit using this approach: we don't start by changing your behavior. We start by changing your mind."
            },
            {
              id: 's6',
              title: "Rewiring Your Mind",
              content: "What if, by the time you smoke your last cigarette, you actually don't want to smoke anymore?",
              backgroundImage: "/__l5e/assets-v1/33406848-171c-4ff6-842a-18ca6b6adcac/slide3-real-secret.jpg",
              textPosition: 'bottom',
              narration: "Think about it. Right now, somewhere in your brain, smoking is connected to positive things – relaxation, stress relief, social connection, pleasure after a meal. These associations are powerful. They've been built up over years, maybe decades. If you try to quit while those associations are still there, you'll feel like you're giving something up. But what if we could rewire those associations first? What if, by the time you smoke your last cigarette, you actually don't want to smoke anymore? That's exactly what we're going to do. No willpower required."
            },
            {
              id: 's7',
              title: "Sarah's Story",
              content: "She started smoking at 16. By 39, she was smoking two packs a day. She'd tried to quit 11 times.",
              backgroundGradient: "bg-gradient-to-br from-coral/80 to-primary/80",
              icon: "📖",
              narration: "Let me tell you about someone I'll call Sarah. Sarah started smoking when she was 16. By the time she found this program, she was 39 years old and smoking two packs a day. Twenty-three years. Forty cigarettes daily. She'd tried to quit eleven times."
            },
            {
              id: 's8',
              title: "A Hopeless Case?",
              content: "Cold turkey, patches, gum, medications, hypnotherapy – she'd tried it all. Each time, she'd go back.",
              backgroundImage: "/__l5e/assets-v1/9ceea350-3a5b-42b1-a204-e6e1f50e3d2c/slide4-sarah-story.jpg",
              textPosition: 'bottom',
              narration: "Cold turkey, nicotine patches, gum, prescription medications, hypnotherapy – she'd tried it all. Each time, she'd last a few days, maybe a few weeks, and then something would happen. Stress at work. A fight with her husband. A night out with friends. And she'd smoke 'just one.' Just one turned into just a few. And before she knew it, she was right back where she started, only now with added shame and the conviction that she simply couldn't quit. She was, as she put it, 'a hopeless case.' But she wasn't. And neither are you."
            },
            {
              id: 's9',
              title: "The Transformation",
              content: "On Day 11, she woke up and didn't want a cigarette. The urge simply wasn't there.",
              backgroundGradient: "bg-gradient-to-br from-freedom/80 to-success/80",
              icon: "✨",
              narration: "Sarah completed this 10-day program, just like you're starting today. And something remarkable happened. On Day 11, she woke up, and for the first time in 23 years, she didn't want a cigarette. Not because she was fighting the urge with willpower. The urge simply wasn't there."
            },
            {
              id: 's10',
              title: "Three Years Free",
              content: "She said it felt like waking up from a strange dream. That's what's possible for you.",
              backgroundImage: "/__l5e/assets-v1/80b23f26-98e1-4028-b012-14ec30a81be1/slide5-transformation.jpg",
              textPosition: 'bottom',
              narration: "She said it felt like waking up from a strange dream, like she'd been under some kind of spell, and now she was finally awake. It's been three years now. She hasn't smoked a single cigarette. And she doesn't miss it. Not even a little. That's what's possible. That's what I want for you. And it starts right here, right now, today."
            },
            {
              id: 's11',
              title: "Imagine Freedom",
              content: "Imagine quitting smoking and not feeling deprived. Not feeling like you're missing out.",
              backgroundGradient: "bg-gradient-to-br from-primary/80 to-accent/80",
              icon: "🕊️",
              narration: "I want you to imagine something. Imagine quitting smoking and not feeling deprived. Not feeling like you're missing out on something. Not white-knuckling through every meal, every coffee break, every stressful moment."
            },
            {
              id: 's12',
              title: "Real Freedom",
              content: "'I can't have a cigarette' is misery. 'I don't want a cigarette' is freedom.",
              backgroundImage: "/__l5e/assets-v1/e0447c90-c03a-42ab-a7d7-7ff2ece80723/slide6-freedom.jpg",
              textPosition: 'bottom',
              narration: "Instead, imagine thinking 'I don't want a cigarette.' Those two phrases might sound similar, but they're worlds apart. 'I can't' is restriction. It's deprivation. It's misery. 'I don't want to' is freedom. And that's what this program delivers. Freedom. Real freedom. The kind where you walk past other smokers and feel relief that you're not them anymore. I know it might sound too good to be true right now. And that's okay. You don't need to believe me yet. Just stay with me for the next 10 days, and let me show you."
            },
          ]
        }
      },
      {
        id: 'd1m2',
        title: "Your Reasons to Quit",
        description: "Reflect on and record your personal motivations for becoming smoke-free.",
        type: 'CHECKPOINT',
        estimatedSeconds: 180, // 3:00
        gatingRequired: true,
        content: {
          slides: [
            {
              id: 's1',
              title: "What Are Your Reasons?",
              content: "Everyone has their own reasons for quitting. Maybe it's for your family, your health, or your finances. What are yours?",
              backgroundGradient: "bg-gradient-to-br from-primary/80 to-coral/80",
              icon: "💭"
            }
          ]
        }
      },
      {
        id: 'd1m3',
        title: "The 10-Day Roadmap",
        description: "Learn what to expect each day of your journey.",
        type: 'ANIMATED_SLIDES',
        estimatedSeconds: 300, // 5:00
        gatingRequired: true,
        content: {
          slides: [
            {
              id: 's1',
              title: "Your Daily Commitment",
              content: "Each day, you'll spend about 15-20 minutes with me. That's it. Less time than you spend smoking each day.",
              backgroundGradient: "bg-gradient-to-br from-muted/80 to-primary/80",
              icon: "⏰",
              narration: "Here's what the next 10 days will look like. Each day, you'll spend about 15 to 20 minutes with me. That's it. Think about that for a second. You probably spend more time than that smoking every single day. The time you spend walking outside, finding a spot, lighting up, actually smoking, and coming back in – it adds up. So we're asking for less time than your cigarettes already take. But in that time, we're going to do something powerful. We're going to have a conversation. A real conversation about smoking, about addiction, about freedom. I'll share insights that will completely change how you see cigarettes. And slowly, session by session, your mind will shift."
            },
            {
              id: 's2',
              title: "Interactive Learning",
              content: "Videos, animations, interactive exercises – each session is designed to engage you and make the learning stick.",
              backgroundGradient: "bg-gradient-to-br from-primary/80 to-accent/80",
              icon: "🎯",
              narration: "These sessions aren't lectures. They're experiences. You'll watch videos that illustrate key concepts in ways that really stick. You'll do interactive exercises that make you think and reflect. You'll practice breathing techniques that you can use whenever cravings hit. And most importantly, you'll have moments of real insight – those 'aha' moments where everything suddenly clicks into place. I've seen people have these breakthroughs and literally laugh out loud because they finally see how ridiculous the whole trap of smoking really is. That's what we're building toward. Not just knowledge, but genuine understanding that changes you at your core."
            },
            {
              id: 's3',
              title: "Days 1-5: Understanding",
              content: "The first half is about understanding. Why you smoke. How nicotine works. What triggers your cravings. This knowledge is your foundation.",
              backgroundGradient: "bg-gradient-to-br from-success/80 to-freedom/80",
              icon: "🔍",
              narration: "The first five days are all about understanding. We're going to explore why you really smoke – and I promise, the reasons aren't what you think. We'll dive into how nicotine actually works in your brain, and you'll see that you've been caught in an incredibly clever trap. We'll identify your personal triggers – the specific situations, emotions, and routines that make you reach for a cigarette. And we'll learn powerful techniques from psychology that help you break the mental associations that keep you stuck. By the end of Day 5, you'll see smoking in a completely new light. The fog will start to lift. And you'll be ready for what comes next."
            },
            {
              id: 's4',
              title: "The Mental Shift",
              content: "Something magical happens around Day 5. People describe it like a switch flipping – suddenly, cigarettes look different.",
              backgroundGradient: "bg-gradient-to-br from-freedom/80 to-primary/80",
              icon: "💡",
              narration: "People who go through this program often describe a moment – usually around Day 5 – where something shifts. It's hard to put into words, but many describe it like a switch flipping in their mind. One day, cigarettes feel like a friend, a companion, something you need. And then suddenly, it's like you wake up and see them for what they really are: a trap. A scam. Something that's been taking from you while pretending to give. This shift doesn't happen through willpower. It happens through understanding. When you truly see the trick that's been played on you, you can't unsee it. And that's when quitting stops being hard and starts being exciting. Because you're not giving something up – you're escaping from a prison."
            },
            {
              id: 's5',
              title: "Day 6: Your Last Cigarette",
              content: "On Day 6, you'll smoke your final cigarette. But here's the beautiful part: by then, you'll actually want to.",
              backgroundGradient: "bg-gradient-to-br from-primary/80 to-success/80",
              icon: "🚫",
              narration: "On Day 6, if you follow along with the program, you'll smoke your last cigarette. Now, I know that might sound scary right now. Your mind might be screaming 'I'm not ready!' or 'That's too soon!' That's completely normal. That's the addiction talking. But here's what's beautiful: by the time you reach Day 6, you won't be dreading that last cigarette – you'll be looking forward to it. Because by then, you'll understand. You'll see cigarettes for what they really are. And putting out that final cigarette won't feel like loss or deprivation. It will feel like breaking chains. It will feel like freedom. It will feel like the beginning of the rest of your life."
            },
            {
              id: 's6',
              title: "Days 7-10: Building Your New Life",
              content: "The final days cement your transformation. You'll learn to handle any situation, any emotion, any temptation – without ever needing a cigarette again.",
              backgroundGradient: "bg-gradient-to-br from-accent/80 to-freedom/80",
              icon: "🏆",
              narration: "After Day 6, you're a non-smoker. But we don't stop there. Days 7 through 10 are about solidifying your new identity and making sure you stay free forever. We'll practice handling the situations that used to trigger you – stress, social events, that after-meal moment. You'll build new, healthier habits to fill the space cigarettes used to occupy. And you'll develop an unshakeable confidence in your ability to handle any craving that comes your way. By Day 10, you won't just be someone who quit smoking. You'll be someone who is genuinely, completely, joyfully free. Someone who doesn't miss cigarettes because there's nothing to miss. That's the promise of this program. And I'm going to help you get there."
            },
          ]
        }
      },
      {
        id: 'd1m4',
        title: "Why This Works",
        description: "Understand the science behind our approach and why it's different.",
        type: 'ANIMATED_SLIDES',
        estimatedSeconds: 360, // 6:00
        gatingRequired: true,
        content: {
          slides: [
            {
              id: 's1',
              title: "The Science Is Clear",
              content: "Studies show this method makes you 2x more likely to quit successfully. But more importantly, people who quit this way don't miss smoking.",
              backgroundGradient: "bg-gradient-to-br from-primary/80 to-coral/80",
              icon: "📊",
              narration: "I want to share some numbers with you, because I know you might be skeptical. Clinical studies have shown that using a supportive, structured program like this can make you nearly twice as likely to quit successfully compared to going it alone. That's not marketing – that's science. But honestly, the statistics aren't even the most important part. What matters more is the quality of your quit. There's a big difference between someone who quits smoking but spends years feeling deprived and missing cigarettes, and someone who quits and genuinely doesn't want to smoke anymore. This method doesn't just help you quit – it helps you quit happy. It helps you quit in a way where you feel liberated, not deprived. And that's why it lasts."
            },
            {
              id: 's2',
              title: "No Lectures Here",
              content: "I'm not going to tell you smoking is bad. You already know that. Instead, I'm going to show you something that will change everything.",
              backgroundGradient: "bg-gradient-to-br from-coral/80 to-freedom/80",
              icon: "🤗",
              narration: "Here's what I'm not going to do. I'm not going to lecture you about how smoking causes cancer, heart disease, strokes, and a hundred other health problems. You already know that. Every smoker knows that. It's printed right on the pack. And has knowing that made you quit? No. Because information alone doesn't change behavior. If it did, no one would smoke, no one would overeat, and everyone would exercise daily. The problem isn't that you don't know smoking is bad. The problem is that knowing isn't enough. We need something deeper. We need to change the way you feel about smoking, not just the way you think about it. And that's what this program does. It reaches the parts of your mind that willpower and logic can't touch."
            },
            {
              id: 's3',
              title: "If You've Failed Before",
              content: "The average successful quitter has tried 6-7 times before. Past failures aren't weakness – they're practice. This time will be different.",
              backgroundGradient: "bg-gradient-to-br from-freedom/80 to-success/80",
              icon: "🔄",
              narration: "If you've tried to quit before and didn't make it, I want you to hear something important. You are not a failure. The average successful quitter has tried six to seven times before finally succeeding for good. Six to seven times. So if you've tried once or twice or ten times, you're not behind – you're right on track. Each attempt taught you something. Each attempt got you closer. The problem wasn't you – it was probably the method. Willpower-based approaches are designed to fail because they treat cigarettes as something you want but can't have. That's a recipe for misery and relapse. This method is different. We're not going to fight your desire to smoke. We're going to remove it. Once the desire is gone, there's nothing to fight. Quitting becomes almost automatic."
            },
            {
              id: 's4',
              title: "The Moment Everything Changes",
              content: "There's a moment in this program where it all clicks. Where you see through the illusion. That moment changes everything.",
              backgroundGradient: "bg-gradient-to-br from-success/80 to-primary/80",
              icon: "🎉",
              narration: "I want to prepare you for something wonderful that's going to happen during this program. At some point – maybe during a session, maybe while you're smoking a cigarette, maybe while you're just going about your day – you're going to have a moment of clarity. It's like suddenly seeing a magic trick from behind the scenes. You'll realize: 'Wait, cigarettes don't actually give me anything. They just take. They create the problem they pretend to solve. I've been conned.' And in that moment, everything changes. The cigarette in your hand suddenly looks different. Not like a friend. Not like a comfort. Like... nothing. Just a paper tube filled with dried leaves and chemicals that's been stealing your money, your health, and your freedom while pretending to help. That moment of clarity is coming for you. I can't tell you exactly when it will hit. But when it does, you'll know. And you'll never see smoking the same way again."
            },
            {
              id: 's5',
              title: "Your Future Self",
              content: "Close your eyes. Picture yourself in two weeks. Free. Breathing deeply. Proud. That person is waiting for you to take this journey.",
              backgroundGradient: "bg-gradient-to-br from-primary/80 to-freedom/80",
              icon: "🕊️",
              narration: "I want you to take a deep breath right now. Actually do it. In through your nose, filling your lungs completely, then slowly out through your mouth. Good. Now, I want you to imagine yourself two weeks from now. You wake up in the morning, and the first thing you notice is... nothing. No urge to smoke. No planning your first cigarette of the day. Just... peace. You make your morning coffee, and you drink it without needing to smoke. You eat breakfast, and there's no cigarette to follow. The whole day stretches before you, and at no point do you feel like you're missing something or fighting an urge. Because you're not. You're simply free. That person – that future version of you – is real. They're waiting for you on the other side of these 10 days. And getting there is going to be so much easier than you think. All you have to do is show up, follow the program, and stay open to change. That's it. The rest will happen naturally."
            },
          ]
        }
      },
      {
        id: 'd1m5',
        title: "Visualization Exercise",
        description: "Visualize yourself as a non-smoker on Day 11.",
        type: 'GUIDED_PRACTICE',
        estimatedSeconds: 180, // 3:00
        gatingRequired: true,
        practiceType: 'VISUALIZATION',
      },
      {
        id: 'd1m6',
        title: "Your Commitment",
        description: "Close Day 1 with a commitment to continue tomorrow.",
        type: 'ANIMATED_SLIDES',
        estimatedSeconds: 180, // 3:00
        gatingRequired: true,
        content: {
          slides: [
            {
              id: 's1',
              title: "You Have Support",
              content: "You're not doing this alone. We're here with you, every step of the way, through every craving, every doubt, every victory.",
              backgroundGradient: "bg-gradient-to-br from-primary/80 to-coral/80",
              icon: "❤️",
              narration: "Before we wrap up today, I want you to know something important: you are not alone in this. I know that quitting can feel isolating sometimes. Your friends might still smoke. Your family might not understand what you're going through. You might feel like you have to fight this battle by yourself. But you don't. Throughout this program, you have support available whenever you need it. Having a rough moment? There's help available. Need to vent about a craving? We're here. Want to celebrate a victory? We want to hear about it. This journey is yours, but you don't have to walk it alone. Thousands of people have gone through this program before you, and thousands more will come after. You're part of something bigger. A community of people who are reclaiming their freedom, one day at a time."
            },
            {
              id: 's2',
              title: "Your One Task Today",
              content: "Just one thing: commit. Say to yourself, 'I am doing this. I'm giving myself these 10 days.' That's all you need to do.",
              backgroundGradient: "bg-gradient-to-br from-coral/80 to-freedom/80",
              icon: "✅",
              narration: "Okay, so what do you need to do today? Just one thing. Make a commitment. Not a commitment to never smoke again – we're not there yet. Just a commitment to give yourself these 10 days. That's it. Say it out loud if you can. Say: 'I am doing this. I am giving myself these 10 days to change my life.' Write it down somewhere. Put it as a reminder on your phone. Tell someone you trust. Making a commitment out loud or in writing activates something in our brains. It makes it real. It transforms a vague intention into a concrete decision. And decisions have power. So right now, commit. Not forever. Just 10 days. You can do anything for 10 days. And these 10 days might just be the most important of your life."
            },
            {
              id: 's3',
              title: "Keep Smoking – With Awareness",
              content: "You can smoke as usual today. But start noticing. How does each cigarette make you feel? Really feel?",
              backgroundGradient: "bg-gradient-to-br from-freedom/80 to-success/80",
              icon: "📅",
              narration: "Here's what I want you to do between now and tomorrow's session. Keep smoking as you normally do. Don't try to cut down. Don't feel guilty about it. But – and this is important – start paying attention. When you smoke your next cigarette, really notice it. Before you light up, check in with yourself: how are you feeling? After you smoke, check in again: how are you feeling now? Better? Worse? The same? Most of us smoke on autopilot. We light up without thinking, smoke without noticing, and before we know it, the cigarette is gone. Starting today, I want you to turn off the autopilot. Just observe. Be curious. You might be surprised by what you discover."
            },
            {
              id: 's4',
              title: "Celebrate This Moment",
              content: "By starting this program, you've already done something most smokers never do. You've taken action. That takes real courage.",
              backgroundGradient: "bg-gradient-to-br from-success/80 to-primary/80",
              icon: "🏅",
              narration: "Before we finish today, I want you to really let this sink in: you've already accomplished something significant. You might not feel like it. You might be thinking, 'I haven't quit yet. I haven't done anything.' But that's not true. You made a decision. You sought out help. You started Day 1 of a program that's going to change your life. Do you know how many smokers think about quitting and never take any action? Most of them. For every person who starts a quit-smoking program, there are dozens who just keep smoking and thinking 'someday.' But you? You're here. Today. That takes courage. That takes initiative. That's something to be proud of. So give yourself a moment of real appreciation. You deserve it."
            },
            {
              id: 's5',
              title: "What's Coming Tomorrow",
              content: "Tomorrow, we uncover the truth about nicotine addiction. What you learn will shock you – and start setting you free.",
              backgroundGradient: "bg-gradient-to-br from-primary/80 to-freedom/80",
              icon: "🌅",
              narration: "Tomorrow, in Day 2, we're going to dive deep into understanding your addiction. And I have to tell you, what you're going to learn is going to blow your mind. We'll explore exactly how nicotine works in your brain, why it's so addictive, and – here's the good news – why breaking free is actually much easier than you think. You'll discover that the entire structure of addiction is built on an illusion. And once you see through that illusion, it starts to crumble. I can't wait to share this with you. So please, come back tomorrow. Set a reminder if you need to. Make it a priority. Each day builds on the last, and Day 2 is where we really start pulling back the curtain on the magic trick that's been fooling you for years. Thank you for being here today. I'm honored to be part of your journey. See you tomorrow."
            },
          ]
        }
      },
    ]
  },
  {
    dayNumber: 2,
    title: "Why Do I Smoke?",
    subtitle: "Understanding Addiction & Beliefs",
    modules: [
      {
        id: 'd2m1',
        title: "Welcome to Day 2",
        description: "Understanding the fundamental question: Why do you smoke?",
        type: 'ANIMATED_SLIDES',
        estimatedSeconds: 420, // 7:00
        gatingRequired: true,
        content: {
          slides: [
            {
              id: 's1',
              title: "Welcome Back!",
              content: "Day 2 – great to see you here. Today we're going to answer a fundamental question: Why do you smoke?",
              backgroundGradient: "bg-gradient-to-br from-primary/80 to-accent/80",
              icon: "👋",
              narration: "Welcome back! Day 2 – great to see you here. Today we're going to answer a fundamental question: Why do you smoke? More specifically, what do you think you're getting from cigarettes? Understanding this is key, because once we unravel the illusion of smoking, the whole habit starts to lose its grip on you. I know that might sound bold, but stick with me. By the end of today's session, you'll see your cigarettes in a completely new light. And once you see the truth, you can't unsee it."
            },
            {
              id: 's2',
              title: "My Reasons vs. Reality",
              content: "On one side: 'It relaxes me,' 'Helps me focus,' 'It's my reward.' On the other side: the surprising truth behind each belief.",
              backgroundGradient: "bg-gradient-to-br from-accent/80 to-coral/80",
              icon: "⚖️",
              narration: "Let me show you something interesting. Imagine two columns. On the left, we have 'My Reasons for Smoking' – the things you genuinely believe cigarettes give you. Things like: 'It relaxes me,' 'It helps me focus,' 'It's a reward or treat,' 'It relieves boredom.' These feel real, don't they? They feel like facts. But on the right column, we have 'Reality' – what's actually happening in your brain and body. And I have to warn you... the reality is quite different from what you might expect. Let's explore each one together."
            },
            {
              id: 's3',
              title: "The Stress Relief Illusion",
              content: "Nicotine actually increases your baseline stress. The 'relief' you feel is just easing the withdrawal that smoking itself created.",
              backgroundGradient: "bg-gradient-to-br from-coral/80 to-muted/80",
              icon: "😰",
              narration: "'I smoke to relax or relieve stress.' This is probably the number one belief. You light up when you're anxious or after a long day, and you feel like it calms you down. But here's the surprising truth: nicotine actually raises your baseline stress levels. When you haven't smoked for a while, your nicotine level drops and your brain starts to panic – this is withdrawal, and it creates a sense of stress and irritability. The cigarette temporarily eases that withdrawal, so you feel a wave of relief – ahh, much better. But that relief is only bringing you back to the baseline of a non-smoker. Studies show smokers actually have higher stress overall than non-smokers, because they go through this constant cycle of mini-withdrawals and relief. It's like wearing tight shoes just for the relief of taking them off. The relaxation is real, but it's fixing a problem that nicotine created in the first place."
            },
            {
              id: 's4',
              title: "The Focus Fallacy",
              content: "Nicotine gives a short-term jolt, but as it wears off, withdrawal kicks in and concentration drops below normal.",
              backgroundGradient: "bg-gradient-to-br from-muted/80 to-success/80",
              icon: "🎯",
              narration: "'I need a cigarette to focus or think.' Nicotine can give a short-term jolt – it releases adrenaline, which can make your heart beat faster and sharpen concentration for a few minutes. But here's the kicker: as that effect wears off, withdrawal kicks in and your concentration actually drops, often leaving you worse off than before. It's why smokers often feel foggy or edgy if they haven't had a cigarette – hardly a recipe for good focus. You might think, 'I do my best work after a smoke break,' but in reality, you could do even better work once your brain is free of the constant nicotine rollercoaster. There are other ways to boost focus – like short breaks with deep breathing or stretching – that don't come with a crash. Non-smokers manage to concentrate just fine. And soon, you will too."
            },
            {
              id: 's5',
              title: "The Pleasure Myth",
              content: "Nicotine triggers dopamine, creating brief 'pleasure.' But notice: is the whole cigarette enjoyable, or just the first puff?",
              backgroundGradient: "bg-gradient-to-br from-success/80 to-freedom/80",
              icon: "😊",
              narration: "'I smoke because I enjoy it – I like the taste, the ritual, it's my me-time or reward.' This one is deeply personal. Cigarettes can feel like a friend, a little treat. Maybe you love that first drag in the morning with coffee, or stepping outside at work to have a moment alone. I get it – it's not just the nicotine, it's the whole ritual. But let's examine that enjoyment. Yes, nicotine triggers dopamine, the pleasure chemical, so there is a brief enjoyment. But everything around that – the taste, the smell, the ash – if you look at it objectively, those aren't truly pleasant for most people after the first puff or two. Have you ever noticed mid-way through a cigarette, it's not as enjoyable as the first puff? Often, smokers will say the best part of a smoke is lighting it – after that, you're mostly just feeding the addiction to avoid feeling bad. In a couple of days, I'll ask you to smoke very slowly and consciously as an exercise, and many people realize during that the taste isn't actually that great – you might even find it unpleasant when you really pay attention."
            },
            {
              id: 's6',
              title: "Habit & Boredom",
              content: "Cigarettes fill the gaps of time. Waiting for a bus? Light up. But habits can be changed – and we have the tools.",
              backgroundGradient: "bg-gradient-to-br from-freedom/80 to-primary/80",
              icon: "🔄",
              narration: "'I smoke out of habit or boredom.' Totally understandable – cigarettes fill in the gaps of time. Waiting for a bus? Light up. Driving? Have one. It's something to do with your hands and a way to punctuate your day. The downside is, it also keeps you trapped – you end up structuring your day around it without even realizing. Checking when you can smoke, stepping out frequently, planning around it. The good news is that habits can be changed. We'll work on the habit loop in detail on Day 3 – identifying those cues and finding new routines that give you a sense of satisfaction. Breaking a habit, especially one you've done thousands of times, might sound hard, but it's very doable with the right approach – and we have that lined up for you. Tomorrow, you'll see exactly how."
            },
            {
              id: 's7',
              title: "The Key Insight",
              content: "Most 'benefits' you think you get from smoking are either illusions or can be achieved in healthier ways. The negatives are very real.",
              backgroundGradient: "bg-gradient-to-br from-primary/80 to-coral/80",
              icon: "💡",
              narration: "Whatever your reasons, the takeaway today is this: Most of the 'benefits' you think you get from smoking are either illusions or can be achieved in healthier ways. And the negatives – well, we all know the health risks, but smoking also causes you daily inconveniences and anxieties that you might not even realize until they're gone. The constant planning around when you can smoke. The guilt after each cigarette. The money disappearing from your wallet. The way you have to step away from conversations, from meals, from moments with loved ones. All of that is about to change. You're going to discover that everything good you thought smoking gave you can be found elsewhere – and everything bad will simply disappear."
            },
          ]
        }
      },
      {
        id: 'd2m2',
        title: "Why Do You Smoke?",
        description: "Interactive exercise to identify your personal beliefs about smoking.",
        type: 'CHECKPOINT',
        estimatedSeconds: 180, // 3:00
        gatingRequired: true,
        content: {
          slides: [
            {
              id: 's1',
              title: "Reflect on Your Reasons",
              content: "Which of these resonate with you? Select all that apply: Stress relief, Focus, Enjoyment, Social connection, Habit/Boredom, Addiction.",
              backgroundGradient: "bg-gradient-to-br from-primary/80 to-freedom/80",
              icon: "🤔",
              narration: "Now let's do a quick exercise. On your screen, you'll see some common reasons people smoke. Go ahead and think about which ones resonate with you – why do you smoke? Be honest with yourself. There's no judgment here. Whether it's for stress relief, focus, enjoyment, social connection, habit, or simply because you feel addicted – these are all very common answers. In fact, I used to believe many of these myself. Thank you for your honesty. Each of these beliefs is something we'll address together, showing you the reality behind the illusion."
            }
          ]
        }
      },
      {
        id: 'd2m3',
        title: "Inside Your Addicted Brain",
        description: "Understanding the neuroscience of nicotine addiction.",
        type: 'ANIMATED_SLIDES',
        estimatedSeconds: 480, // 8:00
        gatingRequired: true,
        content: {
          slides: [
            {
              id: 's1',
              title: "The Science of Addiction",
              content: "Let's look at what actually happens inside your brain when you smoke. Understanding this is power.",
              backgroundGradient: "bg-gradient-to-br from-primary/80 to-accent/80",
              icon: "🧠",
              narration: "Now let's delve into the science a bit – don't worry, we'll keep it simple. You probably know nicotine is addictive. But what does that actually mean inside your brain? Understanding the mechanics of addiction is incredibly empowering. Once you see how the trap works, it becomes much easier to escape it. Think of it like a magic trick – once you know how the illusion is performed, you can never be fooled by it again. Let me show you behind the curtain."
            },
            {
              id: 's2',
              title: "10 Seconds to Your Brain",
              content: "Within 10 seconds of inhaling, nicotine reaches your brain and binds to nicotinic receptors, triggering dopamine release.",
              backgroundGradient: "bg-gradient-to-br from-accent/80 to-coral/80",
              icon: "⚡",
              narration: "Here's what happens each time you smoke: Within 10 seconds of that inhale, nicotine reaches your brain. It binds to nicotinic receptors – they're literally named after nicotine! – and triggers a release of dopamine, that feel-good neurotransmitter. Dopamine is like a big 'YES, DO THAT AGAIN!' signal to your brain. So your brain says, hey, that was nice. Meanwhile, nicotine also causes other effects – a slight increase in heart rate, a bit of adrenaline. This can make you feel alert or comforted or both depending on the context. The drug is weirdly both a stimulant and relaxant. So far, this sounds pretty good, right? But here's where the trap closes..."
            },
            {
              id: 's3',
              title: "The Withdrawal Begins",
              content: "Nicotine leaves your system quickly. Those receptors start 'screaming' for more, creating tension, irritability, and the feeling that you 'need' a cigarette.",
              backgroundGradient: "bg-gradient-to-br from-coral/80 to-muted/80",
              icon: "📉",
              narration: "But nicotine doesn't stick around for long. Your body starts clearing it within minutes. The pleasant feelings fade, and because your brain got used to that nicotine, its absence now registers as a problem. Those nicotinic receptors literally get irritated when they're empty – imagine them kind of yelling, 'Feed me more nicotine!' This is withdrawal – and it starts very soon after finishing a cigarette. That subtle tension builds and builds, and you interpret it as 'I need a cigarette.' It might manifest as difficulty concentrating, slight anxiety, irritability, or just a gnawing feeling that something's off. So you have another cigarette..."
            },
            {
              id: 's4',
              title: "The Endless Loop",
              content: "You smoke → feel relief → nicotine leaves → withdrawal builds → you smoke again. This is the trap. This is addiction.",
              backgroundGradient: "bg-gradient-to-br from-muted/80 to-success/80",
              icon: "🔄",
              narration: "So you have another cigarette, and ahh – those receptors are satisfied again, the discomfort goes away, and dopamine gives you a little pat on the back. Thus the cycle continues. Over time, your brain also associates cigarettes with things – coffee, driving, breaks, emotions – so those situations themselves trigger cravings even before withdrawal kicks in. We'll talk more about those cues tomorrow. But here's the key insight: Smoking doesn't actually give you anything positive long-term – it mostly relieves the symptoms it created. It's like someone tapping your shoulder incessantly – smoking is just telling them 'stop for a moment' but they'll start tapping again soon. This is the nature of addiction. A never-ending loop."
            },
            {
              id: 's5',
              title: "It's Not Your Fault",
              content: "Nicotine addiction is compared to heroin in how addictive it can be. You were trapped by a drug – you're not weak or lacking willpower.",
              backgroundGradient: "bg-gradient-to-br from-success/80 to-freedom/80",
              icon: "❤️",
              narration: "Now, please don't take this as a scolding lecture. It's not. It's empowerment. Because guess what – when you see cigarettes for what they truly are – a delivery system for an addictive drug, wrapped in habit and ritual – you start to take away their mystique, their perceived power. It's not you that's weak or lacking willpower – nicotine is just very good at creating dependency. In fact, nicotine addiction is often compared to heroin in how addictive it can be. But unlike illicit drugs, cigarettes are sold at every corner store, often without any immediate extreme impairment, so we fall into the trap casually and it digs in deep. You were duped by a very clever trap. Now you're waking up to it."
            },
            {
              id: 's6',
              title: "The Tobacco Industry's Design",
              content: "Cigarettes are engineered for maximum addictiveness. You were targeted by billions of dollars of manipulation. Now you're fighting back.",
              backgroundGradient: "bg-gradient-to-br from-freedom/80 to-primary/80",
              icon: "🏭",
              narration: "I also want to briefly mention something important: cigarettes weren't just accidentally addictive. They were engineered this way. The tobacco industry has spent billions of dollars and decades of research figuring out how to make cigarettes as addictive as possible. They've added chemicals to speed nicotine delivery to your brain. They've designed the taste, the packaging, the marketing – all to hook you and keep you hooked. You weren't weak. You were targeted. But now, armed with knowledge, you can break free. Understanding is power. And you're gaining that power right now."
            },
          ]
        }
      },
      {
        id: 'd2m4',
        title: "Why Other Methods Often Fail",
        description: "Understanding why behavioral approaches work better than willpower alone.",
        type: 'ANIMATED_SLIDES',
        estimatedSeconds: 360, // 6:00
        gatingRequired: true,
        content: {
          slides: [
            {
              id: 's1',
              title: "Other Quit Methods",
              content: "Cold turkey, nicotine patches, gum, vaping, medications... You may have tried some of these. Let's talk about why they often fail.",
              backgroundGradient: "bg-gradient-to-br from-primary/80 to-coral/80",
              icon: "📋",
              narration: "I also want to briefly talk about other quit methods and why what we're doing here is special. Maybe you've tried some of these: Cold turkey – just stopping suddenly on your own. Nicotine Replacement Therapy like patches or gum. Medications like Chantix or Zyban. Vaping as a substitute. Or maybe hypnotherapy or acupuncture. There's no one right way to quit – different methods help different people – but the reason we focus on a program like this, which is mostly psychological and behavioral, is that success tends to be higher when you tackle the mental side of smoking along with the physical."
            },
            {
              id: 's2',
              title: "Cold Turkey: 5-10% Success",
              content: "Going cold turkey has tough odds. You have cravings but no mental strategy to handle them. That's why most people relapse.",
              backgroundGradient: "bg-gradient-to-br from-coral/80 to-muted/80",
              icon: "🦃",
              narration: "Going cold turkey has about a 5-10% long-term success rate. It's tough because you have cravings and no mental strategy to handle them. You're relying on pure willpower, and eventually that runs out. You feel deprived, you feel like you're missing something, and sooner or later you crack. The mental battle is exhausting, and without changing how you think about smoking, you're fighting with one hand tied behind your back."
            },
            {
              id: 's3',
              title: "NRT: Addresses Only Physical",
              content: "Nicotine patches and gum soften withdrawal, but many people relapse after stopping because the mental habit remains unchanged.",
              backgroundGradient: "bg-gradient-to-br from-muted/80 to-accent/80",
              icon: "💊",
              narration: "Nicotine gum or patches can double success rates in some cases, because they soften withdrawal. But many people end up relapsing when they stop using them if they haven't changed their habits and thoughts. Plus, some people end up using NRT and still smoking – which defeats the purpose entirely. The physical withdrawal from nicotine is actually quite mild. It's the psychological addiction – the habits, the beliefs, the associations – that keeps people trapped. NRT only addresses half the problem."
            },
            {
              id: 's4',
              title: "Vaping: Trading One Addiction",
              content: "Vaping removes tar but keeps you addicted to nicotine – often at even higher levels. We don't want to swap one trap for another.",
              backgroundGradient: "bg-gradient-to-br from-accent/80 to-success/80",
              icon: "💨",
              narration: "Vaping might remove tar and some chemicals, but it keeps you addicted to nicotine and can actually make nicotine intake even higher because it's so convenient to vape continuously. You can vape indoors, in your car, at your desk – there's no natural stopping point. We don't want to just swap one addiction for another. The goal is freedom from nicotine entirely, and that's what this program delivers."
            },
            {
              id: 's5',
              title: "Behavioral Programs: The Best Results",
              content: "Programs that combine psychological techniques with support show the highest success rates. That's exactly what you're doing right now.",
              backgroundGradient: "bg-gradient-to-br from-success/80 to-freedom/80",
              icon: "🏆",
              narration: "Behavioral programs – like what we're doing – have shown a lot of promise. They're the closest to replicating that one-on-one counseling which is considered the gold standard of quitting methods. Studies show that people using smoking cessation apps with evidence-based content like cognitive behavioral therapy have significantly higher quit rates. So you're investing your time in a method that science says can really work. You're not just trying to quit – you're changing your entire relationship with cigarettes. And that's why it lasts."
            },
            {
              id: 's6',
              title: "Your Advantage",
              content: "You're addressing both the physical AND psychological aspects of addiction. That's why this approach is different. That's why it works.",
              backgroundGradient: "bg-gradient-to-br from-freedom/80 to-primary/80",
              icon: "✨",
              narration: "The reason this program works is that we're addressing both sides: the physical reality of nicotine addiction AND the psychological beliefs, habits, and associations that keep you smoking. By the time you smoke your last cigarette, you won't just be physically ready – you'll be mentally ready. You won't feel like you're giving something up. You'll feel like you're escaping a trap. That's the difference. That's why people who quit this way don't miss smoking. Because there's nothing to miss once you see the truth."
            },
          ]
        }
      },
      {
        id: 'd2m5',
        title: "Deep Breathing Practice",
        description: "Learn to truly relax without cigarettes.",
        type: 'GUIDED_PRACTICE',
        estimatedSeconds: 180, // 3:00
        gatingRequired: true,
        practiceType: 'BREATHING',
      },
      {
        id: 'd2m6',
        title: "Today's Assignment & Tomorrow",
        description: "Wrapping up Day 2 and preparing for Day 3.",
        type: 'ANIMATED_SLIDES',
        estimatedSeconds: 300, // 5:00
        gatingRequired: true,
        content: {
          slides: [
            {
              id: 's1',
              title: "Your Assignment Today",
              content: "Notice and question your reasons each time you smoke. Did the cigarette actually solve your problem, or just make you feel momentarily better?",
              backgroundGradient: "bg-gradient-to-br from-primary/80 to-accent/80",
              icon: "📝",
              narration: "Alright, enough science – what do we do with this knowledge? Today, just start noticing and questioning your own reasons each time you smoke. For example, later today if you light up because you're stressed, observe: Did the cigarette actually solve the problem you were stressed about, or did it just make you feel momentarily better? If you smoke because you're bored, ask: Is the cigarette actually entertaining, or is it just something to do with my hands? How else might I address this boredom? Curiosity is your tool. We're not forcing any change in your smoking just yet – but being curious and mindful is the first step to weakening the habit's hold."
            },
            {
              id: 's2',
              title: "The Growing Realization",
              content: "Don't worry if cigarettes become less satisfying. That's the goal. We're aligning your heart and mind to naturally want to let go.",
              backgroundGradient: "bg-gradient-to-br from-accent/80 to-coral/80",
              icon: "🌱",
              narration: "One more thing: Sometimes people worry, 'If I start thinking like this, will smoking become unenjoyable and then I'll struggle because I hate it but am addicted?' The goal is that smoking becomes something you naturally want to let go of. We're working on aligning your heart and mind so they both agree: 'I don't actually want to smoke.' When that clicks, quitting is not a battle; it's a relief. So yes, over the next days you might find cigarettes less satisfying – that's a good thing. Don't force it or fake it; just let the realizations come naturally."
            },
            {
              id: 's3',
              title: "Day 2 Recap",
              content: "Cigarettes trick us into thinking they help, but they're only relieving withdrawal they caused. Real benefits can be gotten in better ways.",
              backgroundGradient: "bg-gradient-to-br from-coral/80 to-success/80",
              icon: "📚",
              narration: "Let's recap: Today we learned that cigarettes trick us into thinking they help us, but mostly they're relieving the withdrawal they caused. The real benefits – relaxation, focus, pleasure – can be gotten in better ways. And you're learning those ways soon. For now, keep smoking as you normally do, but with a bit more awareness. Jot down in your journal if you notice something new – like 'hmm, I realized my post-meal cigarette actually tastes kinda bad after the first few puffs' or 'I noticed I got an urge while watching a TV show just because a character smoked.'"
            },
            {
              id: 's4',
              title: "Coming Tomorrow: Day 3",
              content: "Tomorrow we dive into habits and triggers – why you smoke when you do, and how to start breaking those patterns.",
              backgroundGradient: "bg-gradient-to-br from-success/80 to-freedom/80",
              icon: "🔮",
              narration: "Tomorrow, we're diving deeper into habits and triggers – essentially why you smoke when you do, and how those automatic patterns form. It's really fascinating – you'll practically see the strings that have been pulling on you, and we'll start cutting them one by one. You're doing great. Day 2 is complete, and you're already arming yourself with knowledge that will set you free. Keep up the good work, and see you on Day 3!"
            },
            {
              id: 's5',
              title: "Day 2 Complete!",
              content: "You're doing amazing. 2 days done, the journey continues. The knowledge you gained today is already changing how you see cigarettes.",
              backgroundGradient: "bg-gradient-to-br from-freedom/80 to-primary/80",
              icon: "🎉",
              narration: "Congratulations on completing Day 2! You now understand the true nature of nicotine addiction. You see through the illusions of stress relief, focus, and pleasure. You know why other methods often fail and why this one works. That knowledge is power – and it's already working inside you, changing how you see cigarettes. Remember: none of these realizations are to make you feel foolish. Many smokers hold these beliefs. You were caught in a trap designed by people with billions of dollars to spend on keeping you hooked. But now you're waking up. And soon, you'll be free. See you tomorrow for Day 3!"
            },
          ]
        }
      },
    ]
  },
  // Days 3-10 follow similar structure...
  {
    dayNumber: 3,
    title: "Breaking the Habit Loop",
    subtitle: "Identifying Triggers and Routines",
    modules: [
      {
        id: 'd3m1',
        title: "Welcome to Day 3",
        description: "Understanding why you smoke when you do, and how habits form.",
        type: 'ANIMATED_SLIDES',
        estimatedSeconds: 360,
        gatingRequired: true,
        content: {
          slides: [
            {
              id: 's1',
              title: "Day 3: Breaking the Habit Loop",
              content: "Today we map out your smoking habit – shining a spotlight on the loops that keep you smoking, so we can begin to break them.",
              backgroundGradient: "bg-gradient-to-br from-primary/80 to-accent/80",
              icon: "🔄",
              narration: "Welcome to Day 3! You're nearly halfway to quit day. How are you feeling? By now, you might have started to notice some of your smoking patterns more clearly. Maybe you caught yourself thinking, 'I really don't enjoy this as much as I thought,' or you simply became aware, 'Oh, I always reach for a cigarette when I start the car.' That's fantastic – that awareness means you're already breaking free, bit by bit. Today we're going to map out your smoking habit – essentially shine a spotlight on the habit loops that keep you smoking, so we can begin to break them."
            },
            {
              id: 's2',
              title: "The Habit Loop",
              content: "Every habit follows a loop: Trigger → Behavior → Reward. Something triggers you, you smoke, and you get relief. That relief reinforces the habit.",
              backgroundGradient: "bg-gradient-to-br from-accent/80 to-coral/80",
              icon: "🔁",
              narration: "Every habit, including smoking, follows a loop: Trigger – Behavior – Reward. Something triggers you, you perform the behavior – smoking – and you get some sort of reward or relief. That reward reinforces the habit, so next time the trigger happens, your brain goes, 'I know what to do!' and craves a cigarette. Over years, these loops can become almost automatic, like reflexes. You don't even think about it – your hand just reaches for the pack."
            },
            {
              id: 's3',
              title: "Your Triggers Are Learned",
              content: "Your brain has learned to associate certain situations with smoking. Coffee, stress, after meals – these aren't needs, they're learned associations.",
              backgroundGradient: "bg-gradient-to-br from-coral/80 to-freedom/80",
              icon: "🧠",
              narration: "Here's something important to understand: none of these triggers force you to smoke – it just feels that way because the connection is so ingrained. You weren't born needing a cigarette with your morning coffee. Your brain learned that association over thousands of repetitions. And the amazing thing is, these connections can be retrained or broken. For every trigger, we can create a new routine or no routine at all – just experiencing the moment without a cigarette – and still get a reward. That's what we're building toward."
            },
          ]
        }
      },
      {
        id: 'd3m2',
        title: "Understanding Your Triggers",
        description: "Exploring the common situations where you reach for a cigarette.",
        type: 'ANIMATED_SLIDES',
        estimatedSeconds: 480,
        gatingRequired: true,
        content: {
          slides: [
            {
              id: 's1',
              title: "Let's Identify Your Triggers",
              content: "Triggers can be emotional, environmental, social, or routine-based. Let's explore each category.",
              backgroundGradient: "bg-gradient-to-br from-primary/80 to-coral/80",
              icon: "📋",
              narration: "Let's identify your triggers. Triggers can be different for everyone, but there are definitely patterns. They fall into categories: Emotional triggers like stress, anxiety, boredom, or loneliness. Environmental triggers like waking up, having coffee, finishing meals, driving, or taking work breaks. Social triggers like being around other smokers or at parties. And routine-based triggers tied to certain times of day. Let's talk through a few common ones."
            },
            {
              id: 's2',
              title: "Morning Routine Trigger",
              content: "Many smokers light up first thing. The trigger is waking up – your brain was in withdrawal overnight, so the 'reward' is a dopamine rush.",
              backgroundGradient: "bg-gradient-to-br from-coral/80 to-accent/80",
              icon: "🌅",
              narration: "Waking up or your morning routine: Many smokers light up first thing in the morning. The trigger is simply waking up or having that first cup of coffee. The brain was in withdrawal overnight, so the reward is a dopamine rush that says 'Okay, day started.' It's very habitual – you might even feel like you can't fully wake up without that cigarette. Spoiler: You absolutely can, and after a week or so of not smoking, you'll likely find you wake up with more energy than when you smoked, because your body isn't fighting off smoke effects."
            },
            {
              id: 's3',
              title: "Meals as Triggers",
              content: "Finishing a meal is a classic trigger. But non-smokers feel just as satisfied after meals without a cigarette – it's all about what you're used to.",
              backgroundGradient: "bg-gradient-to-br from-accent/80 to-freedom/80",
              icon: "🍽️",
              narration: "Meals: Finishing a meal is a classic trigger – you feel full and satisfied from food, and a cigarette feels like the cherry on top to complete the experience. This is partly habit and partly a conditioned physiological response. But non-smokers feel just as satisfied after meals without a cigarette – it's all in what you're used to. We'll find a new 'cherry on top' for you, whether it's a short walk, a piece of fruit, or simply taking a deep breath and relaxing."
            },
            {
              id: 's4',
              title: "Stress and Anxiety",
              content: "When stressed, you're on autopilot. You feel upset and almost before you know it, you're lighting up. We need to insert a pause.",
              backgroundGradient: "bg-gradient-to-br from-freedom/80 to-success/80",
              icon: "😰",
              narration: "Stress and Anxiety: We touched on this yesterday – something stressful happens, an email from the boss, an argument, bad news, and boom, craving hits. The trigger is the stress, the routine is smoking, and the perceived reward is relaxation – which, as we know, is really just relief of nicotine withdrawal plus a deep-breathing moment. The challenge is, when stressed, we're on autopilot. You feel upset and almost before you know it, you're lighting up. Breaking this loop means we need to insert a pause and a new coping skill when stress hits."
            },
            {
              id: 's5',
              title: "Boredom and Idle Time",
              content: "Nothing to do, so you smoke to fill time. This is actually one of the easier loops to break because it's not strongly chemically driven.",
              backgroundGradient: "bg-gradient-to-br from-success/80 to-muted/80",
              icon: "😴",
              narration: "Boredom and Idle time: Nothing to do, so you smoke to fill time. The trigger is simply lack of stimulation. The reward is mild – you're just less bored. This one is actually one of the easier loops to break because it's not strongly chemically driven; it's more about finding alternative activities. A puzzle on your phone, a quick stretch, a glass of water – anything to occupy that moment."
            },
            {
              id: 's6',
              title: "Social Cues",
              content: "Seeing someone smoke, being offered a cigarette, feeling included in the ritual – these are powerful but can be managed.",
              backgroundGradient: "bg-gradient-to-br from-muted/80 to-primary/80",
              icon: "👥",
              narration: "Social cues: Seeing someone else smoke, being offered a cigarette, or certain social patterns like at a pub with friends. The trigger is either visual – seeing it – or social bonding. The reward is feeling included or the ritual of camaraderie. We'll strategize on how to handle these without feeling left out – like having a drink in hand or stepping out with friends but not smoking. You don't have to give up your social life. You just need new responses."
            },
            {
              id: 's7',
              title: "Routine-Based Triggers",
              content: "Driving, phone calls, 3pm coffee break – your brain is context-dependent. That context itself becomes the trigger.",
              backgroundGradient: "bg-gradient-to-br from-primary/80 to-accent/80",
              icon: "🚗",
              narration: "Routines tied to places or activities: Driving is a big one, as is talking on the phone for some, or taking a work break and going to the smoking area. Our brains are context-dependent. If you've always done a behavior in a certain context, that context itself becomes a trigger. Ever notice how a certain time of day, like 3pm, you automatically reach for a smoke even if you're not desperate for one? That's the habit clock in your brain. But clocks can be reset."
            },
          ]
        }
      },
      {
        id: 'd3m2b',
        title: "Identify Your Personal Triggers",
        description: "Select all the situations that make you want to smoke.",
        type: 'GUIDED_PRACTICE',
        estimatedSeconds: 180,
        gatingRequired: true,
        practiceType: 'TRIGGER_SCAN',
      },
      {
        id: 'd3m2c',
        title: "Build Your Coping Strategies",
        description: "Choose specific alternatives for each of your triggers.",
        type: 'TRIGGER_ALTERNATIVES',
        estimatedSeconds: 240,
        gatingRequired: true,
      },
      {
        id: 'd3m3',
        title: "Creating Alternative Responses",
        description: "For every trigger, we create a new, healthier response.",
        type: 'ANIMATED_SLIDES',
        estimatedSeconds: 420,
        gatingRequired: true,
        content: {
          slides: [
            {
              id: 's1',
              title: "Brainstorming Alternatives",
              content: "For each trigger you identified, we'll create an alternative action – something you can do instead of smoking.",
              backgroundGradient: "bg-gradient-to-br from-primary/80 to-success/80",
              icon: "💡",
              narration: "Now let's do an exercise: for the triggers you've identified, I want you to brainstorm one alternative for each – something you could do instead of smoking when that trigger happens. I'll help with suggestions. These might seem small or even silly, but they are powerful. By choosing an alternate response to a trigger, you're essentially training your brain with a new habit loop: Trigger → New Behavior → New Reward."
            },
            {
              id: 's2',
              title: "Stress → Deep Breathing",
              content: "When stressed, try 5-5-5 breathing: inhale 5 seconds, hold 5, exhale 5. Your heart rate slows, your mind clears – real relaxation.",
              backgroundGradient: "bg-gradient-to-br from-success/80 to-freedom/80",
              icon: "🧘",
              narration: "Let's say your trigger is stress, and you choose the 5-5-5 breathing exercise as an alternative. Next time you feel stressed, you take a moment and do this: inhale for 5 seconds, hold for 5, exhale for 5, maybe do it a few times. The reward? Your heart rate slows, your mind clears a bit, and you feel in control. That's a real form of relaxation, not just withdrawal relief. If you repeat that, soon your brain learns 'when I'm stressed, I breathe and feel better' instead of 'I smoke and feel better.' And the breathing is actually addressing the stress in a healthier way."
            },
            {
              id: 's3',
              title: "After Meals → New Rituals",
              content: "Immediately do dishes or brush your teeth. The urge passes in minutes, and a fresh minty mouth makes smoking unappealing.",
              backgroundGradient: "bg-gradient-to-br from-freedom/80 to-accent/80",
              icon: "🪥",
              narration: "If your trigger is finishing a meal, and your alternative is to immediately get up and start doing dishes or go brush your teeth, try that. The slight urge for a cigarette after eating usually passes in just a few minutes. Brushing your teeth has a nice reward: fresh taste in your mouth, and most people don't want to smoke right after that because it ruins the minty fresh feeling. Win-win: you keep your teeth clean and skip the smoke."
            },
            {
              id: 's4',
              title: "Morning Coffee → Change the Context",
              content: "Switch your routine: different spot, different mug, add a crossword. Even small changes break the association.",
              backgroundGradient: "bg-gradient-to-br from-accent/80 to-coral/80",
              icon: "☕",
              narration: "For morning coffee, maybe you decide to switch the order – delay that first cigarette by doing something right after coffee. Or change your coffee routine: if you always smoke on your porch with coffee, try having coffee in a different spot or doing a crossword while you drink. The idea is to break the association. Even a small change can help, like using a mug that requires two hands so you're not having a free hand for a cigarette."
            },
            {
              id: 's5',
              title: "Boredom → Get Moving",
              content: "Walk around, stretch, do a quick puzzle, or drink water. Boredom triggers are the easiest to break with simple alternatives.",
              backgroundGradient: "bg-gradient-to-br from-coral/80 to-muted/80",
              icon: "🚶",
              narration: "For boredom, the alternatives are endless: take a short walk, do some stretches, play a quick game on your phone, drink a glass of water, text a friend. Boredom triggers are actually the easiest to break because there's no strong chemical pull – you just need something to do. Keep a few go-to activities in mind for those idle moments."
            },
            {
              id: 's6',
              title: "Social Situations → Stay Engaged",
              content: "Keep a drink in hand, step outside but don't smoke, tell friends you're quitting. You're not missing out – you're leveling up.",
              backgroundGradient: "bg-gradient-to-br from-muted/80 to-primary/80",
              icon: "🥤",
              narration: "For social situations, you don't have to avoid your friends or stop going out. Instead: keep a drink in hand so your hands are occupied. Step outside with smokers if you want the social break, but don't light up – just enjoy the conversation. Let your friends know you're quitting so they can support you. You might be surprised how many will cheer you on. You're not missing out on anything – you're leveling up."
            },
          ]
        }
      },
      {
        id: 'd3m4',
        title: "Urge Surfing Introduction",
        description: "Learn to ride out cravings like waves – they peak and then pass.",
        type: 'ANIMATED_SLIDES',
        estimatedSeconds: 300,
        gatingRequired: true,
        content: {
          slides: [
            {
              id: 's1',
              title: "Introducing Urge Surfing",
              content: "Cravings are like waves in the ocean. They rise, crest, and fall. If you don't act on them, they pass on their own.",
              backgroundGradient: "bg-gradient-to-br from-primary/80 to-freedom/80",
              icon: "🌊",
              narration: "Speaking of cravings subsiding, let me share a trick: Urge Surfing. Cravings are like waves in the ocean. They rise, crest, and then they fall. If you don't act on them, they typically peak within a few minutes and then diminish. It might feel longer, but truly, most intense urges last 3-5 minutes. If you can 'surf' that wave – ride it out by doing something else, or even just acknowledge it mindfully – you'll come out the other side and realize you didn't need to smoke."
            },
            {
              id: 's2',
              title: "3-5 Minutes",
              content: "Most intense urges last only 3-5 minutes. If you can ride that wave, it passes. Every time you do this, the urges get weaker.",
              backgroundGradient: "bg-gradient-to-br from-freedom/80 to-success/80",
              icon: "⏱️",
              narration: "Here's the science: cravings peak quickly and then fade. If you can distract yourself or simply observe the craving without acting on it for just a few minutes, it will pass. And here's the magic – every time you do that, you weaken the neural link that says 'urge = must smoke.' You strengthen your confidence that 'I can handle this.' Each wave you surf makes the next one smaller."
            },
            {
              id: 's3',
              title: "Delay and Distract",
              content: "When an urge hits, delay a few minutes before smoking. Drink water, send a text, take a walk. You might forget to smoke entirely.",
              backgroundGradient: "bg-gradient-to-br from-success/80 to-accent/80",
              icon: "📱",
              narration: "Even now, before you've quit, you can try this: when an urge hits, delay a few minutes before smoking and do something else – drink water, send a text, take a short walk. You might be surprised that sometimes the urge goes away and you might even forget to smoke for a while. We'll practice more urge surfing once you've quit, but starting to notice this pattern now is incredibly valuable."
            },
          ]
        }
      },
      {
        id: 'd3m5',
        title: "Urge Surfing Practice",
        description: "Guided practice to ride out cravings mindfully.",
        type: 'GUIDED_PRACTICE',
        estimatedSeconds: 240,
        gatingRequired: true,
        practiceType: 'URGE_SURFING',
      },
      {
        id: 'd3m6',
        title: "Not Avoiding Life",
        description: "We don't shrink your life – we change your response to it.",
        type: 'ANIMATED_SLIDES',
        estimatedSeconds: 360,
        gatingRequired: true,
        content: {
          slides: [
            {
              id: 's1',
              title: "Face Triggers, Don't Avoid Them",
              content: "Some programs say avoid triggers entirely. We say face them with new strategies. Your life shouldn't shrink – your response changes.",
              backgroundGradient: "bg-gradient-to-br from-primary/80 to-coral/80",
              icon: "💪",
              narration: "Now let's talk about not avoiding life. Some programs say, 'avoid triggers when you quit – don't drink coffee, avoid social events, don't go where others are smoking.' We don't want to shrink your life; we want you to be free to live normally without cigarettes. So our approach is different: face those triggers but with new strategies."
            },
            {
              id: 's2',
              title: "Keep Your Friends",
              content: "If your friends smoke, you're not abandoning them. Step away when they smoke, keep your hands busy, or just enjoy the fresh air.",
              backgroundGradient: "bg-gradient-to-br from-coral/80 to-freedom/80",
              icon: "🤝",
              narration: "For example, if your friends smoke, you're not going to abandon your friends – instead, maybe you'll let them know you're quitting and step away when they smoke, or have something to keep your hands busy like a stress ball, a fidget gadget, even just a bottle of water to sip. You can still be social. You can still be you. You're just doing it smoke-free."
            },
            {
              id: 's3',
              title: "Transform Your Commute",
              content: "If you smoke while driving, stock your car with gum, podcasts, or audiobooks. Transform the trigger into something better.",
              backgroundGradient: "bg-gradient-to-br from-freedom/80 to-success/80",
              icon: "🚗",
              narration: "If you usually smoke on your commute, perhaps stock your car with gum, or an audiobook that keeps you engaged. The first time doing any of these things without smoking will feel weird – that's okay. The second time will be easier, and after a few weeks, you won't even think about it. You might actually start looking forward to your commute for the podcast time, not the cigarette."
            },
            {
              id: 's4',
              title: "Shake Up Your Routine",
              content: "Small changes disrupt autopilot: rearrange furniture, take breaks in new spots, change the order of your morning routine.",
              backgroundGradient: "bg-gradient-to-br from-success/80 to-accent/80",
              icon: "🔀",
              narration: "One more note on routine changes: Some people find it helpful to shake up their routine around quit day. For instance, if you always wake up and sit in the same chair to smoke, maybe rearrange your furniture or make that chair less inviting. Or if you always take a break at 10am to smoke, plan to take that break in a non-smoking area with a coffee instead. These are little hacks to disrupt the autopilot."
            },
            {
              id: 's5',
              title: "You're Rewiring Your Brain",
              content: "Each time you resist a trigger or try something different, you're creating new neural pathways. Your brain can change.",
              backgroundGradient: "bg-gradient-to-br from-accent/80 to-primary/80",
              icon: "✨",
              narration: "You are essentially becoming a scientist of your own behavior this week – observing triggers, testing new responses. And guess what? This kind of self-awareness and adaptability is a skill that goes beyond quitting smoking – it can apply to any habit change in your life. Each time you resist an old trigger or do something different, you are literally rewiring your brain for the better. That's neuroplasticity in action."
            },
          ]
        }
      },
      {
        id: 'd3m7',
        title: "Day 3 Wrap-Up",
        description: "Summary and your assignment for today.",
        type: 'ANIMATED_SLIDES',
        estimatedSeconds: 300,
        gatingRequired: true,
        content: {
          slides: [
            {
              id: 's1',
              title: "What You've Learned",
              content: "You've identified your triggers and brainstormed alternatives. You see the habit loops that kept you stuck – and now you can break them.",
              backgroundGradient: "bg-gradient-to-br from-primary/80 to-success/80",
              icon: "📚",
              narration: "To recap Day 3: You've identified your smoking triggers and brainstormed alternatives. You now see the habit loops you've been stuck in – and you have the knowledge to start breaking them. Awareness breaks the automaticity, and choice steps in. You're no longer on autopilot. You're taking control."
            },
            {
              id: 's2',
              title: "Your Assignment Today",
              content: "Watch for triggers. When one hits, say: 'I'm feeling the urge because [trigger] happened. I don't need a cigarette – I want one out of habit.'",
              backgroundGradient: "bg-gradient-to-br from-success/80 to-freedom/80",
              icon: "📝",
              narration: "Action for today: Keep an eye on those triggers. When you catch one, say to yourself, 'I'm feeling the urge because this trigger happened. I don't actually need a cigarette, but I want one out of habit.' Just that awareness is powerful. If you're up for it, try one of your alternative behaviors at least once today or tomorrow. Even if you go right back to smoking after, that's fine – the experience will teach you that you can do something else."
            },
            {
              id: 's3',
              title: "Tomorrow: Day 4",
              content: "Tomorrow is special – we'll use a cigarette as part of a mindful exercise. Have a couple cigarettes ready. Trust me on this.",
              backgroundGradient: "bg-gradient-to-br from-freedom/80 to-coral/80",
              icon: "🔮",
              narration: "Tomorrow is a special day – we are going to delve into mindfulness and actually use a cigarette as part of an exercise. Sounds intriguing? It is. It's often a turning point for people in this program. We'll effectively turn a cigarette into a tool for quitting – wild, huh? So make sure you have a couple of cigarettes handy for tomorrow's session – yes, I'm telling you to have cigarettes ready for a quit program! Trust me on this."
            },
            {
              id: 's4',
              title: "Day 3 Complete!",
              content: "You're doing fantastic. This groundwork will make your actual quit much smoother than any attempt before. See you on Day 4!",
              backgroundGradient: "bg-gradient-to-br from-coral/80 to-primary/80",
              icon: "🎉",
              narration: "You're doing fantastic. You've come a long way in understanding your habit. This is the groundwork that will make your actual quit much smoother than any attempt before. Get some rest, reflect a bit in your journal if you like – maybe list your top triggers and your new strategies again, to cement them. And I'll see you on Day 4 for a really eye-opening experience. Congratulations on completing Day 3!"
            },
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
        title: "Welcome to Day 4",
        description: "Today we do something truly unique that could be a major turning point.",
        type: 'ANIMATED_SLIDES',
        estimatedSeconds: 360,
        gatingRequired: true,
        content: {
          slides: [
            {
              id: 's1',
              title: "A Unique Exercise",
              content: "Today is Day 4, and we're going to do something truly unique. By the end of this session, you might experience one of the biggest mindset shifts of this journey.",
              backgroundGradient: "bg-gradient-to-br from-primary/80 to-accent/80",
              icon: "✨",
              narration: "Today is Day 4, and we're going to do something truly unique. By the end of this session, you might experience one of the biggest mindset shifts of this journey. We're going to smoke a cigarette together, mindfully. Yes, you heard that right – I'm asking you to smoke, but in a very specific, conscious way. This exercise has helped so many people – including former smokers like me – truly see smoking for what it is. It can be a game-changer."
            },
            {
              id: 's2',
              title: "Important Setup",
              content: "If you're not somewhere you can safely smoke right now, pause this session and come back when you're ready with a cigarette.",
              backgroundGradient: "bg-gradient-to-br from-accent/80 to-coral/80",
              icon: "⚠️",
              narration: "Important: If you're not currently in a place where you can safely light a cigarette – for example, if you're at work or in a public space – pause this session and come back later when you can be in a comfortable, private spot, ideally with minimal distractions. Maybe step outside or near a window. Take your device with you and continue when you're ready."
            },
            {
              id: 's3',
              title: "What Is Mindfulness?",
              content: "Mindfulness means paying attention on purpose, in the present moment, without judgment. We observe without reacting.",
              backgroundGradient: "bg-gradient-to-br from-coral/80 to-freedom/80",
              icon: "🧘",
              narration: "Mindfulness means paying attention on purpose, in the present moment, without judgment. So as you smoke now, you're not going to think about the next drag or anything else – you'll focus on the now: the taste, the smell, the sensation. Try to approach it almost like a scientist observing an experiment, or as if you've never smoked before and you're really curious about what this thing actually does to your body."
            },
            {
              id: 's4',
              title: "Use All Your Senses",
              content: "We'll pay attention to taste, smell, physical sensations, and emotions. Everything. No autopilot.",
              backgroundGradient: "bg-gradient-to-br from-freedom/80 to-success/80",
              icon: "👁️",
              narration: "During this exercise, we'll use all five senses. We'll pay attention to the taste of the smoke, the feeling in your throat and lungs, the smell around you, the visual of the smoke, even the sound of the cigarette burning. We'll also notice your emotional reactions. This is about experiencing what smoking actually is – without the illusions your mind has built around it over years of habit."
            },
          ]
        }
      },
      {
        id: 'd4m2',
        title: "The Mindful Smoking Exercise",
        description: "A guided, conscious smoking experience to reveal the true nature of the habit.",
        type: 'ANIMATED_SLIDES',
        estimatedSeconds: 600,
        gatingRequired: true,
        content: {
          slides: [
            {
              id: 's1',
              title: "Get Your Cigarette Ready",
              content: "Make sure you have a cigarette and lighter. Don't light it yet – just hold it in your hand and really look at it.",
              backgroundGradient: "bg-gradient-to-br from-muted/80 to-primary/80",
              icon: "🚬",
              narration: "Alright. Make sure you have a cigarette and lighter with you. Do you have it? Good. Now, don't light it yet. First, just hold it in your hand. Look at it. This little white tube filled with tobacco... it's been controlling parts of your life, hasn't it? In a moment, you will light it, but unlike any cigarette you've had before, you're going to stay fully present for every single puff."
            },
            {
              id: 's2',
              title: "Light The Cigarette",
              content: "Now light your cigarette. Watch the flame catch the paper. Watch the ember glow. Take your time.",
              backgroundGradient: "bg-gradient-to-br from-primary/80 to-coral/80",
              icon: "🔥",
              narration: "Okay, let's begin. Light your cigarette. Watch the flame touch the paper. See the ember come to life. This is what you've done thousands of times – but today, we're really paying attention. Notice the first wisps of smoke rising from the tip. This is what will enter your body in a moment."
            },
            {
              id: 's3',
              title: "The First Puff",
              content: "Draw the smoke slowly into your mouth. Pause. Don't inhale yet. Just hold it there. Notice the taste on your tongue.",
              backgroundGradient: "bg-gradient-to-br from-coral/80 to-accent/80",
              icon: "💨",
              narration: "As you take your first puff, do it slowly. Draw the smoke into your mouth... now pause. Don't inhale to lungs yet, just hold it in your mouth for a second. Notice the taste on your tongue. How would you describe it? Is it pleasant, unpleasant, neutral? Is it bitter, harsh? Be completely honest with yourself."
            },
            {
              id: 's4',
              title: "Inhale and Observe",
              content: "Now inhale gently into your lungs. Hold it for a moment. Feel the sensation in your throat and chest. Then exhale slowly.",
              backgroundGradient: "bg-gradient-to-br from-accent/80 to-muted/80",
              icon: "🫁",
              narration: "Now inhale gently into your lungs... hold it for a moment... and exhale slowly. Watch the smoke as you breathe it out. Notice the feeling in your throat and chest. Does it burn a little? How do your lungs feel with that smoke inside? Is there any tightness, any resistance from your body?"
            },
            {
              id: 's5',
              title: "Notice Physical Sensations",
              content: "Pay attention to your whole body. Any head rush? Lightheadedness? How does your heart feel? Your breathing?",
              backgroundGradient: "bg-gradient-to-br from-muted/80 to-freedom/80",
              icon: "💗",
              narration: "Take another puff, and again pay close attention. Perhaps close your eyes if it helps you focus on the senses – just be careful with the lit cigarette. Inhale... hold... exhale. Observe any effect on your body – do you feel a head-rush or a slight lightheadedness? Any relief of tension yet, or not really? You might feel a tiny dopamine kick – that brief 'aah.' Just note it without judgment."
            },
            {
              id: 's6',
              title: "Taste and Smell",
              content: "Focus on the taste in your mouth now. Run your tongue over your teeth. Notice the smell of the smoke around you.",
              backgroundGradient: "bg-gradient-to-br from-freedom/80 to-coral/80",
              icon: "👅",
              narration: "Now, focus on the taste in your mouth after you've exhaled. Run your tongue over your teeth. Is there a film or bitter residue? Often, smoking leaves a dry, ashy taste. Notice that. Smell the air around you now. Perhaps the smoke is curling around. How does it smell? It might be hard to notice since you're used to it, but try. Is it sweet, acrid, does it sting your nose a bit?"
            },
            {
              id: 's7',
              title: "Continue Mindfully",
              content: "Take your time. Continue smoking at a snail's pace. With each puff, really feel it. There's no rush.",
              backgroundGradient: "bg-gradient-to-br from-coral/80 to-primary/80",
              icon: "⏳",
              narration: "Take your time. Continue smoking the cigarette at a snail's pace. With each puff, really feel it. If any thoughts come, like 'This is strange' or 'I really need this' or 'I don't like this,' just note them and return to observing. Notice your breathing in between puffs – is it a bit more labored? Do you feel any urge to cough? Is any dizziness present?"
            },
            {
              id: 's8',
              title: "Where Is The Pleasure?",
              content: "As you near the halfway point, ask yourself: Am I enjoying this? Is it as satisfying as I imagined? Or is it just... okay?",
              backgroundGradient: "bg-gradient-to-br from-primary/80 to-success/80",
              icon: "🔍",
              narration: "As you near the halfway point of the cigarette, ask yourself: Am I enjoying this? Is it as satisfying as the image in my mind of smoking is? Or is it just okay, or even somewhat unpleasant? Sometimes we enjoy smoking without really paying attention – it's mostly the idea of it or the quick fix of nicotine. Right now, you're confronting the actual sensory reality of it."
            },
            {
              id: 's9',
              title: "You Can Stop Anytime",
              content: "If you've observed enough, you may stub it out whenever you want. You don't need to finish it.",
              backgroundGradient: "bg-gradient-to-br from-success/80 to-freedom/80",
              icon: "🛑",
              narration: "If you haven't already, you may stub it out whenever you feel you've observed enough. You don't even need to finish it if you don't want to. If you do finish it, that's fine too – just remain mindful through the last puff and even as you extinguish it. Many people put it out around halfway because it stops being pleasant when they're truly paying attention."
            },
            {
              id: 's10',
              title: "Breathe Fresh Air",
              content: "Now take a deep breath of fresh air. How do your lungs feel? Notice the contrast.",
              backgroundGradient: "bg-gradient-to-br from-freedom/80 to-accent/80",
              icon: "🌬️",
              narration: "Okay. Now take a deep breath of fresh air – or as fresh as your environment allows. How do your lungs feel after that cigarette? Maybe a bit tight, maybe no difference – just notice. That was probably the slowest, most conscious cigarette you've ever had. How was it?"
            },
          ]
        }
      },
      {
        id: 'd4m3',
        title: "Processing The Experience",
        description: "Reflecting on what you just discovered about smoking.",
        type: 'ANIMATED_SLIDES',
        estimatedSeconds: 420,
        gatingRequired: true,
        content: {
          slides: [
            {
              id: 's1',
              title: "What People Typically Notice",
              content: "'It didn't taste good.' 'My mouth feels like an ashtray.' 'I kept waiting for satisfaction and it never came.'",
              backgroundGradient: "bg-gradient-to-br from-primary/80 to-accent/80",
              icon: "💭",
              narration: "Let's reflect on what just happened. Many people doing this exercise report things like: 'It didn't taste good, actually it was pretty gross,' 'I realized my mouth feels dry and ashtray-like,' 'I noticed I was coughing or my body saying no,' or 'Honestly, I kept waiting for the big satisfaction hit and it just never came.' What was your experience? Did the cigarette truly relax you or taste delicious? Or was it just meh, or even unpleasant in parts?"
            },
            {
              id: 's2',
              title: "Peeling Back The Veil",
              content: "This exercise is powerful because it removes the veil of habit. When you truly pay attention, the reality often doesn't match the hype.",
              backgroundGradient: "bg-gradient-to-br from-accent/80 to-coral/80",
              icon: "🎭",
              narration: "This exercise is powerful because it peels back the veil of habit. When we smoke without thinking, we focus on the anticipation of relief, not the actual sensory details. But when you shine a light on the reality, it often doesn't live up to the hype that addiction has created in your mind. If you found it yucky or unsatisfying, hold onto that feeling. That is exactly what smoking is like once you remove the rose-colored glasses."
            },
            {
              id: 's3',
              title: "The Cigarette Didn't Fix Anything",
              content: "Think about it: that cigarette didn't solve any problems. Your stressors are still there. Your boredom still exists. What did it actually give you?",
              backgroundGradient: "bg-gradient-to-br from-coral/80 to-freedom/80",
              icon: "🤷",
              narration: "Let's consider something: that cigarette you just had – it didn't really fix anything, did it? If you were craving before, sure, now the craving might be gone – but in maybe 30 minutes or an hour, nicotine levels will drop and you'll want another. In terms of tangible benefits: your stressors are still there if you had any, your boredom would still be there, etc. So aside from feeding the nicotine monster, what did it actually do for you? Probably not much."
            },
            {
              id: 's4',
              title: "How Do You Feel About Another One?",
              content: "Notice how you feel about having another cigarette right now. Are you eager for it? Or could you take it or leave it?",
              backgroundGradient: "bg-gradient-to-br from-freedom/80 to-success/80",
              icon: "🎯",
              narration: "Now, notice how you feel about having another one. Are you eager for it, or could you take it or leave it? Some people after this exercise say they actually don't want another cigarette right away because the taste is lingering and it wasn't great. If you feel a bit disenchanted with smoking right now – fantastic. That means the exercise is working to cut the mental ties. If you are still wanting one, that's okay – addiction is strong and this was just one step."
            },
            {
              id: 's5',
              title: "Why We Did This",
              content: "Studies show mindfulness helps break addictions by decoupling the link between craving and behavior. You're rewiring your brain right now.",
              backgroundGradient: "bg-gradient-to-br from-success/80 to-primary/80",
              icon: "🧠",
              narration: "I'd like to share why we did this. Studies and experience show that mindfulness can effectively help break addictions by decoupling the link between craving and behavior. Instead of automatically smoking when you crave, you fully experience the craving and the act. You realize it's not as 'necessary' or amazing as your brain tricked you to believe. This approach exposes the real effects of cigarettes on your body and mind – exactly what you just did. It shines a light on the gap between perception and reality."
            },
            {
              id: 's6',
              title: "Changing Associations",
              content: "Before: cigarette = relief and pleasure. Now: cigarette = stale taste, smoky smell, not solving anything. That's powerful change.",
              backgroundGradient: "bg-gradient-to-br from-primary/80 to-accent/80",
              icon: "🔄",
              narration: "What we're doing here is a bit of neuro-associative conditioning too – we're changing the associations. If previously you associated a cigarette with 'ahh relief and pleasure,' now you might start associating it with 'stale taste, smoky smell, maybe lightheadedness, not actually solving anything.' This weakens the positive association and sometimes even creates a slight aversion – which is good news for your quit success."
            },
          ]
        }
      },
      {
        id: 'd4m4',
        title: "Breathing Reset",
        description: "Clear your lungs and reset with deep, conscious breathing.",
        type: 'GUIDED_PRACTICE',
        estimatedSeconds: 180,
        gatingRequired: true,
        practiceType: 'BREATHING',
      },
      {
        id: 'd4m5',
        title: "Feeling The Shift",
        description: "Processing any emotions that came up and looking forward.",
        type: 'ANIMATED_SLIDES',
        estimatedSeconds: 360,
        gatingRequired: true,
        content: {
          slides: [
            {
              id: 's1',
              title: "It's Okay To Feel Upset",
              content: "You might feel a bit sad, like discovering a friend's betrayal. That means you're freeing yourself from an illusion.",
              backgroundGradient: "bg-gradient-to-br from-coral/80 to-primary/80",
              icon: "💔",
              narration: "You might even feel a bit upset or sad – like discovering a friend's betrayal – because cigarettes that were your comfort are being exposed as... well, not so great. It's okay to feel that. Remind yourself: that feeling means you're freeing yourself. Cigarettes' power lies largely in the illusion of goodness. You're breaking that illusion."
            },
            {
              id: 's2',
              title: "Keep Smoking Mindfully",
              content: "From now on, whenever you smoke, try to stay present. You'll likely find you enjoy it less and less each time.",
              backgroundGradient: "bg-gradient-to-br from-primary/80 to-freedom/80",
              icon: "👁️",
              narration: "From now on, I encourage you: whenever you smoke, smoke mindfully. You don't have to do it as slowly as we just did every time, but try at least once or twice more today to really pay attention. You'll likely continue to find that you enjoy it less and less. This will make quitting far easier because there's less and less to miss."
            },
            {
              id: 's3',
              title: "Don't Force Reduction",
              content: "You don't need to force cutting down. But don't be surprised if you naturally don't feel like smoking as much.",
              backgroundGradient: "bg-gradient-to-br from-freedom/80 to-success/80",
              icon: "🌱",
              narration: "However, you do not need to force a reduction. Remember, you have our full permission to smoke normally up until your planned quit day, which is coming soon on Day 6. But don't be surprised if you just don't feel like smoking that much – that's great. Let your body and mind guide you. If you think 'I don't really need one right now,' run with that. If you do smoke, continue observing."
            },
            {
              id: 's4',
              title: "A Shift In Outlook",
              content: "Can you now imagine that quitting might not mean losing pleasure – but gaining freedom from something that wasn't serving you?",
              backgroundGradient: "bg-gradient-to-br from-success/80 to-accent/80",
              icon: "🌅",
              narration: "Now, take a moment to reflect: How does this insight change your outlook? Can you now envision that a smoke-free life might not be a loss of pleasure, but perhaps not losing much at all – maybe even gaining a better taste in your mouth, fresher breath, more time, more freedom? Many realize after mindful smoking that they weren't actually giving up something valuable; they were letting go of something that wasn't serving them at all."
            },
            {
              id: 's5',
              title: "Tomorrow: Final Preparation",
              content: "Day 5 will solidify your reasons for quitting and build your confidence for Day 6 – your last day smoking.",
              backgroundGradient: "bg-gradient-to-br from-accent/80 to-primary/80",
              icon: "📅",
              narration: "We're nearing the big day. Tomorrow, Day 5, will be about final preparation: we'll solidify your reasons for quitting, build up your confidence, and address any lingering fears or reservations you might have about quitting. We want you mentally ready for Day 6, which will be your last day smoking."
            },
            {
              id: 's6',
              title: "Start Thinking About Your Pack",
              content: "If you have cigarettes beyond what you'll need for the next two days, start thinking about discarding them.",
              backgroundGradient: "bg-gradient-to-br from-primary/80 to-coral/80",
              icon: "🗑️",
              narration: "One practical note: If you have any cigarettes left beyond what you'll need for tomorrow and the final exercise on Day 6, start thinking about discarding them. You might keep just a few for the planned 'last cigarette' event. Some people like to throw away their spares now as a sign of commitment – if you feel that motivation, fantastic. If not, no pressure; you can get rid of them when we reach quit day."
            },
          ]
        }
      },
      {
        id: 'd4m6',
        title: "Day 4 Complete",
        description: "Congratulations on completing this powerful exercise.",
        type: 'ANIMATED_SLIDES',
        estimatedSeconds: 240,
        gatingRequired: true,
        content: {
          slides: [
            {
              id: 's1',
              title: "You Did Something Brave",
              content: "Day 4 was tough. It required you to face smoking in a completely new way. You did it. That takes courage.",
              backgroundGradient: "bg-gradient-to-br from-success/80 to-primary/80",
              icon: "🏆",
              narration: "Congratulate yourself. Day 4 was a tough one for some – it required you to face smoking in a new way. You did it. That's brave and it's making you stronger. Many people say this exercise was a turning point for them – the moment they started to see cigarettes for what they really are."
            },
            {
              id: 's2',
              title: "Cleanse and Rest",
              content: "Drink some water to cleanse your palate. Take it easy for the rest of the day. You've done important work.",
              backgroundGradient: "bg-gradient-to-br from-primary/80 to-freedom/80",
              icon: "💧",
              narration: "Take it easy for the rest of the day. Drink some water to cleanse your palate if that taste is lingering – it can help. Maybe jot down in your journal what you noticed during this exercise – writing it will reinforce the realizations. For instance, 'Smoking mindfully today I noticed ___ and I felt ___.'"
            },
            {
              id: 's3',
              title: "Tomorrow: Day 5",
              content: "Tomorrow we gear up for your independence day. You're so close to breaking free. Keep that momentum!",
              backgroundGradient: "bg-gradient-to-br from-freedom/80 to-success/80",
              icon: "🚀",
              narration: "Tomorrow we gear up for your independence day on Day 6. You're so close to breaking free. Keep that momentum and I'll see you on Day 5. You're doing amazing work – the fact that you're still here, still engaged, still committed, says everything about your strength. See you tomorrow!"
            },
          ]
        }
      },
    ]
  },
  {
    dayNumber: 5,
    title: "Preparing for Quit Day",
    subtitle: "Reframing & Commitment",
    modules: [
      {
        id: 'd5m1',
        title: "Welcome to Day 5",
        description: "The eve of your quit day – you've made it this far!",
        type: 'ANIMATED_SLIDES',
        estimatedSeconds: 360,
        gatingRequired: true,
        content: {
          slides: [
            {
              id: 's1',
              title: "The Eve of Your Freedom",
              content: "Day 5 – you've made it to the eve of your quit day! Give yourself a hearty pat on the back.",
              backgroundGradient: "bg-gradient-to-br from-primary/80 to-success/80",
              icon: "🎉",
              narration: "Day 5 – you've made it to the eve of your quit day! Give yourself a hearty pat on the back. Seriously, think of everything you've done in the last few days: you've reflected on why you smoke, learned how nicotine tricks you, identified all your triggers, practiced new responses, and even looked smoking straight in the eye with that mindful exercise. The changes happening in your mindset are HUGE."
            },
            {
              id: 's2',
              title: "Notice the Shift",
              content: "How do you feel about quitting now compared to Day 1? Something's different, isn't it?",
              backgroundGradient: "bg-gradient-to-br from-success/80 to-freedom/80",
              icon: "🔄",
              narration: "Take a moment now to notice: how do you feel about quitting, right now, compared to when you started Day 1? Many of my students – and I hope you too – often say by Day 5, something's different. Maybe you're actually excited to quit, not scared. Maybe you can't wait to be done with cigarettes, whereas before you couldn't imagine life without them. Perhaps you even already consider yourself 'basically done' with smoking – like it's lost its power over you."
            },
            {
              id: 's3',
              title: "It's Okay to Have Doubts",
              content: "If you still have some worries or don't feel 100% confident – that's okay and completely normal.",
              backgroundGradient: "bg-gradient-to-br from-freedom/80 to-accent/80",
              icon: "💭",
              narration: "If you still have some worries or don't feel 100% confident – that's okay and normal. We're going to address those right now, and firm up your commitment. By the end of today's session, you'll be fully ready to step into Day 6 as a non-smoker. Let's tackle some common fears or doubts head on."
            },
          ]
        }
      },
      {
        id: 'd5m2',
        title: "Confronting Your Fears",
        description: "Let's tackle the common fears that hold people back from quitting.",
        type: 'ANIMATED_SLIDES',
        estimatedSeconds: 480,
        gatingRequired: true,
        content: {
          slides: [
            {
              id: 's1',
              title: "Fear #1: Withdrawal & Cravings",
              content: "\"Will I go crazy without cigarettes? What if I can't handle the cravings?\"",
              backgroundGradient: "bg-gradient-to-br from-coral/80 to-primary/80",
              icon: "😰",
              narration: "Fear #1: Withdrawal and Cravings. You might be thinking, 'Will I go crazy without cigarettes? What if I get irritable or can't handle the cravings?' First, remember that a lot of withdrawal is psychological. You have removed a lot of the psychological desire already. In fact, a survey of thousands of QuitSure users found that the majority did not experience severe withdrawal after quitting, and many had none or only mild symptoms. That's because their mental game was strong – just like yours is becoming."
            },
            {
              id: 's2',
              title: "Withdrawal Is Temporary",
              content: "Nicotine leaves your body in 2-3 days. Physical symptoms peak around day 2-3, then get better quickly.",
              backgroundGradient: "bg-gradient-to-br from-primary/80 to-accent/80",
              icon: "📉",
              narration: "Physically, nicotine leaves your body pretty quickly – about 2-3 days for most of it to be gone. The worst physical symptoms, if any, usually peak around day 2 or 3 after quitting, then get better. Those symptoms can be things like irritability, restlessness, trouble sleeping, or cough as your lungs clear. Not fun, but temporary. You can handle a few days of feeling off, right? Especially knowing it's the feeling of healing."
            },
            {
              id: 's3',
              title: "You've Got the Tools",
              content: "Deep breathing, mindfulness, water, distraction, support – you're equipped. Cravings last minutes, not forever.",
              backgroundGradient: "bg-gradient-to-br from-accent/80 to-success/80",
              icon: "🧰",
              narration: "We have a whole session on coping with cravings from Day 7 onward, but you've already got tools: deep breathing, mindfulness, drinking water, distracting yourself, reaching out for support. Cravings last minutes, not forever – you can surf them like we discussed. And every single hour that passes after quitting, you're closer to freedom and your body is recovering. Think of it this way: you've likely endured worse things than nicotine withdrawal in life. People often find the anticipation is scarier than the reality."
            },
            {
              id: 's4',
              title: "Fear #2: What If I Fail?",
              content: "\"What if I slip up or can't do it? I've tried before...\"",
              backgroundGradient: "bg-gradient-to-br from-success/80 to-coral/80",
              icon: "😔",
              narration: "Fear #2: Failure – 'What if I slip up or can't do it?' I hear you. Maybe you've tried before and went back, and you're worried that'll happen again. Let's reframe failure. A slip or relapse is not a moral failure or the end of the road – it's a sign that something in the plan needs adjusting. However, I want you to visualize success, not failure. You have every reason to succeed now."
            },
            {
              id: 's5',
              title: "95% Success Rate",
              content: "You have about a 95% chance of success if you complete this program fully. Those are fantastic odds!",
              backgroundGradient: "bg-gradient-to-br from-coral/80 to-freedom/80",
              icon: "📊",
              narration: "Unlike past attempts, you have a whole arsenal of strategies and a different mindset. You're not quitting by willpower alone; you're doing it smartly. Remember, you have about a 95% chance of success if you complete this program fully. Those are fantastic odds! So instead of 'what if I fail?', try on the thought: 'What if I succeed?' – because it's very likely you will. In fact, you're already succeeding by making it this far."
            },
            {
              id: 's6',
              title: "If You Ever Slip...",
              content: "Get right back on track. No shame, no guilt. Treat it as a tiny bump and keep going forward.",
              backgroundGradient: "bg-gradient-to-br from-freedom/80 to-primary/80",
              icon: "🔁",
              narration: "But let's say worst case scenario in the future you had a cigarette. We're not planning to, but hypothetically – you know what you'd do? Stop again. Use it as a learning experience, figure out what trigger got you, improve your strategy, and get right back on track. No shame, no guilt, no 'oh I failed might as well go back to a pack a day.' Nope. You'd treat it as a tiny bump and keep going forward. So truly, nothing is going to stop you from becoming and staying a non-smoker except you. And you are determined."
            },
          ]
        }
      },
      {
        id: 'd5m3',
        title: "More Fears Addressed",
        description: "Losing a coping mechanism, weight gain, and identity change.",
        type: 'ANIMATED_SLIDES',
        estimatedSeconds: 420,
        gatingRequired: true,
        content: {
          slides: [
            {
              id: 's1',
              title: "Fear #3: Losing My Coping Mechanism",
              content: "\"How will I handle stress without my smokes? Cigarettes have been there for me...\"",
              backgroundGradient: "bg-gradient-to-br from-primary/80 to-coral/80",
              icon: "🤝",
              narration: "Fear #3: Losing a friend or coping mechanism. We often personify smoking as a friend or crutch. Part of you might think, 'When I'm quit, how will I handle stress or sadness without my smokes? Cigarettes have been there for me.' It's true – cigarettes have been your quick fix in tough times. But also think: they were causing stress too and certainly causing you harm while pretending to help."
            },
            {
              id: 's2',
              title: "You Have Better Friends Now",
              content: "Breathing techniques, supportive people, healthier coping mechanisms – you haven't lost anything.",
              backgroundGradient: "bg-gradient-to-br from-coral/80 to-success/80",
              icon: "🧘",
              narration: "Now, you have new friends: supportive breathing techniques, maybe supportive people or this app's community, healthier coping mechanisms like a walk or a meditation. And you haven't lost anything – cigarettes weren't actually helping you solve problems or truly comforting you. They might have numbed you or given a distraction, but you have better ways now. Consider writing a little breakup note to cigarettes – in fact, let's do that as an exercise in a moment, because it's a powerful closure technique."
            },
            {
              id: 's3',
              title: "Fear #4: Weight Gain",
              content: "Not everyone gains weight. If you do, it's often 5-10 lbs – manageable and worth it for your health.",
              backgroundGradient: "bg-gradient-to-br from-success/80 to-accent/80",
              icon: "⚖️",
              narration: "Fear #4: Weight gain or other side effects. This comes up – nicotine can suppress appetite a bit and many worry they'll overeat. We will talk in later sessions about handling this, but a quick note: not everyone gains weight. If you do, it's often 5-10 lbs that can be managed with a bit of exercise and mindful eating. We'd much rather you be 5 lbs heavier and not smoking than vice versa, right?"
            },
            {
              id: 's4',
              title: "Your Senses Return",
              content: "Improved circulation, better taste and smell – these are manageable changes, all signs of healing.",
              backgroundGradient: "bg-gradient-to-br from-accent/80 to-freedom/80",
              icon: "👃",
              narration: "We'll give tips to keep your mouth and hands busy with low-calorie substitutes – water, carrots, gum. As for other things – improved circulation can give a bit more energy, taste and smell improve so food might seem more delicious (hence the need to be mindful). These are all manageable changes. They're signs of healing, not problems."
            },
            {
              id: 's5',
              title: "Fear #5: Losing Part of Myself",
              content: "Smoking isn't who you are – it's something you did. Your identity can be so much more.",
              backgroundGradient: "bg-gradient-to-br from-freedom/80 to-primary/80",
              icon: "🦋",
              narration: "If you've smoked for years or decades, quitting might feel like losing part of yourself or a comfort. We reframe: smoking isn't who you are, it's something you did. Your identity can be so much more – perhaps an identity of a strong, healthy person or a role model for others. You're not losing something precious; you're shedding a burden that was weighing you down."
            },
          ]
        }
      },
      {
        id: 'd5m4',
        title: "Visualizing Success",
        description: "Let's create a powerful vision of your smoke-free future.",
        type: 'GUIDED_PRACTICE',
        estimatedSeconds: 300,
        gatingRequired: true,
        practiceType: 'VISUALIZATION',
      },
      {
        id: 'd5m5',
        title: "The Goodbye Letter",
        description: "Write a farewell to cigarettes – this powerful exercise provides closure.",
        type: 'CHECKPOINT',
        estimatedSeconds: 360,
        gatingRequired: true,
        content: {
          checkpointType: 'GOODBYE_LETTER',
          title: "Your Goodbye Letter",
          description: "Write a short letter addressed to your cigarettes. Thank them if you want, acknowledge the harm, and firmly say goodbye.",
          promptText: "Dear Cigarettes...",
        }
      },
      {
        id: 'd5m6',
        title: "Your Commitment Pledge",
        description: "Make a firm commitment to yourself – this is your promise.",
        type: 'ANIMATED_SLIDES',
        estimatedSeconds: 360,
        gatingRequired: true,
        content: {
          slides: [
            {
              id: 's1',
              title: "Time to Commit",
              content: "Now, let's solidify your commitment. Tomorrow is your Quit Day – the first day of your smoke-free life.",
              backgroundGradient: "bg-gradient-to-br from-primary/80 to-success/80",
              icon: "📝",
              narration: "Now, let's solidify your commitment. Tomorrow is your Quit Day – the first day of your smoke-free life. I want you to make it official. You've written your goodbye letter. Now comes your pledge to yourself."
            },
            {
              id: 's2',
              title: "Your Pledge",
              content: "\"I promise myself that from tomorrow onward, I will not smoke. I will stay committed to being free.\"",
              backgroundGradient: "bg-gradient-to-br from-success/80 to-freedom/80",
              icon: "✋",
              narration: "This is a promise to yourself. It can be short and simple. Something like: 'I promise myself that from tomorrow onward, I will not smoke a single cigarette. I will stay committed to being free. No matter what life throws at me, I will not turn back to smoking, because I deserve this freedom.' You can phrase it in your own words. The important thing is that you commit with full conviction."
            },
            {
              id: 's3',
              title: "Say It Out Loud",
              content: "Declare it: \"I am done with smoking. I am a non-smoker now.\" Say it with conviction!",
              backgroundGradient: "bg-gradient-to-br from-freedom/80 to-accent/80",
              icon: "🗣️",
              narration: "Say it out loud if you can – yes, I'm asking you to talk to yourself out loud: 'I am done with smoking. I am a non-smoker now.' Declare it. That commitment is gold. It's the kind of firm decision that carries people through any challenges. You are not 'trying' to quit. You ARE quitting. In fact, you've quit – you just have to get rid of the remaining cigarettes from your life tomorrow and never look back."
            },
            {
              id: 's4',
              title: "The Power of Decision",
              content: "You're not \"trying\" to quit. You ARE quitting. In fact, you've already quit in your mind.",
              backgroundGradient: "bg-gradient-to-br from-accent/80 to-primary/80",
              icon: "💪",
              narration: "Wonderful. That commitment is everything. You're not 'trying' to quit. You ARE quitting. In fact, you've quit – you just have to get rid of the remaining cigarettes from your life tomorrow and never look back. This decision, made with full conviction, is what separates those who succeed from those who struggle."
            },
          ]
        }
      },
      {
        id: 'd5m7',
        title: "Preparing for Tomorrow",
        description: "Practical steps for quit day and what to expect.",
        type: 'ANIMATED_SLIDES',
        estimatedSeconds: 420,
        gatingRequired: true,
        content: {
          slides: [
            {
              id: 's1',
              title: "Logistics for Quit Day",
              content: "Tomorrow, we'll guide you through your last cigarette ritual. Think about when you want to do it.",
              backgroundGradient: "bg-gradient-to-br from-primary/80 to-coral/80",
              icon: "📋",
              narration: "Let's talk logistics for Quit Day (Day 6): At the usual time for your session, we will guide you through your last cigarette ritual. Many people choose a specific cigarette of the day to be their last – for example, 'the morning one' or 'the after lunch one,' so that after that point, they won't smoke again. Think about when you want to do it. Ensure you don't smoke earlier than planned, because we want to mark it consciously."
            },
            {
              id: 's2',
              title: "Clear Your Environment",
              content: "Tonight or tomorrow, throw out all cigarettes, lighters, ashtrays. No \"just in case\" – slam that door shut.",
              backgroundGradient: "bg-gradient-to-br from-coral/80 to-freedom/80",
              icon: "🗑️",
              narration: "If you have any cigarettes left, aside from the one or few for tomorrow, plan to dispose of them. I strongly encourage you: tonight or tomorrow, throw out all cigarettes, lighters, ashtrays. Keeping any 'just in case' is keeping the door cracked open. We want that door slammed shut. If you have half a pack left, you might do something symbolic – soak them in water and throw them out, crush them, or have a little 'farewell' ceremony."
            },
            {
              id: 's3',
              title: "Create a Fresh Start",
              content: "Clean your car, wash your jackets, remove the stale smoke smell. Create a clean space for your clean life.",
              backgroundGradient: "bg-gradient-to-br from-freedom/80 to-success/80",
              icon: "✨",
              narration: "It's time to remove all traces from your environment – clean your car if it's full of smoke smell, maybe wash your jackets, so you don't have that stale smell triggering you. Create a fresh, clean space for your fresh, clean life."
            },
            {
              id: 's4',
              title: "Visualize Tonight",
              content: "Picture your life as a non-smoker. The money saved, the health gained, the freedom earned.",
              backgroundGradient: "bg-gradient-to-br from-success/80 to-accent/80",
              icon: "🌙",
              narration: "Tonight, visualize one more time your life as a non-smoker. The money saved – perhaps think of something you'll treat yourself with using that money. In a week or a month of not buying cigarettes, you'll have a nice chunk – plan a reward, you earned it! Think of your health – maybe even take a slightly longer walk tonight and notice how your breathing feels."
            },
            {
              id: 's5',
              title: "The Ultimate Reframe",
              content: "You're not \"giving up\" smoking – you're getting rid of it. You're not losing a friend – you're kicking out an enemy.",
              backgroundGradient: "bg-gradient-to-br from-accent/80 to-primary/80",
              icon: "🔄",
              narration: "One more important reframe: After tomorrow, you are not 'giving up' smoking – you are getting rid of smoking. You're not losing a friend, you're kicking out an enemy. Any time your brain tries to say 'I miss it,' remind yourself of all the things you won't miss: the cough, the expense, the anxiety of running low, the smell, the guilt, the control it had on you. You're giving up nothing of value; you're gaining everything."
            },
          ]
        }
      },
      {
        id: 'd5m8',
        title: "Day 5 Complete",
        description: "You're ready for your independence day!",
        type: 'ANIMATED_SLIDES',
        estimatedSeconds: 300,
        gatingRequired: true,
        content: {
          slides: [
            {
              id: 's1',
              title: "You're Ready",
              content: "I can genuinely feel how much you've transformed in these 5 days. You are ready for this.",
              backgroundGradient: "bg-gradient-to-br from-success/80 to-primary/80",
              icon: "🌟",
              narration: "Alright champion, you're ready. I can genuinely feel how much you've transformed in these 5 days. We are honored to be by your side in this. You've confronted your fears, made your commitment, and prepared your environment."
            },
            {
              id: 's2',
              title: "Rest Well Tonight",
              content: "Tomorrow is a big day – it's celebration time. Feel proud, feel determined, feel excited.",
              backgroundGradient: "bg-gradient-to-br from-primary/80 to-freedom/80",
              icon: "😴",
              narration: "Rest well tonight. Tomorrow is a big day – it's celebration time. You might feel a little nervous excitement – that's natural – but mostly, feel proud and determined. This isn't an ending; it's the beginning of your new life."
            },
            {
              id: 's3',
              title: "Your Freedom Awaits",
              content: "Your freedom is hours away. Tomorrow, you say a final goodbye to smoking and hello to the new you!",
              backgroundGradient: "bg-gradient-to-br from-freedom/80 to-success/80",
              icon: "🎯",
              narration: "You've got this. Your freedom is hours away. See you on Day 6, where we will say a final goodbye to smoking and hello to the new you! Congratulations on completing Day 5 – you're not just preparing to quit; you've already become a non-smoker in your mind. Tomorrow just makes it official."
            },
          ]
        }
      },
      {
        id: 'd5m9',
        title: "Closing Breathing Practice",
        description: "End with a calming practice to prepare for tomorrow.",
        type: 'GUIDED_PRACTICE',
        estimatedSeconds: 240,
        gatingRequired: true,
        practiceType: 'BREATHING',
      },
    ]
  },
  {
    dayNumber: 6,
    title: "Freedom Day",
    subtitle: "The Last Cigarette and Your New Beginning",
    modules: [
      {
        id: 'd6m1',
        title: "Welcome to Freedom Day",
        description: "This is it – the day you've been preparing for!",
        type: 'ANIMATED_SLIDES',
        estimatedSeconds: 420,
        gatingRequired: true,
        content: {
          slides: [
            {
              id: 's1',
              title: "This Is It!",
              content: "Day 6, your Freedom Day! Take a moment to appreciate how far you've come. By the end of this session, you will have smoked your last cigarette.",
              backgroundGradient: "bg-gradient-to-br from-primary/80 to-success/80",
              icon: "🎯",
              narration: "This is it – Day 6, your Freedom Day! Take a moment to appreciate how far you've come. By the end of this session, you will have smoked your last cigarette and embarked on a new life as a non-smoker. I am so excited for you, and maybe you're feeling a mix of excitement and nerves too. That's completely normal. Let's do this together, step by step, just like we have all week."
            },
            {
              id: 's2',
              title: "Prepare Your Space",
              content: "If you have any extra cigarettes or lighters, gather them now. We'll dispose of everything after your final cigarette.",
              backgroundGradient: "bg-gradient-to-br from-success/80 to-freedom/80",
              icon: "🧹",
              narration: "Before we begin, if you have any cigarettes or lighters around, other than the one for this final ritual, gather them up now. We are going to dispose of everything after the last cigarette. You won't be needing them ever again. Having them out of sight will make it easier going forward. So if you haven't thrown them out yet, have a trash can nearby or something to dump them in after."
            },
            {
              id: 's3',
              title: "The Plan",
              content: "We will mindfully smoke one final cigarette – your goodbye smoke – and then you will forever break free.",
              backgroundGradient: "bg-gradient-to-br from-freedom/80 to-accent/80",
              icon: "📋",
              narration: "Now, the plan: We will mindfully smoke one final cigarette – your goodbye smoke – and then you will forever break free. You already practiced mindful smoking on Day 4, so you know how to do this. The difference now is the mindset: this isn't just an observation exercise, this is a farewell ceremony."
            },
            {
              id: 's4',
              title: "Everything Led to This",
              content: "Every day of this journey – the understanding, the practices, the mindset shifts – has prepared you for this moment.",
              backgroundGradient: "bg-gradient-to-br from-accent/80 to-coral/80",
              icon: "✨",
              narration: "Think of everything you've done in the last few days: you've reflected on why you smoke, learned how nicotine tricks you, identified all your triggers, practiced new responses, and even looked smoking straight in the eye with that mindful exercise. The changes happening in your mindset are HUGE. Everything has led to this moment."
            },
            {
              id: 's5',
              title: "A Mix of Emotions",
              content: "Excited? Nervous? Both are natural. This is a big moment – and you're ready for it.",
              backgroundGradient: "bg-gradient-to-br from-coral/80 to-primary/80",
              icon: "💫",
              narration: "You might be feeling a mix of excitement and nerves right now. That's completely natural – this is a big moment in your life. But I want you to know: you are ready. Everything you've learned and practiced has prepared you. This isn't the end of something – it's the beginning of your new, free life."
            },
          ]
        }
      },
      {
        id: 'd6m2',
        title: "The Final Cigarette Ceremony",
        description: "Light your last cigarette and say goodbye forever.",
        type: 'ANIMATED_SLIDES',
        estimatedSeconds: 600,
        gatingRequired: true,
        content: {
          slides: [
            {
              id: 's1',
              title: "Ready? Light It Now",
              content: "If you haven't lit your final cigarette yet, go ahead and light it now.",
              backgroundGradient: "bg-gradient-to-br from-coral/80 to-primary/80",
              icon: "🔥",
              narration: "Ready? If you haven't lit your final cigarette yet, go ahead and light it now. This is the last time you ever have to do this."
            },
            {
              id: 's2',
              title: "The Last Time",
              content: "As you inhale, recognize this moment: this is the last time you ever have to do this.",
              backgroundGradient: "bg-gradient-to-br from-primary/80 to-accent/80",
              icon: "🚬",
              narration: "As you inhale, recognize this moment: this is the last time you ever have to do this. Pay attention again to the taste, the sensation – likely no better than last time, right? In fact, it might even be less enjoyable now because you know what life can be without it. Take that first puff... and exhale slowly, watching the smoke dissipate. Think of that smoke as your old habit floating away."
            },
            {
              id: 's3',
              title: "Say Goodbye",
              content: "As you exhale, say in your mind or aloud: \"Goodbye, smoking. I'm done with you.\"",
              backgroundGradient: "bg-gradient-to-br from-accent/80 to-freedom/80",
              icon: "👋",
              narration: "Take another puff if you need, slowly... and as you exhale, say in your mind or aloud: 'Goodbye, smoking. I'm done with you.' If any part of this cigarette tastes gross or feels off, lean into that – it only solidifies your decision. Even if it oddly tastes good, know that in mere minutes any pleasure will be gone, but your freedom will remain."
            },
            {
              id: 's4',
              title: "You Don't Have to Finish",
              content: "The moment you feel \"I'm done,\" you're done. Stub it out when you're ready.",
              backgroundGradient: "bg-gradient-to-br from-freedom/80 to-success/80",
              icon: "✋",
              narration: "You do not even have to finish it. The moment you feel 'I'm done,' then you're done. You might already feel that. If so, stub it out. Or take one or two more conscious puffs as a final test – see that it gives you nothing new – and then extinguish it."
            },
            {
              id: 's5',
              title: "Extinguish It Forever",
              content: "Put it out... crush it... do whatever feels symbolic. As that ember dies, a new chapter begins.",
              backgroundGradient: "bg-gradient-to-br from-success/80 to-primary/80",
              icon: "💪",
              narration: "Alright. If you haven't already, put it out... crush it... do whatever feels symbolic – some people spit on it or break it in half to really end it, up to you! As that ember dies, a chapter of your life closes and a new one begins."
            },
            {
              id: 's6',
              title: "Confirm Your Freedom",
              content: "Now, mark this moment: tap the button to confirm your last cigarette.",
              backgroundGradient: "bg-gradient-to-br from-primary/80 to-freedom/80",
              icon: "✅",
              narration: "Now, mark this moment: In the app, tap the button to confirm 'I have smoked my last cigarette.' This is your quit timestamp – your anniversary to celebrate. Mark it somewhere special. Maybe set a recurring reminder every month to treat yourself on this day."
            },
          ]
        }
      },
      {
        id: 'd6m3',
        title: "Mark Your Victory",
        description: "Confirm that you have smoked your last cigarette.",
        type: 'CHECKPOINT',
        estimatedSeconds: 120,
        gatingRequired: true,
        content: {
          checkpointType: 'COMMITMENT',
          title: "I Have Smoked My Last Cigarette",
          description: "Tap the button below to confirm this moment and mark your quit date.",
          promptText: "I confirm that I have smoked my last cigarette. I am now a non-smoker.",
        }
      },
      {
        id: 'd6m4',
        title: "Congratulations, Non-Smoker!",
        description: "Welcome to your new life as a non-smoker.",
        type: 'ANIMATED_SLIDES',
        estimatedSeconds: 480,
        gatingRequired: true,
        content: {
          slides: [
            {
              id: 's1',
              title: "🎉 CONGRATULATIONS! 🎉",
              content: "You. Are. FREE! Welcome to life as a non-smoker!",
              backgroundGradient: "bg-gradient-to-br from-success/80 to-freedom/80",
              icon: "🎊",
              narration: "Yes! CONGRATULATIONS!!! You. Are. FREE! Welcome to life as a non-smoker! Breathe in deeply right now – fill those lungs with air, clean air. Feel that? That's how it's going to be from now on, only getting better each day. You might cough a bit as your lungs start clearing out tar – that's okay, it's healing."
            },
            {
              id: 's2',
              title: "This Is Huge",
              content: "This is one of the biggest positive changes you can make in your life. And you did it.",
              backgroundGradient: "bg-gradient-to-br from-freedom/80 to-primary/80",
              icon: "🏆",
              narration: "Take a moment to relish this achievement. It's huge. Truly, this is one of the biggest positive changes you can make in your life. And you did it in less than a week of preparation, without trauma or drugs, but by your own understanding and decision. Be proud. So many people dream of being where you are right now."
            },
            {
              id: 's3',
              title: "Your New Identity",
              content: "Say it now: \"I am a non-smoker.\" Say it with conviction, with joy. This is who you are.",
              backgroundGradient: "bg-gradient-to-br from-primary/80 to-accent/80",
              icon: "🦋",
              narration: "I want to help you mentally solidify your new identity. Say to yourself now – yes, say it out loud if you can: 'I am a non-smoker.' Say it with conviction, with joy. This is who you are now. Any time a thought of a cigarette comes, you remind yourself, 'I don't do that anymore. I'm a non-smoker.' It's not 'I can't smoke,' it's 'I don't smoke.' Big difference – the first is deprivation, the second is empowerment. You are choosing not to because you don't need or want it."
            },
            {
              id: 's4',
              title: "Clear Your Space",
              content: "Throw away any remaining cigarettes now. Chuck those lighters and ashtrays. No easy access temptations.",
              backgroundGradient: "bg-gradient-to-br from-accent/80 to-coral/80",
              icon: "🗑️",
              narration: "At this point, it's also time to make sure you've cleared out everything. Throw away any remaining cigarettes right now. If you still had an open pack, toss it. If there's a cigarette behind your ear or in your car, go get it and trash it. Go on, I'll wait. Also chuck those lighters and ashtrays. We want no 'easy access' temptations lying around. It's part of making the decision final – and trust me, it feels good to have a cleaner space."
            },
            {
              id: 's5',
              title: "Your Quit Date",
              content: "Today is your quit date – your anniversary to celebrate. This is Day 0 of your smoke-free life.",
              backgroundGradient: "bg-gradient-to-br from-coral/80 to-success/80",
              icon: "📅",
              narration: "Let's record some details for you: Today's date and time – this is your quit date, your anniversary to celebrate. Day 0 meaning the very start of your new life. The app has noted it. Every month on this day, treat yourself to something special. You've earned it."
            },
          ]
        }
      },
      {
        id: 'd6m5',
        title: "What Comes Next",
        description: "Tips for your first 24 hours and beyond.",
        type: 'ANIMATED_SLIDES',
        estimatedSeconds: 480,
        gatingRequired: true,
        content: {
          slides: [
            {
              id: 's1',
              title: "The Next 24 Hours",
              content: "Some feelings you might experience: elation, emptiness at certain times, occasional cravings. All normal.",
              backgroundGradient: "bg-gradient-to-br from-primary/80 to-success/80",
              icon: "⏰",
              narration: "Now let's talk about what's next. The next 24 hours are important – they're your first day free. Some feelings you might experience: you could feel elated – woohoo, I did it! – or oddly you might feel a bit empty or unsure what to do at certain times, like a morning coffee with no cigarette. That's okay, refer to your list of alternatives and try one. You might get some cravings – that's expected. But remember, cravings are just your body adjusting and they will pass. You might even find they're not as strong as you feared because you've mentally disarmed them."
            },
            {
              id: 's2',
              title: "Your Support System",
              content: "The community and support is here for you. If you feel shaky, open the app and hit the Craving Help button.",
              backgroundGradient: "bg-gradient-to-br from-success/80 to-freedom/80",
              icon: "🤝",
              narration: "The community and support is here for you. If you feel shaky, open the app and hit the Craving Help button. It will guide you through a 5-minute urge meditation or give you a quick task to distract you. Or hop onto the chat to talk with a coach or fellow quitters. Use those resources – they can make the difference in moments of temptation."
            },
            {
              id: 's3',
              title: "Quick Tips",
              content: "Drink plenty of water. Change up routines. Treat yourself in healthy ways. Take deep breaths frequently.",
              backgroundGradient: "bg-gradient-to-br from-freedom/80 to-accent/80",
              icon: "💡",
              narration: "Keep in mind some quick tips for today and the coming days: Drink plenty of water – it helps flush nicotine and it occupies you. Change up routines if needed – for example, if you always smoked after lunch, plan to immediately get up and go for a 5-minute walk or call a friend during that time. Treat yourself in healthy ways: eat a favorite snack, maybe something fruity or a nice piece of chocolate, when you would usually have a smoke, so you still feel rewarded. Take deep breaths frequently – you'll be amazed how nice it is to take deep breaths that don't trigger a cough or taste like smoke."
            },
            {
              id: 's4',
              title: "Replace the Habit",
              content: "Whenever you would normally have a cigarette, spend the 5 minutes doing something positive for yourself.",
              backgroundGradient: "bg-gradient-to-br from-accent/80 to-coral/80",
              icon: "🔄",
              narration: "One of my favorite suggestions: whenever you would normally have a cigarette, instead spend the 5 minutes doing something positive for yourself. Some people do a set of pushups or dance to a song. Some brush their teeth, loving the fresh feeling. Some write a few lines in a journal. The point is to replace the habit with something that makes you feel good in a genuine way."
            },
            {
              id: 's5',
              title: "The \"Just One\" Trap",
              content: "\"Just one won't hurt\" is the addiction talking. You know too much now. One would just re-awaken the cycle.",
              backgroundGradient: "bg-gradient-to-br from-coral/80 to-primary/80",
              icon: "⚠️",
              narration: "I want to address something: It's common today or tomorrow to have a random thought like, 'Wow, normally I'd be smoking right now' or even 'Can I really do this forever?' Do not let that spook you. Yes, you can do it forever – by taking it one day at a time. As the saying goes, not a single puff. The moment you think 'just one won't hurt,' remember that for us, one is not one – one cigarette often leads back to many. But here's the thing: you don't want one, really. That's the addiction talking if it happens. You know too much now – you know one cigarette would taste pretty bad after having quit and would just re-awaken the cycle."
            },
            {
              id: 's6',
              title: "Play the Tape Forward",
              content: "If you get a strong urge, imagine smoking one – you'd feel disappointed, and you'd be back to square one. Not worth it.",
              backgroundGradient: "bg-gradient-to-br from-primary/80 to-freedom/80",
              icon: "🎬",
              narration: "If you do get a strong urge, play the tape forward: imagine you do smoke one – you'd feel disappointed, it wouldn't even give you much, and you'd be back to square one. Not worth it, right? Instead, remember the joy you're feeling now having quit, and do something from your toolbox. The cravings are like a bluff – call that bluff, and they'll weaken. There's a phrase: NR=100%. It means Not Relapsing equals 100% success. If you simply don't light another cigarette, you will be successful."
            },
          ]
        }
      },
      {
        id: 'd6m6',
        title: "Celebrate Your First Day",
        description: "Positive activities and the benefits starting already.",
        type: 'ANIMATED_SLIDES',
        estimatedSeconds: 420,
        gatingRequired: true,
        content: {
          slides: [
            {
              id: 's1',
              title: "Do Something Nice Today",
              content: "Go to a movie, take a long shower, start a light exercise. Treat this day as special.",
              backgroundGradient: "bg-gradient-to-br from-success/80 to-primary/80",
              icon: "🎬",
              narration: "Take it easy today. If possible, do something nice this first day – maybe go to a movie (can't smoke in a theater, perfect!), or take a long shower and feel how clean you are becoming, or start a light exercise like a short jog or yoga to get those endorphins flowing."
            },
            {
              id: 's2',
              title: "Cravings Are Trophies",
              content: "If you have a craving, remember it's just your body healing. Each craving overcome is like a trophy you earn.",
              backgroundGradient: "bg-gradient-to-br from-primary/80 to-accent/80",
              icon: "🏅",
              narration: "If you have a craving, remember it's just your body healing – maybe say 'bring it on, heal me!' and use a technique. Each craving overcome is like a trophy you earn. And they will get fewer and farther between quite quickly."
            },
            {
              id: 's3',
              title: "Your Senses Are Returning",
              content: "Food might taste better even by tonight. Smells become more vivid. Notice these small wins.",
              backgroundGradient: "bg-gradient-to-br from-accent/80 to-freedom/80",
              icon: "👃",
              narration: "Also, your senses might already be sharpening – food might taste better even by tonight or tomorrow, smells become more vivid. Notice those small wins. And when you wake up tomorrow, you might notice you breathe a little easier. These are the immediate rewards of quitting. We'll track more benefits in coming days."
            },
            {
              id: 's4',
              title: "Visualize Tonight",
              content: "Envision yourself later today, going to bed knowing \"I didn't smoke today.\" Feel that pride.",
              backgroundGradient: "bg-gradient-to-br from-freedom/80 to-coral/80",
              icon: "🌙",
              narration: "Finally, let's do a quick visualization: Envision yourself later today, going to bed knowing 'I didn't smoke today.' You might feel a strong sense of pride and maybe disbelief, but it's real. Envision a week from now – perhaps some of the initial cravings passed, you find yourself thinking of cigarettes less often, you have more energy."
            },
            {
              id: 's5',
              title: "A Month From Now",
              content: "You've saved significant money. Your skin looks healthier. You might inspire a friend or two to quit.",
              backgroundGradient: "bg-gradient-to-br from-coral/80 to-success/80",
              icon: "💰",
              narration: "Envision a month from now – you've saved a significant amount of money; maybe you've treated yourself to something nice with those savings. Your skin looks healthier, you're coughing less, you might even inspire a friend or two to consider quitting because they see you glowing. All this is happening, starting now."
            },
            {
              id: 's6',
              title: "Years Added to Your Life",
              content: "You have added years to your life and life to your years by quitting today.",
              backgroundGradient: "bg-gradient-to-br from-success/80 to-freedom/80",
              icon: "❤️",
              narration: "You have added years to your life and life to your years by quitting today. And we're going to make sure those years are wonderful and smoke-free."
            },
          ]
        }
      },
      {
        id: 'd6m7',
        title: "Day 6 Complete",
        description: "Final congratulations and what's next.",
        type: 'ANIMATED_SLIDES',
        estimatedSeconds: 300,
        gatingRequired: true,
        content: {
          slides: [
            {
              id: 's1',
              title: "Go Enjoy Your First Day!",
              content: "No more puffs, not even one. You don't do that anymore. And that is something to be incredibly happy about.",
              backgroundGradient: "bg-gradient-to-br from-primary/80 to-success/80",
              icon: "🌟",
              narration: "Alright, I'll let you go enjoy your first day without cigarettes! Remember: no more puffs, not even one. You don't do that anymore. And that is something to be incredibly happy about."
            },
            {
              id: 's2',
              title: "Continue Tomorrow",
              content: "We'll focus on staying on track and handling any cravings. Spoiler: you're going to do great.",
              backgroundGradient: "bg-gradient-to-br from-success/80 to-freedom/80",
              icon: "📅",
              narration: "We'll talk more in the next sessions about keeping your momentum and dealing with situations, so definitely continue the daily sessions through Day 10 – they will cement this victory so it lasts for life. The worst thing would be to think 'I'm done, I don't need the rest.' Stay with us; there's important reinforcement and strategies ahead."
            },
            {
              id: 's3',
              title: "Congratulations, Non-Smoker!",
              content: "You're free, and the rest of the program is here to ensure you stay that way. See you on Day 7!",
              backgroundGradient: "bg-gradient-to-br from-freedom/80 to-primary/80",
              icon: "🎉",
              narration: "Congratulations, non-smoker! See you tomorrow for Day 7, where we'll focus on staying on track and handling any cravings or withdrawal sensations that might come up. Spoiler: you're going to do great. Now go celebrate – you deserve it!"
            },
          ]
        }
      },
      {
        id: 'd6m8',
        title: "Freedom Breathing",
        description: "Celebrate with a deep breathing practice to mark your fresh start.",
        type: 'GUIDED_PRACTICE',
        estimatedSeconds: 240,
        gatingRequired: true,
        practiceType: 'BREATHING',
      },
      {
        id: 'd6m9',
        title: "Body Celebration",
        description: "A body scan to feel your body beginning to heal.",
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
