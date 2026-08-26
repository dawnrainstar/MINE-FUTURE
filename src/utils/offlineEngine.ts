import { WorldMine, DivinationReading } from '../types';
import { calculateDateGeometry } from '../data/pennickEngine';

/**
 * Formats a clean, structured prophecy text suitable for clipboard copying and reading.
 */
export function formatProphecyText(reading: DivinationReading): string {
  const interp = reading.interpretation;
  const lead = reading.drawnMines[0]?.mine;
  const lines: string[] = [];

  lines.push(`══════════════════════════════════════════════════`);
  lines.push(`             RAINSTARSTERRAIN FORCAST             `);
  lines.push(`           ASTROLOGY PROPHECY READING            `);
  lines.push(`══════════════════════════════════════════════════`);
  lines.push(``);
  lines.push(`TITLE: ${interp?.oracularTitle || 'Your Chthonic Prophecy'}`);
  lines.push(`TARGET DATE: ${reading.targetFutureDate || 'Unfolding Future'}`);
  if (reading.question && reading.question !== 'General Inquiry of the Mantle') {
    lines.push(`INQUIRY: "${reading.question}"`);
  }
  lines.push(``);

  if (lead) {
    lines.push(`MINE UNEARTHED:`);
    lines.push(`${lead.location}, ${lead.country} — ${lead.name} — ${lead.primaryMineral} — Active Mantle Seam`);
    if (lead.uprightMeaning) {
      lines.push(`${lead.uprightMeaning}`);
    }
    lines.push(``);
  }

  if (interp?.futurePrediction) {
    lines.push(`PROPHECY:`);
    lines.push(`• Manifestation: ${interp.futurePrediction.manifestEvent}`);
    lines.push(`• Obstacle Dissolving: ${interp.futurePrediction.dissolvingObstacle}`);
    lines.push(`• Choice Point: ${interp.futurePrediction.pivotalChoicePoint}`);
    lines.push(`• Bedrock Destiny: ${interp.futurePrediction.longTermOutcome}`);
    lines.push(``);
  }

  if (interp?.chthonicPrescription) {
    lines.push(`PRESCRIPTION:`);
    if (interp.chthonicPrescription.prescribedMinerals && interp.chthonicPrescription.prescribedMinerals.length > 0) {
      lines.push(`• Mineral Allies: ${interp.chthonicPrescription.prescribedMinerals.map((m) => `${m.name} (${m.action})`).join('; ')}`);
    }
    if (interp.chthonicPrescription.groundingRitual) {
      lines.push(`• Grounding Ritual: ${interp.chthonicPrescription.groundingRitual}`);
    }
    if (interp.chthonicPrescription.mantleRemedy) {
      lines.push(`• Mantle Breathing: ${interp.chthonicPrescription.mantleRemedy}`);
    }
    lines.push(``);
  }

  if (interp?.environmentalWarning || interp?.whyMiningMustStop || interp?.earthMandate) {
    lines.push(`ENVIRONMENTAL WARNING & EARTH MANDATE:`);
    if (interp.environmentalWarning) {
      lines.push(`• Environmental Warning: ${interp.environmentalWarning}`);
    }
    if (interp.whyMiningMustStop) {
      lines.push(`• Why Mining Must Stop: "${interp.whyMiningMustStop}"`);
    }
    if (interp.earthMandate) {
      lines.push(`• Earth Mandate: ${interp.earthMandate}`);
    }
    lines.push(``);
  }

  if (interp?.tectonicSynthesis) {
    lines.push(`SYNTHESIS:`);
    lines.push(`${interp.tectonicSynthesis}`);
    lines.push(``);
  }

  if (interp?.shadowVein) {
    lines.push(`SHADOW VEIN:`);
    lines.push(`${interp.shadowVein}`);
    lines.push(``);
  }

  if (interp?.chthonicMandate) {
    lines.push(`CHTHONIC MANDATE:`);
    lines.push(`${interp.chthonicMandate}`);
    lines.push(``);
  }

  lines.push(`══════════════════════════════════════════════════`);
  return lines.join('\n');
}

