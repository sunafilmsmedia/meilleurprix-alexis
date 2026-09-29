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
  // ── Agglomération de Longueuil ────────────────────────────────────────
  { id: "vieux-longueuil", name: "Vieux-Longueuil" },
  { id: "saint-hubert", name: "Saint-Hubert" },
  { id: "greenfield-park", name: "Greenfield Park" },
  { id: "lemoyne", name: "LeMoyne" },
  { id: "brossard", name: "Brossard" },
  { id: "boucherville", name: "Boucherville" },
  { id: "saint-bruno-de-montarville", name: "Saint-Bruno-de-Montarville" },
  { id: "saint-lambert", name: "Saint-Lambert" },
  // ── Roussillon ────────────────────────────────────────────────────────
  { id: "la-prairie", name: "La Prairie" },
  { id: "candiac", name: "Candiac" },
  { id: "delson", name: "Delson" },
  { id: "sainte-catherine", name: "Sainte-Catherine" },
  { id: "saint-constant", name: "Saint-Constant" },
  { id: "saint-philippe", name: "Saint-Philippe" },
  { id: "chateauguay", name: "Châteauguay" },
  { id: "mercier", name: "Mercier" },
  { id: "lery", name: "Léry" },
  { id: "saint-mathieu", name: "Saint-Mathieu" },
  { id: "saint-isidore", name: "Saint-Isidore" },
  // ── Vallée-du-Richelieu ───────────────────────────────────────────────
  { id: "chambly", name: "Chambly" },
  { id: "carignan", name: "Carignan" },
  { id: "richelieu", name: "Richelieu" },
  { id: "saint-basile-le-grand", name: "Saint-Basile-le-Grand" },
  { id: "mcmasterville", name: "McMasterville" },
  { id: "beloeil", name: "Beloeil" },
  { id: "mont-saint-hilaire", name: "Mont-Saint-Hilaire" },
  { id: "otterburn-park", name: "Otterburn Park" },
  { id: "saint-mathieu-de-beloeil", name: "Saint-Mathieu-de-Beloeil" },
  { id: "saint-jean-baptiste", name: "Saint-Jean-Baptiste" },
  // ── Marguerite-D'Youville ─────────────────────────────────────────────
  { id: "sainte-julie", name: "Sainte-Julie" },
  { id: "varennes", name: "Varennes" },
  { id: "vercheres", name: "Verchères" },
  { id: "contrecur", name: "Contrecœur" },
  { id: "saint-amable", name: "Saint-Amable" },
  { id: "calixa-lavallee", name: "Calixa-Lavallée" },
  // ── Haut-Richelieu ────────────────────────────────────────────────────
  { id: "saint-jean-sur-richelieu", name: "Saint-Jean-sur-Richelieu" },
  { id: "saint-luc", name: "Saint-Luc" },
  { id: "iberville", name: "Iberville" },
  { id: "saint-blaise-sur-richelieu", name: "Saint-Blaise-sur-Richelieu" },
  { id: "marieville", name: "Marieville" },
  // ── Jardins-de-Napierville et Beauharnois-Salaberry ───────────────────
  { id: "saint-remi", name: "Saint-Rémi" },
  { id: "napierville", name: "Napierville" },
  { id: "sainte-martine", name: "Sainte-Martine" },
  { id: "beauharnois", name: "Beauharnois" },
];
