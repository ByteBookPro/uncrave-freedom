import { ContentLanguage } from '@/types/database';

type TranslationKeys = {
  // Navigation
  today: string;
  practice: string;
  progress: string;
  support: string;
  
  // Common
  continue: string;
  start: string;
  complete: string;
  next: string;
  back: string;
  skip: string;
  cancel: string;
  save: string;
  done: string;
  
  // Auth
  signIn: string;
  signUp: string;
  signOut: string;
  email: string;
  password: string;
  forgotPassword: string;
  createAccount: string;
  alreadyHaveAccount: string;
  dontHaveAccount: string;
  
  // Session
  dayN: string;
  moduleNofM: string;
  minutesRemaining: string;
  sessionComplete: string;
  congratulations: string;
  
  // Practice
  breatheIn: string;
  hold: string;
  breatheOut: string;
  intensityBefore: string;
  intensityAfter: string;
  howDoYouFeel: string;
  
  // Craving
  cravingHelp: string;
  rateIntensity: string;
  whatTriggered: string;
  whereAreYou: string;
  
  // Progress
  dayStreak: string;
  cigarettesAvoided: string;
  moneySaved: string;
  timeRegained: string;
  
  // Subscription
  unlockFullProgram: string;
  startFreeTrial: string;
  subscribe: string;
  restore: string;
};

