import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const insights = [
        {
            title: "Pourquoi on oublie ses rêves au réveil ?",
            preview: "Tu te souviens rarement de tes rêves, et ce n'est pas un hasard. Le cerveau suit des règles précises pour décider ce qu'il garde.",
            fullContent: `Au moment du réveil, le cerveau passe d'un état de sommeil paradoxal à un état d'éveil. Pendant cette transition, l'hippocampe — la région responsable de la formation des souvenirs — n'est pas encore pleinement actif. Les rêves ne sont donc pas "enregistrés" comme des souvenirs normaux.

En plus de ça, la noradrénaline, une hormone impliquée dans la consolidation mémorielle, est presque absente pendant le sommeil paradoxal. Résultat : même si tu as rêvé pendant des heures, ton cerveau n'a pas les outils pour fixer ces images.

La bonne nouvelle : noter son rêve dans les 90 secondes après le réveil — avant de bouger ou de regarder son téléphone — peut doubler ta capacité à t'en souvenir. Le simple fait de rester immobile quelques instants et de laisser les images revenir suffit souvent à récupérer l'ensemble d'une séquence.`,
            titleEN: "Why do we forget our dreams when we wake up?",
            previewEN: "You rarely remember your dreams, and that's not a coincidence. The brain follows precise rules to decide what it keeps.",
            fullContentEN: `When you wake up, the brain transitions from REM sleep to a waking state. During this transition, the hippocampus — the region responsible for memory formation — is not yet fully active. Dreams are therefore not "recorded" like normal memories.

On top of that, noradrenaline, a hormone involved in memory consolidation, is almost absent during REM sleep. Result: even if you dreamed for hours, your brain doesn't have the tools to retain those images.

The good news: writing down your dream within 90 seconds of waking up — before moving or checking your phone — can double your ability to remember it. Simply staying still for a few moments and letting the images come back is often enough to recover an entire sequence.`,
            category: "Neurosciences",
            categoryEN: "Neuroscience",
            isActive: false,
        },
        {
            title: "Le rêve lucide : entre mythe et neuroscience",
            preview: "Prendre conscience qu'on rêve pendant qu'on rêve — c'est possible, et ça se travaille.",
            fullContent: `Le rêve lucide est un état dans lequel le dormeur sait qu'il est en train de rêver. Il peut alors, dans certains cas, influencer le contenu de son rêve. Ce phénomène n'est pas une légende : des études en laboratoire ont confirmé son existence en demandant à des rêveurs lucides de faire des signaux oculaires prédéfinis pendant leur sommeil.

Neurologiquement, le rêve lucide correspond à une réactivation partielle du cortex préfrontal — la zone du cerveau liée à la conscience de soi — pendant le sommeil paradoxal. Normalement, cette zone est très peu active pendant les rêves, ce qui explique pourquoi on accepte sans question les situations les plus absurdes en rêvant.

Avec de l'entraînement, notamment via des tests de réalité répétés dans la journée, il est possible d'augmenter significativement la fréquence des rêves lucides. Des techniques comme la MILD (Mnemonically Induced Lucid Dreaming) ou la WILD (Wake Initiated Lucid Dream) sont aujourd'hui bien documentées.`,
            titleEN: "Lucid dreaming: between myth and neuroscience",
            previewEN: "Becoming aware that you're dreaming while you're dreaming — it's possible, and it can be learned.",
            fullContentEN: `A lucid dream is a state in which the sleeper knows they are dreaming. They can then, in some cases, influence the content of their dream. This phenomenon is not a legend: laboratory studies have confirmed its existence by asking lucid dreamers to make predefined eye signals during sleep.

Neurologically, lucid dreaming corresponds to a partial reactivation of the prefrontal cortex — the brain region linked to self-awareness — during REM sleep. Normally, this area is very inactive during dreams, which explains why we accept the most absurd situations without question while dreaming.

With training, particularly through repeated reality checks during the day, it is possible to significantly increase the frequency of lucid dreams. Techniques such as MILD (Mnemonically Induced Lucid Dreaming) and WILD (Wake Initiated Lucid Dream) are now well documented.`,
            category: "Rêve Lucide",
            categoryEN: "Lucid Dreaming",
            isActive: false,
        },
        {
            title: "Ce que tes rêves récurrents essaient de te dire",
            preview: "Un même rêve qui revient plusieurs fois n'est pas une coïncidence. C'est une information que ton cerveau juge importante.",
            fullContent: `Les rêves récurrents ont une particularité : ils persistent. Contrairement aux rêves ordinaires qui s'effacent en quelques heures, un rêve récurrent revient semaine après semaine, parfois pendant des années. Ce n'est pas un bug du cerveau — c'est un signal.

Selon les recherches en psychologie cognitive, les rêves récurrents sont souvent liés à des préoccupations non résolues ou à des schémas émotionnels répétitifs. Le cerveau tente de traiter une situation qui n'a pas encore trouvé de résolution dans la vie éveillée.

Les thèmes les plus fréquents — être poursuivi, rater un examen, perdre ses dents, ne pas pouvoir courir — correspondent souvent à des états émotionnels universels : la peur du jugement, l'anxiété de performance, la perte de contrôle. Identifier le thème central de ton rêve récurrent et l'associer à une situation concrète de ta vie est souvent la première étape pour que ce rêve cesse.`,
            titleEN: "What your recurring dreams are trying to tell you",
            previewEN: "The same dream coming back several times is not a coincidence. It's information your brain considers important.",
            fullContentEN: `Recurring dreams have one distinctive feature: they persist. Unlike ordinary dreams that fade within hours, a recurring dream returns week after week, sometimes for years. This is not a brain bug — it's a signal.

According to cognitive psychology research, recurring dreams are often linked to unresolved concerns or repetitive emotional patterns. The brain is trying to process a situation that hasn't yet found resolution in waking life.

The most common themes — being chased, failing an exam, losing teeth, being unable to run — often correspond to universal emotional states: fear of judgment, performance anxiety, loss of control. Identifying the central theme of your recurring dream and connecting it to a concrete situation in your life is often the first step to making that dream stop.`,
            category: "Psychologie",
            categoryEN: "Psychology",
            isActive: false,
        },
        {
            title: "Les 5 stades du sommeil expliqués",
            preview: "Tu ne dors pas d'un seul bloc. Chaque nuit, ton cerveau traverse plusieurs cycles bien distincts.",
            fullContent: `Une nuit de sommeil complète est composée de 4 à 6 cycles d'environ 90 minutes chacun. Chaque cycle contient plusieurs stades distincts.

Le stade N1 est le sommeil léger : tu t'endors, tes muscles se relâchent, ton cerveau ralentit. N2 représente le sommeil intermédiaire, où la température corporelle baisse et le rythme cardiaque se stabilise. N3 est le sommeil profond, le plus réparateur : c'est là que le corps se régénère et que les souvenirs se consolident.

Enfin, le sommeil paradoxal (REM) — qui occupe environ 25% d'une nuit — est le stade des rêves. Le cerveau est presque aussi actif qu'en état d'éveil, mais le corps est en paralysie temporaire pour t'empêcher d'agir tes rêves.

Les rêves les plus intenses et les plus mémorables se produisent dans les cycles de la deuxième partie de la nuit, quand les phases REM s'allongent. C'est pourquoi les rêves du matin sont souvent les plus vivides.`,
            titleEN: "The 5 stages of sleep explained",
            previewEN: "You don't sleep in one block. Every night, your brain goes through several distinct cycles.",
            fullContentEN: `A complete night of sleep consists of 4 to 6 cycles of about 90 minutes each. Each cycle contains several distinct stages.

Stage N1 is light sleep: you fall asleep, your muscles relax, your brain slows down. N2 represents intermediate sleep, where body temperature drops and heart rate stabilizes. N3 is deep sleep, the most restorative: this is where the body regenerates and memories consolidate.

Finally, REM sleep — which accounts for about 25% of a night — is the dreaming stage. The brain is almost as active as in a waking state, but the body is in temporary paralysis to prevent you from acting out your dreams.

The most intense and memorable dreams occur in the cycles of the second half of the night, when REM phases lengthen. This is why morning dreams are often the most vivid.`,
            category: "Neurosciences",
            categoryEN: "Neuroscience",
            isActive: false,
        },
        {
            title: "Les symboles universels dans les rêves",
            preview: "Certaines images reviennent dans les rêves de presque tout le monde, peu importe la culture ou l'époque.",
            fullContent: `Carl Jung a introduit le concept d'inconscient collectif pour expliquer pourquoi certains symboles apparaissent dans les rêves de personnes qui ne se connaissent pas et n'ont jamais partagé les mêmes expériences. Ces symboles — qu'il appelait archétypes — transcendent les cultures et les générations.

L'eau représente souvent les émotions et l'inconscient. Le feu symbolise la transformation ou la passion. Les maisons sont souvent interprétées comme une représentation du soi, chaque pièce correspondant à une facette de la personnalité. Les chutes incarnent la perte de contrôle, les vols la liberté ou l'ambition.

Ces interprétations ne sont pas des règles absolues — le contexte personnel reste primordial. Mais reconnaître ces patterns peut être un point de départ utile pour comprendre ce que ton cerveau tente de traiter pendant la nuit.`,
            titleEN: "Universal symbols in dreams",
            previewEN: "Certain images appear in almost everyone's dreams, regardless of culture or era.",
            fullContentEN: `Carl Jung introduced the concept of the collective unconscious to explain why certain symbols appear in the dreams of people who don't know each other and have never shared the same experiences. These symbols — which he called archetypes — transcend cultures and generations.

Water often represents emotions and the unconscious. Fire symbolizes transformation or passion. Houses are often interpreted as a representation of the self, with each room corresponding to a facet of personality. Falls embody loss of control, flights represent freedom or ambition.

These interpretations are not absolute rules — personal context remains paramount. But recognizing these patterns can be a useful starting point for understanding what your brain is trying to process during the night.`,
            category: "Symbolisme",
            categoryEN: "Symbolism",
            isActive: false,
        },
        {
            title: "Pourquoi on rêve de personnes qu'on ne connaît pas",
            preview: "Ces inconnus qui peuplent tes rêves ne sont pas vraiment des étrangers. Ton cerveau les a fabriqués.",
            fullContent: `Des études ont montré que le cerveau humain est incapable d'inventer un visage de toutes pièces. Chaque visage que tu vois en rêve est celui d'une vraie personne que tu as croisée dans ta vie — même fugacement, même sans t'en souvenir consciemment.

Ces "inconnus" dans tes rêves sont des visages stockés dans ta mémoire implicite : un passant dans la rue, un acteur aperçu sur un écran, une photo dans un magazine. Ton cerveau les réutilise et les place dans des scénarios entièrement nouveaux.

Ce qui est intéressant, c'est le rôle que ces personnages jouent dans le rêve. En psychologie analytique, les personnages de nos rêves représentent souvent des aspects de nous-mêmes. Un inconnu menaçant peut symboliser une peur refoulée. Un inconnu bienveillant peut incarner une qualité qu'on cherche à développer en soi.`,
            titleEN: "Why we dream of people we don't know",
            previewEN: "Those strangers who populate your dreams aren't really strangers. Your brain created them.",
            fullContentEN: `Studies have shown that the human brain is unable to invent a face from scratch. Every face you see in a dream belongs to a real person you've encountered in your life — even briefly, even without consciously remembering them.

These "strangers" in your dreams are faces stored in your implicit memory: a passerby on the street, an actor glimpsed on a screen, a photo in a magazine. Your brain reuses them and places them in entirely new scenarios.

What's interesting is the role these characters play in the dream. In analytical psychology, the characters in our dreams often represent aspects of ourselves. A threatening stranger may symbolize a repressed fear. A benevolent stranger may embody a quality we're trying to develop in ourselves.`,
            category: "Psychologie",
            categoryEN: "Psychology",
            isActive: false,
        },
        {
            title: "Le lien entre stress et cauchemars",
            preview: "Les cauchemars ne sont pas des accidents. Ils sont souvent le reflet direct de ce que tu traverses en ce moment.",
            fullContent: `Le stress chronique est l'une des causes les plus fréquentes de cauchemars. Quand le système nerveux est en état d'alerte prolongé, le cerveau continue à traiter les menaces pendant le sommeil — sous forme de rêves négatifs intenses.

Les recherches montrent que les personnes souffrant d'anxiété généralisée, de PTSD ou de burn-out ont significativement plus de cauchemars que la moyenne. Le cerveau utilise le sommeil paradoxal pour "rejouer" et tenter de désamorcer les expériences émotionnellement chargées. Quand la charge est trop importante, ce processus déborde en cauchemar.

La bonne nouvelle : plusieurs techniques ont prouvé leur efficacité pour réduire les cauchemars. La thérapie par répétition d'imagerie (IRT) consiste à réécrire le scénario du cauchemar de façon positive pendant l'état d'éveil. Des pratiques de relaxation avant le coucher — cohérence cardiaque, méditation — réduisent également la fréquence des rêves perturbants.`,
            titleEN: "The link between stress and nightmares",
            previewEN: "Nightmares are not accidents. They are often a direct reflection of what you're going through right now.",
            fullContentEN: `Chronic stress is one of the most common causes of nightmares. When the nervous system is in a prolonged state of alert, the brain continues to process threats during sleep — in the form of intense negative dreams.

Research shows that people suffering from generalized anxiety, PTSD, or burnout have significantly more nightmares than average. The brain uses REM sleep to "replay" and attempt to defuse emotionally charged experiences. When the load is too great, this process overflows into nightmares.

The good news: several techniques have proven effective in reducing nightmares. Image Rehearsal Therapy (IRT) involves rewriting the nightmare scenario in a positive way while awake. Relaxation practices before bed — cardiac coherence, meditation — also reduce the frequency of disturbing dreams.`,
            category: "Psychologie",
            categoryEN: "Psychology",
            isActive: false,
        },
        {
            title: "Peut-on contrôler ses rêves ?",
            preview: "La plupart du temps, tu es spectateur de tes rêves. Mais pas toujours.",
            fullContent: `Le contrôle des rêves est un spectre. À une extrémité, le rêve ordinaire où tu subis les événements sans aucune conscience. À l'autre, le rêve lucide avancé où tu peux voler, transformer le décor, invoquer des personnages et modifier l'histoire en temps réel.

Entre les deux, il existe des états intermédiaires : tu peux être partiellement conscient de rêver sans pouvoir influencer le cours des événements, ou avoir une conscience complète mais des capacités de contrôle limitées.

La capacité à contrôler ses rêves s'entraîne. Les techniques les plus efficaces combinent des tests de réalité réguliers pendant la journée, une intention claire avant de s'endormir ("cette nuit, je vais reconnaître que je rêve") et la pratique de la méditation pour renforcer la conscience métacognitive — la capacité à observer sa propre pensée.`,
            titleEN: "Can you control your dreams?",
            previewEN: "Most of the time, you're a spectator of your dreams. But not always.",
            fullContentEN: `Dream control exists on a spectrum. At one end, the ordinary dream where you experience events without any awareness. At the other, the advanced lucid dream where you can fly, transform the scenery, summon characters, and modify the story in real time.

In between, there are intermediate states: you may be partially aware of dreaming without being able to influence the course of events, or have full awareness but limited control abilities.

The ability to control dreams can be trained. The most effective techniques combine regular reality checks during the day, a clear intention before falling asleep ("tonight, I will recognize that I'm dreaming") and meditation practice to strengthen metacognitive awareness — the ability to observe one's own thinking.`,
            category: "Rêve Lucide",
            categoryEN: "Lucid Dreaming",
            isActive: false,
        },
        {
            title: "Les rêves prémonitoires existent-ils vraiment ?",
            preview: "Tout le monde a vécu ça : rêver de quelque chose, puis le voir se produire. Coïncidence ou autre chose ?",
            fullContent: `Les rêves prémonitoires fascinent depuis l'Antiquité. Mais que dit la science à ce sujet ?

La réponse courte : il n'existe aucune preuve scientifique solide que les rêves puissent prédire l'avenir. Ce qui existe, en revanche, c'est un biais cognitif bien documenté appelé "biais de confirmation". Sur les centaines de rêves que tu fais chaque année, tu ne te souviendras — et ne mentionneras — que de ceux qui semblent s'être réalisés. Les autres sont oubliés.

Ce que les rêves font réellement, c'est traiter des informations que tu as déjà perçues inconsciemment. Si tu rêves qu'un ami traverse une période difficile, c'est peut-être parce que tu as capté des signaux subtils dans son comportement sans en avoir pris conscience. Le rêve n'a pas prédit la situation — il a simplement rendu visible ce que tu savais déjà.`,
            titleEN: "Do premonitory dreams really exist?",
            previewEN: "Everyone has experienced this: dreaming of something, then seeing it happen. Coincidence or something else?",
            fullContentEN: `Premonitory dreams have fascinated people since antiquity. But what does science say about this?

The short answer: there is no solid scientific evidence that dreams can predict the future. What does exist, however, is a well-documented cognitive bias called "confirmation bias." Of the hundreds of dreams you have each year, you will only remember — and mention — the ones that seem to have come true. The rest are forgotten.

What dreams actually do is process information you've already perceived unconsciously. If you dream that a friend is going through a difficult time, it may be because you picked up subtle signals in their behavior without consciously registering them. The dream didn't predict the situation — it simply made visible what you already knew.`,
            category: "Symbolisme",
            categoryEN: "Symbolism",
            isActive: false,
        },
        {
            title: "Dormir moins, rêver moins ?",
            preview: "La quantité de sommeil que tu as influe directement sur la richesse de ta vie onirique.",
            fullContent: `Le sommeil paradoxal — le stade où se produisent la majorité des rêves — est concentré dans la deuxième moitié de la nuit. Si tu dors 6 heures au lieu de 8, tu ne perds pas juste 2 heures de sommeil : tu perds une proportion disproportionnée de ton sommeil paradoxal.

Des études ont montré que chaque heure de sommeil supplémentaire après 6 heures augmente le temps passé en REM de manière non linéaire. Une personne qui dort 8 heures passe environ deux fois plus de temps en sommeil paradoxal qu'une personne qui dort 6 heures.

Conséquence directe : moins de rêves, des rêves moins intenses, et une capacité réduite du cerveau à traiter les émotions et à consolider les apprentissages de la journée. Le sommeil n'est pas un luxe — c'est le moment où ton cerveau fait son travail le plus important.`,
            titleEN: "Sleep less, dream less?",
            previewEN: "The amount of sleep you get directly affects the richness of your dream life.",
            fullContentEN: `REM sleep — the stage where most dreams occur — is concentrated in the second half of the night. If you sleep 6 hours instead of 8, you don't just lose 2 hours of sleep: you lose a disproportionate share of your REM sleep.

Studies have shown that each additional hour of sleep after 6 hours increases time spent in REM in a non-linear way. A person who sleeps 8 hours spends about twice as much time in REM sleep as someone who sleeps 6 hours.

Direct consequence: fewer dreams, less intense dreams, and a reduced capacity for the brain to process emotions and consolidate the day's learning. Sleep is not a luxury — it's the moment when your brain does its most important work.`,
            category: "Neurosciences",
            categoryEN: "Neuroscience",
            isActive: false,
        },
    ];

    for (const insight of insights) {
        await prisma.insight.create({ data: insight });
        console.log(`✅ Insight créé : ${insight.title}`);
    }

    console.log('🎉 Seed terminé !');
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());