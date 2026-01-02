// Localized narration scripts for Day 1-2 in Hindi, German, and Chinese
// English narration is in sessionNarration.ts as the default

import { ContentLanguage } from '@/types/database';

// Hindi (हिंदी) narration for Day 1-2
const hindiNarration: Record<string, string> = {
  'd1m1': `नमस्ते और आपका स्वागत है!
आज आपके धूम्रपान-मुक्त बनने की यात्रा का पहला दिन है। एक पल रुककर इस फैसले की सराहना कीजिए—आपने अपने लिए एक स्वस्थ, खुशहाल जीवन की ओर पहला कदम उठा लिया है। बधाई हो!

अगले 10 दिनों में हम यह रास्ता साथ चलेंगे। और यहाँ एक बात है जो आपको बहुत पसंद आएगी: आज आपको धूम्रपान छोड़ना नहीं है।
हाँ—पहले कुछ दिनों तक आप जैसा करते आए हैं, वैसा ही कर सकते हैं।
अजीब लग रहा है? लेकिन यही इस तरीके की खासियत है—हम पहले आपके मन और दिमाग में धूम्रपान के बारे में सोचने-महसूस करने का तरीका बदलते हैं… और फिर छोड़ना आसान हो जाता है।
कोई अचानक झटका नहीं। कोई "बस अब से बंद!" वाला दबाव नहीं।
हम आपको इच्छाशक्ति की लड़ाई नहीं लड़वाएँगे—हम आपकी धूम्रपान की इच्छा की जड़ पर काम करेंगे।

ज़रा कल्पना कीजिए: धूम्रपान से आज़ादी… बिना "कमी" महसूस किए।
अगर आपको अभी संदेह है—कोई बात नहीं। संदेह होना बिल्कुल सामान्य है।
इन 10 दिनों के अंत तक आप खुद समझेंगे कि यह क्यों काम करता है—और कैसे विज्ञान और अनुभव इसे सपोर्ट करते हैं।`,

  'd1m2': `अब बात करते हैं आपकी।
हर इंसान के छोड़ने के अपने कारण होते हैं। आपके क्या हैं?

हो सकता है आप अपने परिवार के लिए छोड़ रहे हों—बच्चों के लिए, माता-पिता के लिए, या अपने भविष्य के लिए।
हो सकता है स्वास्थ्य के लिए—सांस सहज हो, शरीर हल्का लगे, ऊर्जा लौटे।
हो सकता है पैसों के लिए—सिगरेट पर खर्च होने वाला पैसा आप किसी बेहतर चीज़ में लगाना चाहते हों।
या फिर आप थक चुके हों—इस आदत से नियंत्रित होने से… दिन भर "अगली सिगरेट कब?" सोचने से… हर बार पीकर भीतर कहीं अपराधबोध महसूस करने से।

जो भी आपके कारण हैं—उन्हें अपने दिल के करीब रखिए।
ये आपके निजी "क्यों" हैं—और यही आपको आगे बढ़ाएँगे।
धूम्रपान छोड़ना असल में आप खुद को एक तोहफ़ा दे रहे हैं—और आपके कारण उस तोहफ़े की "रिबन" हैं।`,

  'd1m3': `अब, 10-दिन के इस कार्यक्रम की रूपरेखा समझते हैं।
हर दिन आप मेरे साथ लगभग 15 से 20 मिनट बिताएँगे।
हम एक विषय पर बात करेंगे—धूम्रपान की सच्चाई, दिमाग का खेल, cravings, ट्रिगर, आदत-चक्र, और उससे बाहर निकलने के तरीके।
आपको कुछ स्लाइड्स दिखेंगी, छोटे-छोटे अभ्यास होंगे, और छोटे एनिमेशन होंगे जो चीज़ों को बिल्कुल साफ़ कर देंगे।
इसे एक छोटे-से "कोचिंग सेशन" की तरह समझिए—जो आपको हर दिन थोड़ा और मजबूत बनाएगा।

अगले कुछ दिनों में हम जानेंगे:
- आप कब और क्यों पीते हैं—आपके ट्रिगर क्या हैं
- निकोटीन दिमाग में क्या करता है
- कैसे "आदत का चक्र" चलता है
- और कैसे मनोविज्ञान की तकनीकें—जैसे सोच का पुनर्गठन और mindfulness—आपको बिना लड़ाई के आज़ाद कर सकती हैं

Day 5 के आसपास बहुत-से लोगों को एक बड़ा बदलाव महसूस होता है—
जैसे दिमाग में कोई "स्विच" बदल जाता है।
जो सिगरेट कभी दोस्त या सहारा लगती थी… वह अचानक वैसी नहीं लगती।
और Day 6 पर आप अपनी आख़िरी सिगरेट पीएँगे—और यह डरावना नहीं, सशक्त करने वाला अनुभव होगा।`,

  'd1m4': `और यहाँ कोई जजमेंट नहीं है।
हम आपको guilt या shame में नहीं धकेलेंगे।
अगर आपने पहले कोशिश की और वापस शुरू हो गया—आप अकेले नहीं हैं। बहुत-से लोग कई बार प्रयास करते हैं, फिर सफल होते हैं।
यह "आपकी कमजोरी" नहीं, यह एक आदत + निकोटीन का खेल है—और हम आपको इस खेल के नियम समझाकर बाहर निकालेंगे।`,

  'd1m5': `अब एक छोटी-सी कल्पना करें।
अगर आप सहज हों, तो आँखें बंद कर लें—या स्क्रीन देखते रहें।

कल्पना कीजिए: आज से 10 दिन बाद, Day 11 की सुबह।
आप उठते हैं… और आप non-smoker हैं।
आपके अंदर धूम्रपान की इच्छा नहीं है।
आप एक लंबी सांस लेते हैं… और हवा आपके फेफड़ों में साफ़, हल्की और ताज़ा लगती है।
आपके शरीर में हल्कापन है।
मन में गर्व है—एक शांत-सा आत्मविश्वास कि "मैं अब निकोटीन पर निर्भर नहीं हूँ।"
आप बाहर निकलते हैं और आपको सिगरेट साथ रखने की जरूरत ही नहीं।
आप अपने लोगों के साथ हैं—और आप पूरी तरह मौजूद हैं, बिना बार-बार "चलो एक सिगरेट" के।

यही हमारा लक्ष्य है—और यह दूर नहीं है।`,

  'd1m6': `और याद रखिए: आप अकेले नहीं हैं।
ऐप के अंदर मदद के विकल्प हैं—चैट, सपोर्ट, और आपकी प्रगति को ट्रैक करने वाली सुविधाएँ। जरूरत पड़े तो इस्तेमाल करें।

आज का काम बहुत सरल है: इस प्रक्रिया के लिए खुद को "हाँ" कहिए।
अपने आप से कहिए:
"मैं यह कर रहा/रही हूँ। मैं खुद को ये 10 दिन दे रहा/रही हूँ—अपनी ज़िंदगी बदलने के लिए।"

बस इतना।
आज आप सामान्य रूप से धूम्रपान कर सकते हैं—बस कल Day 2 के लिए लौट आइए।
हर दिन हम एक-एक कदम आगे बढ़ेंगे—और आप खुद बदलाव महसूस करेंगे।

आप कर सकते हैं।
और सच कहूँ? आपने सबसे कठिन कदम उठाया—आपने शुरुआत कर दी।
कल मिलते हैं—Day 2 में हम समझेंगे कि हम पीते ही क्यों हैं… और कुछ बड़े मिथकों को तोड़ेंगे।
धन्यवाद। कल मिलते हैं!`,

  'd2m1': `वापसी पर स्वागत है! Day 2—आप यहाँ हैं, इसका मतलब है आप सच में अपने लिए खड़े हो रहे हैं।
आज हम एक बहुत बुनियादी सवाल का जवाब देंगे:
आप धूम्रपान क्यों करते हैं?
और उससे भी ज्यादा जरूरी—आपको क्या लगता है कि सिगरेट आपको क्या "देती" है?

क्योंकि जब हम इस भ्रम को समझ लेते हैं… सिगरेट का जादू टूटने लगता है।

"मैं तनाव में सिगरेट पीता/पीती हूँ—यह मुझे शांत करती है।"
यह सबसे आम विश्वास है।
और हाँ—क्षणिक तौर पर राहत महसूस होती है।
पर चौंकाने वाली सच्चाई यह है: निकोटीन आपकी बेसलाइन तनाव को बढ़ाता है।
जब आप कुछ समय नहीं पीते, शरीर में निकोटीन घटता है और दिमाग बेचैन होने लगता है—इसे withdrawal कहिए।
सिगरेट उस बेचैनी को थोड़ी देर के लिए शांत कर देती है—तो आपको लगता है "वाह, रिलैक्स हो गया।"
लेकिन असल में वह राहत आपको सिर्फ उसी बेसलाइन पर वापस लाती है जिस पर non-smoker पहले से होता है।
यह ठीक वैसा है जैसे बहुत टाइट जूते पहनकर बस उन्हें उतारने की राहत को "सुख" समझ लेना।`,

  'd2m2': `अब थोड़ा विज्ञान—बहुत सरल तरीके से।

कल्पना कीजिए: आप कश लेते हैं… और 10 सेकंड के अंदर निकोटीन दिमाग तक पहुँचता है।
वहाँ वह कुछ रिसेप्टर्स से जुड़कर डोपामिन रिलीज़ करवाता है—दिमाग को संदेश मिलता है:
"हाँ! यह दोबारा करो!"

लेकिन निकोटीन ज्यादा देर टिकता नहीं।
कुछ ही समय में स्तर गिरता है… और रिसेप्टर्स खाली होने पर बेचैनी शुरू।
दिमाग कहता है: "फिर से दो।"
तो आप फिर सिगरेट पीते हैं… राहत मिलती है… और चक्र चल पड़ता है।

मुख्य बात:
सिगरेट आपको कोई स्थायी लाभ नहीं देती—वह बस उस असहजता को कुछ देर के लिए हटाती है जिसे उसने खुद बनाया है।
यही लत की प्रकृति है।

और इसे डाँट या लेक्चर मत समझिए। यह शक्ति है।
यह आपकी "कमज़ोरी" नहीं—यह निकोटीन का डिज़ाइन है।
और जब आप समझ जाते हैं कि यह कैसे काम करता है… तब यह कम डरावना लगता है।`,

  'd2m3': `अब एक और जरूरी बात: अलग-अलग quit तरीकों के बारे में।
Cold turkey कुछ लोगों के लिए काम करता है, पर बहुतों के लिए मुश्किल होता है क्योंकि मन-दिमाग तैयार नहीं होता।
Patches या gum withdrawal को कम कर सकते हैं, पर कई बार आदत और सोच नहीं बदलती, इसलिए relapse हो जाता है।
Vaping अक्सर निकोटीन की पकड़ बनाए रखता है—हम सिर्फ "स्वरूप बदलकर" लत नहीं रखना चाहते।
हमारा फोकस है: मानसिक पकड़ तोड़ना—ताकि छोड़ना लड़ाई न लगे, बल्कि राहत लगे।`,

  'd2m4': `आज का छोटा-सा काम:
जब भी आप आज सिगरेट पिएँ, एक सेकंड रुककर खुद से पूछिए:
"क्या यह सच में मेरी समस्या हल कर रही है… या बस withdrawal को थोड़ी देर शांत कर रही है?"
जिज्ञासा रखिए—जजमेंट नहीं।
हम अभी आपको व्यवहार बदलने नहीं कह रहे—बस जागरूकता बढ़ा रहे हैं।

और अगर आपके दिमाग में आए: "अरे, अगर मुझे सिगरेट कम पसंद आने लगेगी तो?"
तो सुनिए—यही तो लक्ष्य है:
कि आपका मन और दिमाग एक साथ कहें: "मुझे यह नहीं चाहिए।"
तब छोड़ना संघर्ष नहीं रहता—मुक्ति बन जाता है।

बहुत बढ़िया। Day 2 पूरा हुआ।
कल Day 3 में हम ट्रिगर्स और habit loop को आपके जीवन के अनुसार मैप करेंगे—आपको सचमुच दिखेगा कि कौन-सी डोरें आपको खींचती थीं… और हम उन्हें काटना शुरू करेंगे।
कल मिलते हैं!`,

  // Day 3 Hindi narration
  'd3m1': `नमस्ते! Day 3 में आपका स्वागत है।
आप अब लगभग halfway हैं — और अगर आप आज कुछ चीज़ें पहले से ज़्यादा साफ़ देख पा रहे हैं, तो यह बहुत अच्छी बात है।
हो सकता है आपने खुद को यह सोचते पकड़ा हो— "मैं इसे उतना enjoy नहीं करता जितना मैं मानता था…"
या फिर "अरे, जैसे ही मैं स्कूटर/कार स्टार्ट करता हूँ, हाथ अपने आप सिगरेट की तरफ जाता है।"
यही awareness आपकी असली ताकत है—यहीं से आज़ादी शुरू होती है।

आज हम आपके smoking habit को map करेंगे।
हम उस "आदत-चक्र" पर रोशनी डालेंगे जो आपको बार-बार उसी जगह ले आता है।

हर आदत एक loop पर चलती है:
Trigger → Behavior → Reward
Trigger मतलब कोई संकेत—स्थिति, भावना, समय, लोग।
Behavior मतलब सिगरेट पीना।
Reward मतलब आपको जो "राहत/सुकून/पूर्ति" जैसा महसूस होता है।
और यही reward दिमाग को सिखाता है: "अगली बार भी यही करना है।"`,

  'd3m2': `चलो कुछ common triggers को समझते हैं:

1) सुबह उठना / Morning routine
बहुत से लोग उठते ही "दिन शुरू करने" के लिए सिगरेट पीते हैं।
असल में रात भर निकोटीन कम होने से दिमाग थोड़ा restless रहता है—और सिगरेट से quick "डोपामिन" मिलता है।
पर सच यह है: कुछ दिन बाद बिना सिगरेट के सुबह उठना और बेहतर लग सकता है।

2) खाने के बाद
खाना पूरा हुआ, पेट भरा—और सिगरेट "cherry on top" जैसा लगती है।
पर non-smokers को भी वही satisfaction मिलती है—बस उनके दिमाग ने "खाने के बाद = सिगरेट" नहीं सीखा होता।

3) तनाव / anxiety
बॉस का ईमेल, घर में बहस, चिंता—और craving तुरंत।
यहां loop होता है: Stress → Smoke → "relief"
पर उस relief का बड़ा हिस्सा withdrawal + deep-breath moment होता है।
हमें stress के समय pause डालना है।

4) बोरियत / खाली समय
यह loop अपेक्षाकृत आसान तोड़ना होता है, क्योंकि यह ज़्यादा "रिचुअल" और "stimulation" से जुड़ा है।

5) social cues
दोस्तों के साथ, पार्टी में, कोई offer करे—वहाँ reward होता है "included" महसूस करना।
हम आपको सिखाएंगे: बिना अलग लगे, social रहना।

6) जगह/समय से जुड़ी आदतें
जैसे—काम का ब्रेक, smoking spot, या रोज़ 3 बजे वाली सिगरेट।
यह "habit clock" है—दिमाग का पुराना alarm।

और याद रखिए: Trigger आपको मजबूर नहीं करता।
बस connection पुराना और मजबूत होता है, इसलिए मजबूरी जैसा लगता है।
लेकिन connections rewire हो सकते हैं।`,

  'd3m3': `अब दूसरा अभ्यास:
हर trigger के लिए एक alternative चुनिए—typing नहीं, बस tap.

उदाहरण:
Morning chai/coffee: 3 गहरी सांसें / mint gum / stretch
After meal: ब्रश / 5 मिनट walk / पानी + deep breath
Stress: 5–5 breathing / 60 सेकंड walk / calming audio
Driving: gum / audiobook snippet / bottle sip

बहुत बढ़िया। ये छोटे लग सकते हैं—पर ये powerful हैं।
क्योंकि अब आपका नया loop बन रहा है:
Trigger → New Action → New Reward

अगर stress पर आप 5–5 breathing करते हैं:
Inhale 5… Exhale 5…
Reward: heart rate down, mind clearer, control वापस।
यह "real relaxation" है—withdrawal relief नहीं।`,

  'd3m4': `अब एक simple concept: Urge Surfing
Craving समुद्र की लहर की तरह है—उठती है, peak करती है, और गिर जाती है।
अगर आप उस पर act नहीं करते, अक्सर 3–5 मिनट में intensity कम होने लगती है।
आज बस इतना कीजिए: craving आए तो 2 मिनट delay करिए और कोई replacement कीजिए।

हम आपका जीवन छोटा नहीं करना चाहते।
कुछ लोग कहते हैं: coffee छोड़ो, friends avoid करो, events मत जाओ।
नहीं। हमारा goal है—आप normal life जिएँ, बिना सिगरेट के।
आप friends नहीं छोड़ेंगे—बस strategy बदलेंगे।

आज का action:
Triggers दिखें तो मन में कहिए:
"मुझे urge इसलिए हो रहा है क्योंकि [trigger] हुआ। मुझे सच में सिगरेट की जरूरत नहीं—ये आदत है।"
और अगर आप तैयार हों, तो आज/कल कम से कम एक बार replacement कर के देखिए।

कल Day 4 खास है।
हम mindfulness के साथ एक ऐसा exercise करेंगे जो बहुत लोगों के लिए turning point होता है।
हाँ — इसमें सिगरेट भी शामिल होगी, पर बिल्कुल अलग तरीके से।
आपने आज बहुत मजबूत groundwork रखी है।
कल मिलते हैं।`,

  // Day 4 Hindi narration
  'd4m1': `Day 4 में स्वागत है।
आज हम कुछ बहुत unique करेंगे—ऐसा जो आपके mindset में बड़ा बदलाव ला सकता है।
आज हम एक सिगरेट को mindfully smoke करेंगे।
हाँ—सुनने में अजीब है।
लेकिन यह exercise कई लोगों के लिए "illusion break" कर देती है—यानी सिगरेट का जादू टूटने लगता है।

महत्वपूर्ण:
अगर आप अभी ऐसी जगह नहीं हैं जहाँ safely सिगरेट जला सकते हैं—तो session pause कर दें।
जब आप आराम से, अकेले/कम distractions के साथ हों, तब वापस आएँ।`,

  'd4m2': `ठीक है। सिगरेट और लाइटर आपके पास है?
अच्छा। अब अभी जलाइए नहीं।
बस उसे हाथ में पकड़िए… और देखिए।
एक छोटा सा सफेद tube… जिसने आपके दिन के हिस्से control किए।
आज आप इसे अलग नजर से देखेंगे।

Mindfulness मतलब: इस पल पर ध्यान, बिना judgement।
आज आप "अगला कश" नहीं सोचेंगे।
आप observe करेंगे: taste, smell, throat, chest, aftertaste।
जैसे कोई scientist experiment देख रहा हो।

अब सिगरेट जलाइए।

पहला puff धीरे लें…
धुआँ पहले मुंह में…
अब taste notice करें।
क्या यह सच में pleasant है? या bitter, harsh, neutral?

अब हल्का inhale… hold… और धीरे exhale।
गले और chest में क्या महसूस हो रहा है?
थोड़ा burn? tightness?

एक और puff। धीरे-धीरे।
ध्यान दें: aftertaste कैसा है?
मुँह में dryness? ash जैसा taste?

अब गंध notice करें।
क्या यह सच में "अच्छी" है… या बस आपको आदत है?`,

  'd4m3': `अब खुद से पूछिए:
"क्या मैं इसे enjoy कर रहा/रही हूँ… या बस 'कर रहा/रही हूँ'?"
क्या यह वैसा ही satisfying है जैसा दिमाग में image थी?

अब अगर आप चाहें, तो सिगरेट को आधी/तीन चौथाई पर ही बुझा दीजिए।
आपको finish करने की जरूरत नहीं।
ये "willpower test" नहीं, "honesty test" है।

अब एक लंबी सांस लें—fresh air।
फेफड़े कैसे लग रहे हैं?

अब reflection:
बहुत लोग इस exercise के बाद कहते हैं:
"स्वाद तो खास नहीं था…", "मुंह में अजीब aftertaste रहा…", "मैं satisfaction ढूंढता रहा, पर आया नहीं…"`,

  'd4m4': `यही exercise का point है:
जब हम autopilot पर smoke करते हैं, हम असल sensory reality नहीं देखते—हम सिर्फ "relief की उम्मीद" देखते हैं।
आज आपने reality देखी।
और reality अक्सर hype जैसी नहीं होती।

अब आगे:
आज से, जब भी आप smoke करें, कभी-कभी 1–2 puff mindfully करिए।
आप पाएँगे—craving और "romance" कमजोर होती जाती है।
और quitting आसान हो जाता है क्योंकि "miss करने" लायक कम बचता है।

कल Day 5 में हम तैयारी पक्की करेंगे—confidence, डर, और final readiness।
आप बहुत करीब हैं।
आज खुद को शाबाशी दीजिए। आपने एक brave काम किया।
कल मिलते हैं।`,

  // Day 5 Hindi narration - Quit Day Preparation
  'd5m1': `नमस्ते—Day 5 में स्वागत है।
आज का दिन बहुत महत्वपूर्ण है, क्योंकि हम "छोड़ने" को एक डरावनी घटना नहीं… बल्कि एक स्मार्ट, तैयार निर्णय बना देंगे।

बहुत-से लोग quitting को टालते हैं क्योंकि दिमाग एक ही लाइन चलाता है:
"अभी नहीं… अगले हफ्ते… थोड़ा और सही…"
और फिर हफ्ते बदलते रहते हैं, लेकिन आदत वही रहती है।

चलो एक छोटी-सी कहानी से शुरू करें—यह किसी एक व्यक्ति की नहीं, कई लोगों के अनुभवों का मिश्रण है।
मान लीजिए अमन हर रविवार सोचता है: "सोमवार से बंद।"
फिर सोमवार आता है—काम का दबाव।
वह कहता है: "अच्छा, इस प्रोजेक्ट के बाद।"
फिर प्रोजेक्ट के बाद कोई पार्टी, फिर तनाव, फिर "बस एक।"
और यही "कल" उसे महीनों तक वहीं रखता है।

आज हम "कल" को हटाकर "योजना" लाते हैं।
क्योंकि quitting का असली दुश्मन craving नहीं—अनिश्चितता है।
जब plan साफ़ होता है, दिमाग शांत होता है।`,

  'd5m2': `अब एक बात समझिए:
Withdrawal कोई खतरा नहीं है।
यह बस शरीर और दिमाग का री-कैलिब्रेशन है—जैसे सिस्टम अपडेट।
Cravings अक्सर लहरों जैसी होती हैं—उठती हैं, peak करती हैं, और फिर घटती हैं।
आपका काम जीवन भर लड़ना नहीं है।
आपका काम कुछ लहरों को skill से पार करना है।

अब आज का मुख्य अभ्यास: Fear → Plan.
आपको किस चीज़ का सबसे ज्यादा डर लगता है?

तेज़ cravings
तनाव
social situation
"बस एक" वाला विचार
नींद/चिड़चिड़ापन
खालीपन / boredom

अब उसी डर के लिए एक plan चुनिए—typing नहीं, बस tap.
उदाहरण:
अगर डर "cravings" है → Urge Surfing + 2 मिनट breathing
अगर डर "stress" है → 4–6 breathing + 60 सेकंड walk
अगर डर "social" है → एक लाइन चुनो: "मैं नहीं पीता/पीती" + हाथ में drink
अगर डर "बस एक" है → Play-the-tape-forward + pledge tap`,

  'd5m3': `बहुत बढ़िया।
अब हम इसे "सिर्फ सोच" नहीं रहने देंगे—हम practice करेंगे।

चलो 2 मिनट का calming अभ्यास—यह आपके nervous system को यह संदेश देगा: "हम safe हैं।"

Inhale 4… Exhale 6…
धीरे-धीरे।

अब एक छोटा सा check-in:
एक बार rating दीजिए—अभी craving कितनी है?
और फिर अपने आप से कहिए:
"मैं cravings को handle कर सकता/सकती हूँ। मेरे पास plan है।"`,

  'd5m4': `आज हम identity shift भी सेट करेंगे।
क्योंकि quitting तब आसान होती है जब आप "लड़" नहीं रहे—बस अपने नए identity के साथ चल रहे हैं।

यह लाइन सुनिए—धीरे:
"मैं धूम्रपान नहीं करता/करती।"
"मैं कोशिश कर रहा/रही हूँ" नहीं।
"मैं कम कर रहा/रही हूँ" नहीं।
बस: मैं नहीं करता/करती।

यह लाइन दिमाग को clear instruction देती है।

आज का छोटा काम:
अगर आज आप smoke करें, तो guilt नहीं।
बस याद रखिए—कल Day 6 turning point है।
आज आपका काम है तैयारी और भरोसा।

आप बहुत करीब हैं।
कल हम door बंद करेंगे—साफ़, शांत तरीके से।
Day 6 में मिलते हैं।`,

  // Day 6 Hindi narration - Freedom Day
  'd6m1': `Day 6 में स्वागत है।
आज को आप एक "नया जन्मदिन" मान सकते हैं—आपकी आज़ादी का दिन।
आज हम उस दरवाज़े को बंद करेंगे जो सालों से थोड़ा खुला था:
"Just in case… बस एक…"

आज हम उसे साफ़ तरीके से बंद करेंगे।

सबसे पहले—आपके लिए दो रास्ते हैं।
एक चुनिए:
"मैं अभी भी पी रहा/रही हूँ" OR "मैंने पहले ही बंद कर दिया है"`,

  'd6m2': `अगर आपने अभी भी पीना जारी रखा है:

आज आपकी "आख़िरी सिगरेट" का ritual होगा—लेकिन drama नहीं, mindfulness के साथ।
सिगरेट जलाइए।
पहला puff धीरे।

अब observe करें:
Taste कैसा है?
Throat में क्या feel हो रहा है?
Chest में tightness?
Aftertaste?

आपका लक्ष्य "खुद को torture" करना नहीं है।
आपका लक्ष्य reality देखना है—वही reality जो Day 4 से शुरू हुई थी।

अब जब आप तैयार हों, सिगरेट बुझा दीजिए।
आपको finish करने की जरूरत नहीं।

धीरे से अपने आप से कहिए:
"मैं धूम्रपान नहीं करता/करती।"

अगर आपने पहले ही बंद कर दिया है:

आज हम "last break ritual" करेंगे—ताकि दिमाग सीख ले: "मैं pause ले सकता/सकती हूँ बिना निकोटीन।"
बैठिए।
Inhale 4… Exhale 6…

अब अपने आप से कहिए:
"मैं non-smoker हूँ।"`,

  'd6m3': `अब celebration—हल्की, वास्तविक, grounded।
आपका शरीर healing mode में चला जाता है।
सांस धीरे-धीरे सहज लगती है, smell/taste बदलते हैं, और सबसे बड़ा बदलाव:
आपके दिमाग का वो background noise कम होता है—
"अगली सिगरेट कब?"

आज cravings आ सकती हैं—और वो normal है।
लेकिन अब आपके पास emergency button है।

चलो हम उसे एक बार practice करते हैं:
Intensity slider 0–10 चुनिए।
Trigger tag चुनिए (stress, coffee, after meal, social, boredom…)
फिर 90 सेकंड breathing।

अब फिर intensity rate करें।
आप देखेंगे—हर बार नहीं, पर बहुत बार यह नीचे आती है।
और जब नीचे आती है, आपका confidence ऊपर जाता है।`,

  'd6m4': `आज की सबसे important line:
Not even one.
क्योंकि एक सिगरेट दरवाज़ा फिर खोलने की कोशिश करती है।
और हम दरवाज़ा बंद रखेंगे—शांति से।

अंत में, एक declaration:
"मैं एक non-smoker हूँ"
बटन दबाइए।
अगर संभव हो तो एक बार aloud बोलिए भी।

बहुत-बहुत बधाई।
आज आप ने सिर्फ छोड़ा नहीं—आपने पहचान बदल दी।
कल Day 7 में हम cravings को और आसान बनाने वाले tools "ऑटो-पायलट" में डालेंगे।
आप शानदार कर रहे हैं।`,

  // Day 7 Hindi - Staying Smoke-Free
  'd7m1': `Day 7 में आपका स्वागत है—और इससे भी ज़्यादा, आपका स्वागत है आपके अगले दिन के रूप में: एक non-smoker।
अगर आपको गर्व भी महसूस हो रहा है और थोड़ा "unsettled" भी—तो यह बिल्कुल normal है।
गर्व कहता है: "मैंने कर दिखाया।"
और दिमाग की छोटी आवाज़ कहती है: "क्या मैं इसे जारी रख पाऊँगा/पाऊँगी?"

एक छोटा सा real-life moment सुनिए।
रोहन उठता है, और पहली बार सालों में "पहले सिगरेट" वाला autopilot नहीं चलता।
अंदर थोड़ा खालीपन—जैसे कोई आदत वाला कदम मिस हो गया हो।
फिर 10:30 बजे अचानक एक wave आती है—बहुत बड़ी नहीं, बस चुभती हुई।
रोहन सोचता है: "क्या ये हमेशा रहेगा?"

सच यह है: नहीं।
यह आपके शरीर और दिमाग का adjustment है।
Withdrawal के लक्षण आपकी failure नहीं—आपकी healing हैं।
आज का दिन आपका survival guide है—पहले quit दिनों के लिए।
आज cravings predictable होंगी, manageable होंगी, और छोटी होंगी।`,

  'd7m2': `आइए, जो आप महसूस कर रहे हैं उसे normal बना दें।

Common symptoms:
• Cravings — लहरों में आती-जाती हैं
• Irritability / mood swings
• Restlessness
• कुछ दिन focus foggy लगना
• भूख बढ़ना — क्योंकि खाना ज़्यादा tasty लगता है और मुंह "कुछ" चाहता है
• Cough या throat irritation — lungs साफ़ हो रहे हैं
• नींद में बदलाव — vivid dreams या थोड़ी परेशानी

सबसे जरूरी reassurance:
अक्सर physical withdrawal पहले कुछ दिनों में peak करता है और फिर धीरे-धीरे घटता है।
Psychological triggers कभी-कभी बाद में भी आ सकते हैं—लेकिन उनके लिए आपके पास skills हैं।

जो भी हो रहा है—यह phase है।
Phase गुजरता है।`,

  'd7m3': `Quick check-in.
पिछले 24 घंटों में जो भी महसूस हुआ, उसे tap कीजिए। No typing.

अगर आपने irritability/mood swings चुना:
निकोटीन आपके दिमाग के लिए fast "pressure valve" था।
अब बिना निकोटीन, emotions कुछ दिनों के लिए sharp लग सकते हैं।
दो उपाय:
1) अपने close लोगों को बता दें: "मैं quit कर रहा/रही हूँ—कुछ दिन edgy हो सकता/सकती हूँ।"
2) शरीर चलाइए: brisk walk, stairs, हल्का exercise—यह stress chemistry जल्दी घटाता है।

अगर आपने low focus चुना:
छोटे काम-स्प्रिंट करें, micro-break लें, पानी पिएँ।

अगर आपने hunger चुना:
Normal. Safe snacks रखें: फल, मेवे, दही, पॉपकॉर्न।

सब temporary है।
अभी का discomfort—future की permanent freedom के लिए।`,

  'd7m4': `अब आपका complete craving plan.
Craving आए तो debate नहीं—script चलाइए।

1) DELAY — खुद से कहिए: "अगले 5 मिनट नहीं।"
2) DEEP BREATHE — Long exhale दिमाग को signal देता है: "शांत हो जाओ।"
3) DRINK WATER — हाथ-मुंह को harmless job मिलता है।
4) DISTRACT — 10 push-ups, 2 मिनट walk, gum या mint, एक गाना।
5) DISCUSS / DIALOG — किसी को message करें या self-talk: "मैं नहीं पीता/पीती। यह temporary है।"

Urges temporary हैं. Smoking permanent नुकसान है.`,

  'd7m5': `CBT का core tool: thought challenging.
Craving के साथ एक sentence आता है।
अगर आप sentence पर विश्वास करते हैं, slip हो सकती है।
अगर आप उसे challenge करते हैं, आप जीतते हैं।

"बस एक से क्या होगा?" — loop फिर शुरू करता है। Rule: Not even one.
"मैं deserve करता/करती हूँ।" — आप freedom deserve करते हैं।
"मैं नहीं झेल सकता/सकती।" — आप झेल सकते हैं। Craving sensation है—उठती, गिरती।

आपकी identity अब: "मैं धूम्रपान नहीं करता/करती।"`,

  'd7m6': `अब practice करते हैं।
पहले urge 0–10 रेट कीजिए।
अब body map में tap करें: throat, chest, jaw, hands, stomach.
अब inhale 4… exhale 6…
आप urge से लड़ नहीं रहे। आप उसे देख रहे हैं।

यही lesson है: urges move करती हैं।
हर wave जो आप ride करते हैं, brain को train करती है।`,

  'd7m7': `Motivation reality से आती है:
आपने पहले ही कई cigarettes avoid की हैं।
आपने पैसे बचाए हैं।
और सबसे बड़ा—आपने mental muscle बनाया है।

आज के दो last कदम:
पहला: अपना one rule tap करें: "Not even one."
दूसरा: आज रात के लिए एक छोटा reward चुनिए।

Day 7 complete.
कल Day 8: हम new habits और new rewards बनाएँगे।`,

  // Day 8 Hindi - Building Healthy Habits
  'd8m1': `Day 8 में स्वागत है।
अब cravings कुछ कम sharp लग सकती हैं—पूरी तरह नहीं, पर आसान।
आज का focus है: "stop" से "build" की तरफ जाना।

Smoking सिर्फ निकोटीन नहीं थी।
वो pause थी, break थी, reward थी, boredom का इलाज थी।
तो हम cigarettes हटाकर खाली जगह नहीं छोड़ेंगे—
हम उसकी जगह ऐसी चीज़ रखेंगे जो सच में आपकी life improve करे।`,

  'd8m2': `यह आपकी replacement menu है:

STRESS: 60-sec walk, wall push-ups, एक calming song
BOREDOM: quick puzzle, 3 मिनट tidy, 2–3 pages पढ़ना
MORNING: stretch + 5 deep breaths, short walk
AFTER MEALS: brush, dark chocolate, 5-min walk
COMMUTE: audiobook/podcast, gum + water
SOCIAL: drink हाथ में, non-smokers के साथ खड़े हों

3 replacements चुनिए। ये आपके default बनेंगे।`,

  'd8m3': `अब Day 3 के trigger plan पर वापस आते हैं।
हर trigger के लिए tap करें: Worked / अभी try नहीं किया / नया replacement चाहिए

जो काम करे, उसे जारी रखें।
जो नहीं किया—आज शुरू करें।
जो नहीं चला—adjust करें।
यह moral test नहीं, testing है।`,

  'd8m4': `Movement cravings घटाता है, mood बेहतर करता है।
Craving time पर 10 मिनट walk अक्सर urge kill कर देता है।
Movement level चुनिए: 5 / 10 / 20 minutes daily.`,

  'd8m5': `अब साथ में quick version:
March in place, shoulders roll, chest open… फिर long exhale.
अब inhale 4… exhale 6… तीन बार।`,

  'd8m6': `Smoking tactile थी—हाथ और मुंह को job मिलता था।
अब उन्हें बेहतर job दें: gum/mint, pen/fidget, tea या fizzy water.

Environment design:
• ashtrays, lighters हटाएँ
• car/home deep clean करें
• desk पर water bottle रखें
• "calm corner" बनाएँ—breathing के लिए`,

  'd8m7': `Reward खुद को दें—weekly treat plan करें।
आप saved money counter से motivation बना सकते हैं।

Identity: आप smoker "trying" नहीं हैं—आप non-smoker हैं।

Caution: Alcohol early weeks में high-risk हो सकता है।
अगर alcohol + smoking strongly linked है, तो कुछ हफ्ते कम करें।
यह fragility नहीं—smart protection है।`,

  'd8m8': `आज खत्म करने से पहले, इस हफ्ते के लिए ONE habit चुनिए:
• After meals: 5-min walk
• Coffee: 2-min breathing first
• Stress: 60-sec reset + water
• Boredom: 3-min tidy/puzzle
• Social: drink + "मैं नहीं पीता/पीती"

अब उसका reminder सेट करें। Consistency से effortless बनता है।

Day 8 complete. कल Day 9 में "just one" trap और social moments को relapse-proof करेंगे।`,
};

