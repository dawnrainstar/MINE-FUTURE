import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client lazily/safely
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "Subterranea World Mines Oracle" });
});

// Deterministic Chthonic Prophecy Generator (fallback during API outages/503 spikes)
function generateChthonicFallbackReading(params: {
  drawnMines: any[];
  question?: string;
  spreadType?: string;
  targetFutureDate?: string;
  timeHorizon?: string;
  scatterContext?: string;
}) {
  const { drawnMines, question, spreadType, targetFutureDate, timeHorizon } = params;
  const leadMine = drawnMines[0]?.mine || {};
  const midMine = drawnMines[Math.floor(drawnMines.length / 2)]?.mine || leadMine;
  const outcomeMine = drawnMines[drawnMines.length - 1]?.mine || leadMine;

  const targetDateLabel = targetFutureDate || "the appointed season";
  const horizonLabel = timeHorizon || "Medium Horizon";
  const userQuestion = question && question.trim() ? question.trim() : "What destiny and tectonic shifts will manifest by this date?";

  // Categorize question topic for tailored answers
  const qLower = userQuestion.toLowerCase();
  let topicAdvice = "your personal sovereignty and purpose";
  let manifestDetail = `A concrete manifestation in direct alignment with "${userQuestion}" will solidify`;
  let obstacleDetail = "Lingering hesitation, self-doubt, and obsolete patterns";
  let choiceDetail = "A decisive crossroads where you must choose between old comfort and authentic expansion";

  if (qLower.includes("love") || qLower.includes("relationship") || qLower.includes("partner") || qLower.includes("heart") || qLower.includes("marriage")) {
    topicAdvice = "relational harmony, truth, and heart-centered boundaries";
    manifestDetail = `Regarding your inquiry on relationship and emotional union, a profound clarity and mutual alignment will solidify by ${targetDateLabel}`;
    obstacleDetail = "Unspoken emotional debts, past projections, and guarded boundaries";
    choiceDetail = "Choosing between surface peace and deep vulnerable truth in how you connect";
  } else if (qLower.includes("career") || qLower.includes("job") || qLower.includes("work") || qLower.includes("money") || qLower.includes("business") || qLower.includes("finance")) {
    topicAdvice = "vocational expansion, abundance, and tangible prosperity";
    manifestDetail = `Regarding your professional and financial path, a lucrative opening and tangible acknowledgment of your mastery will crystallize by ${targetDateLabel}`;
    obstacleDetail = "Scarcity mindsets, undervalued labor, and institutional friction";
    choiceDetail = "Investing boldly in your own high-value sovereignty versus settling for unrewarding routines";
  } else if (qLower.includes("move") || qLower.includes("home") || qLower.includes("place") || qLower.includes("travel") || qLower.includes("city") || qLower.includes("house")) {
    topicAdvice = "geographic alignment, home sanctuary, and rooted belonging";
    manifestDetail = `Regarding your inquiry on location and environment, the ideal physical anchor and spatial transition will open clearly by ${targetDateLabel}`;
    obstacleDetail = "Attachment to stagnant environments and fear of rootlessness";
    choiceDetail = "Committing to the ground that truly nourishes your vitality";
  } else if (qLower.includes("health") || qLower.includes("healing") || qLower.includes("body") || qLower.includes("energy")) {
    topicAdvice = "cellular rejuvenation, nervous system regulation, and vital force";
    manifestDetail = `Regarding physical vitality and healing, your body will reach a restored physiological equilibrium by ${targetDateLabel}`;
    obstacleDetail = "Suppressed burnout, irregular cycles, and overexertion";
    choiceDetail = "Honoring your body's biological rhythms over external urgency";
  }

  const strataInterpretations = drawnMines.map((item: any, idx: number) => {
    const m = item.mine;
    const isUpright = item.isUpright;
    const posName = item.positionName || `Strata Seam ${idx + 1}`;
    return {
      position: posName,
      mineName: m.name || `Ancient Seam ${idx + 1}`,
      mineralSignificance: `${m.primaryMineral || "Native Ore"} (${m.mineralCategory || "Precious Ore"}) governed by ${m.feminineArchetype || "The Earth Mother"} at depth -${m.depthMeters || 1000}m anchors the subterranean current of ${m.chthonicKeyword || "transformation"}.`,
      revelation: isUpright
        ? (m.uprightMeaning || `Direct breakthrough for your inquiry regarding ${topicAdvice}.`)
        : (m.invertedMeaning || `Deep tectonic incubation required before full external manifestation in ${topicAdvice}.`),
    };
  });

  return {
    oracularTitle: `The Prophecy of the ${leadMine.primaryMineral || "Golden"} Seam`,
    mantleStrophe: `By ${targetDateLabel}, ancient stone will yield its core,\nThe subterranean mantle speaks what lies in store;\nTo answer "${userQuestion.slice(0, 50)}${userQuestion.length > 50 ? '...' : ''}",\nThe sacred geometry unveils the open door.`,
    targetFutureDate: targetDateLabel,
    timeHorizon: horizonLabel,
    strataInterpretations,
    tectonicSynthesis: `Directly addressing your inquiry—"${userQuestion}":\n\nEverything in this prophecy is mathematically and geologically determined by the sacred geometry of ${targetDateLabel}. The orbital station of this date aligns with the subterranean coordinates of ${leadMine.name || "the prime seam"} (${leadMine.location || "Earth Mantle"}). As the calendar advances toward ${targetDateLabel}, the hydrothermal pressure of ${leadMine.primaryMineral || "precious ore"} forms a golden-ratio vector that unlocks your situation. In this clear unfolding narrative, the physical and emotional resistance you have endured is reaching its natural geological crystallization point. You are stepping out of the chaotic silt and anchoring directly into the bedrock reality of ${topicAdvice}.`,
    futurePrediction: {
      manifestEvent: `${manifestDetail}, accompanied by the undeniable mineral resonance of ${leadMine.primaryMineral || "pure crystal"}.`,
      dissolvingObstacle: `${obstacleDetail} will completely dissolve under the geothermal pressure of ${outcomeMine.name || "the deep mantle"}.`,
      pivotalChoicePoint: `${choiceDetail}, appearing as a pivotal threshold prior to ${targetDateLabel}.`,
      longTermOutcome: `Permanent elevation and grounded stability in ${topicAdvice}, rooted in the enduring frequency of ${outcomeMine.primaryMineral || "noble mineral bedrock"}.`,
    },
    chthonicPrescription: {
      prescribedMinerals: [
        {
          name: `Raw ${leadMine.primaryMineral || "Malachite or Pyrite"}`,
          action: `Keep close to your sleep altar or workspace as ${targetDateLabel} approaches.`,
          resonance: `Calibrates your energetic field to ${leadMine.chthonicKeyword || "inner truth"} and anchors your inquiry's geometric resolution.`,
        },
        {
          name: `Grounding Hematite or Black Tourmaline`,
          action: `Carry in your pocket during pivotal negotiations or difficult transitions.`,
          resonance: `Creates an electromagnetic shield against volatile external turbulence.`,
        },
      ],
      groundingRitual: `At the turning of the upcoming moon, place a flat river stone in water with rock salt, speak your intention regarding "${userQuestion.slice(0, 45)}" aloud three times, and place it upon the earth to anchor this timeline.`,
      mantleRemedy: `Practice daily mantle breathwork: Inhale 4 counts drawing deep earth stillness, hold 8 counts settling the core, and exhale 2 counts releasing mental tension.`,
      temporalMilestones: [
        {
          timeframe: `Phase 1: Initial Borehole (First Weeks)`,
          guidance: `Clear away superficial distractions and fortify your energetic boundaries.`,
        },
        {
          timeframe: `Phase 2: Thermal Midpoint (Midway to ${targetDateLabel})`,
          guidance: `Expect seismic friction or testing regarding your question; hold your ground and trust the mineral core.`,
        },
        {
          timeframe: `Phase 3: Bedrock Harvest (${targetDateLabel})`,
          guidance: `Celebrate the crystallization of your answer and securely integrate your gains.`,
        },
      ],
    },
    environmentalWarning: `The extraction operations around ${leadMine.name || "this subterranean seam"} have caused acute ecological distress, fracturing the surrounding bedrock, disrupting native aquifer flows, and scarring the ancient geological mantle.`,
    whyMiningMustStop: `The seam is over-pressurized and the mineral lattice is fracturing. The land cannot sustain further industrial extraction without permanent destabilization of the regional geomantic field.`,
    earthMandate: `Shift from extraction to stewardship: Protect this seam, honor the living earth beneath your feet, and cease extracting more than what is freely yielded.`,
    shadowVein: `Beware of attempting premature extraction before the ore body has fully cooled and stabilized.`,
    chthonicMandate: `Hold firmly to the bedrock truth of who you are, and let all superficial silt wash away.`,
  };
}

