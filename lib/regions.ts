import type { Region } from "./types";

// ─────────────────────────────────────────────────────────────────────────
//  SECTEURS COUVERTS PAR L'ÉQUIPE — à remplir par déploiement.
//
//  Utilisé par le champ de recherche de secteur (dernière question) :
//  - recherche insensible aux accents et à la casse
//  - si le secteur tapé n'y figure pas, l'utilisateur peut toujours saisir
//    du texte libre (« Utiliser "…" ») — donc la liste n'a pas besoin d'être
//    exhaustive, mais couvrir toutes les municipalités du territoire améliore
//    l'expérience.
//  Aucune coordonnée (lat/lng) n'est requise : seul `name` est affiché.
//
//  Ci-dessous : exemple générique. Remplace par les vraies municipalités.
// ─────────────────────────────────────────────────────────────────────────
export const REGIONS: Region[] = [
  // ── Gatineau et ses secteurs ──────────────────────────────────────────
  { id: "hull", name: "Hull" },
  { id: "gatineau-secteur", name: "Gatineau (secteur)" },
  { id: "aylmer", name: "Aylmer" },
  { id: "buckingham", name: "Buckingham" },
  { id: "masson-angers", name: "Masson-Angers" },
  { id: "templeton", name: "Templeton" },
  { id: "limbour", name: "Limbour" },
  { id: "le-plateau", name: "Le Plateau" },
  { id: "mont-bleu", name: "Mont-Bleu" },
  { id: "val-tetreau", name: "Val-Tétreau" },
  { id: "wrightville", name: "Wrightville" },
  { id: "pointe-gatineau", name: "Pointe-Gatineau" },
  { id: "touraine", name: "Touraine" },

  // ── MRC des Collines-de-l'Outaouais ───────────────────────────────────
  { id: "chelsea", name: "Chelsea" },
  { id: "cantley", name: "Cantley" },
  { id: "val-des-monts", name: "Val-des-Monts" },
  { id: "lange-gardien", name: "L'Ange-Gardien" },
  { id: "la-peche", name: "La Pêche" },
  { id: "wakefield", name: "Wakefield" },
  { id: "sainte-cecile-de-masham", name: "Sainte-Cécile-de-Masham" },
  { id: "pontiac", name: "Pontiac" },
  { id: "luskville", name: "Luskville" },
  { id: "quyon", name: "Quyon" },
  { id: "notre-dame-de-la-salette", name: "Notre-Dame-de-la-Salette" },
  { id: "denholm", name: "Denholm" },

  // ── MRC de Papineau ───────────────────────────────────────────────────
  { id: "thurso", name: "Thurso" },
  { id: "papineauville", name: "Papineauville" },
  { id: "montebello", name: "Montebello" },
  { id: "ripon", name: "Ripon" },
  { id: "saint-andre-avellin", name: "Saint-André-Avellin" },
  { id: "cheneville", name: "Chénéville" },
  { id: "plaisance", name: "Plaisance" },
  { id: "fassett", name: "Fassett" },
  { id: "namur", name: "Namur" },
  { id: "boileau", name: "Boileau" },
  { id: "duhamel", name: "Duhamel" },
  { id: "val-des-bois", name: "Val-des-Bois" },
  { id: "bowman", name: "Bowman" },
  { id: "mayo", name: "Mayo" },
  { id: "lochaber", name: "Lochaber" },
  { id: "lochaber-partie-ouest", name: "Lochaber-Partie-Ouest" },
  { id: "mulgrave-et-derry", name: "Mulgrave-et-Derry" },
  { id: "montpellier", name: "Montpellier" },
  { id: "lac-simon", name: "Lac-Simon" },
  { id: "saint-sixte", name: "Saint-Sixte" },
  { id: "saint-emile-de-suffolk", name: "Saint-Émile-de-Suffolk" },

  // ── MRC de La Vallée-de-la-Gatineau ───────────────────────────────────
  { id: "maniwaki", name: "Maniwaki" },
  { id: "gracefield", name: "Gracefield" },
  { id: "kazabazua", name: "Kazabazua" },
  { id: "low", name: "Low" },
  { id: "lac-sainte-marie", name: "Lac-Sainte-Marie" },
  { id: "blue-sea", name: "Blue Sea" },
  { id: "messines", name: "Messines" },
  { id: "bois-franc", name: "Bois-Franc" },
  { id: "egan-sud", name: "Egan-Sud" },
  { id: "deleage", name: "Déléage" },
  { id: "aumond", name: "Aumond" },
  { id: "montcerf-lytton", name: "Montcerf-Lytton" },
  { id: "grand-remous", name: "Grand-Remous" },
  { id: "bouchette", name: "Bouchette" },
  { id: "sainte-therese-de-la-gatineau", name: "Sainte-Thérèse-de-la-Gatineau" },
  { id: "cayamant", name: "Cayamant" },

  // ── MRC de Pontiac ────────────────────────────────────────────────────
  { id: "campbells-bay", name: "Campbell's Bay" },
  { id: "fort-coulonge", name: "Fort-Coulonge" },
  { id: "mansfield-et-pontefract", name: "Mansfield-et-Pontefract" },
  { id: "shawville", name: "Shawville" },
  { id: "bristol", name: "Bristol" },
  { id: "clarendon", name: "Clarendon" },
  { id: "litchfield", name: "Litchfield" },
  { id: "portage-du-fort", name: "Portage-du-Fort" },
  { id: "bryson", name: "Bryson" },
  { id: "otter-lake", name: "Otter Lake" },
  { id: "thorne", name: "Thorne" },
  { id: "alleyn-et-cawood", name: "Alleyn-et-Cawood" },
  { id: "waltham", name: "Waltham" },
  { id: "chichester", name: "Chichester" },
  { id: "sheenboro", name: "Sheenboro" },
  { id: "lisle-aux-allumettes", name: "L'Isle-aux-Allumettes" },
  { id: "rapides-des-joachims", name: "Rapides-des-Joachims" },
];