// Chinese (简体中文) narration for Day 1-2
const chineseNarration: Record<string, string> = {
  'd1m1': `你好，欢迎你！
今天是你走向彻底无烟生活的第1天。先停一下，认真夸夸自己——你做了一个会改变人生的决定。恭喜你！

接下来的10天，我们一起走这段路。
而你会喜欢这一点：今天不需要立刻戒烟。
是的，前几天你可以继续像平时一样抽。
听起来有点反常？但这正是方法的关键：我们先改变你对吸烟的"看法和感觉"——当欲望被拔掉，戒烟就不再是一场硬扛的战争。
没有突然的强迫，没有"靠意志力死撑"。我们要做的是——让你不再想要它。

如果你现在有点怀疑，很正常。
到第10天，你会理解为什么它有效——而且你会亲身体会到改变。`,

  'd1m2': `先说说你自己。每个人戒烟的理由都不一样。你的理由是什么？

也许是为了家人——想陪孩子更久，想让父母放心。
也许是为了健康——呼吸更顺、身体更轻、精力更稳定。
也许是为了钱——把香烟的钱留给真正值得的事。
也许你只是受够了——受够了被它控制、受够了"下一根在哪儿"的焦虑、受够了抽完之后的内疚。

不管你的理由是什么，把它们放在心里。它们是你坚持下去的"锚"。`,

  'd1m3': `接下来这10天，每天你只需要花15到20分钟。
你会看到清晰的要点、做一些小练习、看一些短动画——把复杂的原理讲得一清二楚。
我们会聊：为什么会抽、尼古丁怎么"钩住"大脑、你的触发点是什么、如何打断习惯回路、如何更轻松地走向无烟。

很多人在第5天左右会感觉到一个转折：
"好像脑子里某个开关变了。"
第6天，你会抽完最后一支烟——那一刻不是恐惧，而是力量感。

而第7到第10天，我们会把你的无烟生活稳稳地"固化"下来：处理偶发渴求、建立新习惯、把信心变成长期稳定。`,

  'd1m4': `还有一件很重要的事：这里没有评判。
不管你以前失败过多少次，都不代表你不行。很多人都要尝试多次才成功。你现在在这里，这就很了不起。`,

  'd1m5': `现在做一个小小的想象。
如果你愿意，可以闭上眼睛，或者继续看屏幕。

想象10天后的第11天清晨。
你醒来——你是一个不抽烟的人。
你深吸一口气，空气很清爽，胸口更轻。
你的心里有一种踏实的自豪感：我不再依赖尼古丁。
你出门不需要带烟，不需要算时间，不需要躲躲藏藏。
你更自由、更专注、更安心。

这就是我们要去的地方，而且并不遥远。`,

  'd1m6': `你也不是一个人。
应用里有支持入口——需要时随时用。

今天的任务很简单：对这个过程说"是"。
对自己说：
"我愿意给自己10天，彻底改变生活。"

今天你仍可以照常抽，但请明天回来做第2天。
每一天，你都会更清醒、更坚定。

你能做到。你已经做了最难的一步：开始。
明天见——第2天，我们会揭穿几个最常见的"吸烟幻觉"。谢谢你，明天见！`,

  'd2m1': `欢迎回来！第2天你在这里，说明你正在认真对待自己。
今天我们要回答一个核心问题：我为什么抽烟？
更准确地说：你以为香烟"给了你什么"？

当我们拆穿这个幻觉，香烟就会失去很多魔力。

"我抽烟是为了减压。"
这是最常见的。你抽完确实会松一口气。
但关键在于：很多时候那不是"真正变放松"，而是尼古丁撤退造成的不适被暂时按下去了。
尼古丁让你在两支烟之间不断经历小小的"缺乏—缓解"循环，所以总体压力反而更高。
就像穿着太紧的鞋子，然后把鞋脱掉那一刻觉得"好舒服"。舒服是真的，但问题是鞋本来就不该那么紧。

"我需要它来专注。"
尼古丁会带来短暂刺激，但很快就伴随下滑与不安。
很多人以为"抽一根才有状态"，其实是尼古丁把你推上又拉下的过山车。离开它后，你的专注往往更稳定。`,

  'd2m2': `现在一点点科学，但很简单。

你吸一口，尼古丁大约10秒到达大脑。
它结合受体，释放多巴胺，让大脑收到信号：
"这个不错，下次再来！"

但尼古丁不久就下降。受体空了，烦躁、不安、注意力下降开始出现——你把它解读为"我需要一根"。
你再抽一根，症状暂时缓解，于是循环加固。

关键洞见： 香烟并没有提供长期好处，它主要是在"解决它自己制造的问题"。
这不是责备，这是力量。因为一旦你看清机制，它就不再神秘。`,

  'd2m3': `关于戒烟方式：冷火鸡对少数人有效，但很多人失败是因为没有心理策略。
替代疗法能缓解生理部分，但如果思维与习惯没改，仍容易复吸。
我们的重点是：让你对香烟的"渴望"自然下降，而不是硬扛。`,

  'd2m4': `今天的小任务：
你今天每次抽烟前，停一秒问自己：
"它真的解决了我的压力/无聊/烦恼吗？还是只是暂时压住了缺乏感？"
不需要批判，只需要好奇。

你做得很好。第2天完成。
明天第3天，我们会把你的触发点与习惯回路画出来——你会很清楚地看到"是什么在拉你"，然后我们开始剪断它们。明天见！`,

  // Day 3 Chinese narration
  'd3m1': `欢迎来到第3天！你已经快到"关键转折点"了。
这几天如果你开始更清楚地看到自己的模式——那非常好。
也许你发现："好像也没那么享受。"
或者你意识到："我一上车/一出电梯，就会自动想抽。"
这种觉察，就是你开始挣脱的证据。

今天我们要做一件很重要的事：把你的吸烟习惯"画出来"。
因为一旦看清楚回路，才有机会打断它。

每个习惯都有一个循环：
触发点 Trigger → 行为 Behavior → 奖励 Reward
触发点可能是情绪、时间、地点、场景、某个人。
行为是抽烟。
奖励是你感到的放松、满足、暂停、融入感。
奖励会强化大脑：下次再遇到同样触发点，大脑就会说："我知道怎么做——抽一根。"`,

  'd3m2': `我们快速讲几个典型触发点：

1）早晨/第一杯饮品
很多人早起第一根烟，是"启动一天"的仪式。
其实夜里尼古丁下降，大脑处在轻微不适里，早晨那一口像"按下开始键"。
但几天之后，无烟的早晨往往更清醒、更有精力。

2）饭后
饭后那根烟像"点睛之笔"。
但非吸烟者饭后也会满足——差别只是你的大脑学会了"饭后=烟"。

3）压力/焦虑
老板消息、争吵、坏消息——渴求突然出现。
压力触发 → 抽烟 → 以为放松。
我们要做的是：在压力出现时插入一个"停顿"，换一种真正有效的缓解方式。

4）无聊/空档
这类回路通常更容易改写，因为更多是"填时间"。

5）社交触发
朋友递烟、一起出去抽、酒吧环境。
奖励是"融入/仪式感"。
我们会教你：不抽也能融入。

6）时间与地点绑定
比如下午3点、固定的吸烟区、上车就想抽。
这是大脑的"习惯闹钟"。

关键点：触发点不会强迫你抽烟。
只是旧回路太熟练，所以像反射。
但回路可以重写。`,

  'd3m3': `现在做第二个练习：
为每个触发点选择替代方案——不需要打字，只要选。

例如：
早晨饮品：3次深呼吸 / 口香糖 / 拉伸
饭后：刷牙 / 走5分钟 / 喝水+深呼吸
压力：5–5呼吸 / 走60秒 / 听一段舒缓音频
通勤：口香糖 / 听有声书 / 手里拿水瓶

很好。它们看起来很小，但非常有力。
因为你正在建立新的回路：
触发点 → 新行为 → 新奖励`,

  'd3m4': `再给你一个关键技巧："冲动冲浪"Urge Surfing
渴求像海浪：上升、到顶、再下降。
很多强烈冲动通常只持续几分钟。
今天你只做一件事：冲动来时，先延迟2分钟，做一个替代动作。

我们不想让你躲开生活。
你不需要戒咖啡、不需要躲朋友、不需要缩小社交圈。
我们的目标是：你照样生活，只是换策略。

今天的行动：
当触发点出现时，在心里说：
"我现在想抽，是因为[触发点]出现了。这不是必须，只是旧习惯。"
如果你愿意，今天或明天至少做一次替代方案。

明天第4天很特别。
我们会做一个"正念吸烟"练习，很多人会在那一天发生巨大转变。
你做得很好。明天见。`,

  // Day 4 Chinese narration
  'd4m1': `欢迎来到第4天。
今天我们要做一件非常独特的事——可能会带来最大的认知转变之一：
我们会一起"正念地抽一支烟"。
对，你没听错。
这不是鼓励抽烟，而是帮助你看清：香烟真实的体验，往往和你脑中的"美化想象"并不一致。

重要提醒：
如果你现在不方便或不安全点烟，请先暂停。
找一个安静、能专心、不会被打断的地方再回来。`,

  'd4m2': `好。你手里有烟和打火机吗？
先别点。
先把烟拿在手里，看看它。
这么小的一根东西，却曾经左右了你多少时间、情绪和安排。

正念是什么？
就是在当下、带着好奇、没有评判地观察。
今天你要观察味道、气味、喉咙、胸口、余味，就像做实验一样。

现在点烟。

第一口慢慢吸入……先停在口腔里。
注意舌头上的味道：它真的"好吃"吗？还是苦、辣、干、刺？

然后轻轻吸入肺里……停一下……慢慢呼出。
观察喉咙和胸口：有没有灼热、紧、干？

再来一口。
注意呼出后嘴里的余味：是不是有干涩、烟灰感？

再闻一闻空气里的味道：
它真的"香"吗？还是呛、刺鼻？`,

  'd4m3': `现在问自己：
"我真的在享受吗？"
"还是我一直在等那个'满足感'，但它并没有出现？"

你不需要抽完。
如果你愿意，你可以在半支或三分之二处把它熄掉。
这不是意志力测试，这是诚实测试。

现在深呼吸一口相对新鲜的空气。
你的肺感觉如何？

很多人做完会发现：
"味道其实不好""嘴里很干""有点不舒服""满足感并没那么大"……`,

  'd4m4': `这就是重点：
当我们习惯性抽烟时，我们体验的是"期待的缓解"，而不是现实的感官细节。
当你把灯打开，现实往往不如想象。

从今天开始，如果你还在抽，请偶尔做1–2口正念观察。
你会发现：美化会越来越弱，"想念"的东西越来越少。
戒烟也就更容易。

明天第5天，我们会做最后的准备：信心、恐惧、以及迎接第6天的关键转折。
你离自由很近了。明天见。`,

  // Day 5 Chinese narration - Quit Day Preparation
  'd5m1': `欢迎来到第5天。
今天我们要做的，是把"戒烟"从一件可怕的事，变成一个清晰、可执行、很安全的计划。

很多人不是不想戒，而是一直在拖：
"等忙完这阵… 等压力小一点… 下周再说…"
结果生活永远有压力，"下周"永远不会自动到来。

先讲一个常见情境（这是很多人经历的组合故事）：
小周每次下定决心都说"下周开始"。
但下周一来，就有项目、应酬、情绪。
于是又变成"等这阵过去"。
然后又是"就一根"。
就这样，一年过去了。

今天我们不再跟"未来"讨价还价。
我们只做一件事：把你的担心变成计划。`,

  'd5m2': `先记住：戒断不是危险。
它更像"系统恢复"，像你的身体在重新校准。
渴求通常像海浪：上来、到顶、再下去。
你不需要打一场终身战争。你只需要学会"冲浪"。

今天的核心练习：Fear → Plan
你最担心什么？

强烈渴求
压力
社交场合
"就一根"的想法
睡眠/烦躁
无聊/空虚

选好后，系统会给你对应方案（只需点选，不打字）：
例如：
担心渴求 → 冲动冲浪 + 2分钟呼吸
担心压力 → 4–6呼吸 + 60秒走动
担心社交 → 选择一句话："我不抽了" + 手里拿饮料
担心"就一根" → "播放后果影片（play the tape forward）" + 轻触誓言`,

  'd5m3': `非常好。现在我们要"练一次"，让身体记住：我能稳住自己。

吸气4秒… 呼气6秒…
呼气更长，会让神经系统更快"降档"。

计时结束后：
你会看到一个关键事实：
你可以改变状态，而不靠香烟。`,

  'd5m4': `最后，做一个"身份切换"。
戒烟最轻松的方式，是从"我在努力戒"变成：
"我不抽烟。"
不是"我不能"，不是"我尽量"。
就是——"我不抽。"

今天的任务很简单：保持计划、保持信心。
明天第6天，我们会做出一个干净的转折。
你非常接近自由了。明天见。`,

  // Day 6 Chinese narration - Freedom Day
  'd6m1': `欢迎来到第6天。
你可以把今天当作你的"自由日"。
很多人一直留着一条缝："也许以后… 就一根…"
今天我们把那扇门关上——干净、安静、坚定。

先选你的路径：
"我还在抽" / "我已经停了"`,

  'd6m2': `如果你还在抽：

今天是"最后一支烟"的仪式，但不是戏剧化，而是正念。

点烟。第一口慢慢来。
观察：味道、喉咙、胸口、余味、气味。
不评判，只观察。

现在，如果你愿意，可以不用抽完。
你可以把它熄掉。
然后点一下："我结束了"

对自己说：
"我不抽烟。"

如果你已经停了：

我们做一个"最后一次休息仪式"，让大脑学会：暂停不需要尼古丁。

坐好。
吸气4秒，呼气6秒。

然后对自己说：
"我不抽烟。"`,

  'd6m3': `今天，你的身体开始更认真地修复。
呼吸会慢慢更顺，味觉嗅觉会改变，最重要的是：
你脑子里那条"下一根什么时候"的后台噪音开始减少。

当然，今天可能还会有渴求。正常。
我们现在练一次"紧急按钮"。

先选强度0–10。
再选触发标签（压力/咖啡/饭后/社交/无聊…）
然后跟随90秒呼吸。

再评一次强度。
你在训练你的大脑：渴求 ≠ 行动。`,

  'd6m4': `今天最重要的规则：
一根也不抽。
因为"一根"会重新打开那扇门。

最后，做一个宣告：
"我是非吸烟者"
点下去。
如果可以，轻声说出来。

恭喜你。
你不仅停止了行为，你在建立一种新的身份。
明天第7天，我们会把应对渴求的技能做得更自动、更轻松。你做得非常棒。`,
};

