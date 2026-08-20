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

// Chthonic Oracle Reading Endpoint with Future Prediction & Prescription
app.post("/api/oracle/read", async (req, res) => {
  try {
    const { question, spreadType, drawnMines, scatterContext, targetFutureDate, timeHorizon } = req.body;

    if (!drawnMines || !Array.isArray(drawnMines) || drawnMines.length === 0) {
      return res.status(400).json({ error: "No drawn mines provided for the reading." });
    }

    const ai = getGeminiClient();

    const minesDescription = drawnMines
      .map((item: any, idx: number) => {
        const m = item.mine;
        return `[Position ${idx + 1}: ${item.positionName || "Seam"}]
- Mine: ${m.name} (${m.location}, ${m.country})
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

    const prompt = `You are the Chthonic Oracle of Subterranea — the ancient prophetic voice of the Earth's mantle, antique anthropomorphic cartography, and the world's most legendary excavations.
In this realm of sacred Renaissance cartography, each world mine is the living silhouette and anatomical spirit of an ancient woman / titaness / mineral nymph (such as Aurata Queen of the 4,000-Meter Mantle, Cuprina of Bingham Canyon, Sedna Lucida of the Arctic Permafrost, or Hydrargyra of the Quicksilver Seams).

The seeker has asked the oracle to predict the future and prescribe an earthly remedy for this specific future date / timeline horizon:
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
      "mineralSignificance": "1-2 sentences on how this mine's personified feminine spirit, specific mineral, depth, and cartography reflect this position and future timeline",
      "revelation": "Direct, illuminating interpretation for the seeker's inquiry and future milestone"
    }
  ],
  "tectonicSynthesis": "A rich, multi-paragraph synthesis weaving the feminine cartographic archetypes, mineral energies, depths, and geographic fault lines into a unified prophecy for the seeker's target future date.",
  "futurePrediction": {
    "manifestEvent": "What concrete, visible event, breakthrough, or external reality will crystallize on or by the target future date?",
    "dissolvingObstacle": "What fossilized blockage, obsolete structure, or hidden resistance will dissolve or be washed away by the earth?",
    "pivotalChoicePoint": "What critical crossroads, moral test, or seismic threshold must the seeker navigate before reaching that date?",
    "longTermOutcome": "The lasting, irreversible tectonic transformation that settles into the bedrock of the seeker's destiny."
  },
  "chthonicPrescription": {
    "prescribedMinerals": [
      {
        "name": "Specific Mineral/Stone (e.g. Raw Malachite, Pyrite, Selenite, Black Tourmaline)",
        "action": "How to hold, carry, or place this mineral (e.g. 'Place over the solar plexus at dusk')",
        "resonance": "Why this mineral's geological frequency stabilizes the upcoming future shift"
      },
      {
        "name": "Second Mineral/Stone",
        "action": "How to utilize this stone",
        "resonance": "Its elemental frequency and protective qualities"
      }
    ],
    "groundingRitual": "A detailed, visceral, sacred earthly practice to perform (e.g. walking barefoot on clay, salt water bath, lighting a candle near raw iron, writing intentions on stone).",
    "mantleRemedy": "An alchemical psychological and lifestyle remedy to regulate inner pressure and heat as this timeline unfolds.",
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
  "shadowVein": "What hidden risk, unacknowledged pressure, or subterranean shadow must the seeker heed?",
  "chthonicMandate": "A concise, powerful closing directive from the Earth's core."
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const responseText = response.text || "{}";
    let parsed;
    try {
      parsed = JSON.parse(responseText);
    } catch {
      parsed = {
        oracularTitle: "The Voice of the Deep Mantle",
        mantleStrophe: "From deepest stone and molten core,\nThe earth uncovers what you search for.",
        tectonicSynthesis: responseText,
        shadowVein: "Be mindful of internal pressures left unvented.",
        chthonicMandate: "Ground your intentions in tangible reality.",
        strataInterpretations: [],
      };
    }

    res.json({ reading: parsed });
  } catch (error: any) {
    console.error("Oracle reading error:", error);
    res.status(500).json({
      error: error.message || "Failed to commune with the subterranean mantle.",
    });
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