// Chthonic Oracle Reading Endpoint with Future Prediction & Prescription
app.post("/api/oracle/read", async (req, res) => {
  try {
    const { question, spreadType, drawnMines, scatterContext, targetFutureDate, timeHorizon } = req.body;

    if (!drawnMines || !Array.isArray(drawnMines) || drawnMines.length === 0) {
      return res.status(400).json({ error: "No drawn mines provided for the reading." });
    }

    const minesDescription = drawnMines
      .map((item: any, idx: number) => {
        const m = item.mine;
        return `[Position ${idx + 1}: ${item.positionName || "Seam"}]
- Mine: ${m.name} (${m.location}, ${m.country}) [Coordinates: Lat ${m.latitude || m.lat || 0}°, Lng ${m.longitude || m.lng || 0}°]
- Feminine Cartographic Spirit: "${m.feminineArchetype}" (${m.cartoucheTitle})
- Anthropomorphic Cartography: ${m.cartographicFigure}
- Mineral & Archetype: ${m.primaryMineral} (${m.mineralCategory}) — "${m.arcanaArchetype}"
- Depth & Environment: ${m.depthMeters}m (${m.depthCategory})
- Orientation: ${item.isUpright ? "UPRIGHT / OPEN VEIN" : "INVERTED / DEEP PRESSURE"}
- Elemental & Astrological: ${m.elementalAffinity} / ${m.planetaryRuler}
- Chthonic Keyword: ${m.chthonicKeyword}
- Core Lore & Meaning: ${item.isUpright ? m.uprightMeaning : m.invertedMeaning}
- Mantle Echo: "${m.mantleMessage}"`;
      })
      .join("\n\n");

    const prompt = `You are the Chthonic Oracle of Subterranea — the prophetic voice of the Earth's mantle, antique anthropomorphic cartography, and sacred geometry.

CRITICAL DIRECTIVES:
1. ANSWER THE SEEKER'S QUESTION DIRECTLY, EXPLICITLY, AND ACCURATELY: The seeker asked: "${question || "What future events, tectonic shifts, and mineral transformations will manifest by this date?"}". Your prophecy, narrative synthesis, manifest event, dissolving obstacle, choice point, and outcome MUST directly answer this question with concrete specifics, deep insight, and compassionate authority.
2. EVERYTHING IS DETERMINED BY THE GEOMETRY OF THE DATE & SUBTERRANEAN MANTLE: The target future date ("${targetFutureDate || "The Unfolding Future"}") establishes the astronomical solar angle, planetary station, and geometric vector. Explicitly explain in your prophecy how the geometry of this exact date mathematically and energetically aligns with the drawn mine coordinates, mineral crystallizations, and the seeker's destiny.
3. THE PROPHECY MUST BE CLEAR, VIVID, AND NARRATIVE: Speak with absolute narrative clarity, storytelling warmth, and poetic authority. Avoid vague or repetitive generalities. Tell the seeker an evocative, structured story of what is currently unfolding, how the geological pressure is building, and the exact sequence of events leading up to ${targetFutureDate || "the target date"}.

- Target Date: "${targetFutureDate || "The Unfolding Future"}"
- Time Horizon: "${timeHorizon || "Medium Horizon"}"
- Seeker's Inquiry: "${question || "What future events, tectonic shifts, and mineral transformations will manifest by this date?"}"

Spread Archetype: ${spreadType}
${scatterContext ? `Lithic Scatter Resonance: ${scatterContext}` : ""}

THE DRAWN MINES AND THEIR CARTOGRAPHIC FEMININE SPIRITS:
${minesDescription}

You MUST generate a high-precision future prophecy, prognosticating what will occur by the target date, accompanied by an actionable "Chthonic Prescription" of minerals, grounding rituals, and planetary mantle remedies.

Return your response strictly in valid JSON format matching this schema:
{
  "oracularTitle": "A poetic, evocative 3-6 word title for this prophecy (e.g. 'The Gold Titaness of the Equinox Portal')",
  "mantleStrophe": "A short, haunting 2-3 line oracular poem capturing the tectonic truth and the voice of the personified earth spirits",
  "targetFutureDate": "${targetFutureDate || ""}",
  "timeHorizon": "${timeHorizon || ""}",
  "strataInterpretations": [
    {
      "position": "Position Name",
      "mineName": "Name of Mine",
      "mineralSignificance": "1-2 sentences on how this mine's personified feminine spirit, specific mineral, depth, coordinates, and sacred date geometry reflect this position and future timeline",
      "revelation": "Direct, illuminating, narrative interpretation for the seeker's inquiry and future milestone"
    }
  ],
  "tectonicSynthesis": "A vivid, compelling, multi-paragraph narrative prophecy detailing how the geometry of ${targetFutureDate || "the target date"} unlocks the fault lines and mineral veins, telling the complete story of what will unfold.",
  "futurePrediction": {
    "manifestEvent": "What concrete, visible event, breakthrough, or external reality will crystallize on or by the target future date?",
    "dissolvingObstacle": "What fossilized blockage, obsolete structure, or hidden resistance will dissolve or be washed away by the earth?",
    "pivotalChoicePoint": "What critical crossroads, moral test, or seismic threshold must the seeker navigate before reaching that date?",
    "longTermOutcome": "The lasting, irreversible tectonic transformation that settles into the bedrock of the seeker's destiny."
  },
  "chthonicPrescription": {
    "geomanticCode": "A unique alphanumeric code for this prescription (e.g. 'GEO-ARG-2610-8F4A')",
    "geomanticFigureName": "Classical geomantic figure (e.g. 'Fortuna Major', 'Albus', 'Conjunctio', 'Acquisitio', 'Puella')",
    "prescribedMinerals": [
      {
        "name": "Specific Primary Mineral/Stone from the drawn mine (e.g. Raw Muzo Emerald Octahedron, Kimberley Diamond, Native Gold Vein)",
        "specimenType": "Specific natural crystal habit or formation",
        "crystalSystem": "Crystal system (e.g. Isometric, Hexagonal, Trigonal, Monoclinic)",
        "mohsHardness": "Mohs hardness rating (e.g. '7.5 - 8.0')",
        "placement": "Exact body energy center or room sanctuary placement",
        "action": "How to hold, carry, meditate with, or place this mineral",
        "resonance": "Why this mineral's geological frequency stabilizes the upcoming future shift"
      },
      {
        "name": "Second Grounding Mineral/Stone (e.g. Specular Hematite, Black Tourmaline, Smoky Quartz)",
        "specimenType": "Grounding counter-weight specimen",
        "crystalSystem": "Crystal system",
        "mohsHardness": "Mohs hardness",
        "placement": "Base Root, threshold, or non-dominant hand",
        "action": "How to utilize this grounding shield stone",
        "resonance": "Its protective qualities and electromagnetic anchoring"
      }
    ],
    "catalyticMineral": {
      "name": "A third catalytic mineral to spark manifestation (e.g. Red Carnelian, Blue Kyanite, Golden Citrine)",
      "action": "How to utilize to accelerate breakthrough",
      "resonance": "Transformational frequency",
      "elementalSpark": "Elemental classification and spark (e.g. 'Fire • Vital Momentum')"
    },
    "altarGeometry": {
      "pattern": "Name of sacred layout (e.g. 'Triangulation of Hermes', 'Vesica Piscis Portal', 'Vault of Saturn')",
      "compassHeading": "Compass heading to face (e.g. 'North-East', 'South-East')",
      "azimuthDegrees": 45,
      "placementInstructions": "Step-by-step instructions on positioning the three stones"
    },
    "lithosphericChargingWindow": "Optimal day, planetary hour, and solar angle to charge the stones (e.g. 'Venusian Twilight at dusk on Friday')",
    "groundingRitual": "A detailed, visceral, sacred earthly practice to perform (e.g. walking barefoot on clay, salt water bath, lighting a candle near raw iron, writing intentions on stone).",
    "mantleRemedy": "A specific breathwork pattern (e.g. Inhale 4, hold 8, exhale 2 counts) and grounding method to regulate inner pressure.",
    "somaticFocusCenter": "Target somatic center (e.g. 'Solar Plexus & Core Axis', 'Heart Sanctuary')",
    "sealingFormula": "A sacred 1-2 sentence spoken affirmation or mantra embedding the mine, the mineral, and the seeker's intention to lock in the timeline.",
    "temporalMilestones": [
      {
        "timeframe": "Early Phase / Initial Seam",
        "guidance": "What signs to watch for and how to calibrate your energy early on"
      },
      {
        "timeframe": "Midpoint / Seismic Pressure Peak",
        "guidance": "How to navigate the peak intensity or transitional resistance"
      },
      {
        "timeframe": "Target Horizon / Bedrock Arrival",
        "guidance": "How to harvest and secure the crystallized outcome on the target date"
      }
    ]
  },
  "environmentalWarning": "Describe the ecological stress, extraction wounds, groundwater contamination, habitat disruption, or mantle imbalance occurring at this chosen mine.",
  "whyMiningMustStop": "A clear, mystical yet visceral explanation of why extraction at this mine is harmful and must cease (e.g. 'The seam is over-pressurized', 'The Titaness is in distress', 'The rare earth lattice is fracturing', 'The land cannot sustain further extraction').",
  "earthMandate": "A directive from the Earth for protection, restoration, or stewardship (e.g. 'Protect this seam', 'Cease extraction', 'Restore the land', 'Shift from extraction to stewardship').",
  "shadowVein": "What hidden risk, unacknowledged pressure, or subterranean shadow caution must the seeker heed?",
  "chthonicMandate": "One directive the user must align with to succeed."
}`;

    // Try AI generation across models with intelligent retry & graceful fallback
    const candidateModels = ["gemini-3.1-flash-lite", "gemini-3.7-flash", "gemini-flash-latest"];
    let parsed = null;

    try {
      const ai = getGeminiClient();
      for (const model of candidateModels) {
        try {
          const response = await ai.models.generateContent({
            model,
            contents: prompt,
            config: {
              responseMimeType: "application/json",
            },
          });

          const responseText = response.text || "{}";
          try {
            parsed = JSON.parse(responseText);
            if (parsed && parsed.oracularTitle) {
              break; // Successfully generated and parsed
            }
          } catch {
            parsed = null;
          }
        } catch (modelErr: any) {
          const isHighDemand = modelErr?.status === 503 || modelErr?.message?.includes("503") || modelErr?.message?.includes("high demand");
          if (isHighDemand) {
            console.log(`Model ${model} is experiencing temporary high demand (503). Cascading to next candidate...`);
            // Brief 400ms pause to let transient spikes settle
            await new Promise((resolve) => setTimeout(resolve, 400));
          } else {
            console.log(`Model ${model} unavailable (${modelErr?.message || "transient error"}). Trying next candidate...`);
          }
        }
      }
    } catch (clientErr) {
      console.warn("Gemini client initialization warning:", clientErr);
    }

    // If all remote AI models are at capacity, use our rich deterministic Chthonic Oracle generator
    if (!parsed) {
      parsed = generateChthonicFallbackReading({
        drawnMines,
        question,
        spreadType,
        targetFutureDate,
        timeHorizon,
        scatterContext,
      });
    }

    res.json({ reading: parsed });
  } catch (error: any) {
    console.error("Oracle reading fallback invoked:", error?.message || error);
    // Absolute safety net so client never gets an unhandled error
    const fallback = generateChthonicFallbackReading({
      drawnMines: req.body?.drawnMines || [],
      question: req.body?.question,
      spreadType: req.body?.spreadType,
      targetFutureDate: req.body?.targetFutureDate,
      timeHorizon: req.body?.timeHorizon,
    });
    res.json({ reading: fallback });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Subterranea Oracle Server running on port ${PORT}`);
  });
}

startServer();
