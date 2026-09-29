// ─────────────────────────────────────────────────────────────────────────
//  CONFIG DE MARQUE — WHITE LABEL
//  Le SEUL fichier à éditer pour rebrander l'app à un nouveau client.
//  (+ lib/regions.ts pour la liste des secteurs, + les images dans /public,
//   + les variables d'environnement pour les intégrations : voir .env.local.example)
//
//  Palette : noir / doré / blanc. Les couleurs se règlent dans app/globals.css
//  (bloc @theme) — cherche les variables --color-brand-* et --color-gold.
// ─────────────────────────────────────────────────────────────────────────

export interface BrokerConfig {
  name: string;
  title: string;
  /** Chemin de la photo dans /public (ex. "/broker-1.jpg") */
  photo: string;
  /** Cadrage de la photo dans le rond du badge (ex. "50% 18%") */
  objectPosition: string;
  /** Téléphone affiché (ex. "514 000-0000") */
  phoneDisplay: string;
  /** Téléphone au format tel: (ex. "+15140000000") */
  phoneTel: string;
}

export interface BrandConfig {
  /** Identifiant court du déploiement — sert de "source" au CRM et de projet Clarity Scanner par défaut. */
  slug: string;

  /** Nom de l'équipe (affiché en filigrane dans le formulaire, le footer, le consentement). */
  teamName: string;

  /** Région / territoire couvert (textes marketing, rapport de repli, footer). */
  region: string;
  /** Ville centrale (utilisée dans les textes du rapport de repli). */
  city: string;

  /** Carte décorative du hero. */
  map: {
    center: [number, number]; // [lat, lng]
    zoom: number;
  };

  /** Textes du hero. */
  hero: {
    chip: string;
    title: string;
    /** Segment exact du titre en or shimmer + police douce (serif italique) (ex. "bon moment"). Optionnel. */
    titleHighlight?: string;
    /** Segment exact du titre en police douce bronze (serif italique) (ex. "Rive-Sud"). Optionnel. */
    titleSoft?: string;
    subtitle: string;
    signature: string; // "Boosté par l'IA"
    cta: string;
    ctaHint: string;
    scrollHint: string;
  };

  /** Signature texte fixe en haut à gauche (pas de logo image). */
  wordmark: {
    name: string;
    tagline: string;
  };

  /** Courtier(s). Les noms servent aux textes du rapport. */
  brokers: BrokerConfig[];
}

export const BRAND: BrandConfig = {
  slug: "meilleurprix-alexis",

  teamName: "Alexis Marcoux",

  region: "la Rive-Sud",
  city: "Longueuil",

  map: {
    // Longueuil / Rive-Sud de Montréal. Ajuste au besoin.
    center: [45.5312, -73.5181],
    zoom: 12,
  },

  hero: {
    chip: "Analyse personnalisée",
    title: "Votre propriété va‑t‑elle se vendre au meilleur prix du marché sur la Rive-Sud ?",
    titleHighlight: "meilleur prix",
    titleSoft: "Rive-Sud",
    subtitle:
      "Répondez à 9 questions et recevez une analyse honnête et confidentielle de ce qui peut faire monter, ou baisser, votre prix de vente : prix de départ, état de la propriété et attrait extérieur.",
    signature: "Boosté par l'IA",
    cta: "Commencer mon analyse",
    ctaHint: "3 minutes — gratuit et confidentiel",
    scrollHint: "Confidentiel · Sans engagement",
  },

  wordmark: {
    name: "Alexis Marcoux",
    tagline: "Courtier immobilier · Rive-Sud",
  },

  brokers: [
    {
      name: "Alexis Marcoux",
      title: "Courtier immobilier",
      photo: "",
      objectPosition: "50% 18%",
      phoneDisplay: "",
      phoneTel: "",
    },
  ],
};

/** "Prénom ou Prénom" — utilisé dans les textes qui nomment l'équipe. */
export function brokersInlineNames(): string {
  const firsts = BRAND.brokers.map((b) => b.name.split(/\s+/)[0]).filter(Boolean);
  if (firsts.length === 0) return "un courtier";
  if (firsts.length === 1) return firsts[0];
  return `${firsts.slice(0, -1).join(", ")} ou ${firsts[firsts.length - 1]}`;
}
