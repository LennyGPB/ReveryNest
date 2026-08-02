import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    // Supprimer tous les rêves existants
    await prisma.dream.deleteMany({});
    console.log('🗑️ Tous les rêves supprimés');

    // Récupérer un user existant pour les rêves
    const user = await prisma.user.findFirst();
    if (!user) {
        console.error('Aucun utilisateur trouvé');
        return;
    }

    const dreams = [
        // FR
        {
            content: "Je marchais dans les couloirs de mon ancienne école, mais tout était vide et silencieux. Les lumières clignotaient par intermittence. Je cherchais une salle précise mais les numéros sur les portes changeaient à chaque fois que je les regardais. Au bout d'un couloir, j'ai vu mon grand-père assis sur un banc, il me souriait sans rien dire.",
            moods: ["nostalgique", "étrange"],
            intensity: 4,
            analysis: {
                moods: ["nostalgique", "étrange"],
                intensity: 4,
                interpretation: "Tu te retrouves dans un lieu familier qui refuse de se laisser saisir. Les portes qui changent de numéro, les couloirs qui s'allongent — quelque chose dans ta vie actuelle résiste à être nommé clairement. La présence silencieuse de ton grand-père n'est pas inquiétante, elle est ancrante. Comme si une partie de toi cherchait un repère fixe dans ce qui bouge trop.",
                tags: { symboles: ["porte", "lumière"], situations: ["chercher", "errer"], personnages: ["grand-père"], environnements: ["école", "couloir"] }
            },
            tags: { symboles: ["porte", "lumière"], situations: ["chercher", "errer"], personnages: ["grand-père"], environnements: ["école", "couloir"] },
            isPublic: true,
            lang: "fr",
            userId: user.id,
        },
        {
            content: "Je volais au-dessus d'une ville endormie. Les lumières en dessous de moi scintillaient comme des étoiles tombées sur la terre. Je sentais le vent sur mon visage et une liberté totale. Plus je montais, plus la ville devenait petite et silencieuse, et je n'avais plus peur de rien.",
            moods: ["serein", "joyeux"],
            intensity: 5,
            analysis: {
                moods: ["serein", "joyeux"],
                intensity: 5,
                interpretation: "La hauteur ici n'est pas une fuite — c'est une mise à distance choisie. En montant, tu ne fuis pas la ville, tu choisis de la voir autrement. La liberté que tu décris n'est pas l'absence de contraintes, c'est l'absence de peur face à ce qui te semblait lourd d'en bas. Ce rêve touche quelque chose de rare : un moment où tu n'as pas besoin que les choses soient autrement qu'elles sont.",
                tags: { symboles: ["lumière", "vent"], situations: ["voler", "monter"], personnages: [], environnements: ["ville", "ciel"] }
            },
            tags: { symboles: ["lumière", "vent"], situations: ["voler", "monter"], personnages: [], environnements: ["ville", "ciel"] },
            isPublic: true,
            lang: "fr",
            userId: user.id,
        },
        {
            content: "J'étais dans une maison immense que je ne reconnaissais pas, mais je savais que c'était la mienne. Chaque pièce menait à une autre pièce encore plus grande. Dans la dernière, il y avait une fenêtre qui donnait sur un océan calme et infini. Je me suis assis devant et j'ai regardé l'eau sans bouger pendant ce qui semblait être des heures.",
            moods: ["calme", "étrange"],
            intensity: 3,
            analysis: {
                moods: ["calme", "étrange"],
                intensity: 3,
                interpretation: "La maison que tu ne reconnais pas mais qui est tienne — c'est toi que tu explores. Chaque pièce plus grande que la précédente suggère que tu découvres des espaces intérieurs dont tu ne soupçonnais pas l'existence. L'océan à la fenêtre n'est pas menaçant, il est infini et calme. Tu t'es assis face à quelque chose de plus grand que toi sans en avoir peur, et ça, c'est rare.",
                tags: { symboles: ["fenêtre", "océan"], situations: ["explorer", "observer"], personnages: [], environnements: ["maison", "mer"] }
            },
            tags: { symboles: ["fenêtre", "océan"], situations: ["explorer", "observer"], personnages: [], environnements: ["maison", "mer"] },
            isPublic: true,
            lang: "fr",
            userId: user.id,
        },
        {
            content: "Je courais dans une forêt la nuit, mais ce n'était pas de la peur qui me faisait courir — c'était de la joie. Les arbres s'illuminaient à chaque fois que je les touchais du bout des doigts. À un moment je me suis arrêté et j'ai réalisé que je savais exactement où j'allais, même si je ne connaissais pas cet endroit.",
            moods: ["joyeux", "lucide"],
            intensity: 4,
            analysis: {
                moods: ["joyeux", "lucide"],
                intensity: 4,
                interpretation: "La course ici n'est pas une fuite. Tu te déplaces dans l'obscurité avec une certitude que tu ne peux pas expliquer rationnellement — tu sais où tu vas sans avoir de carte. Les arbres qui s'illuminent à ton contact disent quelque chose de ta capacité à activer ce qui t'entoure. Ce rêve ressemble à un moment où tu fais confiance à quelque chose en toi que tu ne nommes pas encore.",
                tags: { symboles: ["lumière", "arbre"], situations: ["courir", "toucher"], personnages: [], environnements: ["forêt", "nuit"] }
            },
            tags: { symboles: ["lumière", "arbre"], situations: ["courir", "toucher"], personnages: [], environnements: ["forêt", "nuit"] },
            isPublic: true,
            lang: "fr",
            userId: user.id,
        },
        {
            content: "J'étais sous l'eau mais je pouvais respirer normalement. L'eau était d'un bleu profond et des lumières dorées dansaient tout autour de moi. Des formes lumineuses passaient près de moi sans me toucher. Je me sentais en paix totale, comme si c'était là que j'étais censé être.",
            moods: ["serein", "paisible"],
            intensity: 3,
            analysis: {
                moods: ["serein", "paisible"],
                intensity: 3,
                interpretation: "Respirer sous l'eau sans effort — c'est ton cerveau qui suspend les règles habituelles pour te laisser exister dans un espace qui normalement te serait hostile. Les lumières dorées et les formes qui passent sans te toucher créent une solitude qui n'est pas de l'isolement. Tu étais seul mais pas solitaire. Ce rêve touche quelque chose de profond : un état où tu n'as besoin de rien d'autre que d'être là.",
                tags: { symboles: ["eau", "lumière"], situations: ["flotter", "respirer"], personnages: [], environnements: ["océan", "profondeur"] }
            },
            tags: { symboles: ["eau", "lumière"], situations: ["flotter", "respirer"], personnages: [], environnements: ["océan", "profondeur"] },
            isPublic: true,
            lang: "fr",
            userId: user.id,
        },
        // EN
        {
            content: "I was walking through the corridors of my old school, but everything was empty and silent. The lights flickered intermittently. I was looking for a specific room but the numbers on the doors kept changing every time I looked at them. At the end of a corridor, I saw my grandfather sitting on a bench, smiling at me without saying a word.",
            moods: ["nostalgic", "strange"],
            intensity: 4,
            analysis: {
                moods: ["nostalgic", "strange"],
                intensity: 4,
                interpretation: "You find yourself in a familiar place that refuses to be grasped. The doors changing numbers, the corridors stretching — something in your current life resists being clearly named. Your grandfather's silent presence isn't unsettling, it's grounding. As if part of you was looking for a fixed reference point in something that moves too much.",
                tags: { symboles: ["door", "light"], situations: ["searching", "wandering"], personnages: ["grandfather"], environnements: ["school", "corridor"] }
            },
            tags: { symboles: ["door", "light"], situations: ["searching", "wandering"], personnages: ["grandfather"], environnements: ["school", "corridor"] },
            isPublic: true,
            lang: "en",
            userId: user.id,
        },
        {
            content: "I was flying above a sleeping city. The lights below me sparkled like fallen stars on the earth. I could feel the wind on my face and a total sense of freedom. The higher I went, the smaller and quieter the city became, and I wasn't afraid of anything anymore.",
            moods: ["peaceful", "joyful"],
            intensity: 5,
            analysis: {
                moods: ["peaceful", "joyful"],
                intensity: 5,
                interpretation: "The height here isn't escape — it's a chosen distance. By rising, you're not fleeing the city, you're choosing to see it differently. The freedom you describe isn't the absence of constraints, it's the absence of fear about what felt heavy from below. This dream touches something rare: a moment where you don't need things to be any different than they are.",
                tags: { symboles: ["light", "wind"], situations: ["flying", "rising"], personnages: [], environnements: ["city", "sky"] }
            },
            tags: { symboles: ["light", "wind"], situations: ["flying", "rising"], personnages: [], environnements: ["city", "sky"] },
            isPublic: true,
            lang: "en",
            userId: user.id,
        },
        {
            content: "I was floating in a vast ocean at night. The water was so clear I could see golden lights dancing in the depths. Soft glowing shapes passed near me without touching. I didn't need to breathe. I felt completely at peace, like this was exactly where I was meant to be.",
            moods: ["calm", "peaceful"],
            intensity: 3,
            analysis: {
                moods: ["calm", "peaceful"],
                intensity: 3,
                interpretation: "Breathing underwater without effort — your brain suspended the usual rules to let you exist in a space that would normally be hostile. The golden lights and shapes that pass without touching create a solitude that isn't isolation. You were alone but not lonely. This dream touches something deep: a state where you need nothing else but to simply be there.",
                tags: { symboles: ["water", "light"], situations: ["floating", "breathing"], personnages: [], environnements: ["ocean", "depth"] }
            },
            tags: { symboles: ["water", "light"], situations: ["floating", "breathing"], personnages: [], environnements: ["ocean", "depth"] },
            isPublic: true,
            lang: "en",
            userId: user.id,
        },
        {
            content: "I was running through a forest at night, but it wasn't fear that made me run — it was joy. The trees lit up every time I touched them with my fingertips. At some point I stopped and realized I knew exactly where I was going, even though I didn't know this place at all.",
            moods: ["joyful", "lucid"],
            intensity: 4,
            analysis: {
                moods: ["joyful", "lucid"],
                intensity: 4,
                interpretation: "Running here isn't fleeing. You move through darkness with a certainty you can't rationally explain — you know where you're going without a map. The trees lighting up at your touch say something about your ability to activate what surrounds you. This dream feels like a moment where you trust something in yourself you haven't yet named.",
                tags: { symboles: ["light", "tree"], situations: ["running", "touching"], personnages: [], environnements: ["forest", "night"] }
            },
            tags: { symboles: ["light", "tree"], situations: ["running", "touching"], personnages: [], environnements: ["forest", "night"] },
            isPublic: true,
            lang: "en",
            userId: user.id,
        },
        {
            content: "I was in a huge house I didn't recognize, but I knew it was mine. Each room led to another even larger room. In the last one, there was a window overlooking a calm and infinite ocean. I sat down in front of it and watched the water without moving for what seemed like hours.",
            moods: ["calm", "strange"],
            intensity: 3,
            analysis: {
                moods: ["calm", "strange"],
                intensity: 3,
                interpretation: "The house you don't recognize but know is yours — that's you, exploring yourself. Each room larger than the last suggests you're discovering inner spaces you didn't know existed. The ocean through the window isn't threatening, it's infinite and calm. You sat facing something larger than yourself without fear, and that's rare.",
                tags: { symboles: ["window", "ocean"], situations: ["exploring", "observing"], personnages: [], environnements: ["house", "sea"] }
            },
            tags: { symboles: ["window", "ocean"], situations: ["exploring", "observing"], personnages: [], environnements: ["house", "sea"] },
            isPublic: true,
            lang: "en",
            userId: user.id,
        },
    ];

    for (const dream of dreams) {
        await prisma.dream.create({ data: dream });
        console.log(`✅ Rêve créé : ${dream.content.slice(0, 50)}...`);
    }

    console.log('🎉 Seed terminé ! 10 rêves créés (5 FR + 5 EN)');
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());