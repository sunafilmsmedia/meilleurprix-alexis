import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { computeScoring } from "@/lib/scoring";
import { buildFallbackReport } from "@/lib/fallbackReport";
import { BRAND } from "@/lib/brand";
import type { AnalyzeResponse, Answers, Report } from "@/lib/types";

export const runtime = "nodejs";

const SYSTEM_PROMPT = `Vous êtes un expert en immobilier résidentiel québécois (${BRAND.region} de Montréal, secteur de ${BRAND.city} et environs) qui rédige un rapport personnalisé et honnête pour un propriétaire qui se demande si sa propriété va se vendre au meilleur prix du marché. Les facteurs analysés : la méthode pour fixer le prix, l'âge et l'état des « trois gros » (toiture, chauffage/climatisation, chauffe-eau), l'état intérieur et l'attrait extérieur (aménagement paysager, porte d'entrée, façade).

Ton ton : chaleureux, professionnel, en français avec VOUVOIEMENT (vous / votre / vos — jamais de tutoiement), jamais alarmiste, jamais commercial.

Vous recevez les réponses du formulaire, un score calculé (0-100) et les facteurs détectés. Vous devez produire un rapport JSON STRICTEMENT au format demandé. Ne déviez pas du schéma.

Règles clés :
- Si le verdict est "defavorable", dites clairement quels facteurs risquent de faire baisser les offres, puis montrez qu'ils se corrigent avant la mise en vente.
- Si "moyen", nommez les 1 ou 2 points qui mettent le prix à risque et comment les régler.
- Si "favorable", confirmez avec une raison concrète tirée des réponses et proposez de valider le prix avec les ventes comparables.
- Appuyez-vous sur les facteurs fournis (scoring.factors), jamais sur des hypothèses sur la personne.
- N'inventez aucun montant, pourcentage ou délai chiffré sur le marché.
- "marketInsight" : une donnée plausible sur le marché immobilier de ${BRAND.region} (sans inventer de chiffres précis impossibles à vérifier).
- "steps" : exactement 4 étapes courtes et actionnables, dans l'ordre, ciblées sur les points faibles détectés.
- "stats" : exactement 4 entrées. La 1ère est toujours le score. Utilise les chiffres fournis pour les autres.
- Pas de markdown, pas d'emojis, pas de formules creuses.
- Rédige TOUT le rapport en vouvoyant le lecteur (vous / votre / vos). Aucun "tu", "ton", "ta", "tes", "toi".`;

function extractJson(text: string): unknown {
  // Try direct parse first
  try {
    return JSON.parse(text);
  } catch {
    // fallthrough
  }
  const match = text.match(/\{[\s\S]*\}/);
  if (match) {
    try {
      return JSON.parse(match[0]);
    } catch {
      return null;
    }
  }
  return null;
}

function isValidReport(r: unknown): r is Report {
  if (!r || typeof r !== "object") return false;
  const x = r as Record<string, unknown>;
  return (
    typeof x.headline === "string" &&
    typeof x.summary === "string" &&
    Array.isArray(x.stats) &&
    x.stats.length >= 3 &&
    Array.isArray(x.steps) &&
    x.steps.length >= 3 &&
    typeof x.marketInsight === "string"
  );
}

export async function POST(req: Request) {
  let body: { answers?: Answers };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const answers = body.answers ?? {};
  const scoring = computeScoring(answers);
  const fallback = buildFallbackReport(answers, scoring);

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    const payload: AnalyzeResponse = {
      scoring,
      report: fallback,
      generatedBy: "fallback",
    };
    return NextResponse.json(payload);
  }

  try {
    const client = new Anthropic({ apiKey });
    const userMessage = {
      answers,
      scoring,
      fallbackHints: {
        headline: fallback.headline,
        marketInsight: fallback.marketInsight,
      },
      requiredSchema: {
        headline: "phrase d'accroche, 1 ligne",
        summary: "résumé, 2-3 phrases",
        stats: [
          { label: "Score meilleur prix", value: `${scoring.score}/100`, detail: "..." },
          { label: "Valeur estimée", value: "valeur fournie par la personne, ou —", detail: "..." },
          { label: "Votre atout", value: "2-3 mots", detail: "le facteur le plus positif" },
          { label: "À corriger en premier", value: "2-3 mots", detail: "le facteur le plus négatif" },
        ],
        steps: [{ title: "...", description: "..." }],
        marketInsight: "donnée du marché immobilier pertinente",
      },
    };

    const completion = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1500,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `Voici les données. Réponds uniquement avec un objet JSON valide qui respecte le schéma.\n\n${JSON.stringify(userMessage, null, 2)}`,
        },
      ],
    });

    const textBlock = completion.content.find((c) => c.type === "text");
    const text = textBlock && textBlock.type === "text" ? textBlock.text : "";
    const parsed = extractJson(text);

    if (isValidReport(parsed)) {
      const payload: AnalyzeResponse = {
        scoring,
        report: parsed,
        generatedBy: "claude",
      };
      return NextResponse.json(payload);
    }
  } catch (err) {
    console.error("[analyze] Claude error", err);
  }

  const payload: AnalyzeResponse = {
    scoring,
    report: fallback,
    generatedBy: "fallback",
  };
  return NextResponse.json(payload);
}
