import { CommercialSettings, ClientOrder, CreditTransaction, DivinationReading } from '../types';
import { calculateDateGeometry } from '../data/pennickEngine';
import { downloadFile } from './offlineEngine';

const SETTINGS_KEY = 'astrology_profesey_commercial_settings_v1';
const CREDITS_KEY = 'astrology_profesey_user_credits_v2';
const TRANSACTIONS_KEY = 'astrology_profesey_transactions_v1';
const ORDERS_KEY = 'astrology_profesey_client_orders_v1';
const READINGS_COUNT_KEY = 'astrology_profesey_readings_used_v1';
const LIFETIME_SUBSCRIPTION_KEY = 'astrology_profesey_lifetime_v1';

export const TOTAL_FREE_READINGS = 100;
export const LIFETIME_SUBSCRIPTION_PRICE = 50.0;

export const DEFAULT_COMMERCIAL_SETTINGS: CommercialSettings = {
  appTitle: 'ASTROLOGY PROFESEY READINGS',
  tagline: 'Planetary Mantle Divination & Sacred Future Geometry',
  practitionerName: 'Oracle Practitioner',
  practitionerTitle: 'Chthonic Astrologer & Earth Cartographer',
  contactEmail: 'readings@profesey.oracle',
  currencySymbol: '$',
  singleReadingPrice: 15.0,
  bundleReadingPrice: 45.0,
  monthlyPassPrice: 29.0,
  stripePaymentLink: '',
  paypalPaymentLink: 'https://www.paypal.com/ncp/payment/WRP73U58VBEZG',
  etsyShopUrl: '',
  affiliateAmazonTag: '',
  enablePaywall: false,
  freeDailyReadingsLimit: 100,
};

export function getCommercialSettings(): CommercialSettings {
  try {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (stored) return { ...DEFAULT_COMMERCIAL_SETTINGS, ...JSON.parse(stored) };
  } catch {}
  return DEFAULT_COMMERCIAL_SETTINGS;
}

export function saveCommercialSettings(settings: CommercialSettings): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    window.dispatchEvent(new Event('commercial_settings_updated'));
  } catch (e) {
    console.error('Failed to save commercial settings:', e);
  }
}

export function getUserCredits(): number {
  try {
    const stored = localStorage.getItem(CREDITS_KEY);
    if (stored !== null) return parseInt(stored, 10);
  } catch {}
  return TOTAL_FREE_READINGS;
}

export function setUserCredits(credits: number): void {
  try {
    localStorage.setItem(CREDITS_KEY, credits.toString());
    window.dispatchEvent(new Event('user_credits_updated'));
  } catch (e) {
    console.error('Failed to set user credits:', e);
  }
}

export function addCredits(amount: number, description: string = 'Credit Purchase'): number {
  const current = getUserCredits();
  const next = current + amount;
  setUserCredits(next);

  const tx: CreditTransaction = {
    id: 'tx_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
    timestamp: Date.now(),
    type: 'purchase',
    amount,
    description,
  };
  addTransaction(tx);
  return next;
}

export function consumeCredit(description: string = 'Oracle Reading Inscription'): boolean {
  const current = getUserCredits();
  if (current <= 0) return false;
  const next = current - 1;
  setUserCredits(next);

  const tx: CreditTransaction = {
    id: 'tx_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
    timestamp: Date.now(),
    type: 'use',
    amount: -1,
    description,
  };
  addTransaction(tx);
  return true;
}

