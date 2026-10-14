import { DiseaseInfo } from '../types';

export interface SymptomRule extends DiseaseInfo {
  matchingSymptoms: string[]; // key tokens like 'brown_spots', 'leaf_curl_up', 'yellow_margins', etc.
  targetPart: 'leaf' | 'stem' | 'fruit' | 'root';
}

export const PLANT_DISEASES: SymptomRule[] = [
  // PADDY DISEASES
  {
    id: 'paddy-blast',
    cropId: 'paddy',
    cropNameEn: 'Paddy',
    cropNameTe: 'వరి',
    diseaseNameEn: 'Rice Blast (Magnaporthe oryzae)',
    diseaseNameTe: 'వరి అగ్గి తెగులు (బ్లాస్ట్)',
    targetPart: 'leaf',
    matchingSymptoms: ['spindle_spots', 'brown_spots', 'grey_center', 'leaf_burn'],
    symptomsEn: [
      'Spindle-shaped or eye-shaped lesions with grey/ash center and dark brown/reddish margin on leaves.',
      'Lesions enlarge and coalesce, causing entire leaf blades to dry and wither like burnt straw.',
      'In severe cases, blackening at neck node (Neck Blast) causing empty or chaffy grains.'
    ],
    symptomsTe: [
      'ఆకులపై నూలు కండె (స్పిండిల్) ఆకారంలో బూడిద రంగు కేంద్రం, గోధుమ రంగు అంచులతో మచ్చలు ఏర్పడతాయి.',
      'మచ్చలు కలిసిపోయి ఆకులు ఎండిపోయి అగ్గి తగిలినట్లు మాడిపోతాయి.',
      'తీవ్రమైనప్పుడు మెడ విరుపు (నెక్ బ్లాస్ట్) వచ్చి వెన్నులు తాలుగా మారతాయి.'
    ],
    organicTreatmentEn: [
      'Spray cow urine + hing (asafoetida) solution or fermented butter milk (sour curd water @ 50ml/L).',
      'Spray Pseudomonas fluorescens @ 10g/L or Trichoderma viride @ 10g/L at early infection.',
      'Apply Agniastram (cow urine + garlic + green chilli concoction).'
    ],
    organicTreatmentTe: [
      'పులిసిన మజ్జిగ ద్రావణం (లీటరు నీటికి 50 మి.లీ) లేదా ఇంగువ-ఆవు మూత్రం మిశ్రమం పిచికారీ చేయండి.',
      'సూడోమోనాస్ ఫ్లోరోసెన్స్ 10 గ్రాములు లీటరు నీటికి కలిపి పిచికారీ చేయండి.',
      'సేంద్రీయ అగ్న్యాస్త్రం పిచికారీ చేయడం వల్ల ఫంగస్ వ్యాప్తి తగ్గుతుంది.'
    ],
    chemicalTreatmentEn: [
      'Tricyclazole 75% WP @ 0.6g per litre of water (Most effective for blast).',
      'Alternative: Isoprothiolane 40% EC @ 1.5ml/L or Kasugamycin 3% SL @ 2ml/L.',
      'Spray in early morning or late evening; repeat after 10-12 days if disease persists.'
    ],
    chemicalTreatmentTe: [
      'ట్రైసైక్లాజోల్ 75% WP లీటరు నీటికి 0.6 గ్రాములు కలిపి పిచికారీ చేయండి (అగ్గి తెగులుకు అత్యుత్తమ నివారణ).',
      'లేదా ఐసోప్రోథియోలేన్ 40% EC 1.5 మి.లీ లేదా కసుగామైసిన్ 2 మి.లీ లీటరు నీటికి కలపండి.',
      'మంచు విడిచిన తర్వాత ఉదయం లేదా సాయంత్రం పిచికారీ చేయాలి; అవసరమైతే 10 రోజుల తర్వాత మళ్ళీ కొట్టండి.'
    ],
    preventiveMeasuresEn: [
      'Avoid excess application of chemical nitrogen (Urea); apply in 3 split doses.',
      'Treat seeds before sowing with Carbendazim (2g/kg).',
      'Ensure proper field drainage and destroy infected stubble.'
    ],
    preventiveMeasuresTe: [
      'యూరియా ఎరువును ఒకేసారి ఎక్కువగా వేయరాదు; 3 సమ దఫాలుగా వేయాలి.',
      'విత్తే ముందు కిలో విత్తనానికి 2 గ్రాముల కార్బండజిమ్‌తో విత్తన శుద్ధి తప్పనిసరి.',
      'పొలంలో నీరు ఎక్కువ కాలం నిల్వ ఉండకుండా మురుగు నీటిని తీసివేయాలి.'
    ],
    severity: 'high'
  },
  {
    id: 'paddy-stem-borer',
    cropId: 'paddy',
    cropNameEn: 'Paddy',
    cropNameTe: 'వరి',
    diseaseNameEn: 'Yellow Stem Borer (Scirpophaga incertulas)',
    diseaseNameTe: 'వరి కాండం తొలిచే పురుగు',
    targetPart: 'stem',
    matchingSymptoms: ['dead_heart', 'white_earhead', 'stem_holes'],
    symptomsEn: [
      'Central shoots dry up and die during tillering stage ("Dead Heart"). Dead shoots easily pull out.',
      'During panicle emergence, white, empty, erect chaffy earheads appear ("White Ear").',
      'Tiny entry holes seen on the stem with caterpillar frass (excreta).'
    ],
    symptomsTe: [
      'పిలక దశలో ప్రధాన కాండం ఎండిపోయి "డెడ్ హార్ట్" (చచ్చిన మొవ్వు) ఏర్పడుతుంది. చేత్తో లాగితే సులభంగా ఊడివస్తుంది.',
      'ఈనిక దశలో గింజ లేని తెల్ల కంకులు (తెల్ల వెన్ను) నిటారుగా కనిపిస్తాయి.',
      'కాండం మొదట్లో రంధ్రాలు మరియు పురుగు విసర్జన పొడి కనిపిస్తుంది.'
    ],
    organicTreatmentEn: [
      'Release Trichogramma japonicum egg parasitoids @ 40,000/acre at weekly intervals.',
      'Set up light traps (1 per acre) and yellow stem borer pheromone traps @ 8 traps/acre.',
      'Spray Neem seed kernel extract (NSKE 5%) or 10,000 ppm Neem oil @ 2ml/L.'
    ],
    organicTreatmentTe: [
      'ఎకరాకు 40,000 ట్రైకోగ్రామా కార్డులను నాటిన 30 రోజుల నుండి వారం వ్యవధిలో అమర్చండి.',
      'ఎకరాకు 8 లింగాకర్షక బుట్టలు (ఫెరమోన్ ట్రాప్స్) లేదా ఒక కాంతి దీపం అమర్చండి.',
      '5% వేప గింజల కషాయం (NSKE) లేదా వేపనూనె లీటరు నీటికి 2-3 మి.లీ కలిపి పిచికారీ చేయండి.'
    ],
    chemicalTreatmentEn: [
      'Cartap Hydrochloride 4G granules @ 8 kg/acre or Fipronil 0.3G @ 7-8 kg/acre in standing water.',
      'Spray: Chlorantraniliprole 18.5% SC (Coragen) @ 0.3ml/L or Flubendiamide 39.35% SC @ 0.25ml/L.'
    ],
    chemicalTreatmentTe: [
      'కార్టాప్ హైడ్రోక్లోరైడ్ 4G గుళికలు ఎకరాకు 8 కిలోలు పలుచటి నీటిలో చల్లాలి.',
      'లేదా క్లోరాంట్రానిలిప్రోల్ (కొరాజెన్) 0.3 మి.లీ లేదా ఫ్లూబెండియమైడ్ 0.25 మి.లీ లీటరు నీటికి కలిపి పిచికారీ చేయండి.'
    ],
    preventiveMeasuresEn: [
      'Clip off seedling tips before transplanting to eliminate moth egg masses.',
      'Avoid high density planting; maintain 20x15 cm spacing.',
      'Harvest crop close to ground level to eliminate overwintering pupae in stubble.'
    ],
    preventiveMeasuresTe: [
      'నారు నాటే సమయంలో ఆకుల కొనలను తుంచి నాటడం ద్వారా గుడ్ల సముదాయాలను నిర్మూలించవచ్చు.',
      'దట్టంగా నాటకుండా సిఫార్సు చేసిన దూరం పాటించాలి.',
      'కోత సమయంలో నేల మట్టానికి కోయడం ద్వారా మోడులలో ఉండే పురుగు నిద్రావస్థ కోశాలను నివారించవచ్చు.'
    ],
    severity: 'high'
  },

  // COTTON DISEASES & PESTS
  {
    id: 'cotton-leaf-curl',
    cropId: 'cotton',
    cropNameEn: 'Cotton',
    cropNameTe: 'ప్రత్తి',
    diseaseNameEn: 'Cotton Leaf Curl Virus (CLCuD) & Whitefly',
    diseaseNameTe: 'ప్రత్తి ఆకుముడత వైరస్ & తెల్లదోమ',
    targetPart: 'leaf',
    matchingSymptoms: ['leaf_curl_up', 'thickened_veins', 'enation', 'stunted_growth', 'yellow_margins'],
    symptomsEn: [
      'Upward curling of leaf margins with thickening of main and secondary veins.',
      'Small cup-shaped leaf-like enations (outgrowths) on the underside of leaves.',
      'Stunted plant growth with severely reduced boll formation. Transmitted by Whitefly (Bemisia tabaci).'
    ],
    symptomsTe: [
      'ఆకులు దోనెలాగా పైకి ముడుచుకుపోవడం, ఈనెలు గరుకుగా మరియు మందంగా మారడం.',
      'ఆకుల అడుగు భాగంలో చిన్న ఆకులాంటి బుడిపెలు (ఎనేషన్స్) పెరుగుతాయి.',
      'మొక్క ఎదగక గిడసబారిపోతుంది, కాయల సంఖ్య బాగా తగ్గిపోతుంది. ఇది తెల్లదోమ ద్వారా వ్యాపిస్తుంది.'
    ],
    organicTreatmentEn: [
      'Install yellow sticky traps @ 25-30 traps/acre to trap adult whiteflies.',
      'Spray 5% Neem Seed Kernel Extract (NSKE) or Neem oil 10,000 ppm @ 2-3ml/L.',
      'Spray sour buttermilk + asafoetida (hing) solution to reduce viral viral load.'
    ],
    organicTreatmentTe: [
      'ఎకరాకు 25-30 పసుపు రంగు జిగురు అట్టలను పైరు ఎత్తు కంటే కొద్దిగా పైకి కట్టండి.',
      '5% వేప గింజల కషాయం లేదా 10,000 ppm వేపనూనె 2-3 మి.లీ లీటరు నీటికి పిచికారీ చేయండి.',
      'పులిసిన మజ్జిగ ద్రావణం పిచికారీ చేయడం వల్ల వైరస్ తీవ్రత అదుపులో ఉంటుంది.'
    ],
    chemicalTreatmentEn: [
      'To control vector whitefly: Diafenthiuron 50% WP @ 1.25g/L or Pyriproxyfen 10% EC @ 2ml/L.',
      'Alternative for early nymphal stages: Spiromesifen 22.9% SC @ 1ml/L or Flonicamid 50% WG @ 0.3g/L.'
    ],
    chemicalTreatmentTe: [
      'తెల్లదోమ నివారణకు: డయాఫెంథియురాన్ 50% WP 1.25 గ్రా లేదా పైరిప్రాక్సిఫెన్ 2 మి.లీ లీటరు నీటికి కలపండి.',
      'లేదా ఫ్లోనికామిడ్ 50% WG 0.3 గ్రాములు లేదా స్పైరోమెసిఫెన్ 1 మి.లీ లీటరు నీటికి కలిపి పిచికారీ చేయండి.'
    ],
    preventiveMeasuresEn: [
      'Eradicate weed hosts (Abutilon, Xanthium) from field bunds.',
      'Grow barrier crops like maize, sorghum, or pearl millet (3-4 rows) around the cotton field.',
      'Avoid broad spectrum pyrethroids in early crop stage which kill natural whitefly predators.'
    ],
    preventiveMeasuresTe: [
      'పొలం గట్లపై ఉండే తుత్తురుబెండ, కలుపు మొక్కలను పూర్తిగా తొలగించాలి.',
      'పొలం చుట్టూ 3-4 వరుసల జొన్న లేదా మొక్కజొన్నను సరిహద్దు రక్షణ పంటగా వేయాలి.',
      'మొదటి దశల్లో సింథటిక్ పైరెథ్రాయిడ్స్ వాడకండి, అవి మిత్రపురుగులను చంపేసి తెల్లదోమను ఉధృతం చేస్తాయి.'
    ],
    severity: 'high'
  },
  {
    id: 'cotton-pink-bollworm',
    cropId: 'cotton',
    cropNameEn: 'Cotton',
    cropNameTe: 'ప్రత్తి',
    diseaseNameEn: 'Pink Bollworm (Pectinophora gossypiella)',
    diseaseNameTe: 'ప్రత్తిలో గులాబీ రంగు కాయ తొలిచే పురుగు',
    targetPart: 'fruit',
    matchingSymptoms: ['rosetted_flower', 'boll_holes', 'stained_lint', 'premature_boll_drop'],
    symptomsEn: [
      'Rosetted flowers ("Gulabi phool"): Petals remain twisted and do not open normally.',
      'Tiny entry holes on developing bolls that seal over quickly, while the caterpillar feeds on developing seeds inside.',
      'Premature boll opening, rotten stained lint (lint quality degraded to yellow/brown).'
    ],
    symptomsTe: [
      'తామర మొగ్గలు (రోసెట్ పువ్వులు): పువ్వు రేకలు విచ్చుకోకుండా ముడుచుకుపోయి లోపల పురుగు ఉంటుంది.',
      'పిందెలు మరియు కాయలపై చిన్న రంధ్రాలు చేసి లోపలికి ప్రవేశించి గింజలను తినివేస్తుంది.',
      'కాయలు సరిగ్గా పగలక గూడుకట్టి, దూది పసుపు-గోధుమ రంగులోకి మారి నాణ్యత దెబ్బతింటుంది.'
    ],
    organicTreatmentEn: [
      'Install Pink Bollworm Pheromone traps (Gossyplure) @ 8-10 traps/acre at 45 days after sowing.',
      'Release Trichogramma bactrae egg parasitoids @ 60,000/acre starting at flower initiation.',
      'Spray Beauveria bassiana (entomopathogenic fungus) @ 5g/L during cloudy weather.'
    ],
    organicTreatmentTe: [
      'విత్తిన 45 రోజుల నుండి ఎకరాకు 8-10 గులాబీ రంగు పురుగు ఫెరమోన్ ట్రాప్స్ అమర్చండి.',
      'పూత దశ నుండి ఎకరాకు 60,000 ట్రైకోగ్రామా బాక్ట్రే గుడ్ల కార్డులను ప్రతి వారం విడుదల చేయండి.',
      'జీవ శిలీంధ్రం బ్రూవేరియా బాసియానా లీటరు నీటికి 5 గ్రాములు కలిపి పిచికారీ చేయండి.'
    ],
    chemicalTreatmentEn: [
      'If ETL crossed (>8 moths/trap/night for 3 consecutive days or 10% rosetted flowers):',
      'Chlorantraniliprole 9.3% + Lambda-cyhalothrin 4.6% ZC @ 0.5ml/L OR Emamectin Benzoate 5% SG @ 0.5g/L.',
      'Alternate with Profenofos 50% EC @ 2ml/L.'
    ],
    chemicalTreatmentTe: [
      'ఆర్థిక నష్ట పరిమితి (ట్రాప్‌లో వరుసగా 3 రోజులు రోజుకు 8 పురుగులు లేదా 10% రోసెట్ పువ్వులు) దాటినప్పుడు:',
      'ఎమామెక్టిన్ బెంజోయేట్ 5% SG లీటరు నీటికి 0.5 గ్రాములు లేదా ప్రొఫెనోఫాస్ 2 మి.లీ పిచికారీ చేయాలి.',
      'లేదా క్లోరాంట్రానిలిప్రోల్ + లాంబ్డా సైహలోథ్రిన్ 0.5 మి.లీ కలిపి పిచికారీ చేయండి.'
    ],
    preventiveMeasuresEn: [
      'Detopping (nipping shoot apex) at 90 days removes tender tips where moths prefer laying eggs.',
      'Avoid extending crop into summer/rati; terminate crop by January/February to break life cycle.',
      'Do not store un-ginned cotton near open fields.'
    ],
    preventiveMeasuresTe: [
      '90 రోజుల వయస్సులో కొమ్మల కొనలను తుంచడం (నిప్పింగ్) ద్వారా గుడ్లు పెట్టడాన్ని నిరోధించవచ్చు.',
      'పంటను జనవరి/ఫిబ్రవరి కల్లా ముగించి మోళ్ళను పీకివేయాలి; రాతూన్ (మొదటి పంట తర్వాత మళ్ళీ పెంచడం) వేయరాదు.',
      'పొలం దగ్గర జిన్నింగ్ చేయని పత్తిని నిల్వ ఉంచవద్దు.'
    ],
    severity: 'high'
  },

  // CHILLI DISEASES
  {
    id: 'chilli-thrips-leaf-curl',
    cropId: 'chilli',
    cropNameEn: 'Chilli',
    cropNameTe: 'మిరప',
    diseaseNameEn: 'Chilli Leaf Curl & Black Thrips (Thrips parvispinus)',
    diseaseNameTe: 'మిరప నల్ల తామర పురుగు మరియు బొబ్బర (ముడత)',
    targetPart: 'leaf',
    matchingSymptoms: ['leaf_curl_up', 'crinkled_leaves', 'boat_shaped_leaves', 'flower_drop', 'stunted_growth'],
    symptomsEn: [
      'Leaves curl upwards like inverted boats, become brittle and crinkled.',
      'Thrips scrape chlorophyll, resulting in silvery or bronze patches on leaf underside.',
      'Severe flower drop, twisted distorted pods, and stunted bush formation.'
    ],
    symptomsTe: [
      'ఆకుల అంచులు పైకి దోనెలాగా (బోటు ఆకారంలో) ముడుచుకుపోతాయి, పెళుసుగా మారతాయి.',
      'తామర పురుగులు రసం పీల్చడం వల్ల ఆకుల అడుగుభాగం వెండి లేదా ఇత్తడి రంగులోకి మారుతుంది.',
      'పూత విపరీతంగా రాలిపోతుంది, కాయలు వంకర్లు తిరిగి చిన్నగా మారతాయి.'
    ],
    organicTreatmentEn: [
      'Install 30-40 blue sticky traps per acre (thrips are intensely attracted to blue).',
      'Spray Neem oil (10,000 ppm) @ 2ml/L + Pongamia (Karanja) oil @ 2ml/L.',
      'Spray Lecanicillium lecanii (Verticillium) @ 5g/L during humid hours.'
    ],
    organicTreatmentTe: [
      'ఎకరాకు 30-40 నీలి రంగు జిగురు అట్టలు అమర్చండి (నల్ల తామర పురుగులు నీలి రంగుకు ఎక్కువగా ఆకర్షితమవుతాయి).',
      'వేపనూనె (10,000 ppm) 2 మి.లీ + కానుగ నూనె 2 మి.లీ లీటరు నీటికి కలిపి పిచికారీ చేయండి.',
      'జీవ శిలీంధ్రం లెకానిసిలియం లెకాని 5 గ్రాములు లీటరు నీటికి కలిపి సాయంత్రం వేళల్లో పిచికారీ చేయండి.'
    ],
    chemicalTreatmentEn: [
      'Spinetoram 11.7% SC @ 1ml/L OR Cyantraniliprole 10.26% OD (Benevia) @ 1.8ml/L.',
      'Alternative rotation: Broflanilide 300 SC @ 0.1ml/L or Acetamiprid 20% SP @ 0.5g/L.',
      'Always rotate chemical modes of action to prevent rapid resistance buildup.'
    ],
    chemicalTreatmentTe: [
      'స్పైనిటోరమ్ 11.7% SC లీటరు నీటికి 1 మి.లీ లేదా బెనెవియా (సయాంట్రానిలిప్రోల్) 1.8 మి.లీ పిచికారీ చేయండి.',
      'మార్చి మార్చి బ్రోఫ్లానిలైడ్ 0.1 మి.లీ లేదా ఎసిటామిప్రిడ్ 0.5 గ్రాములు లీటరు నీటికి కలిపి వాడాలి.',
      'పురుగులకు నిరోధకత రాకుండా ఒకే మందును వరుసగా వాడకుండా మార్చి మార్చి కొట్టాలి.'
    ],
    preventiveMeasuresEn: [
      'Plant 3-4 dense barrier rows of maize or sorghum all around the chilli plot.',
      'Maintain adequate soil moisture with drip irrigation; water stress triggers explosive thrips spikes.',
      'Avoid high doses of nitrogenous fertilizers.'
    ],
    preventiveMeasuresTe: [
      'పొలం చుట్టూ 4 వరుసల మొక్కజొన్న లేదా జొన్నను రక్షణ కవచంగా నాటాలి.',
      'డ్రిప్ ద్వారా నేలలో ఎప్పుడూ తగినంత తేమ ఉండేలా చూడాలి; బెట్ట వస్తే తామర పురుగు విపరీతంగా పెరుగుతుంది.',
      'యూరియా ఎరువును పరిమితంగా మాత్రమే వాడాలి.'
    ],
    severity: 'high'
  },
  {
    id: 'chilli-anthracnose',
    cropId: 'chilli',
    cropNameEn: 'Chilli',
    cropNameTe: 'మిరప',
    diseaseNameEn: 'Anthracnose & Die-back (Colletotrichum capsici)',
    diseaseNameTe: 'మిరప కొమ్మ ఎండు మరియు కాయకుళ్ళు తెగులు',
    targetPart: 'fruit',
    matchingSymptoms: ['circular_sunken_spots', 'black_concentric_rings', 'twig_dieback', 'straw_colored_twigs'],
    symptomsEn: [
      'Circular sunken dark brown or black lesions with concentric rings on ripe and green fruits.',
      'Die-back: Twigs dry up starting from top to bottom, turning dirty straw yellow.',
      'Fungal fruiting bodies (black dots) appear inside the sunken fruit lesions.'
    ],
    symptomsTe: [
      'పండిన మరియు పచ్చి కాయలపై గుండ్రటి నల్లటి గుంటబడిన మచ్చలు వలయాలుగా ఏర్పడతాయి.',
      'కొమ్మ ఎండు: కొమ్మల పైభాగం నుండి కిందికి ఎండిపోతూ ఎండుగడ్డి రంగులోకి మారతాయి.',
      'కాయలపై ఏర్పడిన మచ్చలలో నల్లటి చుక్కల వంటి శిలీంధ్ర బీజాలు కనిపిస్తాయి.'
    ],
    organicTreatmentEn: [
      'Seed treatment with Trichoderma viride @ 10g/kg seed.',
      'Spray Panchagavya (30ml/L) or Copper-rich fermented butter milk.',
      'Spray bio-fungicide Bacillus subtilis @ 5g/L.'
    ],
    organicTreatmentTe: [
      'కిలో విత్తనానికి 10 గ్రాముల ట్రైకోడెర్మా విరిడేతో విత్తన శుద్ధి చేయాలి.',
      'పంచగవ్య (లీటరు నీటికి 30 మి.లీ) లేదా రాగి పాత్రలో నిల్వ చేసిన పులిసిన మజ్జిగ పిచికారీ చేయండి.',
      'బాసిల్లస్ సబ్టిలిస్ జీవ శిలీంధ్ర నాశిని 5 గ్రాములు లీటరు నీటికి కలిపి పిచికారీ చేయండి.'
    ],
    chemicalTreatmentEn: [
      'Azoxystrobin 18.2% + Difenoconazole 11.4% SC (Amistar Top) @ 1ml/L.',
      'Alternative: Tebuconazole 25.9% EC @ 1ml/L OR Captan 50% WP @ 2.5g/L.'
    ],
    chemicalTreatmentTe: [
      'అమిస్టార్ టాప్ (అజాక్సిస్ట్రోబిన్ + డైఫెనోకొనజోల్) లీటరు నీటికి 1 మి.లీ కలిపి పిచికారీ చేయండి.',
      'లేదా టెబుకొనజోల్ 1 మి.లీ లేదా కెప్టాన్ 2.5 గ్రాములు లీటరు నీటికి కలిపి కొట్టాలి.'
    ],
    preventiveMeasuresEn: [
      'Remove and burn infected twigs and dried fruits from the field.',
      'Avoid overhead sprinkler irrigation which splashes fungal spores; use drip irrigation.',
      'Ensure balanced potassium and boron application for thick fruit skin.'
    ],
    preventiveMeasuresTe: [
      'ఎండిపోయిన కొమ్మలను, కుళ్ళిన కాయలను ఏరివేసి కాల్చివేయాలి.',
      'స్ప్రింక్లర్లతో తడులు ఇవ్వరాదు (శిలీంధ్రం నీటి తుంపర్ల ద్వారా వ్యాపిస్తుంది), డ్రిప్ వాడాలి.',
      'పొటాష్ మరియు బోరాన్ ఎరువులు వేస్తే కాయ తొక్క గట్టిపడి తెగులు రాకుండా రక్షిస్తుంది.'
    ],
    severity: 'medium'
  },

  // TOMATO DISEASES
  {
    id: 'tomato-early-blight',
    cropId: 'tomato',
    cropNameEn: 'Tomato',
    cropNameTe: 'టమోటా',
    diseaseNameEn: 'Early Blight (Alternaria solani)',
    diseaseNameTe: 'టమోటా ముందస్తు ఆకుమచ్చ తెగులు',
    targetPart: 'leaf',
    matchingSymptoms: ['target_board_rings', 'brown_spots', 'yellow_halo', 'lower_leaf_drying'],
    symptomsEn: [
      'Concentric target-board like dark brown rings on older lower leaves first.',
      'Surrounding tissue turns chlorotic yellow, leading to defoliation from ground up.',
      'Dark sunken leathery spots near fruit stem attachment.'
    ],
    symptomsTe: [
      'కింది ముదిరిన ఆకులపై మొదటగా వలయాలు వలయాలుగా (టార్గెట్ బోర్డు వంటి) గోధుమ రంగు మచ్చలు వస్తాయి.',
      'మచ్చల చుట్టూ పసుపు రంగు వలయం ఏర్పడి కింద నుండి ఆకులు రాలిపోతాయి.',
      'కాయల తొడిమ దగ్గర నల్లటి గరుకు మచ్చలు ఏర్పడతాయి.'
    ],
    organicTreatmentEn: [
      'Spray Trichoderma harzianum @ 10g/L or Pseudomonas @ 10g/L.',
      'Apply 5% baking soda (sodium bicarbonate @ 5g/L) with 2ml neem oil as preventive spray.',
      'Mulch soil to prevent rain splash from soil carrying fungal spores to lower foliage.'
    ],
    organicTreatmentTe: [
      'ట్రైకోడెర్మా హార్జియానమ్ లేదా సూడోమోనాస్ లీటరు నీటికి 10 గ్రాములు కలిపి పిచికారీ చేయండి.',
      'వంట సోడా 5 గ్రాములు + వేపనూనె 2 మి.లీ లీటరు నీటికి కలిపి పిచికారీ చేస్తే శిలీంధ్రం వృద్ధి చెందదు.',
      'భూమిపై మల్చింగ్ చేయడం ద్వారా నేలలోని శిలీంధ్ర బీజాలు ఆకులపై పడకుండా ఉంటాయి.'
    ],
    chemicalTreatmentEn: [
      'Mancozeb 75% WP @ 2.5g/L OR Chlorothalonil 75% WP @ 2g/L (Protectant).',
      'For active infections: Azoxystrobin 23% SC @ 1ml/L OR Difenoconazole 25% EC @ 0.5ml/L.'
    ],
    chemicalTreatmentTe: [
      'మాంకోజెబ్ 75% WP 2.5 గ్రా లేదా క్లోరోథలోనిల్ 2 గ్రాములు లీటరు నీటికి కలిపి పిచికారీ చేయండి.',
      'రోగం ఉధృతంగా ఉంటే: డైఫెనోకొనజోల్ 0.5 మి.లీ లేదా అజాక్సిస్ట్రోబిన్ 1 మి.లీ లీటరు నీటికి కలిపి కొట్టాలి.'
    ],
    preventiveMeasuresEn: [
      'Prune lower leaves up to 12 inches above ground to avoid soil splash.',
      'Stake plants on trellis or bamboo poles.',
      'Rotate crops; do not plant after potato, chilli, or brinjal.'
    ],
    preventiveMeasuresTe: [
      'నేల నుండి 1 అడుగు ఎత్తు వరకు ఉన్న కింది ఆకులను కత్తిరించి తీసివేయాలి.',
      'వెదురు కర్రలు, తాళ్ళతో మొక్కలను నిలబెట్టాలి (స్టేకింగ్).',
      'టమోటా తర్వాత వంగ, బంగాళాదుంప, మిరప వేయకుండా పంట మార్పిడి చేయాలి.'
    ],
    severity: 'medium'
  },

  // GROUNDNUT DISEASES
  {
    id: 'groundnut-tikka',
    cropId: 'groundnut',
    cropNameEn: 'Groundnut',
    cropNameTe: 'వేరుశనగ',
    diseaseNameEn: 'Tikka Leaf Spot (Cercospora personata)',
    diseaseNameTe: 'వేరుశనగ తిక్కా ఆకుమచ్చ తెగులు',
    targetPart: 'leaf',
    matchingSymptoms: ['dark_circular_spots', 'yellow_halo', 'leaf_defoliation'],
    symptomsEn: [
      'Numerous small dark brown or carbon black circular spots on leaves surrounded by a bright yellow halo.',
      'Severe defoliation leaving only bare stems, leading to shriveled small pods.'
    ],
    symptomsTe: [
      'ఆకులపై పసుపు రంగు వలయంతో కూడిన అనేక నల్లటి లేదా గోధుమ రంగు గుండ్రటి మచ్చలు ఏర్పడతాయి.',
      'ఆకులు విపరీతంగా రాలిపోయి కేవలం కాడలు మాత్రమే మిగులుతాయి, కాయలు సరిగ్గా ఊరవు.'
    ],
    organicTreatmentEn: [
      'Spray sour butter milk (fermented for 5 days @ 50ml/L).',
      'Spray Pseudomonas fluorescens @ 10g/L at 30 and 45 days after sowing.'
    ],
    organicTreatmentTe: [
      '5 రోజులు పులియబెట్టిన మజ్జిగ ద్రావణం (లీటరు నీటికి 50 మి.లీ) పిచికారీ చేయండి.',
      'విత్తిన 30 మరియు 45 రోజుల దశలలో సూడోమోనాస్ ఫ్లోరోసెన్స్ 10 గ్రా/లీ పిచికారీ చేయండి.'
    ],
    chemicalTreatmentEn: [
      'Carbendazim 12% + Mancozeb 63% WP (Saaf) @ 2g/L of water.',
      'Alternative: Hexaconazole 5% SC @ 2ml/L or Tebuconazole 25.9% EC @ 1ml/L.'
    ],
    chemicalTreatmentTe: [
      'సాఫ్ (కార్బండజిమ్ + మాంకోజెబ్) లీటరు నీటికి 2 గ్రాములు కలిపి పిచికారీ చేయాలి.',
      'లేదా హెక్సాకొనజోల్ 5% SC 2 మి.లీ లేదా టెబుకొనజోల్ 1 మి.లీ లీటరు నీటికి కలిపి కొట్టండి.'
    ],
    preventiveMeasuresEn: [
      'Seed treatment with Mancozeb (3g/kg) or Trichoderma (10g/kg).',
      'Burn infected plant debris after harvest.',
      'Early sowing in Kharif avoids peak disease pressure.'
    ],
    preventiveMeasuresTe: [
      'కిలో విత్తనానికి 3 గ్రా మాంకోజెబ్ లేదా 10 గ్రా ట్రైకోడెర్మాతో విత్తన శుద్ధి తప్పనిసరి.',
      'పంట కోసిన తర్వాత తెగులు సోకిన అవశేషాలను నాశనం చేయాలి.',
      'ఖరీఫ్‌లో తొందరగా విత్తుకోవడం వల్ల తిక్కా తెగులు ఉధృతి తక్కువగా ఉంటుంది.'
    ],
    severity: 'medium'
  }
];
