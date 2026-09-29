# Test « Votre propriété va-t-elle se vendre au meilleur prix ? » — Alexis Marcoux (Rive-Sud)

Cloné du template d'évaluation vendeur. Différences :
- 9 questions : type, délai de vente, méthode de prix, toiture/chauffage/chauffe-eau,
  valeur estimée, état intérieur, « effet wow » extérieur, courtier existant, secteur.
- Scoring = 4 facteurs de prix + délai (`lib/scoring.ts`). ≥ 75 favorable, 50-74 moyen, < 50 défavorable.
- **Tous les verdicts sont envoyés au CRM** : un score bas = vendeur qui a besoin d'aide (lead chaud).
- Pas de logo : signature texte en haut à gauche (`BRAND.wordmark` dans `lib/brand.ts`).
- Thème bleu marine / blanc / bronze, police d'accent Lora.
- Le reste de ce document décrit le template d'origine.

---


App one-page de qualification de leads pour une **équipe de deux courtiers immobiliers**.
Next.js 15 (App Router, TS) · Tailwind v4 · Framer Motion · Leaflet · déploiement Vercel.
Thème **noir / doré / blanc**, mobile-first, français (tutoiement chaleureux).

## Parcours (machine à états, un seul écran)
`hero → formulaire (9 questions) → chargement (~2 s, IA) → pré-révélation → résultats`
avec court-circuit « je ne veux pas vendre » (aucun envoi CRM).

- Auto-avance sur les choix (~220 ms), barre de progression, bouton Précédent, transitions slide.
- Question secteur = champ de recherche filtrée (insensible aux accents/casse) + saisie libre
  (« Utiliser "…" », jamais de « pas trouvé »). Confirmation « Bien reçu ! » puis analyse après ~1,1 s.
- Pré-révélation : un seul bouton « Voir ma réponse » → formulaire de contact complet
  **obligatoire** (nom, courriel, téléphone, consentement, tous requis) pour débloquer les résultats.
- Scoring déterministe → verdict 3 niveaux (favorable / moyen / défavorable).
- `/api/analyze` : rapport via Claude (repli déterministe sans clé).
- `/api/lead` : webhook CRM (GHL), payload aplati, **uniquement pour leads qualifiés**
  (verdict défavorable = rien envoyé ; « je ne veux pas vendre » = rien envoyé).

## Pour rebrander un nouveau client — 4 endroits

1. **`lib/brand.ts`** — LE fichier central : nom d'équipe, région/ville, textes du hero,
   les **2 courtiers** (nom, titre, photo, téléphone), logos, centre de la carte.
   Le badge flottant alterne aléatoirement entre les deux courtiers à chaque visite.
2. **`lib/regions.ts`** — la liste des secteurs/municipalités couverts (~exhaustif recommandé).
3. **`public/`** — remplacer les placeholders : `logo-equipe.svg`, `logo-banniere.svg`,
   `broker-1.svg`, `broker-2.svg` (les photos peuvent être des `.jpg` : ajuste alors les
   chemins dans `lib/brand.ts`).
4. **`.env.local`** (voir `.env.local.example`) — clés propres au déploiement :
   `ANTHROPIC_API_KEY`, `CRM_WEBHOOK_URL`, `NEXT_PUBLIC_META_PIXEL_ID`,
   `NEXT_PUBLIC_CLARITY_ID`, `NEXT_PUBLIC_CLARITY_SCANNER_PROJECT`, `NEXT_PUBLIC_SITE_URL`.

Palette : réglable dans `app/globals.css` (bloc `@theme`, variables `--color-brand-*` et
`--color-gold`). Par défaut : noir / doré / blanc.

## Développement
```bash
npm install
cp .env.local.example .env.local   # remplir au besoin
npm run dev
```

## Confidentialité (garantie côté serveur)
- Verdict défavorable en mode évaluation → aucun stockage, aucun webhook.
- Court-circuit « je ne veux pas vendre » → aucune capture.
- Clarity Scanner (`window.csTrack`) n'enregistre **jamais** de données personnelles :
  uniquement des libellés d'étape et des choix prédéfinis.