export function getTransactions(): CreditTransaction[] {
  try {
    const stored = localStorage.getItem(TRANSACTIONS_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return [];
}

function addTransaction(tx: CreditTransaction): void {
  try {
    const list = getTransactions();
    localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify([tx, ...list]));
  } catch (e) {
    console.error('Failed to add transaction:', e);
  }
}

// Client Orders Management
export function getClientOrders(): ClientOrder[] {
  try {
    const stored = localStorage.getItem(ORDERS_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return [];
}

export function saveClientOrder(order: ClientOrder): void {
  try {
    const list = getClientOrders();
    const existingIdx = list.findIndex((o) => o.id === order.id);
    let updated: ClientOrder[];
    if (existingIdx >= 0) {
      updated = [...list];
      updated[existingIdx] = order;
    } else {
      updated = [order, ...list];
    }
    localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('client_orders_updated'));
  } catch (e) {
    console.error('Failed to save client order:', e);
  }
}

export function deleteClientOrder(orderId: string): void {
  try {
    const list = getClientOrders().filter((o) => o.id !== orderId);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(list));
    window.dispatchEvent(new Event('client_orders_updated'));
  } catch (e) {
    console.error('Failed to delete client order:', e);
  }
}

/**
 * Builds an affiliate / shop link for a given mineral name.
 */
export function getMineralPurchaseLink(mineralName: string, settings: CommercialSettings): string {
  if (settings.etsyShopUrl) {
    return `${settings.etsyShopUrl}/search?q=${encodeURIComponent(mineralName + ' raw stone')}`;
  }
  const query = encodeURIComponent(`raw ${mineralName} crystal natural stone`);
  if (settings.affiliateAmazonTag) {
    return `https://www.amazon.com/s?k=${query}&tag=${settings.affiliateAmazonTag}`;
  }
  return `https://www.google.com/search?q=${query}&tbm=shop`;
}

/**
 * Generates an illuminated, client-ready customized HTML certificate & prophecy report for paying clients.
 */
export function generateClientDeliveryHtml(order: ClientOrder, reading: DivinationReading, settings: CommercialSettings): string {
  const dateStr = new Date(reading.timestamp).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const dateGeom = calculateDateGeometry(reading.targetFutureDate || new Date(reading.timestamp).toISOString().split('T')[0]);
  const interp = reading.interpretation;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${settings.appTitle} - Client Reading for ${order.clientName}</title>
  <style>
    body {
      background-color: #0c0a09;
      color: #f5f5f4;
      font-family: 'Cinzel', 'Georgia', serif;
      margin: 0;
      padding: 40px 20px;
      line-height: 1.6;
    }
    .container {
      max-width: 860px;
      margin: 0 auto;
      background: #1c1917;
      border: 2px solid #d97706;
      border-radius: 24px;
      padding: 40px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.8), 0 0 40px rgba(245,158,11,0.2);
    }
    .top-badge {
      display: inline-block;
      padding: 6px 16px;
      background: #451a03;
      border: 1px solid #f59e0b;
      border-radius: 9999px;
      font-size: 11px;
      font-family: monospace;
      color: #fef08a;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      margin-bottom: 16px;
    }
    .header {
      text-align: center;
      border-bottom: 2px solid #78350f;
      padding-bottom: 24px;
      margin-bottom: 30px;
    }
    h1 {
      color: #fef3c7;
      font-size: 32px;
      margin: 10px 0;
      letter-spacing: 0.05em;
    }
    .client-card {
      background: #292524;
      border: 1px solid #57534e;
      border-radius: 16px;
      padding: 20px;
      margin-bottom: 24px;
    }
    .client-title {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      color: #f59e0b;
      font-weight: bold;
      margin-bottom: 8px;
    }
    .client-name {
      font-size: 20px;
      font-weight: bold;
      color: #fff;
    }
    .strophe {
      font-style: italic;
      color: #fde047;
      font-size: 18px;
      background: #292524;
      border-left: 4px solid #f59e0b;
      padding: 18px 24px;
      border-radius: 10px;
      margin: 24px 0;
      white-space: pre-line;
      text-align: center;
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
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
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
      font-size: 15px;
      margin-bottom: 6px;
    }
    .quote {
      color: #d6d3d1;
      font-size: 14px;
      line-height: 1.6;
    }
    .practitioner-signature {
      margin-top: 40px;
      border-top: 1px solid #44403c;
      padding-top: 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;
    }
    .sig-name {
      font-size: 16px;
      font-weight: bold;
      color: #f59e0b;
    }
    .sig-title {
      font-size: 12px;
      color: #a8a29e;
    }
    @media print {
      body { background: #fff; color: #111; padding: 0; }
      .container { border: 1px solid #000; box-shadow: none; background: #fff; }
      .strophe, .section, .card, .client-card { background: #f5f5f4; border-color: #ccc; }
      h1, .card-title, .client-name { color: #000; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="top-badge">${settings.appTitle} • CONFIDENTIAL CLIENT INSCRIPTION</div>
      <h1>${interp?.oracularTitle || 'Subterranean Future Prophecy'}</h1>
      <div style="font-size:12px; color:#a8a29e; font-family:monospace;">
        Inscribed on ${dateStr} • Order Ref: #${order.orderNumber}
      </div>
    </div>

    <div class="client-card">
      <div class="client-title">Inscribed Exclusively For</div>
      <div class="client-name">${order.clientName}</div>
      <div class="quote" style="margin-top:8px;">
        <strong>Target Future Horizon:</strong> ${reading.targetFutureDate || order.targetDate || 'The Unfolding Future'} (${reading.timeHorizon || 'Standard Horizon'})<br>
        <strong>Inquiry of Record:</strong> "${order.inquiry || reading.question}"
      </div>
      ${order.practitionerNote ? `
        <div style="margin-top:12px; padding-top:12px; border-top:1px dashed #57534e; font-size:13px; color:#fde68a;">
          <strong>Personal Note from ${settings.practitionerName}:</strong> "${order.practitionerNote}"
        </div>
      ` : ''}
    </div>

    ${interp?.mantleStrophe ? `<div class="strophe">"${interp.mantleStrophe}"</div>` : ''}

    <div class="section">
      <div class="section-title">Sacred Astronomical Geometry of ${dateGeom.targetDate}</div>
      <div class="grid">
        <div class="card">
          <div class="card-title">Solar Alignment</div>
          <div class="quote">
            Station: ${dateGeom.astronomicalStation}<br>
            Solar Phase Angle: ${dateGeom.solarPhaseAngleDeg}° (Day ${dateGeom.dayOfYear}/365)
          </div>
        </div>
        <div class="card">
          <div class="card-title">Harmonic Resonator</div>
          <div class="quote">
            Figure: ${dateGeom.geometricFigure} (${dateGeom.geometricSymbol})<br>
            Mantle Pulse: ${dateGeom.harmonicResonanceHz}
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">Communing World Mines & Mineral Veins</div>
      <div class="grid">
        ${reading.drawnMines.map((d, i) => `
          <div class="card">
            <div class="card-title">${d.position?.name || `Position ${i+1}`}: ${d.mine.name}</div>
            <div style="font-size:11px; font-family:monospace; color:#a8a29e; margin-bottom:6px;">
              ${d.mine.location}, ${d.mine.country} • Lat ${d.mine.lat}°, Lng ${d.mine.lng}° • Depth: -${d.mine.depthMeters}m
            </div>
            <p class="quote">
              <strong>Primary Mineral:</strong> ${d.mine.primaryMineral} (${d.isUpright ? 'Open Vein / Upright' : 'Deep Pressure / Inverted'})<br>
              <strong>Personified Spirit:</strong> ${d.mine.titaness?.name || d.mine.feminineArchetype || 'Mantle Spirit'}<br>
              <strong>Transmission:</strong> ${d.isUpright ? d.mine.uprightMeaning : d.mine.invertedMeaning}
            </p>
          </div>
        `).join('')}
      </div>
    </div>

    ${interp ? `
      <div class="section">
        <div class="section-title">The Complete Tectonic Narrative Synthesis</div>
        <p class="quote" style="font-size:15px; white-space:pre-line;">${interp.tectonicSynthesis}</p>
      </div>

      ${interp.futurePrediction ? `
        <div class="section">
          <div class="section-title">Four Pillars of Prognostication (By ${reading.targetFutureDate || order.targetDate || 'Target Date'})</div>
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
          <div class="section-title">Personalized Chthonic Prescription & Remedies</div>
          <div class="grid">
            <div class="card">
              <div class="card-title">Sacred Grounding Ritual</div>
              <p class="quote">${interp.chthonicPrescription.groundingRitual}</p>
            </div>
            <div class="card">
              <div class="card-title">Mantle Pressure Regulation</div>
              <p class="quote">${interp.chthonicPrescription.mantleRemedy}</p>
            </div>
          </div>
          <div style="margin-top:16px;">
            <div class="card-title" style="font-size:13px;">Prescribed Minerals & Stones:</div>
            <ul style="font-size:14px; color:#d6d3d1; padding-left:20px;">
              ${interp.chthonicPrescription.prescribedMinerals.map(m => `
                <li style="margin-bottom:6px;">
                  <strong>${m.name}:</strong> ${m.action} (<em>${m.resonance}</em>)
                </li>
              `).join('')}
            </ul>
          </div>
        </div>
      ` : ''}

      <div class="grid">
        <div class="card" style="border-color:#991b1b;">
          <div class="card-title" style="color:#f87171;">Shadow Vein (Hidden Pressure)</div>
          <p class="quote">${interp.shadowVein}</p>
        </div>
        <div class="card" style="border-color:#065f46;">
          <div class="card-title" style="color:#34d399;">Chthonic Mandate (Grounding Action)</div>
          <p class="quote">${interp.chthonicMandate}</p>
        </div>
      </div>
    ` : ''}

    <div class="practitioner-signature">
      <div>
        <div class="sig-name">${settings.practitionerName}</div>
        <div class="sig-title">${settings.practitionerTitle} • ${settings.contactEmail}</div>
      </div>
      <div style="font-size:11px; color:#78716c; font-family:monospace; text-align:right;">
        ${settings.appTitle}<br>
        All Rights Reserved • Certified Inscription
      </div>
    </div>
  </div>
</body>
</html>`;
}

/**
 * Generates ready-to-send Etsy / Fiverr / Email delivery message text.
 */
export function generateClientEmailDeliveryText(order: ClientOrder, reading: DivinationReading, settings: CommercialSettings): string {
  const interp = reading.interpretation;
  return `Hi ${order.clientName},

Thank you for your order! Your complete personalized ${settings.appTitle} has been inscribed and calculated with sacred earth geometry for your target date (${reading.targetFutureDate || order.targetDate}).

✦ SUMMARY OF YOUR INSCRIBED READING ✦
Title: ${interp?.oracularTitle || 'The Chthonic Prophecy'}
Inquiry: "${order.inquiry || reading.question}"
Target Date: ${reading.targetFutureDate || order.targetDate}

"${interp?.mantleStrophe || ''}"

✦ KEY MANIFESTING BREAKTHROUGH:
${interp?.futurePrediction?.manifestEvent || 'A major breakthrough will crystallize on your target date.'}

✦ DISSOLVING OBSTACLE:
${interp?.futurePrediction?.dissolvingObstacle || 'Outdated resistance is clearing.'}

✦ YOUR CHTHONIC MANDATE:
"${interp?.chthonicMandate || ''}"

I have attached your full Illuminated Prophecy Certificate & Sacred Geometry Document (.html and .txt). You can open it in any browser or print it as a keepsake.

Wishing you sovereign clarity and grounded abundance,

${settings.practitionerName}
${settings.practitionerTitle}
${settings.contactEmail}`;
}

export function downloadClientDeliveryPack(order: ClientOrder, reading: DivinationReading, settings: CommercialSettings): void {
  const html = generateClientDeliveryHtml(order, reading, settings);
  const cleanName = order.clientName.replace(/[^a-zA-Z0-9]/g, '_');
  downloadFile(html, `Prophecy_Reading_For_${cleanName}_Order_${order.orderNumber}.html`, 'text/html');
}

/**
 * Returns how many free readings the user has completed so far.
 */
export function getReadingsUsedCount(): number {
  try {
    const stored = localStorage.getItem(READINGS_COUNT_KEY);
    if (stored !== null) {
      return parseInt(stored, 10) || 0;
    }
  } catch {}
  return 0;
}

export function incrementReadingsUsed(): number {
  const current = getReadingsUsedCount();
  const next = current + 1;
  try {
    localStorage.setItem(READINGS_COUNT_KEY, next.toString());
    window.dispatchEvent(new Event('readings_used_updated'));
  } catch (e) {
    console.error('Failed to update readings count:', e);
  }
  return next;
}

/**
 * Returns whether user has activated the $50 Lifetime Subscription.
 */
export function isLifetimeSubscriber(): boolean {
  try {
    const stored = localStorage.getItem(LIFETIME_SUBSCRIPTION_KEY);
    if (stored !== null) {
      return JSON.parse(stored) === true;
    }
  } catch {}
  return false;
}

export function activateLifetimeSubscription(): void {
  try {
    localStorage.setItem(LIFETIME_SUBSCRIPTION_KEY, JSON.stringify(true));
    window.dispatchEvent(new Event('lifetime_subscription_updated'));
    window.dispatchEvent(new Event('commercial_settings_updated'));
  } catch (e) {
    console.error('Failed to activate lifetime subscription:', e);
  }
}

export function deactivateLifetimeSubscription(): void {
  try {
    localStorage.setItem(LIFETIME_SUBSCRIPTION_KEY, JSON.stringify(false));
    window.dispatchEvent(new Event('lifetime_subscription_updated'));
  } catch (e) {
    console.error('Failed to deactivate lifetime subscription:', e);
  }
}

/**
 * Calculates remaining free readings (0 to 100).
 */
export function getRemainingFreeReadings(): number {
  if (isLifetimeSubscriber()) return Infinity;
  const used = getReadingsUsedCount();
  return Math.max(0, TOTAL_FREE_READINGS - used);
}
