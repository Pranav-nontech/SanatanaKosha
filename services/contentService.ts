export interface Module {
  id: string;
  name: string;
  nameEn: string;
  nameSanskrit: string;
  description: string;
  icon: string;
  category: 'sruti' | 'smriti' | 'darsana' | 'agama' | 'upasana' | 'vedanga' | 'science' | 'yoga' | 'sampradaya';
  subModules?: SubModule[];
}

export interface SubModule {
  id: string;
  name: string;
  nameSanskrit: string;
  description: string;
  content?: ContentItem[];
}

export interface ContentItem {
  id: string;
  title: string;
  titleSanskrit?: string;
  definition: string;
  scripturalReference: string;
  darsanaView?: string;
  implication?: string;
  category?: string;
}

export interface SearchResult {
  type: 'module' | 'submodule' | 'content';
  item: Module | SubModule | ContentItem;
  moduleName: string;
}

export const modules: Module[] = [
  {
    id: 'sruti',
    name: 'Śruti',
    nameEn: 'Revealed Scripture',
    nameSanskrit: 'श्रुति',
    description: 'The eternal Vedas and Upaniṣads - the foundation of Sanātana Dharma',
    icon: 'book-open-variant',
    category: 'sruti',
    subModules: [
      {
        id: 'vedas',
        name: 'The Four Vedas',
        nameSanskrit: 'चतुर्वेदाः',
        description: 'Ṛgveda, Yajurveda, Sāmaveda, Atharvaveda',
        content: [
          {
            id: 'rgveda',
            title: 'Ṛgveda',
            titleSanskrit: 'ऋग्वेद',
            definition: 'The oldest Veda, consisting of 1,028 hymns (sūktas) organized in 10 maṇḍalas, primarily devoted to praise of deities through sacred mantras.',
            scripturalReference: 'Ṛgveda Saṁhitā (10 Maṇḍalas)',
            darsanaView: 'Revered across all sampradāyas as the most ancient śruti',
            implication: 'Foundation of Vedic ritual and philosophical inquiry',
          },
          {
            id: 'yajurveda',
            title: 'Yajurveda',
            titleSanskrit: 'यजुर्वेद',
            definition: 'The Veda of sacrificial formulas, existing in two recensions: Śukla (White) and Kṛṣṇa (Black), containing prose mantras for ritual performance.',
            scripturalReference: 'Śukla Yajurveda & Kṛṣṇa Yajurveda',
            implication: 'Essential for understanding Vedic yajna procedures',
          },
        ],
      },
      {
        id: 'upanishads',
        name: 'Upaniṣads',
        nameSanskrit: 'उपनिषद्',
        description: 'The philosophical essence of the Vedas',
        content: [
          {
            id: 'isa',
            title: 'Īśa Upaniṣad',
            titleSanskrit: 'ईशोपनिषद्',
            definition: 'The shortest of the principal Upaniṣads, consisting of 18 verses, teaching the harmony of action and knowledge through renunciation.',
            scripturalReference: 'Śukla Yajurveda, Chapter 40',
            darsanaView: 'Advaita: Non-dual Brahman pervades all; Viśiṣṭādvaita: All is Lord\'s body',
            implication: 'Balances worldly engagement with spiritual detachment',
            category: 'Mukhya Upaniṣad',
          },
          {
            id: 'kena',
            title: 'Kena Upaniṣad',
            titleSanskrit: 'केनोपनिषद्',
            definition: 'Explores the nature of Brahman through inquiry "by whom?" (kena), revealing that Brahman is beyond the senses and mind.',
            scripturalReference: 'Sāmaveda, Talavakāra Brāhmaṇa',
            implication: 'Teaches epistemic humility and transcendental nature of ultimate reality',
            category: 'Mukhya Upaniṣad',
          },
          {
            id: 'katha',
            title: 'Kaṭha Upaniṣad',
            titleSanskrit: 'कठोपनिषद्',
            definition: 'The dialogue between Naciketas and Yama (Death) revealing the nature of Ātman, the path to immortality, and the distinction between śreyas (good) and preyas (pleasant).',
            scripturalReference: 'Kṛṣṇa Yajurveda, Kaṭha Śākhā',
            darsanaView: 'Foundation for all Vedānta schools; teaches Self-knowledge',
            implication: 'Teaches discrimination between eternal and transient values',
            category: 'Mukhya Upaniṣad',
          },
          {
            id: 'mandukya',
            title: 'Māṇḍūkya Upaniṣad',
            titleSanskrit: 'माण्डूक्योपनिषद्',
            definition: 'The shortest yet most profound Upaniṣad with 12 mantras, analyzing AUM and the four states of consciousness (waking, dream, deep sleep, turīya).',
            scripturalReference: 'Atharvaveda',
            darsanaView: 'Advaita: Supreme importance; Gauḍapāda Kārikā commentary',
            implication: 'Core text for understanding consciousness and non-duality',
            category: 'Mukhya Upaniṣad',
          },
        ],
      },
      {
        id: 'mahavakyas',
        name: 'Mahāvākyas',
        nameSanskrit: 'महावाक्य',
        description: 'The Great Statements of non-dual truth',
        content: [
          {
            id: 'prajnanam',
            title: 'Prajñānam Brahma',
            titleSanskrit: 'प्रज्ञानं ब्रह्म',
            definition: 'Consciousness is Brahman - the great statement from Ṛgveda declaring that pure consciousness is the ultimate reality.',
            scripturalReference: 'Aitareya Upaniṣad 3.3 (Ṛgveda)',
            darsanaView: 'Advaita: Direct identity; Dvaita: Brahman possesses consciousness',
            implication: 'Foundation for understanding consciousness as fundamental reality',
          },
          {
            id: 'tattvamasi',
            title: 'Tat Tvam Asi',
            titleSanskrit: 'तत् त्वम् असि',
            definition: 'That Thou Art - the statement revealing the identity between the individual self (tvam) and the ultimate reality (tat).',
            scripturalReference: 'Chāndogya Upaniṣad 6.8.7 (Sāmaveda)',
            darsanaView: 'Advaita: Absolute identity; Viśiṣṭādvaita: Qualified identity',
            implication: 'Central to Vedāntic practice of self-inquiry and realization',
          },
        ],
      },
    ],
  },
  {
    id: 'smriti',
    name: 'Smṛti',
    nameEn: 'Remembered Tradition',
    nameSanskrit: 'स्मृति',
    description: 'Itihāsa, Purāṇa, and Dharmaśāstra - the remembered wisdom',
    icon: 'bookshelf',
    category: 'smriti',
    subModules: [
      {
        id: 'bhagavadgita',
        name: 'Bhagavad Gītā',
        nameSanskrit: 'भगवद्गीता',
        description: 'The divine song - Krishna\'s teachings to Arjuna',
        content: [
          {
            id: 'karma-yoga',
            title: 'Karma Yoga',
            titleSanskrit: 'कर्मयोग',
            definition: 'The path of selfless action performed without attachment to results, as a means of spiritual liberation.',
            scripturalReference: 'Bhagavad Gītā, Chapters 2-3',
            darsanaView: 'All schools accept karma yoga; differs in ultimate goal interpretation',
            implication: 'Integrates spiritual practice with worldly duties',
            category: 'Yoga Paths',
          },
          {
            id: 'bhakti-yoga',
            title: 'Bhakti Yoga',
            titleSanskrit: 'भक्तियोग',
            definition: 'The path of loving devotion to the Supreme, characterized by nine forms (navadhā bhakti) leading to divine grace.',
            scripturalReference: 'Bhagavad Gītā, Chapters 7-12',
            darsanaView: 'Vaiṣṇava: Supreme path; Advaita: Preparatory to jñāna',
            implication: 'Accessible path emphasizing love and surrender',
            category: 'Yoga Paths',
          },
        ],
      },
      {
        id: 'puranas',
        name: 'Purāṇas',
        nameSanskrit: 'पुराण',
        description: 'Ancient chronicles of cosmology and tradition',
        content: [
          {
            id: 'vishnu-purana',
            title: 'Viṣṇu Purāṇa',
            titleSanskrit: 'विष्णुपुराण',
            definition: 'One of the 18 Mahāpurāṇas, primarily devoted to Lord Viṣṇu, containing cosmology, genealogies, and dharma teachings.',
            scripturalReference: 'Viṣṇu Purāṇa (6 Aṁśas)',
            implication: 'Central Vaiṣṇava text for understanding cosmic cycles and divine manifestations',
            category: 'Mahāpurāṇa',
          },
          {
            id: 'bhagavata-purana',
            title: 'Bhāgavata Purāṇa',
            titleSanskrit: 'भागवतपुराण',
            definition: 'The most celebrated Purāṇa, narrating Kṛṣṇa\'s life and teachings, emphasizing prema-bhakti (loving devotion) as the supreme path.',
            scripturalReference: 'Śrīmad Bhāgavatam (12 Skandhas, 18,000 verses)',
            darsanaView: 'All Vaiṣṇava schools revere; considered essence of Vedānta',
            implication: 'Foundation for Kṛṣṇa bhakti movements across India',
            category: 'Mahāpurāṇa',
          },
          {
            id: 'shiva-purana',
            title: 'Śiva Purāṇa',
            titleSanskrit: 'शिवपुराण',
            definition: 'Mahāpurāṇa dedicated to Lord Śiva, containing cosmology, Śiva\'s manifestations, sacred places, and the path to mokṣa through Śiva worship.',
            scripturalReference: 'Śiva Purāṇa (7 Saṁhitās)',
            implication: 'Authoritative text for Śaiva philosophy and worship',
            category: 'Mahāpurāṇa',
          },
        ],
      },
      {
        id: 'dharmashastra',
        name: 'Dharmaśāstra',
        nameSanskrit: 'धर्मशास्त्र',
        description: 'Legal and ethical treatises',
        content: [
          {
            id: 'manusmriti',
            title: 'Manu Smṛti',
            titleSanskrit: 'मनुस्मृति',
            definition: 'The most authoritative Dharmaśāstra text attributed to Manu, covering social law, duties of varṇas and āśramas, governance, and ethical conduct.',
            scripturalReference: 'Mānava Dharmaśāstra (12 chapters, 2,684 verses)',
            implication: 'Foundational text for Hindu social and legal philosophy',
          },
          {
            id: 'yajnavalkya-smriti',
            title: 'Yājñavalkya Smṛti',
            titleSanskrit: 'याज्ञवल्क्यस्मृति',
            definition: 'Comprehensive Dharmaśāstra covering ācāra (conduct), vyavahāra (legal procedures), and prāyaścitta (expiations), known for systematic organization.',
            scripturalReference: 'Yājñavalkya Smṛti (3 sections, 1,009 verses)',
            implication: 'Influential in medieval Hindu jurisprudence',
          },
        ],
      },
    ],
  },
  {
    id: 'darsana',
    name: 'Darśana',
    nameEn: 'Philosophical Systems',
    nameSanskrit: 'दर्शन',
    description: 'The six classical schools of Hindu philosophy',
    icon: 'lightbulb-on',
    category: 'darsana',
    subModules: [
      {
        id: 'nyaya-vaisheshika',
        name: 'Nyāya-Vaiśeṣika',
        nameSanskrit: 'न्याय-वैशेषिक',
        description: 'Logic and atomistic philosophy',
        content: [
          {
            id: 'nyaya-sutras',
            title: 'Nyāya Sūtras',
            titleSanskrit: 'न्यायसूत्र',
            definition: 'Gautama\'s foundational text on logic and epistemology, establishing four valid means of knowledge (pramāṇas): perception, inference, comparison, and testimony.',
            scripturalReference: 'Nyāya Sūtra (5 books); Vātsyāyana Bhāṣya',
            implication: 'Provides systematic methodology for philosophical inquiry and debate',
            category: 'Ṣaḍ-Darśana',
          },
          {
            id: 'vaisheshika-sutras',
            title: 'Vaiśeṣika Sūtras',
            titleSanskrit: 'वैशेषिकसूत्र',
            definition: 'Kaṇāda\'s atomistic philosophy identifying seven categories of reality (padārthas): substance, quality, action, generality, particularity, inherence, non-existence.',
            scripturalReference: 'Vaiśeṣika Sūtra (10 chapters)',
            implication: 'Early Indian atomism and systematic metaphysics',
            category: 'Ṣaḍ-Darśana',
          },
        ],
      },
      {
        id: 'samkhya',
        name: 'Sāṁkhya',
        nameSanskrit: 'सांख्य',
        description: 'Enumeration philosophy - Puruṣa and Prakṛti',
        content: [
          {
            id: 'samkhya-karika',
            title: 'Sāṁkhya Kārikā',
            titleSanskrit: 'सांख्यकारिका',
            definition: 'Īśvarakṛṣṇa\'s concise exposition of dualistic Sāṁkhya philosophy, analyzing 25 tattvas (principles) evolving from Prakṛti, distinct from conscious Puruṣa.',
            scripturalReference: 'Sāṁkhya Kārikā (70 verses); Gauḍapāda Bhāṣya',
            darsanaView: 'Dualistic realism: Eternal Puruṣa (consciousness) and Prakṛti (matter)',
            implication: 'Influenced Yoga, Vedānta, and Buddhist philosophy',
            category: 'Ṣaḍ-Darśana',
          },
        ],
      },
      {
        id: 'mimamsa',
        name: 'Pūrvamīmāṁsā',
        nameSanskrit: 'पूर्वमीमांसा',
        description: 'Vedic exegesis and ritual philosophy',
        content: [
          {
            id: 'mimamsa-sutras',
            title: 'Mīmāṁsā Sūtras',
            titleSanskrit: 'मीमांसासूत्र',
            definition: 'Jaimini\'s systematic analysis of Vedic ritual commands (vidhi), establishing hermeneutical principles for interpreting Vedic injunctions.',
            scripturalReference: 'Pūrvamīmāṁsā Sūtra (12 chapters); Śabara Bhāṣya',
            implication: 'Establishes authority of Vedas and principles of dharma',
            category: 'Ṣaḍ-Darśana',
          },
        ],
      },
      {
        id: 'vedanta',
        name: 'Vedānta',
        nameSanskrit: 'वेदान्त',
        description: 'The culmination of Vedic wisdom',
        content: [
          {
            id: 'brahma-sutras',
            title: 'Brahma Sūtras',
            titleSanskrit: 'ब्रह्मसूत्र',
            definition: 'Bādarāyaṇa\'s aphoristic synthesis of Upaniṣadic teachings on Brahman, systematizing Vedāntic philosophy into 555 sūtras across four chapters.',
            scripturalReference: 'Brahma Sūtra (Vedānta Sūtra); multiple bhāṣyas',
            implication: 'Foundation text for all Vedānta schools; interpreted differently by each sampradāya',
            category: 'Prasthāna Trayī',
          },
          {
            id: 'advaita',
            title: 'Advaita Vedānta',
            titleSanskrit: 'अद्वैत वेदान्त',
            definition: 'Non-dualistic Vedānta established by Ādi Śaṅkarācārya, asserting the absolute identity of Ātman and Brahman, and the illusory nature of phenomenal reality (māyā).',
            scripturalReference: 'Brahma Sūtra Śāṅkara Bhāṣya; Upaniṣad commentaries',
            darsanaView: 'Reality is non-dual; world is vyāvahārika (pragmatic reality)',
            implication: 'Liberation through knowledge (jñāna) of one\'s true nature',
            category: 'Vedānta Sub-school',
          },
          {
            id: 'vishishtadvaita',
            title: 'Viśiṣṭādvaita',
            titleSanskrit: 'विशिष्टाद्वैत',
            definition: 'Qualified non-dualism propounded by Rāmānujācārya, teaching that individual souls and matter are real attributes (viśeṣaṇa) of Brahman, forming one qualified whole.',
            scripturalReference: 'Śrī Bhāṣya on Brahma Sūtras',
            darsanaView: 'Unity with distinction; souls are eternal servants of Viṣṇu',
            implication: 'Liberation through devotion (bhakti) and surrender (prapatti)',
            category: 'Vedānta Sub-school',
          },
          {
            id: 'dvaita',
            title: 'Dvaita Vedānta',
            titleSanskrit: 'द्वैत वेदान्त',
            definition: 'Dualistic Vedānta by Madhvācārya asserting five eternal distinctions: between God and soul, God and matter, souls, souls and matter, and among material objects.',
            scripturalReference: 'Brahma Sūtra Ānuvyākhyāna; Mahābhārata Tātparya Nirṇaya',
            darsanaView: 'Eternal difference between Viṣṇu, jīvas, and jagat',
            implication: 'Emphasizes devotion with realistic pluralism',
            category: 'Vedānta Sub-school',
          },
        ],
      },
      {
        id: 'yoga',
        name: 'Yoga Darśana',
        nameSanskrit: 'योगदर्शन',
        description: 'Patañjali\'s systematic philosophy of meditation',
        content: [
          {
            id: 'ashtanga',
            title: 'Aṣṭāṅga Yoga',
            titleSanskrit: 'अष्टाङ्गयोग',
            definition: 'The eight-limbed path of yoga: Yama, Niyama, Āsana, Prāṇāyāma, Pratyāhāra, Dhāraṇā, Dhyāna, Samādhi.',
            scripturalReference: 'Yoga Sūtras of Patañjali 2.29',
            implication: 'Systematic path from ethical conduct to meditation and liberation',
            category: 'Yoga Practice',
          },
        ],
      },
    ],
  },
  {
    id: 'agama',
    name: 'Āgama & Tantra',
    nameEn: 'Temple & Esoteric Tradition',
    nameSanskrit: 'आगम तन्त्र',
    description: 'Sacred temple rituals and esoteric spiritual practices',
    icon: 'temple-hindu',
    category: 'agama',
    subModules: [
      {
        id: 'shaiva-agama',
        name: 'Śaiva Āgama',
        nameSanskrit: 'शैवागम',
        description: 'Āgamic texts centered on Lord Śiva',
        content: [
          {
            id: 'shaiva-intro',
            title: 'Śaiva Āgama Tradition',
            definition: 'Authoritative texts revealing temple worship, initiation (dīkṣā), yoga, and philosophy centered on Śiva as supreme reality, consisting of 28 main Āgamas.',
            scripturalReference: '28 Śaiva Āgamas & Upāgamas',
            implication: 'Foundation for South Indian Śaiva temple worship and Kashmir Śaivism',
            category: 'Āgama',
          },
          {
            id: 'kamika-agama',
            title: 'Kāmika Āgama',
            titleSanskrit: 'कामिकागम',
            definition: 'One of the principal 28 Śaiva Āgamas, covering temple architecture (vāstu), iconography (pratimā), ritual procedures (kriyā), and philosophical doctrine (jñāna).',
            scripturalReference: 'Kāmika Āgama (4 pādas)',
            implication: 'Widely followed in South Indian Śiva temples',
            category: 'Āgama',
          },
        ],
      },
      {
        id: 'vaishnava-agama',
        name: 'Vaiṣṇava Āgama',
        nameSanskrit: 'वैष्णवागम',
        description: 'Pāñcarātra and Vaikhānasa traditions',
        content: [
          {
            id: 'pancharatra',
            title: 'Pāñcarātra Saṁhitās',
            titleSanskrit: 'पाञ्चरात्र संहिता',
            definition: 'Vaiṣṇava Āgamic literature teaching worship of Viṣṇu through arcā (deity worship), emphasizing five-fold divine manifestations (vyūhas).',
            scripturalReference: 'Sātvata Saṁhitā; Jayākhya Saṁhitā; Pauṣkara Saṁhitā',
            darsanaView: 'Viśiṣṭādvaita: Authoritative alongside Vedas',
            implication: 'Guides Vaiṣṇava temple ritual and iconography',
            category: 'Āgama',
          },
        ],
      },
      {
        id: 'shakta-tantra',
        name: 'Śākta Tantra',
        nameSanskrit: 'शाक्त तन्त्र',
        description: 'Goddess-centered tantric texts',
        content: [
          {
            id: 'devi-mahatmya',
            title: 'Devī Māhātmya',
            titleSanskrit: 'देवीमाहात्म्य',
            definition: 'Also known as Durgā Saptaśatī (700 verses), narrating the Goddess\'s victories over demons, establishing Her as supreme reality (Mahāśakti).',
            scripturalReference: 'Mārkaṇḍeya Purāṇa, Chapters 81-93',
            implication: 'Central text for Śākta worship and Navarātri celebrations',
            category: 'Tantra',
          },
          {
            id: 'mantra-yantra-tantra',
            title: 'Mantra-Yantra-Tantra',
            titleSanskrit: 'मन्त्र-यन्त्र-तन्त्र',
            definition: 'The threefold tantric methodology: mantra (sacred sound formulas), yantra (geometric diagrams), and tantra (ritual procedures) for invoking deity presence.',
            scripturalReference: 'Various Tantras and Āgamas',
            implication: 'Systematic approach to deity worship and spiritual transformation',
            category: 'Tantra Practice',
          },
        ],
      },
    ],
  },
  {
    id: 'yoga-esoteric',
    name: 'Yoga & Esoteric',
    nameEn: 'Inner Sciences',
    nameSanskrit: 'योग एवं गुह्यविद्या',
    description: 'Classical yoga texts and subtle body systems',
    icon: 'meditation',
    category: 'yoga',
    subModules: [
      {
        id: 'kundalini',
        name: 'Kuṇḍalinī System',
        nameSanskrit: 'कुण्डलिनी',
        description: 'The subtle energy system and chakras',
        content: [
          {
            id: 'chakras',
            title: 'Ṣaṭ-cakra (Six Chakras)',
            titleSanskrit: 'षट्चक्र',
            definition: 'The six primary energy centers along the suṣumnā nāḍī: Mūlādhāra, Svādhiṣṭhāna, Maṇipūra, Anāhata, Viśuddha, Ājñā, culminating in Sahasrāra.',
            scripturalReference: 'Ṣaṭ-cakra-nirūpaṇa; Yoga Kuṇḍalinī Upaniṣad',
            implication: 'Foundation for tantric sādhana and prāṇa regulation',
            category: 'Subtle Body',
          },
          {
            id: 'kundalini',
            title: 'Kuṇḍalinī Śakti',
            titleSanskrit: 'कुण्डलिनी शक्ति',
            definition: 'The dormant spiritual energy coiled at the base of the spine (mūlādhāra), awakened through yoga to rise through chakras, uniting with Śiva in sahasrāra.',
            scripturalReference: 'Haṭha Yoga Pradīpikā; Śiva Saṁhitā',
            implication: 'Central concept in tantric and haṭha yoga systems',
            category: 'Subtle Body',
          },
        ],
      },
      {
        id: 'classical-yoga-texts',
        name: 'Classical Yoga Texts',
        nameSanskrit: 'योगशास्त्र',
        description: 'Authoritative yoga manuals and treatises',
        content: [
          {
            id: 'hatha-yoga-pradipika',
            title: 'Haṭha Yoga Pradīpikā',
            titleSanskrit: 'हठयोगप्रदीपिका',
            definition: 'Svātmārāma\'s comprehensive manual of haṭha yoga (15th century), detailing āsanas, prāṇāyāma, mudrās, bandhas, and samādhi.',
            scripturalReference: 'Haṭha Yoga Pradīpikā (4 chapters, 389 verses)',
            implication: 'Foundation text for physical yoga practices',
            category: 'Yoga Manual',
          },
          {
            id: 'gheranda-samhita',
            title: 'Gheraṇḍa Saṁhitā',
            titleSanskrit: 'घेरण्डसंहिता',
            definition: 'Comprehensive haṭha yoga text teaching seven-limbed yoga (saptāṅga yoga): purification, strength, steadiness, stability, lightness, perception, isolation.',
            scripturalReference: 'Gheraṇḍa Saṁhitā (7 chapters, 351 verses)',
            implication: 'Detailed manual for physical and subtle body practices',
            category: 'Yoga Manual',
          },
        ],
      },
      {
        id: 'natha-tradition',
        name: 'Nātha Sampradāya',
        nameSanskrit: 'नाथ सम्प्रदाय',
        description: 'The tradition of Siddha yogis',
        content: [
          {
            id: 'gorakshanath',
            title: 'Gorakṣanātha Tradition',
            titleSanskrit: 'गोरक्षनाथ',
            definition: 'Lineage of Siddha yogis founded by Gorakṣanātha, emphasizing haṭha yoga, kuṇḍalinī awakening, and alchemical practices for bodily immortality (kāya siddhi).',
            scripturalReference: 'Gorakṣa Śataka; Siddha Siddhānta Paddhati',
            implication: 'Preserves ancient yogic and alchemical knowledge',
            category: 'Yoga Lineage',
          },
        ],
      },
    ],
  },
  {
    id: 'upasana',
    name: 'Upāsanā & Bhakti',
    nameEn: 'Devotional Traditions',
    nameSanskrit: 'उपासना भक्ति',
    description: 'Deity worship systems and devotional literature',
    icon: 'flower-tulip',
    category: 'upasana',
    subModules: [
      {
        id: 'devata-systems',
        name: 'Devatā-Centric Worship',
        nameSanskrit: 'देवता उपासना',
        description: 'Traditional deity worship systems',
        content: [
          {
            id: 'panchayatana',
            title: 'Pañcāyatana Pūjā',
            titleSanskrit: 'पञ्चायतन पूजा',
            definition: 'The five-deity worship system popularized by Śaṅkara, honoring Gaṇeśa, Sūrya, Viṣṇu, Śiva, and Devī as equal manifestations of the one Brahman.',
            scripturalReference: 'Smārta tradition; Śaṅkara Digvijaya',
            darsanaView: 'Smārta: All deities are Brahman; Sectarian: One supreme deity',
            implication: 'Promotes religious harmony and non-sectarian worship',
          },
          {
            id: 'navagraha',
            title: 'Navagraha Upāsanā',
            titleSanskrit: 'नवग्रह उपासना',
            definition: 'Worship of the nine celestial bodies (Sūrya, Candra, Maṅgala, Budha, Guru, Śukra, Śani, Rāhu, Ketu) for astrological harmony and spiritual elevation.',
            scripturalReference: 'Vedic astronomy; Purāṇas; Jyotiṣa Śāstra',
            implication: 'Integrates cosmic forces with spiritual practice',
          },
        ],
      },
      {
        id: 'bhakti-literature',
        name: 'Bhakti Literature',
        nameSanskrit: 'भक्ति साहित्य',
        description: 'Regional devotional poetry and songs',
        content: [
          {
            id: 'alvars',
            title: 'Ālvār Saints',
            titleSanskrit: 'आळ्वार्',
            definition: 'Twelve Vaiṣṇava poet-saints of Tamil Nadu (6th-9th century) whose 4,000 verses (Nālāyira Divya Prabandham) express passionate devotion to Viṣṇu.',
            scripturalReference: 'Divya Prabandham; Tiruppāvai (Āṇḍāḷ)',
            darsanaView: 'Viśiṣṭādvaita: Supreme authority after Vedas',
            implication: 'Foundation of Tamil Vaiṣṇava bhakti movement',
          },
          {
            id: 'nayanars',
            title: 'Nāyanārs',
            titleSanskrit: 'नायनार्',
            definition: 'Sixty-three Śaiva poet-saints of Tamil Nadu whose devotional hymns (collected as Tirumurai) celebrate Lord Śiva with intense personal devotion.',
            scripturalReference: 'Tevāram; Tirumantiram; Periya Purāṇam',
            implication: 'Revitalized Śaivism and popularized temple worship',
          },
        ],
      },
    ],
  },
  {
    id: 'vedanga',
    name: 'Vedāṅga & Upaveda',
    nameEn: 'Auxiliary Sciences',
    nameSanskrit: 'वेदाङ्ग उपवेद',
    description: 'Six limbs of the Vedas and applied sciences',
    icon: 'atom',
    category: 'vedanga',
    subModules: [
      {
        id: 'six-vedangas',
        name: 'Ṣaḍ Vedāṅga',
        nameSanskrit: 'षड् वेदाङ्ग',
        description: 'The six auxiliary disciplines of Vedic study',
        content: [
          {
            id: 'vyakarana',
            title: 'Vyākaraṇa (Grammar)',
            titleSanskrit: 'व्याकरण',
            definition: 'The science of Sanskrit grammar, essential for proper understanding of Vedic texts. Pāṇini\'s Aṣṭādhyāyī is the authoritative text.',
            scripturalReference: 'Aṣṭādhyāyī; Mahābhāṣya; Vākyapadīya',
            implication: 'Ensures precise interpretation of sacred texts',
            category: 'Vedāṅga',
          },
          {
            id: 'jyotisha',
            title: 'Jyotiṣa (Astronomy)',
            titleSanskrit: 'ज्योतिष',
            definition: 'Vedic astronomy and astrology, determining auspicious times for rituals and understanding cosmic cycles.',
            scripturalReference: 'Vedāṅga Jyotiṣa; Sūrya Siddhānta',
            implication: 'Aligns human activities with cosmic rhythms',
            category: 'Vedāṅga',
          },
          {
            id: 'chandas',
            title: 'Chandas (Prosody)',
            titleSanskrit: 'छन्दस्',
            definition: 'The science of Vedic meters and poetic rhythm, preserving the exact pronunciation and recitation of mantras.',
            scripturalReference: 'Piṅgala Chandas Sūtra',
            implication: 'Maintains sonic integrity of Vedic chanting',
            category: 'Vedāṅga',
          },
        ],
      },
      {
        id: 'upavedas',
        name: 'Upavedas',
        nameSanskrit: 'उपवेद',
        description: 'Applied sciences rooted in Vedic knowledge',
        content: [
          {
            id: 'ayurveda',
            title: 'Āyurveda (Medicine)',
            titleSanskrit: 'आयुर्वेद',
            definition: 'The science of life and longevity, focusing on holistic health through balance of three doṣas (vāta, pitta, kapha).',
            scripturalReference: 'Caraka Saṁhitā; Suśruta Saṁhitā; Aṣṭāṅga Hṛdaya',
            darsanaView: 'Upaveda of Atharvaveda',
            implication: 'Comprehensive medical system for physical and mental wellness',
            category: 'Upaveda',
          },
          {
            id: 'dhanurveda',
            title: 'Dhanurve da (Martial Arts)',
            titleSanskrit: 'धनुर्वेद',
            definition: 'The science of warfare and archery, including military strategy, weapons training, and warrior ethics (kṣatriya dharma).',
            scripturalReference: 'Dhanurveda treatises; Agni Purāṇa sections',
            darsanaView: 'Upaveda of Yajurveda',
            implication: 'Preserves martial traditions and warrior code',
            category: 'Upaveda',
          },
          {
            id: 'vastushastra',
            title: 'Vāstu Śāstra (Architecture)',
            titleSanskrit: 'वास्तुशास्त्र',
            definition: 'The sacred science of architecture and design, harmonizing buildings with cosmic energies through geometric principles.',
            scripturalReference: 'Mayamatam; Mānasāra; Bṛhat Saṁhitā',
            implication: 'Creates spaces conducive to spiritual and material prosperity',
            category: 'Upaveda',
          },
        ],
      },
    ],
  },
  {
    id: 'ancient-science',
    name: 'Ancient Science',
    nameEn: 'Traditional Sciences',
    nameSanskrit: 'प्राचीन विज्ञान',
    description: 'Mathematics, astronomy, medicine, and metallurgy',
    icon: 'telescope',
    category: 'science',
    subModules: [
      {
        id: 'mathematics',
        name: 'Gaṇita (Mathematics)',
        nameSanskrit: 'गणित',
        description: 'Ancient mathematical treatises and innovations',
        content: [
          {
            id: 'aryabhatiya',
            title: 'Āryabhaṭīya',
            titleSanskrit: 'आर्यभटीय',
            definition: 'Āryabhaṭa\'s foundational mathematical and astronomical work (499 CE), introducing zero, place-value system, and accurate planetary calculations.',
            scripturalReference: 'Āryabhaṭīya (4 chapters: Daśagītika, Gaṇita, Kālakriyā, Gola)',
            implication: 'Revolutionized mathematics and influenced Islamic and European science',
          },
          {
            id: 'lilavati',
            title: 'Līlāvatī',
            titleSanskrit: 'लीलावती',
            definition: 'Bhāskarācārya II\'s elegant mathematical treatise (12th century) covering arithmetic, algebra, geometry, presented through poetic verses.',
            scripturalReference: 'Līlāvatī; part of Siddhānta Śiromaṇi',
            implication: 'Demonstrates advanced mathematical concepts in accessible form',
          },
        ],
      },
      {
        id: 'astronomy',
        name: 'Khagola Śāstra (Astronomy)',
        nameSanskrit: 'खगोल शास्त्र',
        description: 'Celestial observations and planetary science',
        content: [
          {
            id: 'suryasiddhanta',
            title: 'Sūrya Siddhānta',
            titleSanskrit: 'सूर्यसिद्धान्त',
            definition: 'Ancient astronomical treatise traditionally revealed by the Sun deity, providing accurate planetary positions, eclipses, and cosmological framework.',
            scripturalReference: 'Sūrya Siddhānta (14 chapters)',
            implication: 'Foundation for Hindu calendrical calculations and astronomy',
          },
        ],
      },
      {
        id: 'medicine',
        name: 'Cikitsā Śāstra (Medicine)',
        nameSanskrit: 'चिकित्सा शास्त्र',
        description: 'Surgical and therapeutic knowledge',
        content: [
          {
            id: 'sushruta',
            title: 'Suśruta Saṁhitā',
            titleSanskrit: 'सुश्रुतसंहिता',
            definition: 'Comprehensive surgical manual attributed to Suśruta, describing over 300 surgical procedures, 120 surgical instruments, and plastic surgery techniques.',
            scripturalReference: 'Suśruta Saṁhitā (6 sthānas, 184 chapters)',
            implication: 'Pioneered surgical techniques including rhinoplasty and cataract surgery',
          },
        ],
      },
    ],
  },
  {
    id: 'sampradaya',
    name: 'Sampradāya',
    nameEn: 'Living Traditions',
    nameSanskrit: 'सम्प्रदाय',
    description: 'Guru-disciple lineages and philosophical schools',
    icon: 'account-group',
    category: 'sampradaya',
    subModules: [
      {
        id: 'vedanta-acharyas',
        name: 'Vedānta Ācāryas',
        nameSanskrit: 'वेदान्ताचार्य',
        description: 'Great teachers of Vedānta philosophy',
        content: [
          {
            id: 'shankaracharya',
            title: 'Ādi Śaṅkarācārya',
            titleSanskrit: 'आदि शङ्कराचार्य',
            definition: 'The preeminent Advaita Vedānta teacher (8th century CE), who established four maṭhas, wrote foundational bhāṣyas, and composed numerous devotional and philosophical works.',
            scripturalReference: 'Brahma Sūtra Bhāṣya; Upaniṣad Bhāṣyas; Viveka Cūḍāmaṇi',
            implication: 'Revitalized Vedānta and established monastic orders across India',
          },
          {
            id: 'ramanuja',
            title: 'Rāmānujācārya',
            titleSanskrit: 'रामानुजाचार्य',
            definition: 'Founder of Viśiṣṭādvaita Vedānta (11th-12th century), emphasizing qualified non-dualism, devotion to Viṣṇu, and social reform.',
            scripturalReference: 'Śrī Bhāṣya; Vedārtha Saṅgraha; Gītā Bhāṣya',
            darsanaView: 'Viśiṣṭādvaita: Souls and matter are real attributes of Brahman',
            implication: 'Established theological foundation for Śrī Vaiṣṇava tradition',
          },
          {
            id: 'madhva',
            title: 'Madhvācārya',
            titleSanskrit: 'मध्वाचार्य',
            definition: 'Founder of Dvaita Vedānta (13th century), teaching absolute dualism between God (Viṣṇu), souls, and matter with eternal distinctions.',
            scripturalReference: 'Brahma Sūtra Ānuvyākhyāna; Mahābhārata Tātparya Nirṇaya',
            darsanaView: 'Dvaita: Eternal distinction between jīva and Brahman',
            implication: 'Established strong dualistic Vaiṣṇava philosophy',
          },
        ],
      },
      {
        id: 'vaishnava-sampradayas',
        name: 'Vaiṣṇava Sampradāyas',
        nameSanskrit: 'वैष्णव सम्प्रदाय',
        description: 'Four main Vaiṣṇava lineages',
        content: [
          {
            id: 'chaitanya',
            title: 'Caitanya Mahāprabhu',
            titleSanskrit: 'चैतन्य महाप्रभु',
            definition: 'Founder of Gauḍīya Vaiṣṇavism (16th century), teaching acintya-bhedābheda (inconceivable oneness and difference) through congregational chanting (saṅkīrtana).',
            scripturalReference: 'Caitanya Caritāmṛta; Bhāgavata Purāṇa commentary tradition',
            darsanaView: 'Acintya-bhedābheda: Simultaneous oneness and difference',
            implication: 'Revolutionized bhakti movement through accessible devotional practices',
          },
          {
            id: 'vallabha',
            title: 'Vallabhācārya',
            titleSanskrit: 'वल्लभाचार्य',
            definition: 'Founder of Puṣṭimārga (16th century), teaching Śuddhādvaita (pure non-dualism) with emphasis on Kṛṣṇa\'s grace (puṣṭi) and līlā.',
            scripturalReference: 'Aṇubhāṣya; Subodhinī',
            darsanaView: 'Śuddhādvaita: World is real manifestation of Brahman',
            implication: 'Developed joyful devotional worship centered on Kṛṣṇa\'s childhood pastimes',
          },
        ],
      },
      {
        id: 'shakta-peethas',
        name: 'Śākta Pīṭhas',
        nameSanskrit: 'शाक्त पीठ',
        description: 'Sacred seats of the Divine Mother',
        content: [
          {
            id: 'shakti-peethas',
            title: '51 Śakti Pīṭhas',
            titleSanskrit: 'शक्तिपीठ',
            definition: 'Sacred shrines where body parts of Satī (Pārvatī) fell after being dismembered by Viṣṇu\'s Sudarśana Cakra, each location empowered with specific śakti.',
            scripturalReference: 'Devī Bhāgavata Purāṇa; Kālikā Purāṇa',
            implication: 'Centers of Goddess worship and tantric sādhana across Indian subcontinent',
          },
        ],
      },
    ],
  },
];

