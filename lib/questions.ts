import type { Answers } from "./types";

export type QuestionId =
  | "propertyType"
  | "sellTimeline"
  | "pricingMethod"
  | "bigThree"
  | "estimatedValue"
  | "interiorCondition"
  | "curbAppeal"
  | "hasContract"
  | "region";

export type QuestionKind =
  | "choice"
  | "number"
  | "currency"
  | "boolean"
  | "region";

export interface Choice<V extends string = string> {
  value: V;
  label: string;
  hint?: string;
}

export interface QuestionDef {
  id: QuestionId;
  kind: QuestionKind;
  title: string;
  subtitle?: string;
  choices?: Choice[];
  autoAdvance?: boolean;
  showIf?: (a: Answers) => boolean;
}

export const QUESTIONS: QuestionDef[] = [
  {
    id: "propertyType",
    kind: "choice",
    title: "Quel type de propriété possédez-vous ?",
    subtitle: "On commence par le plus simple.",
    autoAdvance: true,
    choices: [
      { value: "maison", label: "Maison unifamiliale", hint: "Détachée ou jumelée" },
      { value: "condo", label: "Condo", hint: "Copropriété" },
      { value: "plex", label: "Plex", hint: "Duplex, triplex, multilogement" },
      { value: "chalet", label: "Chalet", hint: "Résidence secondaire" },
    ],
  },
  {
    id: "sellTimeline",
    kind: "choice",
    title: "Quand pensez-vous vendre ?",
    subtitle: "Pour savoir combien de temps on a pour bien préparer la vente.",
    autoAdvance: true,
    choices: [
      { value: "moins_3_mois", label: "D'ici 3 mois" },
      { value: "3_6_mois", label: "Dans 3 à 6 mois" },
      { value: "6_12_mois", label: "Dans 6 à 12 mois" },
      { value: "no_sell", label: "Je ne pense pas vendre", hint: "Je suis simplement curieux(se)" },
    ],
  },
  {
    id: "pricingMethod",
    kind: "choice",
    title: "Comment comptez-vous fixer votre prix de vente ?",
    subtitle: "C'est la décision qui pèse le plus sur le prix final.",
    autoAdvance: true,
    choices: [
      { value: "comparables", label: "Avec les ventes récentes de mon secteur", hint: "Propriétés comparables vendues" },
      { value: "municipale", label: "Avec l'évaluation municipale", hint: "Souvent loin du prix du marché" },
      { value: "en_ligne", label: "Avec une estimation en ligne" },
      { value: "chiffre_en_tete", label: "J'ai déjà un chiffre en tête" },
    ],
  },
  {
    id: "bigThree",
    kind: "choice",
    title: "La toiture, le chauffage et la climatisation, et le chauffe-eau : connaissez-vous leur âge et leur état ?",
    subtitle: "C'est la première chose que l'inspecteur de l'acheteur va regarder.",
    autoAdvance: true,
    choices: [
      { value: "recents", label: "Oui, tout est récent ou bien documenté", hint: "Factures, dates d'installation" },
      { value: "connus", label: "Je connais la plupart", hint: "Il me manque une date ou deux" },
      { value: "a_remplacer", label: "Certains arrivent en fin de vie", hint: "À remplacer bientôt" },
      { value: "aucune_idee", label: "Aucune idée" },
    ],
  },
  {
    id: "estimatedValue",
    kind: "currency",
    title: "Combien pensez-vous qu'elle vaut aujourd'hui ?",
    subtitle: "Votre estimation à vous — pas besoin d'être exact.",
  },
  {
    id: "interiorCondition",
    kind: "choice",
    title: "Si un acheteur visitait demain, votre intérieur serait-il prêt ?",
    subtitle: "Propreté, désencombrement, petites réparations.",
    autoAdvance: true,
    choices: [
      { value: "prete", label: "Oui, prêt à visiter" },
      { value: "retouches", label: "Quelques retouches à faire", hint: "Peinture, petites réparations" },
      { value: "travaux", label: "Des travaux importants à prévoir" },
      { value: "ne_sait_pas", label: "Je ne sais pas trop" },
    ],
  },
  {
    id: "curbAppeal",
    kind: "choice",
    title: "Est-ce qu'il y a un « effet wow » quand un acheteur arrive devant ?",
    subtitle: "Aménagement paysager, porte d'entrée, façade : c'est la première impression.",
    autoAdvance: true,
    choices: [
      { value: "coup_de_coeur", label: "Coup de cœur assuré" },
      { value: "correct", label: "Correct, sans plus" },
      { value: "ameliorations", label: "Quelques améliorations à faire", hint: "Plates-bandes, peinture, éclairage" },
      { value: "manque_amour", label: "Ça manque d'amour" },
    ],
  },
  {
    id: "hasContract",
    kind: "boolean",
    title: "Travaillez-vous déjà avec un courtier ?",
    subtitle: "Question légale — on ne peut pas évaluer une propriété déjà sous contrat.",
    autoAdvance: true,
  },
  {
    id: "region",
    kind: "region",
    title: "Dans quel secteur se trouve votre propriété ?",
    subtitle: "Écrivez votre secteur et choisissez-le dans la liste.",
  },
];

export function getVisibleQuestions(answers: Answers): QuestionDef[] {
  return QUESTIONS.filter((q) => !q.showIf || q.showIf(answers));
}

export function isAnswered(q: QuestionDef, a: Answers): boolean {
  switch (q.id) {
    case "propertyType": return !!a.propertyType;
    case "sellTimeline": return !!a.sellTimeline;
    case "pricingMethod": return !!a.pricingMethod;
    case "bigThree": return !!a.bigThree;
    case "estimatedValue": return typeof a.estimatedValue === "number" && a.estimatedValue > 0;
    case "interiorCondition": return !!a.interiorCondition;
    case "curbAppeal": return !!a.curbAppeal;
    case "hasContract":
      // "Non" = on peut continuer. "Oui" = bloqué SAUF si la personne
      // clique "Je veux changer" (wantsToSwitch = true).
      if (a.hasContract === false) return true;
      if (a.hasContract === true && a.wantsToSwitch === true) return true;
      return false;
    case "region": return !!a.region;
  }
}
