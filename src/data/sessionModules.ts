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
    slides?: Array<{ id: string; title: string; content: string; backgroundGradient?: string; icon?: string; narration?: string }>;
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
        description: "Introduction to the program and what to expect over 10 days.",
        type: 'ANIMATED_SLIDES',
        estimatedSeconds: 360, // 6:00 - more time for rich content
        gatingRequired: true,
        content: {
          slides: [
            {
              id: 's1',
              title: "Hello & Welcome!",
              content: "Today marks Day 1 of your journey to becoming completely smoke-free. Take a moment to appreciate this decision – you've taken the first step toward a healthier, happier you.",
              backgroundGradient: "bg-gradient-to-br from-primary/80 to-freedom/80",
              icon: "👋",
              narration: "Hello, and welcome. I'm so glad you're here. Today marks Day 1 of your journey to becoming completely smoke-free. Before we go any further, I want you to pause and really appreciate this moment. You made a choice. You chose to be here. That might sound simple, but it's not. Every single person who has ever quit smoking started exactly where you are right now – making that first decision to try. So congratulations. Seriously. Give yourself credit. You've already done something that millions of smokers never do: you've taken action."
            },
            {
              id: 's2',
              title: "You're Not Alone",
              content: "I know what it's like to feel trapped by cigarettes. The constant planning around smoke breaks, the guilt after each one, the fear of quitting. I've been there.",
              backgroundGradient: "bg-gradient-to-br from-success/80 to-primary/80",
              icon: "🤝",
              narration: "I know what it's like. I really do. I know what it feels like to wake up in the morning and reach for a cigarette before your feet even touch the floor. I know the way you plan your entire day around smoke breaks – meetings, car rides, dinners, all scheduled around when you can slip away to light up. I know the guilt that washes over you after every single cigarette, that voice in your head that says 'I should quit' while your hand is already reaching for the pack. And I know the fear. The fear that you can't do it. That you've tried before and failed. That you're somehow different, weaker, more addicted than everyone else. You're not. And over the next 10 days, I'm going to prove it to you."
            },
            {
              id: 's3',
              title: "Keep Smoking (For Now)",
              content: "Here's something unusual: you don't have to quit today. For the first few days, you can keep smoking. This is exactly how our method works.",
              backgroundGradient: "bg-gradient-to-br from-accent/80 to-coral/80",
              icon: "🚬",
              narration: "Now here's where things get interesting. And maybe a little surprising. You don't have to quit smoking today. In fact, for the first few days of this program, I want you to keep smoking. Yes, you heard that right. Keep smoking as you normally do. I know that sounds backwards. Every other quit-smoking program tells you to throw away your cigarettes on day one, white-knuckle through the cravings, and rely on pure willpower. And how well has that worked? Not very well, right? Because willpower eventually runs out. You can only fight so hard for so long before you break. Our method is completely different."
            },
            {
              id: 's4',
              title: "The Real Secret",
              content: "We change the way you think and feel about smoking first. Then quitting becomes natural, almost effortless. No willpower required.",
              backgroundGradient: "bg-gradient-to-br from-freedom/80 to-success/80",
              icon: "🧠",
              narration: "Here's the secret that changed everything for me, and for the millions of people who have successfully quit using this approach: we don't start by changing your behavior. We start by changing your mind. Think about it. Right now, somewhere in your brain, smoking is connected to positive things – relaxation, stress relief, social connection, pleasure after a meal. These associations are powerful. They've been built up over years, maybe decades, of smoking. If you try to quit while those associations are still there, you'll feel like you're giving something up. You'll feel deprived. And eventually, you'll go back. But what if we could rewire those associations first? What if, by the time you smoke your last cigarette, you actually don't want to smoke anymore? That's exactly what we're going to do."
            },
            {
              id: 's5',
              title: "A Personal Story",
              content: "Let me tell you about Sarah. She smoked for 23 years. Two packs a day. She'd tried to quit 11 times. She thought she was hopeless.",
              backgroundGradient: "bg-gradient-to-br from-coral/80 to-primary/80",
              icon: "💫",
              narration: "Let me tell you about someone I'll call Sarah. Sarah started smoking when she was 16. By the time she found this program, she was 39 years old and smoking two packs a day. Twenty-three years. Forty cigarettes daily. She'd tried to quit eleven times. Cold turkey, nicotine patches, gum, prescription medications, hypnotherapy – she'd tried it all. Each time, she'd last a few days, maybe a few weeks, and then something would happen. Stress at work. A fight with her husband. A night out with friends. And she'd smoke 'just one.' Just one turned into just a few. And before she knew it, she was right back where she started, only now with added shame and the conviction that she simply couldn't quit. She was, as she put it, 'a hopeless case.' But she wasn't. And neither are you."
            },
            {
              id: 's6',
              title: "Sarah's Transformation",
              content: "On Day 11, Sarah woke up and didn't want a cigarette. Not because she was fighting the urge – because the urge wasn't there. She was free.",
              backgroundGradient: "bg-gradient-to-br from-primary/80 to-freedom/80",
              icon: "🦋",
              narration: "Sarah completed this 10-day program, just like you're starting today. And something remarkable happened. On Day 11, she woke up, and for the first time in 23 years, she didn't want a cigarette. Not because she was fighting the urge with willpower. Not because she was distracting herself or chewing gum or wearing a patch. The urge simply wasn't there. She said it felt like waking up from a strange dream, like she'd been under some kind of spell, and now she was finally awake. It's been three years now. She hasn't smoked a single cigarette. And she doesn't miss it. Not even a little. That's what's possible. That's what I want for you. And it starts right here, right now, today."
            },
            {
              id: 's7',
              title: "Freedom Without Misery",
              content: "Imagine quitting without feeling deprived. Without the constant battle. Without the misery. That's not a fantasy – that's what this method delivers.",
              backgroundGradient: "bg-gradient-to-br from-success/80 to-freedom/80",
              icon: "🕊️",
              narration: "I want you to imagine something. Imagine quitting smoking and not feeling deprived. Not feeling like you're missing out on something. Not white-knuckling through every meal, every coffee break, every stressful moment, telling yourself 'I can't have a cigarette.' Instead, imagine thinking 'I don't want a cigarette.' Those two phrases might sound similar, but they're worlds apart. 'I can't' is restriction. It's deprivation. It's misery. 'I don't want to' is freedom. And that's what this program delivers. Freedom. Real freedom. The kind where you walk past other smokers and feel relief that you're not them anymore. The kind where you can handle stress, enjoy meals, and live your life without ever needing to light up. I know it might sound too good to be true right now. And that's okay. You don't need to believe me yet. Just stay with me for the next 10 days, and let me show you."
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
