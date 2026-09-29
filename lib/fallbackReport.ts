import type { Answers, Report, ScoringResult } from "./types";
import { formatCurrency } from "./format";
import { BRAND, brokersInlineNames } from "./brand";

const VERDICT_HEADLINE = {
  favorable: "Votre propriété est prête à aller chercher le meilleur prix.",
  moyen: "Vous êtes proche, mais une partie de votre prix est à risque.",
  defavorable: "Telle quelle, votre propriété risque de se vendre sous le marché.",
} as const;

const PROPERTY_LABEL: Record<string, string> = {
  maison: "Maison unifamiliale",
  condo: "Condo",
  plex: "Plex",
  chalet: "Chalet",
};

export function buildFallbackReport(answers: Answers, scoring: ScoringResult): Report {
  const { score, verdict, metrics, factors } = scoring;

  const strongest = [...factors].sort((a, b) => b.delta - a.delta)[0];
  const weakest = [...factors].sort((a, b) => a.delta - b.delta)[0];

  const summaryByVerdict = {
    favorable: `Votre prix de départ, l'état de votre propriété et sa première impression jouent en votre faveur. Il reste à valider le prix avec les ventes récentes de votre secteur pour ne rien laisser sur la table.`,
    moyen: `Plusieurs éléments sont en place, mais quelques points peuvent servir d'argument à l'acheteur pour baisser son offre. Réglés avant la mise en marché, ils protègent votre prix.`,
    defavorable: `Plusieurs facteurs risquent de faire baisser les offres : prix de départ, état de la propriété ou première impression. La bonne nouvelle, c'est qu'ils se corrigent presque tous avant la mise en vente.`,
  };

  const marketInsightByVerdict = {
    favorable: `Sur ${BRAND.region}, les propriétés bien préparées et bien affichées dès la première semaine attirent le plus de visites, et c'est la compétition entre acheteurs qui fait monter le prix.`,
    moyen: `Sur ${BRAND.region}, les acheteurs comparent tout en ligne avant de visiter. Les premières photos et le prix affiché décident si votre propriété fait partie de leur liste.`,
    defavorable: `Une propriété qui reste longtemps sur le marché envoie un signal aux acheteurs : ils présument qu'il y a un problème et offrent moins.`,
  };

  const stats = [
    {
      label: "Score meilleur prix",
      value: `${score}/100`,
      detail:
        verdict === "favorable"
          ? "Bien placé pour le meilleur prix."
          : verdict === "moyen"
          ? "Quelques points à corriger."
          : "Plusieurs risques à régler.",
    },
    {
      label: "Valeur estimée",
      value: metrics.estimatedValue ? formatCurrency(metrics.estimatedValue) : "—",
      detail: `Selon vous · ${answers.propertyType ? PROPERTY_LABEL[answers.propertyType] : "—"}`,
    },
    {
      label: "Votre atout",
      value: strongest && strongest.delta > 0 ? "À exploiter" : "—",
      detail: strongest && strongest.delta > 0 ? strongest.label : "Aucun atout marqué pour l'instant.",
    },
    {
      label: "À corriger en premier",
      value: weakest && weakest.delta < 0 ? "Priorité" : "—",
      detail: weakest && weakest.delta < 0 ? weakest.label : "Aucun point faible majeur.",
    },
  ];

  const steps = [
    {
      title: "Fixer le prix avec les ventes réelles",
      description: `${brokersInlineNames()} vous prépare une analyse des propriétés comparables vendues récemment dans votre secteur.`,
    },
    {
      title: "Documenter les « trois gros »",
      description:
        "Toiture, chauffage et chauffe-eau : rassembler les dates et les factures pour que l'inspection ne serve pas d'argument contre vous.",
    },
    {
      title: "Soigner la première impression",
      description:
        "Deux ou trois améliorations à fort impact, à l'intérieur et devant la maison, avant les photos.",
    },
    {
      title: "Lancer une mise en marché complète",
      description:
        "Photos professionnelles, vidéo, Centris et réseaux sociaux dès la première semaine, pour créer de la compétition entre acheteurs.",
    },
  ];

  return {
    headline: VERDICT_HEADLINE[verdict],
    summary: summaryByVerdict[verdict],
    stats,
    steps,
    marketInsight: marketInsightByVerdict[verdict],
  };
}