const translations: Record<ContentLanguage, TranslationKeys> = {
  en: {
    // Navigation
    today: 'Today',
    practice: 'Practice',
    progress: 'Progress',
    support: 'Support',
    
    // Common
    continue: 'Continue',
    start: 'Start',
    complete: 'Complete',
    next: 'Next',
    back: 'Back',
    skip: 'Skip',
    cancel: 'Cancel',
    save: 'Save',
    done: 'Done',
    
    // Auth
    signIn: 'Sign In',
    signUp: 'Sign Up',
    signOut: 'Sign Out',
    email: 'Email',
    password: 'Password',
    forgotPassword: 'Forgot Password?',
    createAccount: 'Create Account',
    alreadyHaveAccount: 'Already have an account?',
    dontHaveAccount: "Don't have an account?",
    
    // Session
    dayN: 'Day {n}',
    moduleNofM: 'Module {n} of {m}',
    minutesRemaining: '{n} min remaining',
    sessionComplete: 'Session Complete!',
    congratulations: 'Congratulations!',
    
    // Practice
    breatheIn: 'Breathe In',
    hold: 'Hold',
    breatheOut: 'Breathe Out',
    intensityBefore: 'Intensity before',
    intensityAfter: 'Intensity after',
    howDoYouFeel: 'How do you feel?',
    
    // Craving
    cravingHelp: 'Need help with a craving?',
    rateIntensity: 'Rate your craving intensity',
    whatTriggered: 'What triggered this?',
    whereAreYou: 'Where are you?',
    
    // Progress
    dayStreak: 'Day Streak',
    cigarettesAvoided: 'Cigarettes Avoided',
    moneySaved: 'Money Saved',
    timeRegained: 'Life Regained',
    
    // Subscription
    unlockFullProgram: 'Unlock the Full Program',
    startFreeTrial: 'Start Free Trial',
    subscribe: 'Subscribe',
    restore: 'Restore Purchase'
  },
  
  de: {
    // Navigation
    today: 'Heute',
    practice: 'Übungen',
    progress: 'Fortschritt',
    support: 'Hilfe',
    
    // Common
    continue: 'Weiter',
    start: 'Starten',
    complete: 'Abschließen',
    next: 'Weiter',
    back: 'Zurück',
    skip: 'Überspringen',
    cancel: 'Abbrechen',
    save: 'Speichern',
    done: 'Fertig',
    
    // Auth
    signIn: 'Anmelden',
    signUp: 'Registrieren',
    signOut: 'Abmelden',
    email: 'E-Mail',
    password: 'Passwort',
    forgotPassword: 'Passwort vergessen?',
    createAccount: 'Konto erstellen',
    alreadyHaveAccount: 'Bereits ein Konto?',
    dontHaveAccount: 'Noch kein Konto?',
    
    // Session
    dayN: 'Tag {n}',
    moduleNofM: 'Modul {n} von {m}',
    minutesRemaining: '{n} Min. übrig',
    sessionComplete: 'Sitzung abgeschlossen!',
    congratulations: 'Herzlichen Glückwunsch!',
    
    // Practice
    breatheIn: 'Einatmen',
    hold: 'Halten',
    breatheOut: 'Ausatmen',
    intensityBefore: 'Intensität vorher',
    intensityAfter: 'Intensität nachher',
    howDoYouFeel: 'Wie fühlen Sie sich?',
    
    // Craving
    cravingHelp: 'Brauchen Sie Hilfe bei einem Verlangen?',
    rateIntensity: 'Bewerten Sie Ihre Verlangen-Intensität',
    whatTriggered: 'Was hat das ausgelöst?',
    whereAreYou: 'Wo sind Sie?',
    
    // Progress
    dayStreak: 'Tage-Serie',
    cigarettesAvoided: 'Vermiedene Zigaretten',
    moneySaved: 'Gespartes Geld',
    timeRegained: 'Wiedergewonnene Lebenszeit',
    
    // Subscription
    unlockFullProgram: 'Vollprogramm freischalten',
    startFreeTrial: 'Kostenlose Testversion starten',
    subscribe: 'Abonnieren',
    restore: 'Kauf wiederherstellen'
  },
  
  zh: {
    // Navigation
    today: '今天',
    practice: '练习',
    progress: '进度',
    support: '支持',
    
    // Common
    continue: '继续',
    start: '开始',
    complete: '完成',
    next: '下一步',
    back: '返回',
    skip: '跳过',
    cancel: '取消',
    save: '保存',
    done: '完成',
    
    // Auth
    signIn: '登录',
    signUp: '注册',
    signOut: '退出',
    email: '电子邮件',
    password: '密码',
    forgotPassword: '忘记密码？',
    createAccount: '创建账户',
    alreadyHaveAccount: '已有账户？',
    dontHaveAccount: '没有账户？',
    
    // Session
    dayN: '第{n}天',
    moduleNofM: '模块 {n}/{m}',
    minutesRemaining: '剩余{n}分钟',
    sessionComplete: '课程完成！',
    congratulations: '恭喜！',
    
    // Practice
    breatheIn: '吸气',
    hold: '保持',
    breatheOut: '呼气',
    intensityBefore: '之前强度',
    intensityAfter: '之后强度',
    howDoYouFeel: '感觉如何？',
    
    // Craving
    cravingHelp: '需要帮助控制烟瘾？',
    rateIntensity: '评估您的烟瘾强度',
    whatTriggered: '什么触发了这个？',
    whereAreYou: '您在哪里？',
    
    // Progress
    dayStreak: '连续天数',
    cigarettesAvoided: '避免的香烟',
    moneySaved: '节省的金钱',
    timeRegained: '重获的生命',
    
    // Subscription
    unlockFullProgram: '解锁完整课程',
    startFreeTrial: '开始免费试用',
    subscribe: '订阅',
    restore: '恢复购买'
  },
  
  hi: {
    // Navigation
    today: 'आज',
    practice: 'अभ्यास',
    progress: 'प्रगति',
    support: 'सहायता',
    
    // Common
    continue: 'जारी रखें',
    start: 'शुरू करें',
    complete: 'पूर्ण करें',
    next: 'अगला',
    back: 'वापस',
    skip: 'छोड़ें',
    cancel: 'रद्द करें',
    save: 'सहेजें',
    done: 'हो गया',
    
    // Auth
    signIn: 'साइन इन करें',
    signUp: 'साइन अप करें',
    signOut: 'साइन आउट करें',
    email: 'ईमेल',
    password: 'पासवर्ड',
    forgotPassword: 'पासवर्ड भूल गए?',
    createAccount: 'खाता बनाएं',
    alreadyHaveAccount: 'पहले से खाता है?',
    dontHaveAccount: 'खाता नहीं है?',
    
    // Session
    dayN: 'दिन {n}',
    moduleNofM: 'मॉड्यूल {n}/{m}',
    minutesRemaining: '{n} मिनट शेष',
    sessionComplete: 'सत्र पूर्ण!',
    congratulations: 'बधाई हो!',
    
    // Practice
    breatheIn: 'सांस लें',
    hold: 'रोकें',
    breatheOut: 'सांस छोड़ें',
    intensityBefore: 'पहले की तीव्रता',
    intensityAfter: 'बाद की तीव्रता',
    howDoYouFeel: 'आप कैसा महसूस कर रहे हैं?',
    
    // Craving
    cravingHelp: 'लालसा में मदद चाहिए?',
    rateIntensity: 'अपनी लालसा की तीव्रता का मूल्यांकन करें',
    whatTriggered: 'इसे किसने ट्रिगर किया?',
    whereAreYou: 'आप कहां हैं?',
    
    // Progress
    dayStreak: 'दिन स्ट्रीक',
    cigarettesAvoided: 'टाली गई सिगरेट',
    moneySaved: 'बचाया गया पैसा',
    timeRegained: 'पुनर्प्राप्त जीवन',
    
    // Subscription
    unlockFullProgram: 'पूर्ण कार्यक्रम अनलॉक करें',
    startFreeTrial: 'निःशुल्क परीक्षण शुरू करें',
    subscribe: 'सदस्यता लें',
    restore: 'खरीदारी पुनर्स्थापित करें'
  }
};

export function useTranslations(language: ContentLanguage = 'en') {
  const t = translations[language] || translations.en;
  
  const translate = (key: keyof TranslationKeys, params?: Record<string, string | number>) => {
    let text = t[key] || translations.en[key] || key;
    
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        text = text.replace(`{${k}}`, String(v));
      });
    }
    
    return text;
  };
  
  return { t, translate };
}
