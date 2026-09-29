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
    /** Segment exact du titre en police douce dorée (serif italique) (ex. "Gatineau"). Optionnel. */
    titleSoft?: string;
    subtitle: string;
    signature: string; // "Boosté par l'IA"
    cta: string;
    ctaHint: string;
    scrollHint: string;
  };

  /** Logos fixes en haut (équipe à gauche, bannière à droite). */
  logos: {
    team: { src: string; alt: string; width: number; height: number };
    banner: { src: string; alt: string; width: number; height: number };
  };

  /** Courtier(s). Ici : Véronique seule. Les noms servent aux textes du rapport (le badge flottant a été retiré). */
  brokers: BrokerConfig[];
}

export const BRAND: BrandConfig = {
  slug: "vero-meilleur-prix",

  teamName: "Véronique Guillemette",

  region: "l'Outaouais",
  city: "Gatineau",

  map: {
    // Gatineau (secteur Hull). Ajuste au besoin.
    center: [45.4765, -75.7013],
    zoom: 13,
  },

  hero: {
    chip: "Estimation personnalisée",
    title: "Votre propriété va-t-elle se vendre au meilleur prix du marché à Gatineau ?",
    titleHighlight: "meilleur prix",
    titleSoft: "Gatineau",
    subtitle:
      "Répondez à 10 questions et recevez une analyse honnête et confidentielle de ce qui peut faire monter, ou baisser, votre prix de vente : prix de départ, état de la propriété, attrait extérieur et mise en marché.",
    signature: "Boosté par l'IA",
    cta: "Commencer mon évaluation",
    ctaHint: "3 minutes — gratuit et confidentiel",
    scrollHint: "Confidentiel · Sans engagement",
  },

  logos: {
    team: {
      src: "/veronique-guillemette.webp",
      alt: "Groupe Guillemette — Véronique Guillemette, courtière immobilière",
      width: 800,
      height: 228,
    },
    banner: {
      // Logo de l'agence de Véronique (RE/MAX Vision), en haut à droite (pastille blanche).
      src: "/remax-vision.jpg",
      alt: "RE/MAX Vision — Agence immobilière",
      width: 6197,
      height: 3873,
    },
  },

  // Courtière unique — le badge flottant a été retiré (aucun numéro affiché).
  brokers: [
    {
      name: "Véronique Guillemette",
      title: "Courtière immobilière · RE/MAX",
      photo: "/broker-1.svg",
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
