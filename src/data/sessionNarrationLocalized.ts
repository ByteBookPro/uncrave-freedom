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
