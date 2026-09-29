import type { Answers, ScoringFactor, ScoringResult, Verdict } from "./types";

const BASE_SCORE = 44;

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

// Seuils :
//  >= 75  → favorable      "Votre propriété est prête à aller chercher le meilleur prix"
//  50-74  → moyen          "Vous êtes proche, mais une partie de votre prix est à risque"
//  < 50   → defavorable    "Telle quelle, elle risque de se vendre sous le marché"
// Contrairement à l'évaluation « bon moment », un score bas n'est PAS un
// mauvais lead : c'est justement la personne qui a le plus besoin d'un courtier.
function verdictFor(score: number): Verdict {
  if (score >= 75) return "favorable";
  if (score >= 50) return "moyen";
  return "defavorable";
}

type Rule = { delta: number; label: string };

function apply(factors: ScoringFactor[], rule: Rule | undefined): number {
  if (!rule) return 0;
  factors.push({
    label: rule.label,
    delta: rule.delta,
    tone: rule.delta >= 8 ? "positive" : rule.delta < 0 ? "negative" : "neutral",
  });
  return rule.delta;
}

// Le prix de départ — le facteur qui pèse le plus.
const PRICING: Record<string, Rule> = {
  comparables: { delta: 18, label: "Prix basé sur les ventes réelles du secteur" },
  municipale: { delta: -6, label: "Évaluation municipale — souvent loin du prix du marché" },
  en_ligne: { delta: -4, label: "Estimation en ligne — ne voit ni l'intérieur ni les rénovations" },
  chiffre_en_tete: { delta: -10, label: "Prix fixé au feeling — risque de stagner ou de laisser de l'argent sur la table" },
};

// Les « trois gros » : toiture, chauffage/climatisation, chauffe-eau.
const BIG_THREE: Record<string, Rule> = {
  recents: { delta: 12, label: "Toiture, chauffage et chauffe-eau documentés — l'inspection joue pour vous" },
  connus: { delta: 5, label: "Composantes majeures en grande partie connues" },
  a_remplacer: { delta: -6, label: "Composantes en fin de vie — argument de négociation pour l'acheteur" },
  aucune_idee: { delta: -8, label: "Âge des composantes majeures inconnu — surprise possible à l'inspection" },
};

const INTERIOR: Record<string, Rule> = {
  prete: { delta: 10, label: "Intérieur prêt à visiter" },
  retouches: { delta: 3, label: "Quelques retouches intérieures à prévoir" },
  travaux: { delta: -8, label: "Travaux importants — l'acheteur va les déduire de son offre" },
  ne_sait_pas: { delta: -3, label: "État intérieur à valider avant la mise en marché" },
};

const CURB_APPEAL: Record<string, Rule> = {
  coup_de_coeur: { delta: 10, label: "Attrait extérieur fort — bonne première impression" },
  correct: { delta: 2, label: "Attrait extérieur correct, sans effet wow" },
  ameliorations: { delta: -3, label: "Façade et terrain à rafraîchir" },
  manque_amour: { delta: -8, label: "Première impression faible — des acheteurs passeront tout droit" },
};

const TIMELINE: Record<string, Rule> = {
  moins_3_mois: { delta: 0, label: "Vente à court terme — la préparation doit commencer maintenant" },
  "3_6_mois": { delta: 4, label: "3 à 6 mois — assez de temps pour bien préparer la propriété" },
  "6_12_mois": { delta: 6, label: "6 à 12 mois — le temps de corriger chaque point faible" },
  // "no_sell" est court-circuité avant le scoring — n'arrive pas ici
};

export function computeScoring(answers: Answers): ScoringResult {
  const factors: ScoringFactor[] = [];
  let score = BASE_SCORE;

  score += apply(factors, answers.pricingMethod && PRICING[answers.pricingMethod]);
  score += apply(factors, answers.bigThree && BIG_THREE[answers.bigThree]);
  score += apply(factors, answers.interiorCondition && INTERIOR[answers.interiorCondition]);
  score += apply(factors, answers.curbAppeal && CURB_APPEAL[answers.curbAppeal]);
  score += apply(factors, answers.sellTimeline && TIMELINE[answers.sellTimeline]);

  const finalScore = Math.round(clamp(score, 0, 100));
  return {
    score: finalScore,
    verdict: verdictFor(finalScore),
    factors,
    metrics: {
      estimatedValue: Math.max(0, answers.estimatedValue ?? 0),
    },
  };
}