export function getAllModules(): Module[] {
  return modules;
}

export function getModuleById(id: string): Module | undefined {
  return modules.find(m => m.id === id);
}

export function searchContent(query: string): SearchResult[] {
  const results: SearchResult[] = [];
  const lowerQuery = query.toLowerCase();

  modules.forEach(module => {
    // Search module names
    if (
      module.name.toLowerCase().includes(lowerQuery) ||
      module.nameEn.toLowerCase().includes(lowerQuery) ||
      module.description.toLowerCase().includes(lowerQuery)
    ) {
      results.push({
        type: 'module',
        item: module,
        moduleName: module.nameEn,
      });
    }

    // Search submodules and content
    module.subModules?.forEach(subModule => {
      if (
        subModule.name.toLowerCase().includes(lowerQuery) ||
        subModule.nameSanskrit.toLowerCase().includes(lowerQuery) ||
        subModule.description.toLowerCase().includes(lowerQuery)
      ) {
        results.push({
          type: 'submodule',
          item: subModule,
          moduleName: module.nameEn,
        });
      }

      // Search content items
      subModule.content?.forEach(content => {
        if (
          content.title.toLowerCase().includes(lowerQuery) ||
          content.titleSanskrit?.toLowerCase().includes(lowerQuery) ||
          content.definition.toLowerCase().includes(lowerQuery) ||
          content.scripturalReference.toLowerCase().includes(lowerQuery)
        ) {
          results.push({
            type: 'content',
            item: content,
            moduleName: module.nameEn,
          });
        }
      });
    });
  });

  return results;
}