// German (Deutsch) narration for Day 1-2
const germanNarration: Record<string, string> = {
  'd1m1': `Hallo und herzlich willkommen!
Heute ist Tag 1 deiner Reise in ein komplett rauchfreies Leben. Nimm dir einen Moment und würdige diese Entscheidung: Du hast den ersten Schritt zu einem gesünderen, freieren Leben gemacht. Glückwunsch!

In den nächsten 10 Tagen gehen wir diesen Weg gemeinsam. Und jetzt kommt etwas Ungewöhnliches, das du lieben wirst: Du musst heute noch nicht aufhören zu rauchen.
Ja, in den ersten Tagen darfst du erst einmal so rauchen wie gewohnt.
Klingt komisch? Genau so funktioniert die Methode: Wir verändern zuerst, wie du über das Rauchen denkst und fühlst – und dann wird das Aufhören deutlich leichter.
Kein Schock. Kein „Zähne zusammenbeißen". Wir arbeiten nicht mit blanker Willenskraft, sondern wir nehmen dem Rauchen Schritt für Schritt seinen Reiz.

Vielleicht bist du skeptisch – völlig okay.
Am Ende dieser 10 Tage wirst du verstehen, warum es funktioniert. Und du wirst es spüren.`,

  'd1m2': `Lass uns über dich sprechen. Jede Person hat eigene Gründe, aufzuhören. Welche sind deine?

Vielleicht ist es deine Familie – Kinder, Partner, Eltern.
Vielleicht ist es die Gesundheit – leichter atmen, mehr Energie, weniger Husten.
Vielleicht ist es das Geld – Zigaretten sind teuer, und du willst dieses Geld lieber für dich nutzen.
Oder du bist einfach müde davon, kontrolliert zu werden: ständig Pausen zu planen, ständig an die nächste Zigarette zu denken, dieses leise schlechte Gefühl danach.

Was auch immer deine Gründe sind: Halte sie fest. Das sind deine Anker.`,

  'd1m3': `So läuft das Programm:
Jeden Tag verbringst du etwa 15 bis 20 Minuten mit mir. Du bekommst klare Kernaussagen, kleine Übungen, kurze Animationen, die dir die Zusammenhänge richtig verständlich machen.
Wir sprechen über: Warum wir rauchen, wie Nikotin das Gehirn „hackt", welche Trigger dich anstoßen, wie sich Gewohnheitsschleifen bilden – und wie man sie unterbricht.

Viele merken spätestens um Tag 5 herum einen Shift:
„Irgendwas ist anders. Die Zigarette wirkt nicht mehr wie ein Freund."
An Tag 6 wirst du deine letzte Zigarette rauchen – und das fühlt sich nicht beängstigend an, sondern kraftvoll.

Und an Tag 7 bis 10 sorgen wir dafür, dass du stabil bleibst: Umgang mit Verlangen, neue Routinen, langfristige Sicherheit.`,

  'd1m4': `Wichtig: Hier gibt es keine Verurteilung.
Wenn du früher schon mal gescheitert bist – du bist nicht allein. Viele Menschen brauchen mehrere Anläufe. Das sagt nichts über deinen Wert aus. Es ist eine Kombination aus Nikotin und Gewohnheit – und genau das lösen wir.`,

  'd1m5': `Mach jetzt eine kleine Visualisierung. Wenn du möchtest, schließ kurz die Augen – oder schau auf den Bildschirm.

Stell dir vor: 10 Tage sind vorbei. Tag 11, morgens.
Du wachst auf… und du bist Nichtraucher:in.
Du atmest tief ein, Luft fühlt sich klar an. Dein Kopf ist freier. Du fühlst Stolz – ruhig, echt: „Ich brauche das nicht mehr."
Du gehst raus, ohne Zigaretten mitzunehmen, ohne inneren Druck, ohne dieses „Wann kann ich wieder?".
Mehr Freiheit. Mehr Präsenz. Mehr Ruhe.

Das ist unser Ziel. Und es ist nah.`,

  'd1m6': `Du bist nicht allein: In der App gibt es Support-Optionen, wenn du sie brauchst.

Deine Aufgabe für heute ist simpel: Sag innerlich „Ja" zu diesem Prozess.
Sag dir:
„Ich gebe mir diese 10 Tage. Ich verändere mein Leben."

Heute darfst du noch normal rauchen – aber komm morgen wieder zu Tag 2.
Jeden Tag wirst du klarer sehen. Und genau dadurch wird es leichter.

Du kannst das. Du hast den wichtigsten Schritt schon getan: Du hast angefangen.
Morgen sehen wir uns – Tag 2. Da entzaubern wir einige Mythen, die dich bisher festgehalten haben. Danke, bis morgen!`,

  'd2m1': `Willkommen zurück! Tag 2 – stark, dass du da bist.
Heute klären wir eine Kernfrage: Warum rauchst du?
Und noch wichtiger: Was glaubst du, bekommst du dadurch?

Wenn wir diese Illusion auflösen, verliert das Rauchen einen großen Teil seiner Macht.

„Rauchen entspannt mich."
Es fühlt sich so an – weil eine Zigarette kurzfristig die Unruhe dämpft, die durch Nikotinmangel entsteht.
Zwischen den Zigaretten sinkt Nikotin ab, dein System wird unruhig – das ist eine Mini-Entzugssituation.
Die Zigarette nimmt diese Unruhe kurz weg – und du nennst es „Entspannung".
Wie bei zu engen Schuhen: Das Ausziehen fühlt sich gut an, aber der Schuh war das Problem. Nicht die Lösung.

„Ich brauche es zum Konzentrieren."
Nikotin kann kurz stimulieren – aber danach fällt es ab, und Entzug macht unruhig.
Viele verwechseln „Entzug beenden" mit „Leistung verbessern". Frei von dieser Achterbahn wird Fokus meist stabiler.`,

  'd2m2': `Ein bisschen Wissenschaft – ganz einfach:

Du ziehst – innerhalb von Sekunden erreicht Nikotin dein Gehirn.
Es bindet an Rezeptoren, Dopamin wird ausgeschüttet: „Mach das wieder!"
Dann sinkt der Spiegel, Unruhe beginnt, du interpretierst das als „Ich brauche eine".
Zigarette → kurze Erleichterung → Schleife wird verstärkt.

Der Kern: Rauchen liefert kaum echte, nachhaltige Vorteile. Es lindert hauptsächlich ein Problem, das es selbst erzeugt.

Das ist keine Schuldzuweisung – das ist Befreiung durch Verstehen.`,

  'd2m3': `Zu Methoden: „Cold Turkey" funktioniert bei manchen, ist aber oft hart, weil mentale Strategien fehlen.
Nikotinersatz kann körperlich helfen, aber wenn Denken & Gewohnheit unverändert bleiben, ist Rückfall wahrscheinlicher.
Unser Fokus ist: Die Sehnsucht nach Zigaretten sinkt – damit du nicht kämpfen musst.`,

  'd2m4': `Heute deine Mini-Aufgabe:
Wenn du heute rauchst, halte kurz inne und frag dich:
„Löst das wirklich mein Problem – oder drückt es nur kurz den Nikotin-Mangel weg?"
Neugier statt Urteil.

Sehr gut. Tag 2 ist geschafft.
Morgen an Tag 3 zeichnen wir deine Trigger und Gewohnheitsschleifen – du wirst genau sehen, was dich zieht, und wir beginnen, diese Fäden zu kappen. Bis morgen!`,

  // Day 3 German narration
  'd3m1': `Willkommen zu Tag 3! Du bist fast auf halbem Weg.
Wenn du in den letzten Tagen schon klarer gemerkt hast, wann und warum du rauchst – perfekt.
Vielleicht dachtest du: „So genial ist das eigentlich gar nicht."
Oder du hast dich ertappt: „Sobald ich ins Auto steige, will ich automatisch eine Zigarette."
Diese Beobachtung ist kein Zufall – das ist der Beginn deiner Freiheit.

Heute machen wir deine Rauchgewohnheit sichtbar.
Wir leuchten die Gewohnheitsschleifen aus, die dich festhalten – damit wir sie brechen können.

Jede Gewohnheit läuft so:
Trigger → Verhalten → Belohnung
Trigger ist ein Auslöser: Situation, Gefühl, Uhrzeit, Ort, Menschen.
Verhalten: Rauchen.
Belohnung: Erleichterung, Pause, „Abschlussgefühl", Zugehörigkeit.
Und genau diese Belohnung sagt deinem Gehirn: „Beim nächsten Mal wieder so!"`,

  'd3m2': `Kurzer Überblick über typische Trigger:

1) Morgenroutine / Kaffee
Viele rauchen „zum Start". Nachts sinkt Nikotin, morgens fühlt sich die erste Zigarette wie ein Reset an.
Aber nach ein paar Tagen ohne Rauchen starten viele klarer in den Tag.

2) Nach dem Essen
Die „Zigarette als Dessert".
Aber Nicht-Raucher fühlen sich auch komplett – es ist eine gelernte Kopplung, kein echtes Bedürfnis.

3) Stress / Anspannung
Mail vom Chef, Streit, Druck – und plötzlich Verlangen.
Stress → Rauchen → „Entspannung".
Wir setzen hier einen Pause-Moment ein und ersetzen das Rauchen durch eine echte Stress-Skill-Reaktion.

4) Langeweile / Leerlauf
Oft leichter zu ändern, weil es weniger „chemisch" ist und mehr „Zeit füllen".

5) Soziale Trigger
Wenn andere rauchen, wenn dir eine angeboten wird, wenn man „zusammen rausgeht".
Belohnung: Zugehörigkeit + Ritual.
Wir zeigen dir, wie du dabei bleiben kannst, ohne zu rauchen.

6) Ort/Zeit-Trigger
Der Raucherplatz, der 10-Uhr-Break, die Fahrt im Auto – dein Gehirn hat einen „Gewohnheitswecker".

Wichtig: Trigger zwingen dich nicht.
Es fühlt sich nur so an, weil die Verbindung alt und stark ist.
Aber sie ist trainierbar – in beide Richtungen.`,

  'd3m3': `Jetzt Übung 2:
Für jeden Trigger eine Alternative auswählen (nur Tippen). Kein Schreiben. Nur auswählen.

Beispiele:
Morgenkaffee: 3 tiefe Atemzüge / Kaugummi / kurzes Dehnen
Nach dem Essen: Zähne putzen / 5 Min. gehen / Wasser + Atem
Stress: 5–5 Atem / 60 Sekunden gehen / kurze beruhigende Audio
Autofahren: Kaugummi / Hörbuch / Wasserflasche

Super. Das wirkt klein – ist aber mächtig.
Du baust ein neues Muster:
Trigger → neue Aktion → neue Belohnung`,

  'd3m4': `Jetzt ein Schlüsselprinzip: Urge Surfing
Verlangen ist wie eine Welle: sie steigt, erreicht ihren Peak und fällt wieder.
Viele starke Impulse dauern nur wenige Minuten.
Heute reicht ein Mini-Schritt: Wenn Verlangen kommt, 2 Minuten verzögern und eine Alternative machen.

Und wir verkleinern dein Leben nicht.
Du musst nicht Kaffee meiden, nicht Freunde meiden, nicht soziale Situationen „canceln".
Wir wollen, dass du normal lebst – nur ohne Zigarette.

Deine Aktion heute:
Wenn ein Trigger auftaucht, sag dir:
„Ich habe Verlangen, weil [Trigger] da ist. Das ist Gewohnheit, kein Muss."
Und wenn du willst: probiere heute oder morgen mindestens einmal eine Alternative.

Morgen Tag 4 wird besonders.
Wir machen ein Achtsamkeits-Experiment mit einer Zigarette – und für viele ist genau das der Wendepunkt.
Bis morgen.`,

  // Day 4 German narration
  'd4m1': `Willkommen zu Tag 4.
Heute machen wir etwas Ungewöhnliches – und sehr wirkungsvolles:
Wir rauchen eine Zigarette achtsam.
Ja, wirklich.
Nicht, um Rauchen zu „feiern", sondern um die Illusion zu durchbrechen: Viele Menschen merken dabei zum ersten Mal, wie sich Rauchen wirklich anfühlt – ohne Autopilot, ohne Romantik.

Wichtig:
Wenn du gerade nicht sicher/privat rauchen kannst, pausiere und komm später zurück.
Such dir einen ruhigen Ort, wenig Ablenkung.`,

  'd4m2': `Gut. Hast du Zigarette und Feuer?
Noch nicht anzünden.
Halte sie erst in der Hand und schau sie an.
So ein kleines Ding… und doch hat es so oft deinen Tag strukturiert.

Achtsamkeit heißt: im Jetzt beobachten, ohne Urteil.
Heute beobachtest du Geschmack, Geruch, Hals, Brust, Nachgeschmack – wie eine Wissenschaftlerin, wie ein Experiment.

Jetzt zünde sie an.

Erster Zug – langsam…
erst in den Mund… kurz halten.
Wie schmeckt es wirklich? Angenehm? Bitter? Kratzig? Neutral?

Dann sanft in die Lunge… kurz halten… langsam ausatmen.
Was passiert im Hals und in der Brust? Brennen? Enge?

Noch ein Zug.
Achte auf den Nachgeschmack: trocken? aschig?
Riech die Luft: ist das „gut" – oder eher stechend?`,

  'd4m3': `Frag dich jetzt:
„Genieße ich das wirklich?"
„Oder warte ich auf dieses große ‚Ahhh' – und es kommt gar nicht?"

Du musst nicht zu Ende rauchen.
Wenn du willst, mach sie bei der Hälfte oder bei 3/4 aus.
Das ist kein Willenskraft-Test. Es ist ein Ehrlichkeits-Test.

Atme jetzt einmal tief frische Luft ein.
Wie fühlen sich deine Lungen an?

Viele berichten danach:
„Schmeckt eigentlich nicht gut", „Nachgeschmack ist eklig", „Hals ist trocken", „Satisfaction war kleiner als gedacht."`,

  'd4m4': `Das ist der Sinn:
Wenn wir automatisch rauchen, erleben wir vor allem „Erwartung auf Erleichterung".
Wenn du wirklich hinschaust, ist die Realität oft weniger attraktiv als die Story im Kopf.

Ab heute: Wenn du noch rauchst, mach ab und zu 1–2 Züge achtsam.
Du wirst merken, dass der „Zauber" schwächer wird – und damit wird das Aufhören leichter, weil du weniger „vermisst".

Morgen Tag 5: finale Vorbereitung – Vertrauen, Angst, letzte mentale Hürden.
Du bist nah dran. Bis morgen.`,

  // Day 5 German narration - Quit Day Preparation
  'd5m1': `Willkommen zu Tag 5.
Heute machen wir etwas Entscheidendes: Wir verwandeln „Aufhören" von einem großen Angst-Thema in einen klaren, machbaren Plan.

Viele Menschen wollen aufhören, aber sie verschieben es:
„Nach dieser stressigen Woche… nach dem Projekt… nach dem Urlaub…"
Und dann kommt das Leben – und es gibt immer einen neuen Grund zu warten.

Kurze Geschichte (eine typische Mischung aus vielen Erfahrungen):
Tom sagt jeden Sonntag: „Montag höre ich auf."
Montag kommt – Stress.
Dann: „Nach dem Meeting."
Dann: „Nach dem Wochenende."
Und plötzlich sind Monate vorbei.

Heute stoppen wir das Verhandeln.
Wir machen Angst konkret – und daraus wird Plan.`,

  'd5m2': `Wichtig: Entzug ist keine Gefahr.
Es ist ein Rebalancing, ein System-Reset.
Verlangen kommt oft in Wellen: hoch, Peak, runter.
Du brauchst keinen Endloskampf. Du brauchst Skills für ein paar Wellen.

Jetzt die Hauptübung: Angst → Plan
Wovor hast du am meisten Angst?

starke Cravings
Stress
soziale Situationen
„nur eine"
Schlaf/Reizbarkeit
Langeweile/Leere

Super. Jetzt bekommst du passende Gegenpläne – nur auswählen:
Beispiele:
Cravings → Urge Surfing + 2 Minuten Atmung
Stress → 4–6 Atmung + 60 Sekunden gehen
Social → eine Satzkarte wählen: „Nein danke, ich rauche nicht."
„nur eine" → Play-the-tape-forward + Pledge-Tap`,

  'd5m3': `Jetzt üben wir kurz, damit dein Körper merkt: „Ich kann mich regulieren."

Einatmen 4… Ausatmen 6…
Länger ausatmen = Nervensystem runterfahren.

Du siehst: Du kannst deinen Zustand verändern – ohne Zigarette.

Und jetzt der Identitäts-Satz, der alles leichter macht:
„Ich rauche nicht."
Nicht: „Ich versuche."
Nicht: „Ich darf nicht."
Sondern: „Ich rauche nicht."`,

  'd5m4': `Heute brauchst du nicht perfekt zu sein.
Heute brauchst du nur eines: Klarheit + Plan.
Morgen Tag 6 ist der Wendepunkt.
Du bist nah dran. Bis morgen.`,

  // Day 6 German narration - Freedom Day
  'd6m1': `Willkommen zu Tag 6.
Heute ist dein Freiheitstag.
Viele halten eine Tür einen Spalt offen: „Vielleicht irgendwann… nur eine…"
Heute schließen wir diese Tür – ruhig, sauber, endgültig.

Wähle deinen Weg:
„Ich rauche noch" ODER „Ich habe schon aufgehört"`,

  'd6m2': `Wenn du noch rauchst:

Heute ist deine „letzte Zigarette" – achtsam, ohne Drama.

Zünde sie an.
Nimm einen langsamen Zug.
Beobachte: Geschmack, Hals, Brust, Nachgeschmack, Geruch.
Nicht urteilen. Nur sehen.

Du musst sie nicht zu Ende rauchen.
Wenn du willst, drück sie bei der Hälfte aus.
Dann tippe: „Ich bin fertig."

Sag dir:
„Ich rauche nicht."

Wenn du schon aufgehört hast:

Wir machen ein „letzte-Pause"-Ritual: Dein Gehirn lernt, dass Pause ohne Nikotin geht.

Setz dich hin.
Atme: Ein 4… Aus 6…

Dann sag:
„Ich rauche nicht."`,

  'd6m3': `Ab heute startet dein Körper sichtbar in Reparatur.
Atmen wird schrittweise leichter. Geruch und Geschmack verändern sich.
Und das Beste: Der mentale Hintergrundlärm „Wann kann ich wieder?" wird leiser.

Ja, heute können Cravings auftauchen. Normal.
Darum üben wir jetzt den Notfall-Button.

Wähle Intensität 0–10.
Wähle Trigger-Tag (Stress, Kaffee, nach dem Essen, Social, Langeweile …)
Dann 90 Sekunden Atmung.

Bewerte erneut.
Du trainierst dein Gehirn: Verlangen ist kein Befehl.`,

  'd6m4': `Die wichtigste Regel ab heute:
Nicht einmal eine.
Weil „eine" die Tür wieder öffnet.

Zum Abschluss: Deine Erklärung.
„Ich bin Nichtraucher:in"
Tippe. Wenn du kannst, sag es einmal laut.

Herzlichen Glückwunsch.
Du hast nicht nur Verhalten beendet – du hast Identität aufgebaut.
Morgen Tag 7 machen wir deine Tools noch automatischer, damit du dich frei fühlst. Sehr stark.`,

  // Day 7 German - Staying Smoke-Free
  'd7m1': `Willkommen zu Tag 7 — und vor allem: willkommen zu einem weiteren Tag als Nichtraucher:in.
Wenn du stolz bist und gleichzeitig etwas wackelig: normal.
Stolz sagt: „Ich hab's geschafft."
Die kleine Stimme fragt: „Kann ich das halten?"

Ein kurzer, typischer Moment:
Jonas wacht auf, und zum ersten Mal fehlt dieses Autopilot-Ritual „erste Zigarette".
Da ist ein Mini-Leeregefühl — wie eine Stufe, die fehlt.
Und dann kommt um 10:30 eine Welle — nicht riesig, aber nervig.
Jonas denkt: „Bleibt das jetzt für immer?"

Nein.
Das ist Anpassung.
Entzugssymptome sind kein Beweis fürs Scheitern — sie sind ein Zeichen von Heilung.
Heute ist dein Survival-Guide für die ersten rauchfreien Tage.
Wir machen Cravings vorhersehbar, handhabbar und kleiner.`,

  'd7m2': `Wir normalisieren, was du möglicherweise spürst.

Häufige frühe Symptome:
• Cravings, die in Wellen kommen und gehen
• Reizbarkeit oder Stimmungsschwankungen
• Unruhe
• Neblige Konzentration für ein paar Tage
• Mehr Appetit — Essen schmeckt besser, Mund will „Beschäftigung"
• Husten oder Halskratzen — die Lunge räumt auf
• Schlafveränderungen — lebhafte Träume, Einschlafprobleme

Die wichtigste Beruhigung:
Körperlicher Entzug ist oft in den ersten Tagen am stärksten und nimmt dann ab.
Psychologische Trigger können länger auftauchen — aber dafür hast du Skills.

„Tag 1–3: Nikotin verlässt den Körper, Cravings können peaken."
„Tag 4–7: körperlicher Entzug lässt oft nach."
„Danach: vor allem Gewohnheits-Cues, die wir umprogrammieren."

Das ist eine Phase. Sie geht vorbei.`,

  'd7m3': `Kurzer Check-in: Was hast du in den letzten 24 Stunden gespürt?
Kein Tippen — einfach antippen.

Wenn du Reizbarkeit/Stimmungsschwankungen gewählt hast:
Nikotin war wie ein schneller „Druckablass".
Ohne Nikotin können Gefühle ein paar Tage intensiver sein.
Zwei Moves:
1) Sag Menschen, denen du vertraust: „Ich höre auf — ich bin evtl. eine Woche etwas dünnhäutig."
2) Bewegung: zügiger Spaziergang baut Stresschemie schnell ab.
Das klingt meist innerhalb von 1–2 Wochen ab.

Wenn du Konzentrationsprobleme gewählt hast:
Frühphase ist typisch.
Arbeite in kurzen Sprints, mach Mikro-Pausen, trink Wasser.
Konzentration kommt zurück — und wird oft stabiler, weil du nicht mehr auf der Nikotin-Achterbahn bist.

Wenn du Hunger gewählt hast:
Normal. Essen schmeckt besser.
Halte „sichere Snacks" bereit: Obst, Nüsse, Joghurt, Popcorn, zuckerfreier Kaugummi.
Wenn Süßes ruft: erst Wasser, dann eine kleine Portion.
Und: Priorität ist nicht rauchen. Ernährung kann später feinjustiert werden.

Wenn Husten/Halskratzen:
Das kann Reinigung sein — ein gutes Zeichen.
Hydrieren, warmer Tee hilft.
Meist wird's in den nächsten Wochen besser.

Wenn Schlafprobleme:
Nikotin beeinflusst Schlaf.
Kurzfristig: lebhafte Träume oder Einschlafprobleme.
Weniger Koffein spät, warme Dusche, kurze Atemübung vor dem Schlaf.
Das stabilisiert sich.

Alles ist vorübergehend.
Kurzes Unbehagen jetzt — für dauerhafte Freiheit später.`,

  'd7m4': `Jetzt dein kompletter Craving-Plan.
Wenn Verlangen kommt: nicht diskutieren — Skript starten.

1) DELAY
„Nicht in den nächsten 5 Minuten."
Cravings peaken und fallen.
Du kannst immer wieder verzögern, bis die Welle weg ist.

2) DEEP BREATHE
Atmung ist deine Fernbedienung fürs Nervensystem.
Länger ausatmen = Alarm runter.

3) DRINK WATER
Hände und Mund bekommen einen harmlosen Job.
Und es resetet dieses „trockene" Cravinggefühl.

4) DISTRACT
Aufmerksamkeit weg = Fuel weg.
Schnelle Distraktoren:
• 10 Liegestütze / Hampelmänner
• 2 Minuten gehen
• Kaugummi / Minze
• Ein Song + mitsummen
• Gesicht waschen / Zähne putzen
• Eine Schublade 3 Minuten ordnen
Oft ist die Welle danach deutlich kleiner.

5) DISCUSS / DIALOG
Text an Freund:in, App-Support, oder Selbstgespräch:
„Ich rauche nicht. Das ist temporär."
Humor wirkt:
„Nice try, Nicodemon. Nicht heute."

Cravings sind temporär. Rauchen richtet dauerhaften Schaden an. Wähle temporäres Unbehagen für dauerhafte Freiheit.`,

  'd7m5': `CBT-Kern: automatische Gedanken prüfen.
Craving kommt oft mit einem Satz.
Wenn du ihn glaubst, wird's gefährlich.
Wenn du ihn challengest, gewinnst du.

Typische Sätze:
• „Nur eine schadet nicht."
• „Ich hab's verdient."
• „Ich halte das nicht aus."
• „Morgen höre ich wieder auf."

Realitätsantworten:
„Nur eine" startet die Schleife neu. Das Gehirn lernt: Nikotin ist zurück.
Darum ist eine klare Regel am leichtesten: nicht einmal eine.

„Ich hab's verdient."
Ja: du verdienst Erleichterung. Aber Zigaretten verkaufen dir Erleichterung nur auf Kredit.
Du verdienst Freiheit.

„Ich halte das nicht aus."
Doch. Cravings sind Empfindungen. Sie steigen und fallen.
Du musst sie nicht mögen — nur überstehen.

„Morgen."
Das ist Sucht-Verhandeln.
Deine Identität ist: „Ich rauche nicht."`,

  'd7m6': `Wir üben jetzt.
Bewerte dein aktuelles Verlangen 0–10.

Tippe, wo du es am stärksten fühlst: Hals, Brust, Kiefer, Hände, Bauch.

Atme: ein 4… aus 6…
Du kämpfst nicht. Du beobachtest.

Das ist der Beweis: Verlangen bewegt sich.
Jede gerittene Welle trainiert dein Gehirn — die nächste wird meist kleiner.`,

  'd7m7': `Motivation mit Fakten:
Du hast bereits viele Zigaretten nicht geraucht.
Du hast Geld gespart.
Und du baust mentale Muskelkraft auf.

Kurze Erfolgsgeschichte:
Chris sagte:
„Die ersten 3 Tage waren hart. Ich hab die 5 D's und Urge Surfing genutzt. Nach einer Woche war ich endlich nicht mehr Sklave meines Rauch-Zeitplans."

Genau dahin gehst du.

Zwei letzte Schritte heute:
1) Tippe deine Regel: „Nicht einmal eine."

2) Wähle eine kleine Belohnung für heute Abend — Film, Bad, kleiner Kauf aus dem gesparten Geld.

Tag 7 geschafft.
Morgen Tag 8: Wir füllen dein Leben mit neuen Gewohnheiten und neuen Belohnungen, damit es sich voll anfühlt — nicht leer.`,

  // Day 8 German - Building Healthy Habits
  'd8m1': `Willkommen zu Tag 8.
Viele merken jetzt: Cravings werden weniger scharf.
Heute gehen wir von „aufhören" zu „aufbauen".

Rauchen war nicht nur Nikotin.
Es war Pause, Reset, Belohnung, Langeweile-Killer.
Wir entfernen Zigaretten nicht, um ein Loch zu lassen.
Wir ersetzen ihre Rolle durch etwas, das dein Leben wirklich verbessert.`,

  'd8m2': `Hier ist dein Menü:

STRESS:
• 60-Sekunden Walk
• Wall-Push-ups
• ein beruhigender Song
• Stressball / Fidget

LANGEWEILE:
• kleines Puzzle/Spiel
• 3 Minuten aufräumen
• ein paar Seiten lesen

MORGEN:
• Dehnen + 5 tiefe Atemzüge
• kurzer Walk
• kleines Frühstücks-Ritual

NACH DEM ESSEN:
• Zähne putzen
• Stück dunkle Schokolade
• 5 Minuten gehen

PENDELN:
• Hörbuch/Podcast
• Kaugummi + Wasser
• Atmen an roten Ampeln

SOCIAL:
• Getränk in der Hand
• bei Nichtraucher:innen stehen
• frische Luft ohne Zigarette

Wähle 3 Ersatz-Routinen. Die App priorisiert diese Vorschläge für dich.`,

  'd8m3': `Jetzt checken wir deinen Trigger-Plan.
Tippe pro Trigger:
Funktioniert / Noch nicht probiert / anderes Replacement nötig

Wenn's funktioniert: behalten.
Wenn nicht probiert: heute starten.
Wenn nicht passt: wechseln.
Das ist kein Moraltest — es ist Design deiner rauchfreien Routine.`,

  'd8m4': `Bewegung ist eines der besten Replacements.
Nicht weil du Sportprofi sein musst.
Sondern weil es schnell Endorphine bringt und Cravings senkt.

Klein starten:
10 Minuten gehen zur üblichen Craving-Zeit kann den Impuls komplett kippen.
Gehen funktioniert für fast alle.

Bewegungslevel wählen: 5 / 10 / 20 Min täglich.
Perfekt — simple Challenge.`,

  'd8m5': `Schnell gemeinsam:
Im Stand marschieren, Schultern kreisen, Brust öffnen… dann langer Ausatmer.

Jetzt dreimal: ein 4… aus 6…`,

  'd8m6': `Rauchen ist taktil — Hände und Mund hatten „Arbeit".
Jetzt gib ihnen bessere Arbeit:
• Kaugummi/Minze
• Stift/Fidget
• 60 Sekunden kritzeln
• Tee oder Sprudel

Umgebung designen:
• Aschenbecher/Feuerzeuge weg
• Auto/Wohnung reinigen, Rauchgeruch entfernen
• Wasserflasche sichtbar am Schreibtisch
• Schuhe an die Tür als Walk-Cue
• „Calm Corner" zum Atmen/Lesen statt Rauchen

Das macht quitting leichter, weil deine Umgebung nicht mehr „Rauch!" flüstert.`,

  'd8m7': `Belohne dich. Positive Verstärkung hilft enorm.
Nutze den Geld-Counter für wöchentliche kleine Treats.

Identität:
Du bist kein Raucher, der „brav" ist.
Du bist Nichtraucher:in.

Achtung:
Alkohol kann in den ersten Wochen ein starker Trigger sein.
Wenn Alkohol + Rauchen eng gekoppelt sind, reduziere kurzzeitig oder trinke nur mit Plan und Support.
Das ist nicht Schwäche — das ist klug.`,

  'd8m8': `Zum Schluss: Wähle ONE Gewohnheit, die du diese Woche fest machst:
• Nach dem Essen: 5 Minuten gehen
• Kaffee: erst 2 Minuten atmen
• Stress: 60-Sekunden Reset + Wasser
• Langeweile: 3 Minuten aufräumen/Puzzle
• Social: Getränk + „Ich rauche nicht."

Setze eine Erinnerung. Kleine Konstanz = große Leichtigkeit.

Tag 8 erledigt. Morgen Tag 9 machen wir Social-Situationen und den „nur eine"-Gedanken rückfall-sicher.`,
};

// Combined localized narrations
export const localizedNarrations: Record<ContentLanguage, Record<string, string>> = {
  en: {}, // English uses the default sessionNarration
  hi: hindiNarration,
  zh: chineseNarration,
  de: germanNarration,
};

// Get localized narration for a module
export function getLocalizedNarration(
  moduleId: string,
  language: ContentLanguage = 'en',
  fallbackContent?: string
): string | null {
  // If language is English, return null to use default
  if (language === 'en') {
    return null;
  }
  
  const langNarrations = localizedNarrations[language];
  if (langNarrations && langNarrations[moduleId]) {
    return langNarrations[moduleId];
  }
  
  // Return null to fall back to English default
  return null;
}