/**
 * Downloads arbitrary text/JSON content as a file to the user's local disk.
 */
export function downloadFile(content: string, fileName: string, contentType: string = 'text/plain') {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Exports complete backup bundle including all world mines, prophecies, and titaness profiles.
 */
export function exportCompleteOfflineGrimoire(mines: WorldMine[], readings: DivinationReading[]) {
  const payload = {
    app: 'RAINSTARTERRAIN PROFESEYS',
    version: '2.0.0-offline',
    exportedAt: new Date().toISOString(),
    totalMines: mines.length,
    totalReadings: readings.length,
    readings,
    mines,
  };

  const jsonStr = JSON.stringify(payload, null, 2);
  const dateStr = new Date().toISOString().slice(0, 10);
  downloadFile(jsonStr, `Rainstarterrain_Complete_Grimoire_${dateStr}.json`, 'application/json');
}

/**
 * Downloads a single reading / prophecy as a comprehensive formatted Markdown / Text Scroll.
 */
export function exportReadingAsScroll(reading: DivinationReading) {
  const dateStr = new Date(reading.timestamp).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const dateGeom = calculateDateGeometry(reading.targetFutureDate || new Date(reading.timestamp).toISOString().split('T')[0]);

  const lines: string[] = [
    `════════════════════════════════════════════════════════════════════════════════`,
    `               RAINSTARTERRAIN PROFESEYS: COMPLETE ORACLE SCROLL                `,
    `════════════════════════════════════════════════════════════════════════════════`,
    ``,
    `DIVINATION INSCRIBED: ${dateStr}`,
    `TARGET FUTURE DATE:   ${reading.targetFutureDate || 'Unfolding Future'} (${reading.timeHorizon || 'Standard Horizon'})`,
    `DIVINATION SPREAD:    ${String(reading.spreadType).toUpperCase()}`,
    `QUERY / INTENT:       ${reading.question || 'Silent Mantle Communion'}`,
    ``,
    `────────────────────────────────────────────────────────────────────────────────`,
    `                     SACRED GEOMETRY OF THE DATE MATRIX                         `,
    `────────────────────────────────────────────────────────────────────────────────`,
    `• Target Date:             ${dateGeom.targetDate} (Day ${dateGeom.dayOfYear}/365)`,
    `• Solar Phase Angle:       ${dateGeom.solarPhaseAngleDeg}°`,
    `• Astronomical Station:    ${dateGeom.astronomicalStation}`,
    `• Geometric Matrix Figure: ${dateGeom.geometricFigure} (${dateGeom.geometricSymbol})`,
    `• Harmonic Resonance:      ${dateGeom.harmonicResonanceHz}`,
    `• Planetary Resonance:     ${dateGeom.planetaryResonance}`,
    `• Elemental Tide:          ${dateGeom.elementalTide}`,
    `• Mantle Geometry Vector:  ${dateGeom.mantleGeometryVector}`,
    `• Chthonic Formula:        ${dateGeom.chthonicFormula}`,
    ``,
    `────────────────────────────────────────────────────────────────────────────────`,
    `                  COMMUNING MINES, GEOGRAPHIC COORDINATES & SPIRITS             `,
    `────────────────────────────────────────────────────────────────────────────────`,
  ];

  reading.drawnMines.forEach((item, index) => {
    const m = item.mine;
    const t = m.titaness;
    const posName = item.position?.name || `Position ${index + 1}`;
    lines.push(``);
    lines.push(`[${posName.toUpperCase()}] ${m.name}`);
    lines.push(`  Coordinates: Lat ${m.lat}°, Lng ${m.lng}° | Region: ${m.location}, ${m.country}`);
    lines.push(`  Depth:       -${m.depthMeters} meters into the Earth mantle`);
    lines.push(`  Mineral:     ${m.primaryMineral} (${m.mineralCategory || 'Precious Ore'})`);
    lines.push(`  Orientation: ${item.isUpright ? 'Open Vein (Upright)' : 'Deep Pressure (Inverted)'}`);
    lines.push(`  Key Meaning: ${item.isUpright ? m.uprightMeaning : m.invertedMeaning}`);
    lines.push(`  Titaness:    ${t?.name || m.feminineArchetype || 'Chthonic Mineral Spirit'}`);
    if (m.cartoucheTitle) lines.push(`  Cartouche:   ${m.cartoucheTitle}`);
    if (t?.archetype)     lines.push(`  Archetype:   ${t.archetype}`);
    if (t?.rune || t?.geomantic) lines.push(`  Symbols:     Rune: ᚱ ${t.rune || 'Kenaz'} | Geomantic: ⚚ ${t.geomantic || 'Fortuna Major'} | Tree: ${t.tree || 'Ash'}`);
    if (t?.wound)         lines.push(`  Shadow Strain: ${t.wound}`);
    if (t?.cures) {
      lines.push(`  Literal Cure:   ${t.cures.literal}`);
      lines.push(`  Symbolic Cure:  ${t.cures.symbolic}`);
      lines.push(`  Geometric Cure: ${t.cures.geometric}`);
    }
    if (m.mantleMessage) {
      lines.push(`  Mantle Message: "${m.mantleMessage}"`);
    }
  });

  if (reading.interpretation) {
    const interp = reading.interpretation;
    lines.push(``);
    lines.push(`────────────────────────────────────────────────────────────────────────────────`);
    lines.push(`                       THE CHTHONIC NARRATIVE PROPHECY                          `);
    lines.push(`────────────────────────────────────────────────────────────────────────────────`);
    lines.push(`TITLE: ${interp.oracularTitle}`);
    lines.push(``);
    lines.push(`MANTLE STROPHE:`);
    lines.push(`"${interp.mantleStrophe}"`);
    lines.push(``);
    lines.push(`TECTONIC NARRATIVE SYNTHESIS:`);
    lines.push(interp.tectonicSynthesis);

    if (interp.strataInterpretations && interp.strataInterpretations.length > 0) {
      lines.push(``);
      lines.push(`─── STRATA-BY-STRATA DECRYPTION ───`);
      interp.strataInterpretations.forEach((strata) => {
        lines.push(`• ${strata.position} (${strata.mineName}):`);
        lines.push(`  Significance: ${strata.mineralSignificance}`);
        lines.push(`  Revelation:   ${strata.revelation}`);
      });
    }

    if (interp.futurePrediction) {
      lines.push(``);
      lines.push(`─── FUTURE PROGNOSTICATION (BY ${reading.targetFutureDate || 'TARGET HORIZON'}) ───`);
      lines.push(`1. Manifest Breakthrough: ${interp.futurePrediction.manifestEvent}`);
      lines.push(`2. Dissolving Obstacle:   ${interp.futurePrediction.dissolvingObstacle}`);
      lines.push(`3. Pivotal Crossroads:    ${interp.futurePrediction.pivotalChoicePoint}`);
      lines.push(`4. Bedrock Destiny:       ${interp.futurePrediction.longTermOutcome}`);
    }

    if (interp.chthonicPrescription) {
      lines.push(``);
      lines.push(`─── CHTHONIC PRESCRIPTION & PLANETARY REMEDIES ───`);
      interp.chthonicPrescription.prescribedMinerals.forEach((min, idx) => {
        lines.push(`• Mineral Remedy #${idx + 1}: ${min.name}`);
        lines.push(`  Application: ${min.action}`);
        lines.push(`  Resonance:   ${min.resonance}`);
      });
      lines.push(`• Sacred Grounding Ritual: ${interp.chthonicPrescription.groundingRitual}`);
      lines.push(`• Mantle Pressure Remedy: ${interp.chthonicPrescription.mantleRemedy}`);

      if (interp.chthonicPrescription.temporalMilestones && interp.chthonicPrescription.temporalMilestones.length > 0) {
        lines.push(``);
        lines.push(`─── CHRONOLOGICAL MILESTONES (PATH TO ${reading.targetFutureDate || 'TARGET'}) ───`);
        interp.chthonicPrescription.temporalMilestones.forEach((ms, idx) => {
          lines.push(`${idx + 1}. [${ms.timeframe}] ${ms.guidance}`);
        });
      }
    }

    if (interp.environmentalWarning || interp.whyMiningMustStop || interp.earthMandate) {
      lines.push(``);
      lines.push(`─── ENVIRONMENTAL WARNING & EARTH MANDATE ───`);
      if (interp.environmentalWarning) {
        lines.push(`ENVIRONMENTAL WARNING:`);
        lines.push(`  ${interp.environmentalWarning}`);
      }
      if (interp.whyMiningMustStop) {
        lines.push(`WHY MINING MUST STOP:`);
        lines.push(`  "${interp.whyMiningMustStop}"`);
      }
      if (interp.earthMandate) {
        lines.push(`EARTH MANDATE:`);
        lines.push(`  "${interp.earthMandate}"`);
      }
    }

    lines.push(``);
    lines.push(`SHADOW VEIN (HIDDEN RISK):`);
    lines.push(`  ${interp.shadowVein}`);
    lines.push(``);
    lines.push(`CHTHONIC MANDATE (GROUNDING ACTION):`);
    lines.push(`  "${interp.chthonicMandate}"`);
  }

  lines.push(``);
  lines.push(`════════════════════════════════════════════════════════════════════════════════`);
  lines.push(`                END OF ORACLE INSCRIPTION — SUBTERRANEA                         `);
  lines.push(`════════════════════════════════════════════════════════════════════════════════`);

  const fileName = `Prophecy_Scroll_${(reading.targetFutureDate || 'Reading').replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().toISOString().slice(0, 10)}.txt`;
  downloadFile(lines.join('\n'), fileName, 'text/plain');
}

/**
 * Downloads a single reading / prophecy as an illuminated HTML standalone document ready to print or view.
 */
export function exportReadingAsHtml(reading: DivinationReading) {
  const dateStr = new Date(reading.timestamp).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const dateGeom = calculateDateGeometry(reading.targetFutureDate || new Date(reading.timestamp).toISOString().split('T')[0]);
  const interp = reading.interpretation;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Prophecy Scroll - ${interp?.oracularTitle || 'Subterranean Reading'}</title>
  <style>
    body {
      background-color: #0c0a09;
      color: #e7e5e4;
      font-family: 'Cinzel', 'Georgia', serif;
      margin: 0;
      padding: 40px 20px;
      line-height: 1.6;
    }
    .container {
      max-width: 850px;
      margin: 0 auto;
      background: #1c1917;
      border: 2px solid #b45309;
      border-radius: 24px;
      padding: 40px;
      box-shadow: 0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(245,158,11,0.15);
    }
    .header {
      text-align: center;
      border-bottom: 2px solid #78350f;
      padding-bottom: 24px;
      margin-bottom: 30px;
    }
    .badge {
      display: inline-block;
      padding: 4px 14px;
      background: #451a03;
      border: 1px solid #d97706;
      border-radius: 9999px;
      font-size: 11px;
      font-family: monospace;
      color: #fde68a;
      letter-spacing: 0.1em;
      margin-bottom: 12px;
    }
    h1 {
      color: #fef3c7;
      font-size: 28px;
      margin: 10px 0;
      letter-spacing: 0.05em;
    }
    .strophe {
      font-style: italic;
      color: #fde047;
      font-size: 17px;
      background: #292524;
      border-left: 4px solid #f59e0b;
      padding: 16px 20px;
      border-radius: 8px;
      margin: 20px 0;
      white-space: pre-line;
    }
    .section {
      background: #141210;
      border: 1px solid #292524;
      border-radius: 16px;
      padding: 24px;
      margin-bottom: 24px;
    }
    .section-title {
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      color: #f59e0b;
      font-weight: bold;
      border-bottom: 1px solid #44403c;
      padding-bottom: 8px;
      margin-top: 0;
      margin-bottom: 16px;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 16px;
    }
    .card {
      background: #1c1917;
      border: 1px solid #44403c;
      border-radius: 12px;
      padding: 16px;
    }
    .card-title {
      font-weight: bold;
      color: #fde68a;
      font-size: 14px;
      margin-bottom: 6px;
    }
    .meta {
      font-family: monospace;
      font-size: 11px;
      color: #a8a29e;
    }
    .quote {
      color: #d6d3d1;
      font-size: 13px;
      line-height: 1.5;
    }
    .footer {
      text-align: center;
      font-size: 11px;
      font-family: monospace;
      color: #78716c;
      margin-top: 40px;
      border-top: 1px solid #292524;
      padding-top: 20px;
    }
    @media print {
      body { background: #fff; color: #111; }
      .container { border-color: #333; box-shadow: none; background: #fff; }
      .strophe, .section, .card { background: #f5f5f4; border-color: #ccc; }
      h1, .card-title { color: #000; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="badge">CHTHONIC ORACLE INSCRIPTION • ${dateStr}</div>
      <h1>${interp?.oracularTitle || 'Subterranean Prophecy'}</h1>
      <div class="meta">
        Target Future Date: <strong>${reading.targetFutureDate || 'Unfolding Future'}</strong> (${reading.timeHorizon || 'Standard'}) | Spread: ${reading.spreadType.toUpperCase()}
      </div>
      ${reading.question ? `<div class="meta" style="margin-top:8px;">Inquiry: "${reading.question}"</div>` : ''}
    </div>

    ${interp?.mantleStrophe ? `<div class="strophe">"${interp.mantleStrophe}"</div>` : ''}

    <div class="section">
      <div class="section-title">Sacred Geometry of the Date Matrix (${dateGeom.targetDate})</div>
      <div class="grid">
        <div class="card">
          <div class="card-title">Orbital Alignment</div>
          <div class="quote">
            Station: ${dateGeom.astronomicalStation}<br>
            Solar Angle: ${dateGeom.solarPhaseAngleDeg}° (Day ${dateGeom.dayOfYear}/365)
          </div>
        </div>
        <div class="card">
          <div class="card-title">Resonance & Matrix</div>
          <div class="quote">
            Figure: ${dateGeom.geometricFigure} (${dateGeom.geometricSymbol})<br>
            Frequency: ${dateGeom.harmonicResonanceHz}
          </div>
        </div>
        <div class="card">
          <div class="card-title">Planetary & Elemental Tide</div>
          <div class="quote">
            Planetary: ${dateGeom.planetaryResonance}<br>
            Tide: ${dateGeom.elementalTide}
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">Communing World Mines & Coordinates</div>
      <div class="grid">
        ${reading.drawnMines.map((d, i) => `
          <div class="card">
            <div class="card-title">${d.position?.name || `Seam ${i+1}`}: ${d.mine.name}</div>
            <div class="meta">
              ${d.mine.location}, ${d.mine.country} | Lat ${d.mine.lat}°, Lng ${d.mine.lng}° | Depth: -${d.mine.depthMeters}m
            </div>
            <p class="quote" style="margin-top:8px;">
              <strong>Mineral:</strong> ${d.mine.primaryMineral} (${d.isUpright ? 'Open Vein / Upright' : 'Deep Pressure / Inverted'})<br>
              <strong>Titaness:</strong> ${d.mine.titaness?.name || d.mine.feminineArchetype || 'Spirit'}<br>
              <strong>Meaning:</strong> ${d.isUpright ? d.mine.uprightMeaning : d.mine.invertedMeaning}
            </p>
          </div>
        `).join('')}
      </div>
    </div>

    ${interp ? `
      <div class="section">
        <div class="section-title">Tectonic Narrative Synthesis</div>
        <p class="quote" style="font-size:15px; white-space:pre-line;">${interp.tectonicSynthesis}</p>
      </div>

      ${interp.futurePrediction ? `
        <div class="section">
          <div class="section-title">Future Prognostication by ${reading.targetFutureDate || 'Target Date'}</div>
          <div class="grid">
            <div class="card">
              <div class="card-title" style="color:#f59e0b;">1. Manifesting Breakthrough</div>
              <p class="quote">${interp.futurePrediction.manifestEvent}</p>
            </div>
            <div class="card">
              <div class="card-title" style="color:#818cf8;">2. Dissolving Obstacle</div>
              <p class="quote">${interp.futurePrediction.dissolvingObstacle}</p>
            </div>
            <div class="card">
              <div class="card-title" style="color:#fb7185;">3. Pivotal Crossroads</div>
              <p class="quote">${interp.futurePrediction.pivotalChoicePoint}</p>
            </div>
            <div class="card">
              <div class="card-title" style="color:#34d399;">4. Bedrock Destiny</div>
              <p class="quote">${interp.futurePrediction.longTermOutcome}</p>
            </div>
          </div>
        </div>
      ` : ''}

      ${interp.chthonicPrescription ? `
        <div class="section">
          <div class="section-title">Chthonic Prescription & Grounding Remedy</div>
          <div class="grid">
            <div class="card">
              <div class="card-title">Sacred Grounding Ritual</div>
              <p class="quote">${interp.chthonicPrescription.groundingRitual}</p>
            </div>
            <div class="card">
              <div class="card-title">Mantle Pressure Remedy</div>
              <p class="quote">${interp.chthonicPrescription.mantleRemedy}</p>
            </div>
          </div>
          <div style="margin-top:16px;">
            <div class="card-title" style="font-size:12px;">Prescribed Minerals:</div>
            <ul style="font-size:13px; color:#d6d3d1; padding-left:20px;">
              ${interp.chthonicPrescription.prescribedMinerals.map(m => `<li><strong>${m.name}:</strong> ${m.action} (<em>${m.resonance}</em>)</li>`).join('')}
            </ul>
          </div>
        </div>
      ` : ''}

      ${(interp.environmentalWarning || interp.whyMiningMustStop || interp.earthMandate) ? `
        <div class="section" style="border-left: 4px solid #059669; padding-left: 16px;">
          <div class="section-title" style="color: #34d399;">✦ Environmental Warning & Earth Mandate ✦</div>
          ${interp.environmentalWarning ? `
            <div style="margin-bottom: 12px;">
              <strong style="color: #fbbf24; font-size: 13px;">Environmental Warning:</strong>
              <p class="quote" style="margin-top: 4px;">${interp.environmentalWarning}</p>
            </div>
          ` : ''}
          ${interp.whyMiningMustStop ? `
            <div style="margin-bottom: 12px;">
              <strong style="color: #f87171; font-size: 13px;">Why Mining Must Stop:</strong>
              <p class="quote" style="font-style: italic; margin-top: 4px;">"${interp.whyMiningMustStop}"</p>
            </div>
          ` : ''}
          ${interp.earthMandate ? `
            <div>
              <strong style="color: #6ee7b7; font-size: 13px;">Earth Mandate:</strong>
              <p class="quote" style="font-weight: 500; margin-top: 4px;">${interp.earthMandate}</p>
            </div>
          ` : ''}
        </div>
      ` : ''}

      <div class="grid" style="margin-top:20px;">
        <div class="card" style="border-color:#991b1b;">
          <div class="card-title" style="color:#f87171;">The Shadow Vein</div>
          <p class="quote">${interp.shadowVein}</p>
        </div>
        <div class="card" style="border-color:#065f46;">
          <div class="card-title" style="color:#34d399;">The Chthonic Mandate</div>
          <p class="quote">${interp.chthonicMandate}</p>
        </div>
      </div>
    ` : ''}

    <div class="footer">
      INSCRIBED IN SUBTERRANEA • RAINSTARTERRAIN PROFESEYS
    </div>
  </div>
</body>
</html>`;

  const fileName = `Prophecy_Illuminated_${(reading.targetFutureDate || 'Reading').replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().toISOString().slice(0, 10)}.html`;
  downloadFile(html, fileName, 'text/html');
}

/**
 * Downloads a single reading / prophecy as raw JSON data.
 */
export function exportReadingAsJson(reading: DivinationReading) {
  const jsonStr = JSON.stringify(reading, null, 2);
  const fileName = `Prophecy_Data_${(reading.targetFutureDate || 'Reading').replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().toISOString().slice(0, 10)}.json`;
  downloadFile(jsonStr, fileName, 'application/json');
}

