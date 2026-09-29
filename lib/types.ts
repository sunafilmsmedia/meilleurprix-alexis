export type PropertyType = "maison" | "condo" | "plex" | "chalet";

export type SellTimeline = "moins_3_mois" | "3_6_mois" | "6_12_mois" | "no_sell";

export type PricingMethod = "comparables" | "municipale" | "en_ligne" | "chiffre_en_tete";

// Les « trois gros » : toiture, chauffage/climatisation, chauffe-eau.
export type BigThree = "recents" | "connus" | "a_remplacer" | "aucune_idee";

export type InteriorCondition = "prete" | "retouches" | "travaux" | "ne_sait_pas";

export type CurbAppeal = "coup_de_coeur" | "correct" | "ameliorations" | "manque_amour";

export type Region = {
  id: string;
  name: string;
  lat?: number;
  lng?: number;
};

export interface Answers {
  propertyType?: PropertyType;
  sellTimeline?: SellTimeline;
  pricingMethod?: PricingMethod;
  bigThree?: BigThree;
  estimatedValue?: number;
  interiorCondition?: InteriorCondition;
  curbAppeal?: CurbAppeal;
  // hasContract = true bloque le formulaire (la personne est déjà
  // sous contrat avec un autre courtier — légalement on ne peut pas
  // l'évaluer). wantsToSwitch = true permet de débloquer (l'utilisateur
  // veut changer de courtier).
  hasContract?: boolean;
  wantsToSwitch?: boolean;
  region?: string;
}

export type Verdict = "favorable" | "moyen" | "defavorable";

export interface ScoringResult {
  score: number;
  verdict: Verdict;
  factors: ScoringFactor[];
  metrics: {
    estimatedValue: number;
  };
}

export interface ScoringFactor {
  label: string;
  delta: number;
  tone: "positive" | "negative" | "neutral";
}

export interface ReportStat {
  label: string;
  value: string;
  detail: string;
}

export interface ReportStep {
  title: string;
  description: string;
}

export interface Report {
  headline: string;
  summary: string;
  stats: ReportStat[];
  steps: ReportStep[];
  marketInsight: string;
}

export interface AnalyzeResponse {
  scoring: ScoringResult;
  report: Report;
  generatedBy: "claude" | "fallback";
}

export type LeadType = "evaluation";

export interface LeadPayload {
  name: string;
  phone?: string;
  email: string;
  consent: boolean;
  answers: Answers;
  leadType?: LeadType;
}
