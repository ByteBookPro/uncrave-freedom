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
