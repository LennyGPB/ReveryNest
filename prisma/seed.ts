import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('--- Début du Seeding ---');

  const insights = [
    {
        title: "Pourquoi certains rêves semblent plus réels que la réalité",
        preview:
        "Les rêves intenses activent les mêmes zones émotionnelles que les souvenirs vécus.",
        fullContent:
        "Durant le sommeil paradoxal, le cerveau active fortement les régions liées aux émotions, comme l’amygdale, tout en réduisant l’activité des zones logiques. Résultat : l’émotion est amplifiée, sans filtre rationnel. Ce n’est pas le scénario qui marque, mais ce que tu as ressenti. Parfois, un rêve paraît plus “vrai” qu’un souvenir… parce que l’émotion y est plus pure.",
        category: "Psychologie",
    },
    {
        title: "Rêver de tomber : un signal fréquent",
        preview:
        "La chute en rêve est souvent liée à une perte de contrôle ressentie.",
        fullContent:
        "Les rêves de chute apparaissent fréquemment lors de périodes d’incertitude. Ils peuvent refléter un sentiment d’instabilité, une transition, ou la peur de ne pas maîtriser une situation. Ce n’est pas une prédiction. C’est souvent une image forte d’un déséquilibre intérieur temporaire.",
        category: "Symboles",
    },
    {
        title: "Pourquoi les visages sont flous en rêve",
        preview:
        "Le cerveau reconstruit plus qu’il ne copie.",
        fullContent:
        "En rêve, le cerveau assemble des fragments de mémoire plutôt que des copies exactes. Les visages peuvent apparaître flous ou transformés car ils sont recréés à partir d’émotions et de souvenirs mélangés. Le rêve cherche une sensation, pas une reproduction fidèle.",
        category: "Neurosciences",
    },
    {
        title: "Les rêves répétitifs ont une fonction",
        preview:
        "Quand un rêve revient, il insiste sur une émotion non résolue.",
        fullContent:
        "Les rêves récurrents apparaissent souvent lorsqu’un thème émotionnel reste actif dans la vie éveillée. Ce n’est pas un message mystique, mais une répétition intérieure. Le cerveau tente parfois de traiter ce qui n’a pas encore été intégré consciemment.",
        category: "Psychologie",
    },
    {
        title: "Être poursuivi en rêve",
        preview:
        "Fuir dans un rêve peut refléter un évitement dans la réalité.",
        fullContent:
        "Les rêves de poursuite sont parmi les plus universels. Ils peuvent symboliser une situation, une décision ou une émotion que l’on évite. La question n’est pas seulement 'qui me poursuit ?', mais aussi 'qu’est-ce que je ne veux pas affronter ?'.",
        category: "Symboles",
    },
    {
        title: "Les rêves amplifient les émotions récentes",
        preview:
        "Le cerveau traite ce qui a marqué la journée.",
        fullContent:
        "Les rêves intègrent souvent des fragments récents : conversations, tensions, joies. Mais ils les amplifient, les déforment, les dramatisent parfois. Ce n’est pas le détail qui compte, mais la charge émotionnelle associée.",
        category: "Neurosciences",
    },
    {
        title: "Rêver d’anciens proches",
        preview:
        "Le rêve convoque parfois des symboles familiers pour parler du présent.",
        fullContent:
        "Voir une ancienne relation ou un ami du passé ne signifie pas forcément qu’il manque aujourd’hui. Ces figures servent parfois de symboles pour représenter une partie de toi, une période, ou une émotion associée à cette personne.",
        category: "Psychologie",
    },
    {
        title: "Les rêves absurdes ont du sens émotionnel",
        preview:
        "Même les scénarios incohérents suivent une logique affective.",
        fullContent:
        "Un rêve peut sembler illogique ou étrange. Pourtant, son enchaînement suit souvent une logique émotionnelle. Ce qui paraît absurde au niveau narratif peut être parfaitement cohérent au niveau ressenti.",
        category: "Psychologie",
    },
    {
        title: "Pourquoi on oublie ses rêves",
        preview:
        "La mémoire des rêves est fragile par nature.",
        fullContent:
        "Le cerveau ne stocke pas les rêves comme des souvenirs classiques. Dès le réveil, les circuits de mémoire logique reprennent le dessus, et l’expérience onirique s’estompe rapidement. Noter son rêve immédiatement augmente considérablement la rétention.",
        category: "Neurosciences",
    },
    {
        title: "Rêver d’arriver en retard",
        preview:
        "Un rêve fréquent lié à la pression et aux attentes.",
        fullContent:
        "Les rêves de retard ou d’échec sont souvent associés à un sentiment d’exigence personnelle. Ils reflètent parfois la peur de ne pas être prêt, de ne pas être à la hauteur, ou de décevoir.",
        category: "Symboles",
    },
    {
        title: "Les rêves peuvent renforcer la créativité",
        preview:
        "Le cerveau associe librement des idées pendant le sommeil.",
        fullContent:
        "Durant le sommeil paradoxal, les connexions neuronales sont plus libres. Le cerveau relie des idées éloignées, sans contrainte logique stricte. C’est pourquoi certains rêves donnent naissance à des idées créatives ou à de nouvelles perspectives.",
        category: "Créativité",
    },
    {
        title: "Rêver de maison",
        preview:
        "La maison symbolise souvent le soi intérieur.",
        fullContent:
        "En psychologie symbolique, la maison représente fréquemment l’identité. Les différentes pièces peuvent refléter des aspects de soi : souvenirs, émotions, zones inexplorées. Explorer une maison inconnue en rêve peut refléter une découverte intérieure.",
        category: "Symboles",
    },
    {
        title: "Les cauchemars ont une utilité",
        preview:
        "Ils participent parfois à la régulation émotionnelle.",
        fullContent:
        "Les cauchemars ne sont pas toujours négatifs sur le plan psychologique. Ils peuvent aider à traiter des émotions intenses ou des tensions accumulées. Le cerveau met en scène le stress pour mieux l’intégrer.",
        category: "Psychologie",
    },
    {
        title: "Le rêve n’est pas toujours un message",
        preview:
        "Parfois, il est simplement une mise en scène émotionnelle.",
        fullContent:
        "Tous les rêves ne contiennent pas une symbolique profonde. Certains sont le résultat d’associations amplifiées par l’émotion. Chercher du sens est utile… mais il n’y en a pas toujours un précis.",
        category: "Réflexion",
    },
    {
        title: "Les émotions dominent le récit",
        preview:
        "Ce que tu ressens compte plus que ce que tu vois.",
        fullContent:
        "Dans l’analyse d’un rêve, le décor et les détails sont secondaires. L’émotion dominante donne souvent la clé d’interprétation. Deux personnes peuvent rêver de la même scène, mais vivre des significations totalement différentes.",
        category: "Psychologie",
    },
  ];

  for (const item of insights) {
    const insight = await prisma.insight.create({
      data: item,
    });
    console.log(`✅ Créé : ${insight.title}`);
  }

  console.log('--- Seeding terminé avec succès ---');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });