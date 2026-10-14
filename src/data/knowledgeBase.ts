export interface KnowledgeItem {
  id: string;
  keywords: string[];
  titleEn: string;
  titleTe: string;
  category: 'natural_farming' | 'pest_control' | 'govt_schemes' | 'soil_health' | 'water_management';
  answerEn: string;
  answerTe: string;
}

export const KNOWLEDGE_BASE: KnowledgeItem[] = [
  {
    id: 'jeevamrutha',
    keywords: ['jeevamrutha', 'jeevamrutham', 'organic fertilizer', 'జీవామృతం', 'జీవామృతం తయారీ', 'జీవామృతం ఎలా చేయాలి', 'desi cow'],
    titleEn: 'How to prepare Liquid Jeevamrutha (జీవామృతం)?',
    titleTe: 'ద్రవ జీవామృతం తయారీ విధానం',
    category: 'natural_farming',
    answerEn: `🌿 **Liquid Jeevamrutha Preparation (for 1 Acre)**:

**Ingredients Required**:
1. Desi cow dung (తాజా దేశవాళీ ఆవు పేడ): 10 kg
2. Desi cow urine (ఆవు మూత్రం): 5 to 10 litres
3. Jaggery (నల్ల బెల్లం): 2 kg
4. Pulse flour (శనగ లేదా మినుము పిండి): 2 kg
5. Live fertile soil from field bund or banyan tree root (పుట్టమట్టి లేదా మర్రిచెట్టు కింద మట్టి): Handful (200g)
6. Clean water: 200 litres

**Procedure**:
1. Take a 200-litre plastic drum placed in shade (never under direct sun).
2. Mix 10 kg cow dung and 10L cow urine with 10-20 litres water and stir well.
3. Add 2 kg crushed jaggery and 2 kg pulse flour.
4. Add the handful of fertile banyan tree soil (provides millions of beneficial microbes).
5. Fill up the drum with water to 200 litres.
6. Stir clockwise 2-3 minutes with a wooden stick twice a day (morning and evening).
7. Cover the drum with a breathable jute gunny bag.
8. Keep for 48 to 72 hours for microbial fermentation.

**How to Use**:
- Use within 7 days of fermentation.
- Apply through irrigation canal water, flood irrigation, or filtered through 200-mesh filter for drip irrigation.
- Can be sprayed @ 10-20% concentration (1-2 litres in 10L water) on growing crops as growth promoter.`,
    answerTe: `🌿 **ఒక ఎకరాకు ద్రవ జీవామృతం తయారీ విధానం**:

**కావలసిన పదార్థాలు**:
1. దేశవాళీ ఆవు పేడ: 10 కిలోలు
2. ఆవు మూత్రం: 5 నుండి 10 లీటర్లు
3. నల్ల బెల్లం: 2 కిలోలు
4. పప్పుధాన్యాల పిండి (శనగ/ఉలవ/మినుము పిండి): 2 కిలోలు
5. పొలం గట్టు మట్టి లేదా మర్రిచెట్టు కింద జీవమున్న మట్టి: పిడికెడు (200 గ్రాములు)
6. నీరు: 200 లీటర్లు

**తయారీ పద్ధతి**:
1. నీడ ఉన్న ప్రదేశంలో 200 లీటర్ల ప్లాస్టిక్ డ్రమ్ ఉంచండి (ఎండ తగలకూడదు).
2. పేడ, మూత్రం, బెల్లం మరియు పిండిని కొద్ది నీటిలో బాగా కలిపి డ్రమ్ములో పోయండి.
3. పిడికెడు జీవమున్న మట్టి వేసి మిగిలిన నీటితో డ్రమ్మును నింపండి.
4. కర్రతో ఉదయం, సాయంత్రం 2 నిమిషాలు గడియారపు ముల్లు తిరిగే దిశలో కలపాలి.
5. గోనె సంచితో డ్రమ్ము మూతిని కప్పి 48 నుండి 72 గంటలు పులియబెట్టాలి.

**వినియోగం**:
- తయారైన 7 రోజుల్లోగా వాడుకోవాలి.
- కాలువ నీటితో పాటు లేదా డ్రిప్ ద్వారా నేలకు అందించవచ్చు.
- 10-20% మోతాదులో (10 లీటర్ల నీటికి 1-2 లీటర్ల జీవామృతం) వడకట్టి పైరుపై పిచికారీ చేస్తే మొక్కలు ఏపుగా పెరుగుతాయి.`
  },
  {
    id: 'neemastra',
    keywords: ['neemastra', 'neem spray', 'organic pest spray', 'వేపాస్త్రం', 'సహజ కీటక నాశిని', 'sucking pests'],
    titleEn: 'How to prepare Neemastra (వేపాస్త్రం) for sucking pests?',
    titleTe: 'రసం పీల్చే పురుగుల నివారణకు వేపాస్త్రం తయారీ',
    category: 'natural_farming',
    answerEn: `🍃 **Neemastra (Botanical Organic Insecticide)**:

**Target Pests**: Sucking pests, whiteflies, aphids, jassids, and early-stage small caterpillars in all crops.

**Ingredients for 1 Acre**:
1. Water: 100 litres
2. Desi cow dung: 2 kg
3. Desi cow urine: 5 litres
4. Crushed neem leaves and tender twigs: 5 kg (or 5 kg crushed neem fruit/seeds)

**Procedure**:
1. Mix all ingredients thoroughly in a plastic drum under shade.
2. Stir clockwise twice a day with a wooden stick.
3. Keep covered with a gunny bag for 48 hours.
4. Filter through a fine cotton cloth.

**Application**:
- Spray 100% undiluted (or 1:1 with water) directly on crop foliage.
- Safe, non-toxic, and acts as a powerful feeding deterrent and insect reproduction inhibitor.`,
    answerTe: `🍃 **వేపాస్త్రం తయారీ విధానం**:

**నివారించే పురుగులు**: రసం పీల్చే పురుగులు, పేనుబంక, తెల్లదోమ, పచ్చదోమ మరియు చిన్న గొంగళి పురుగులు.

**ఒక ఎకరాకు కావలసినవి**:
1. నీరు: 100 లీటర్లు
2. నాటు ఆవు పేడ: 2 కిలోలు
3. నాటు ఆవు మూత్రం: 5 లీటర్లు
4. దంచిన వేప ఆకులు & లేత కొమ్మలు: 5 కిలోలు (లేదా వేప గింజల పొడి)

**తయారీ పద్ధతి**:
1. వీటన్నింటినీ డ్రమ్ములో వేసి కర్రతో బాగా కలపండి.
2. నీడలో ఉంచి గోనె సంచితో మూసి 48 గంటలు పులియబెట్టాలి.
3. రోజుకు రెండుసార్లు కర్రతో కలపండి. 48 గంటల తర్వాత పలుచటి గుడ్డతో వడకట్టాలి.

**వినియోగం**:
- వడకట్టిన వేపాస్త్రాన్ని నేరుగా ఎకరా పొలంలో పిచికారీ చేయాలి. ఇది పురుగుల గుడ్లను నాశనం చేస్తుంది మరియు ఆకులను చేదుగా మార్చి పురుగులు తినకుండా నిరోధిస్తుంది.`
  },
  {
    id: 'pm-kisan',
    keywords: ['pm kisan', 'kisan samman nidhi', 'రైతు భరోసా', 'పీఎం కిసాన్', '6000', 'pmkisan helpline', 'installment'],
    titleEn: 'PM-Kisan Samman Nidhi & Farmer Schemes',
    titleTe: 'పీఎం కిసాన్ సమ్మాన్ నిధి పథకం వివరాలు',
    category: 'govt_schemes',
    answerEn: `🌾 **PM-Kisan Samman Nidhi Information**:

- **Financial Support**: ₹6,000 per year transferred directly to Aadhaar-linked bank accounts in 3 equal installments of ₹2,000 every 4 months.
- **Official Website**: https://pmkisan.gov.in
- **Mandatory Requirements**:
  1. e-KYC using Aadhaar OTP or facial recognition on PM-KISAN mobile app.
  2. Land seeding (verifying your land records with your state revenue patta/khata passbook).
  3. Aadhaar-Bank Account linking (DBT enabled via NPCI).
- **Helpline Numbers**:
  - Toll-Free: 155261 / 1800-115-526
  - PM-Kisan Helpline: 011-24300606`,
    answerTe: `🌾 **పీఎం కిసాన్ సమ్మాన్ నిధి సమగ్ర సమాచారం**:

- **ఆర్థిక సాయం**: భూమి కలిగిన రైతులకు ప్రతి ఏటా ₹6,000 లను మూడు సమాన వాయిదాలలో (రూ. 2000 చొప్పున 4 నెలలకు ఒకసారి) నేరుగా బ్యాంక్ ఖాతాలో జమ చేస్తారు.
- **అధికారిక వెబ్‌సైట్**: https://pmkisan.gov.in
- **తప్పనిసరిగా చేసుకోవలసినవి**:
  1. ఆధార్ OTP లేదా మొబైల్ యాప్ ద్వారా ఈ-కేవైసీ (e-KYC) పూర్తి చేయాలి.
  2. ల్యాండ్ సీడింగ్ (మీ పట్టాదారు పాస్‌బుక్ వివరాలను ధ్రువీకరించడం).
  3. బ్యాంక్ ఖాతాకు ఆధార్ NPCI లింక్ (DBT ఆక్టివేట్) అయి ఉండాలి.
- **హెల్ప్‌లైన్ నంబర్లు**: 155261 లేదా 011-24300606.`
  },
  {
    id: 'soil-health-card',
    keywords: ['soil testing', 'soil health card', 'భూసార పరీక్ష', 'నేల పరీక్ష', 'npk test', 'soil health'],
    titleEn: 'How to take soil samples for Soil Health Card (భూసార పరీక్ష)?',
    titleTe: 'భూసార పరీక్షకు మట్టి నమూనా ఎలా సేకరించాలి?',
    category: 'soil_health',
    answerEn: `🌱 **Soil Sample Collection Steps for Testing**:

1. **Sampling Time**: Collect soil after crop harvest or 1 month before sowing/ploughing. Never collect right after applying chemical fertilizers.
2. **Sampling Pattern**: Walk in a 'Z' or zigzag pattern across your field and pick 10-15 random spots per acre.
3. **Depth**:
   - Field crops (Paddy, Cotton, Maize): 15 cm (6 inches) deep.
   - Deep-rooted crops/Horticulture (Mango, Guava, Citrus): 30 to 60 cm.
4. **V-shaped cut**: Dig a V-shaped pit up to 15 cm deep with a spade. Remove a 1-inch thick slice of soil along the vertical side.
5. **Quartering Method**:
   - Mix all collected soil spots on a clean plastic sheet in shade.
   - Divide into 4 quarters. Discard opposite quarters.
   - Repeat until approximately 500 grams (half kg) remains.
6. **Labeling**: Dry under shade (never in direct sun). Pack in a clean polythene bag with your Name, Survey Number, Village, and Previous/Upcoming Crop.
7. Submit at your local Mandal Agricultural Office or Krishi Vigyan Kendra (Fee: ₹20-₹40).`,
    answerTe: `🌱 **భూసార పరీక్ష కోసం మట్టి నమూనా సేకరించే పద్ధతి**:

1. **సమయం**: పంట కోత పూర్తయిన తర్వాత లేదా విత్తేందుకు నెల రోజుల ముందు. ఎరువులు వేసిన వెంటనే మట్టి నమూనా తీయరాదు.
2. **పద్ధతి**: ఎకరం పొలంలో 'Z' ఆకారంలో జిగ్‌జాగ్ పద్ధతిలో 10-15 చోట్ల నమూనాలు సేకరించాలి.
3. **లోతు**:
   - సాధారణ పంటలు (వరి, ప్రత్తి, మిర్చి, మొక్కజొన్న): 15 సెం.మీ (6 అంగుళాలు) లోతు.
   - తోట పంటలు (మామిడి, నిమ్మ, బత్తాయి): 30 నుండి 60 సెం.మీ లోతు.
4. **తీసే విధానం**: పారతో 'V' ఆకారంలో 15 సెం.మీ గుంత తవ్వి, పై పొర నుండి అడుగు వరకు ఒక అంగుళం మందంతో సమానంగా మట్టి చెక్కను తీయాలి.
5. **మిశ్రమం & క్వార్టరింగ్**:
   - సేకరించిన మట్టిని ప్లాస్టిక్ పట్టాపై వేసి రాళ్ళు, చెత్త తొలగించి బాగా కలపాలి.
   - నాలుగు భాగాలు చేసి ఎదురెదురు భాగాలను తొలగిస్తూ చివరికి అర కిలో (500 గ్రాములు) మిగిలే వరకు చేయాలి.
6. **ప్యాకింగ్**: నీడలో ఆరబెట్టి, రైతు పేరు, సర్వే నంబర్, గ్రామం వివరాల చీటీ వేసి కవర్‌లో భద్రపరచాలి.
7. మండల వ్యవసాయ కార్యాలయంలో లేదా కృషి విజ్ఞాన కేంద్రం (KVK) ల్యాబ్‌లో ఇవ్వాలి (ఫీజు సుమారు ₹25-₹40).`
  },
  {
    id: 'kisan-call-center',
    keywords: ['helpline', 'phone number', 'call center', 'కిసాన్ కాల్ సెంటర్', 'హెల్ప్‌లైన్ నంబర్', 'వ్యవసాయ ఆఫీసర్'],
    titleEn: 'Kisan Call Center Toll-Free Number',
    titleTe: 'కిసాన్ కాల్ సెంటర్ ఉచిత ఫోన్ నంబర్',
    category: 'govt_schemes',
    answerEn: `📞 **National Kisan Call Center (KCC)**:

- **Toll-Free Helpline**: **1800-180-1551**
- **Operating Hours**: 6:00 AM to 10:00 PM, all 7 days of the week.
- **Language**: Direct assistance in Telugu, Hindi, English, and all regional languages from agricultural graduates and scientists.
- **Services Provided**:
  - Pest and disease diagnosis and recommendations
  - Weather warnings and advisories
  - Seed varieties and mandi market prices
  - Guidance on govt subsidy schemes (machinery, drip, seed supply).`,
    answerTe: `📞 **జాతీయ కిసాన్ కాల్ సెంటర్ (KCC)**:

- **ఉచిత టోల్-ఫ్రీ నంబర్**: **1800-180-1551**
- **పనివేళలు**: వారంలో 7 రోజులు, ప్రతిరోజూ ఉదయం 6:00 నుండి రాత్రి 10:00 గంటల వరకు.
- **భాష**: తెలుగు, హిందీ, ఇంగ్లీష్ మరియు ఇతర ప్రాంతీయ భాషలలో వ్యవసాయ శాస్త్రవేత్తలు మరియు అధికారులు సమాధానం ఇస్తారు.
- **అందించే సేవలు**:
  - పంట తెగుళ్ళు, పురుగుల నివారణ సూచనలు
  - వాతావరణ హెచ్చరికలు
  - మార్కెట్ యార్డుల్లో పంట ధరల సమాచారం
  - రాయితీ విత్తనాలు, డ్రిప్ పరికరాల పథకాల వివరాలు.`
  }
];

