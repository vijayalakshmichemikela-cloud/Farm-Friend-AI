import { CropInfo } from '../types';

export const CROPS_DATA: CropInfo[] = [
  {
    id: 'paddy',
    nameEn: 'Paddy / Rice',
    nameTe: 'వరి (వరి ధాన్యం)',
    category: 'cereal',
    suitableSoils: ['clay', 'alluvial', 'black'],
    seasons: ['kharif', 'rabi'],
    durationDays: '115 - 145 days',
    waterRequirement: 'high',
    expectedYieldPerAcre: '25 - 35 Quintals (Bags: 35-45)',
    approxMspPerQuintal: 2300, // 2024-25 MSP Common Paddy ₹2,300/qtl
    descriptionEn: 'The staple food crop of India. Requires standing water or alternate wetting and drying (AWD). Best grown in fertile clayey or alluvial soils.',
    descriptionTe: 'భారతదేశ ప్రధాన ఆహార పంట. బంకమట్టి, ఒండ్రు నేలలు అనుకూలం. ఆల్టర్నేట్ వెట్టింగ్ & డ్రైయింగ్ (AWD) పద్ధతితో 30% నీరు ఆదా చేయవచ్చు.',
    sowingTipsEn: [
      'Treat seeds with Carbendazim (2g/kg) or Trichoderma viride (10g/kg) before nursery sowing.',
      'Transplant 20-25 days old seedlings with 2-3 seedlings per hill at 20x15 cm spacing.',
      'Maintain 2-5 cm thin water layer during tillering and panicle initiation.'
    ],
    sowingTipsTe: [
      'నర్సరీ విత్తనాలకు కిలో విత్తనానికి 2 గ్రా కార్బండజిమ్ లేదా 10 గ్రా ట్రైకోడెర్మా విరిడేతో విత్తన శుద్ధి చేయండి.',
      '20-25 రోజుల నారును చదరపు మీటరుకు 33-40 కుదుళ్ళు ఉండేలా (20x15 సెం.మీ) నాటండి.',
      'పిలకలు తొడిగే దశ మరియు చిరుపొట్ట దశలో పలుచటి నీరు నిలకడగా ఉండేలా చూడండి.'
    ],
    companionCropsEn: ['Azolla bio-fertilizer', 'Fish farming in deep water'],
    companionCropsTe: ['అజోల్లా జీవ ఎరువు', 'చేపల పెంపకం (రైస్-ఫిష్ కల్చర్)']
  },
  {
    id: 'cotton',
    nameEn: 'Cotton (Kapas)',
    nameTe: 'ప్రత్తి (దూది)',
    category: 'cash_crop',
    suitableSoils: ['black', 'alluvial', 'red'],
    seasons: ['kharif'],
    durationDays: '150 - 180 days',
    waterRequirement: 'medium',
    expectedYieldPerAcre: '10 - 16 Quintals',
    approxMspPerQuintal: 7121, // 2024-25 MSP Medium staple ₹7,121/qtl
    descriptionEn: 'Major commercial fiber crop of Telangana, Andhra Pradesh, Maharashtra & Gujarat. Deep black cotton soil with good internal drainage is ideal.',
    descriptionTe: 'తెలంగాణ, ఆంధ్రప్రదేశ్ మరియు మహారాష్ట్రలో ముఖ్యమైన వాణిజ్య పంట. లోతైన నల్లరేగడి నేలలు, నీరు నిలవని ఎర్ర నేలలు అనుకూలం.',
    sowingTipsEn: [
      'Sow with pre-monsoon showers or after 50-60mm rainfall in June-July.',
      'Maintain spacing of 90x60 cm or 120x45 cm for Bt-cotton hybrids.',
      'Nipping (detopping) at 80-90 days controls vegetative growth and enhances boll size.'
    ],
    sowingTipsTe: [
      'జూన్-జూలైలో తొలకరి వర్షాలు (50-60 మి.మీ) కురిసిన తర్వాత విత్తుకోండి.',
      'సాళ్ల మధ్య 90 సెం.మీ, మొక్కల మధ్య 60 సెం.మీ దూరం పాటించండి.',
      '80-90 రోజుల వయస్సులో కొన తుంచడం (నిప్పింగ్) ద్వారా గులాబీ రంగు పురుగు నివారణతో పాటు కాయల సైజు పెరుగుతుంది.'
    ],
    companionCropsEn: ['Red Gram (Pigeonpea) in 6:1 or 8:1 ratio', 'Green Gram (Greengram) as border trap crop'],
    companionCropsTe: ['కంది (6:1 లేదా 8:1 నిష్పత్తిలో అంతర పంటగా)', 'పెసర లేదా జొన్న సరిహద్దు పంటగా']
  },
  {
    id: 'chilli',
    nameEn: 'Chilli (Mirchi)',
    nameTe: 'మిరప (మిర్చి)',
    category: 'cash_crop',
    suitableSoils: ['black', 'red', 'alluvial'],
    seasons: ['kharif', 'rabi'],
    durationDays: '150 - 210 days',
    waterRequirement: 'medium',
    expectedYieldPerAcre: '25 - 35 Quintals (Dry)',
    approxMspPerQuintal: 14000, // Market indicative rate
    descriptionEn: 'High-value spice crop extensively cultivated in Guntur, Khammam, and Warangal. Highly sensitive to waterlogging and sucking pests.',
    descriptionTe: 'గుంటూరు, ఖమ్మం, వరంగల్ ప్రాంతాల్లో అత్యధిక ఆదాయాన్నిచ్చే వాణిజ్య పంట. నీరు నిలిస్తే వేరుకుళ్ళు వస్తుంది; రసం పీల్చే పురుగుల పట్ల అప్రమత్తంగా ఉండాలి.',
    sowingTipsEn: [
      'Install blue and yellow sticky traps (25 per acre) right from transplanting.',
      'Spray Neem oil (10,000 ppm @ 2ml/L) alternately to keep thrips and mites under check.',
      'Avoid excessive chemical nitrogen to prevent succulent foliage which attracts sucking pests.'
    ],
    sowingTipsTe: [
      'నాటిన మొదటి నుండే ఎకరాకు 25 నీలి మరియు పసుపు రంగు జిగురు బోర్డులు ఏర్పాటు చేయండి.',
      'తామర పురుగు మరియు నల్లి నివారణకు వేపనూనె (10,000 ppm) 2 మి.లీ లీటరు నీటికి కలిపి పిచికారీ చేయండి.',
      'అధిక యూరియా వాడకం తగ్గించండి; నత్రజని ఎక్కువైతే రసం పీల్చే పురుగులు విపరీతంగా ఆశిస్తాయి.'
    ],
    companionCropsEn: ['Maize as border crop (4 rows) to restrict pest migration', 'Marigold as trap crop for fruit borer'],
    companionCropsTe: ['పొలం చుట్టూ 4 వరుసల మొక్కజొన్న సరిహద్దు రక్షణగా', 'బంతి పూలు ఆకర్షక పంటగా']
  },
  {
    id: 'groundnut',
    nameEn: 'Groundnut / Peanut',
    nameTe: 'వేరుశనగ (పల్లీ)',
    category: 'oilseed',
    suitableSoils: ['red', 'sandy', 'alluvial'],
    seasons: ['kharif', 'rabi'],
    durationDays: '105 - 120 days',
    waterRequirement: 'low',
    expectedYieldPerAcre: '10 - 15 Quintals',
    approxMspPerQuintal: 6783, // 2024-25 MSP ₹6,783/qtl
    descriptionEn: 'Major oilseed crop thriving in well-drained red sandy loam soils (Rayalaseema & North Karnataka). Peg penetration requires loose soil.',
    descriptionTe: 'రాయలసీమ, ఉత్తర కర్ణాటక ఎర్ర నేలల్లో ప్రముఖ నూనెగింజ పంట. ఊడలు దిగేందుకు నేల గుల్లగా ఉండడం అవసరం.',
    sowingTipsEn: [
      'Apply Gypsum @ 200 kg/acre at 40-45 days (flowering/peg stage) for healthy pod filling.',
      'Ensure seed treatment with Rhizobium culture (200g/10kg seed) to fix atmospheric nitrogen.',
      'Do not cultivate or disturb soil after pegs begin to enter the ground.'
    ],
    sowingTipsTe: [
      'ఊడలు దిగే 40-45 రోజుల దశలో ఎకరాకు 200 కిలోల జిప్సం వేయడం ద్వారా కాయలు బలిష్టంగా ఊరతాయి.',
      'రైజోబియం కల్చర్‌తో విత్తన శుద్ధి చేసి నత్రజని స్థిరీకరణ పెంచండి.',
      'ఊడలు నేలలోకి దిగుతున్న సమయంలో కలుపు తీత కోసం నేలను కదిలించవద్దు.'
    ],
    companionCropsEn: ['Red Gram in 7:1 ratio', 'Castor as border crop'],
    companionCropsTe: ['కంది 7:1 నిష్పత్తిలో', 'ఆముదం సరిహద్దు పంటగా']
  },
  {
    id: 'maize',
    nameEn: 'Maize (Corn)',
    nameTe: 'మొక్కజొన్న',
    category: 'cereal',
    suitableSoils: ['alluvial', 'red', 'black'],
    seasons: ['kharif', 'rabi', 'zaid'],
    durationDays: '95 - 110 days',
    waterRequirement: 'medium',
    expectedYieldPerAcre: '28 - 38 Quintals',
    approxMspPerQuintal: 2225, // 2024-25 MSP ₹2,225/qtl
    descriptionEn: 'Queen of cereals with immense poultry and industrial demand. Short duration and fits well in crop rotation.',
    descriptionTe: 'అత్యధిక ఉత్పత్తి సామర్థ్యం గల తృణధాన్య పంట. పౌల్ట్రీ రంగానికి భారీ గిరాకీ ఉంది. తక్కువ కాలంలో అధిక దిగుబడి వస్తుంది.',
    sowingTipsEn: [
      'Monitor from day 10 for Fall Armyworm (FAW) whorl feeding symptoms.',
      'Drop neem cake powder or sand mixed with lime into leaf whorls for natural FAW protection.',
      'Critical watering stages: Knee-high stage, Tasseling (flowering), and Silking.'
    ],
    sowingTipsTe: [
      'మొలకెత్తిన 10వ రోజు నుండే కత్తెర పురుగు (ఫాల్ ఆర్మీవార్మ్) నివారణకు సుడిని పరిశీలించండి.',
      'సుడిలో వేపపిండి లేదా ఇసుక-సున్నం మిశ్రమం వేస్తే కత్తెర పురుగు పుట్టకుండా నిరోధించవచ్చు.',
      'మోకాలి లోతు దశ, పూత (వెన్ను) దశ మరియు గింజ పాలుపోసుకునే దశలలో నీటి ఎద్దడి లేకుండా చూడండి.'
    ],
    companionCropsEn: ['Soybean or Green Gram as intercrop', 'Cowpea'],
    companionCropsTe: ['సోయాచిక్కుడు లేదా పెసర అంతర పంటగా', 'అలసందలు']
  },
  {
    id: 'tomato',
    nameEn: 'Tomato',
    nameTe: 'టమోటా',
    category: 'vegetable',
    suitableSoils: ['red', 'alluvial', 'black'],
    seasons: ['kharif', 'rabi', 'zaid'],
    durationDays: '110 - 130 days',
    waterRequirement: 'medium',
    expectedYieldPerAcre: '150 - 250 Quintals (Fresh)',
    approxMspPerQuintal: 1500, // Market estimate
    descriptionEn: 'High-yielding horticultural vegetable. Staking with bamboo poles improves fruit quality and prevents ground rot.',
    descriptionTe: 'అధిక దిగుబడినిచ్చే కూరగాయ పంట. వెదురు కర్రలు మరియు తాళ్ళతో నిలబెట్టడం (స్టేకింగ్) వల్ల కాయలు కుళ్ళిపోకుండా నాణ్యత పెరుగుతుంది.',
    sowingTipsEn: [
      'Use silver-black plastic mulch with drip irrigation for 35% higher yields and weed control.',
      'Spray Boron (1g/L) during flowering to prevent fruit cracking and flower drop.',
      'Install yellow sticky traps for whitefly management to prevent Tomato Leaf Curl Virus.'
    ],
    sowingTipsTe: [
      'ప్లాస్టిక్ మల్చింగ్ మరియు డ్రిప్ వాడటం వల్ల కలుపు లేకుండా 35% అధిక దిగుబడి వస్తుంది.',
      'పూత, పిందె రాలకుండా మరియు కాయలు పగలకుండా బోరాన్ (1 గ్రా/లీ) పిచికారీ చేయండి.',
      'ఆకుముడత వైరస్‌ను వ్యాపింపజేసే తెల్లదోమ నివారణకు పసుపు రంగు జిగురు అట్టలు పెట్టండి.'
    ],
    companionCropsEn: ['Marigold as border (nematode control)', 'Basil / Tulsi'],
    companionCropsTe: ['బంతి పూలు (వేరు బుడిపెల నులిపురుగుల నివారణకు)', 'తులసి మొక్కలు']
  },
  {
    id: 'redgram',
    nameEn: 'Red Gram / Pigeonpea (Tur / Kandulu)',
    nameTe: 'కంది (తువర్)',
    category: 'pulse',
    suitableSoils: ['red', 'black', 'alluvial'],
    seasons: ['kharif'],
    durationDays: '150 - 180 days',
    waterRequirement: 'low',
    expectedYieldPerAcre: '6 - 10 Quintals',
    approxMspPerQuintal: 7550, // 2024-25 MSP ₹7,550/qtl
    descriptionEn: 'Vital drought-tolerant protein crop. Deep taproot system mines subsoil moisture and enriches soil with nitrogen.',
    descriptionTe: 'కరువును తట్టుకునే కీలక పప్పుధాన్య పంట. లోతైన తల్లివేరు వ్యవస్థ ద్వారా భూమిలోని పోషకాలను సంగ్రహించి నేలకు నత్రజని అందిస్తుంది.',
    sowingTipsEn: [
      'Nip terminal branches at 45-50 days to promote profusely branched bushy structure.',
      'Install pheromone traps for Helicoverpa pod borer @ 4 traps per acre.',
      'Apply protective spray of NSKE 5% (Neem Seed Kernel Extract) at 50% flowering.'
    ],
    sowingTipsTe: [
      '45-50 రోజుల వయస్సులో కొనలు తుంచడం వల్ల కొమ్మలు విపరీతంగా పెరిగి కాయల సంఖ్య పెరుగుతుంది.',
      'శనగపచ్చ పురుగు నివారణకు ఎకరాకు 4 లింగాకర్షక బుట్టలు ఏర్పాటు చేయండి.',
      '50% పూత దశలో 5% వేప గింజల కషాయం (NSKE) పిచికారీ చేయండి.'
    ],
    companionCropsEn: ['Intercropped with Cotton (1:6) or Groundnut (1:7)', 'Sorghum / Jowar'],
    companionCropsTe: ['ప్రత్తిలో (1:6) లేదా వేరుశనగలో (1:7) అంతర పంటగా', 'జొన్న']
  },
  {
    id: 'bengalgram',
    nameEn: 'Bengal Gram / Chickpea (Chana / Senagalu)',
    nameTe: 'శనగ (చనగలు)',
    category: 'pulse',
    suitableSoils: ['black', 'alluvial'],
    seasons: ['rabi'],
    durationDays: '90 - 105 days',
    waterRequirement: 'low',
    expectedYieldPerAcre: '8 - 12 Quintals',
    approxMspPerQuintal: 5440, // 2024-25 MSP ₹5,440/qtl
    descriptionEn: 'The king of pulses in Rabi season. Flourishes in residual moisture in heavy black soils of Rayalaseema and Deccan plateau.',
    descriptionTe: 'రబీ కాలపు ప్రధాన పప్పు పంట. నల్లరేగడి నేలలోని భూమి తేమతోనే స్వల్ప నీటితో అద్భుతమైన దిగుబడినిస్తుంది.',
    sowingTipsEn: [
      'Sow between October 15 and November 15 for optimum winter temperature.',
      'Seed treatment with Trichoderma viride (10g/kg) is mandatory to prevent Fusarium wilt.',
      'One critical irrigation at pod development stage boosts yield by 30%.'
    ],
    sowingTipsTe: [
      'అక్టోబర్ 15 నుండి నవంబర్ 15 మధ్య చలి మొదలయ్యే సమయంలో విత్తుకోవాలి.',
      'ఎండు తెగులు (విల్ట్) రాకుండా కిలో విత్తనానికి 10 గ్రా ట్రైకోడెర్మా విరిడేతో శుద్ధి చేయండి.',
      'కాయ అభివృద్ధి దశలో ఇచ్చే ఒకే ఒక ప్రాణరక్షక తడి 30% అదనపు దిగుబడినిస్తుంది.'
    ],
    companionCropsEn: ['Mustard as mixed crop', 'Linseed as border'],
    companionCropsTe: ['ఆవాలు మిశ్రమ పంటగా', 'అవిసె']
  }
];