export function queryKnowledgeBase(query: string, lang: 'en' | 'te'): string {
  const clean = query.toLowerCase().trim();

  // Search through keywords
  let bestMatch: KnowledgeItem | null = null;
  let highestScore = 0;

  for (const item of KNOWLEDGE_BASE) {
    let score = 0;
    for (const kw of item.keywords) {
      if (clean.includes(kw.toLowerCase())) {
        score += 3;
      }
    }
    if (item.titleEn.toLowerCase().includes(clean) || item.titleTe.includes(clean)) {
      score += 5;
    }
    if (score > highestScore) {
      highestScore = score;
      bestMatch = item;
    }
  }

  if (bestMatch && highestScore > 0) {
    return lang === 'te' ? bestMatch.answerTe : bestMatch.answerEn;
  }

  // Fallback response with helpful farming direction
  if (lang === 'te') {
    return `రైతు మిత్ర: మీ ప్రశ్నకు సంబంధించిన ఖచ్చితమైన సమాచారం కోసం కిసాన్ కాల్ సెంటర్ టోల్-ఫ్రీ నంబర్ **1800-180-1551** కి ఉదయం 6 నుండి రాత్రి 10 వరకు ఉచితంగా కాల్ చేయవచ్చు లేదా మీ మండల వ్యవసాయ విస్తరణ అధికారి (AEO)ని సంప్రదించవచ్చు. మీరు "జీవామృతం తయారీ", "మిరప తామర పురుగు", "ప్రత్తి గులాబీ రంగు పురుగు", "పీఎం కిసాన్", లేదా "భూసార పరీక్ష" వంటి అంశాలపై అడిగి చూడండి!`;
  } else {
    return `Farm Friend: For specific queries on this topic, you can also dial the Kisan Call Center toll-free helpline **1800-180-1551** (6 AM to 10 PM daily) for free guidance from agricultural scientists. Try asking about "Jeevamrutha recipe", "Chilli thrips", "Cotton pink bollworm", "Soil Health Card", or "PM Kisan scheme"!`;
  }
}
