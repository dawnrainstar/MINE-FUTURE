import React, { useState, useEffect } from 'react';
import { CommercialSettings, ClientOrder, CreditTransaction, DivinationReading, SpreadType } from '../types';
import {
  getCommercialSettings,
  saveCommercialSettings,
  getUserCredits,
  addCredits,
  getClientOrders,
  saveClientOrder,
  deleteClientOrder,
  downloadClientDeliveryPack,
  generateClientEmailDeliveryText,
  getMineralPurchaseLink,
  DEFAULT_COMMERCIAL_SETTINGS,
} from '../utils/commercialEngine';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  DollarSign,
  CreditCard,
  ShoppingBag,
  Sparkles,
  UserCheck,
  CheckCircle,
  Copy,
  Download,
  Settings,
  Award,
  Zap,
  ExternalLink,
  Plus,
  Trash2,
  Package,
  Layers,
  ArrowRight,
  TrendingUp,
  FileText,
  Store,
  RefreshCw,
} from 'lucide-react';

interface CommercialModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedReadings: DivinationReading[];
  onTriggerClientReading?: (order: ClientOrder) => void;
}

type CommercialTab = 'checkout' | 'orders' | 'apothecary' | 'settings' | 'business_kit';

export const CommercialModal: React.FC<CommercialModalProps> = ({
  isOpen,
  onClose,
  savedReadings,
  onTriggerClientReading,
}) => {
  const [activeTab, setActiveTab] = useState<CommercialTab>('checkout');
  const [settings, setSettings] = useState<CommercialSettings>(getCommercialSettings());
  const [credits, setCredits] = useState<number>(getUserCredits());
  const [orders, setOrders] = useState<ClientOrder[]>(getClientOrders());
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState<string | null>(null);

  // New Client Order State
  const [newClientName, setNewClientName] = useState<string>('');
  const [newClientEmail, setNewClientEmail] = useState<string>('');
  const [newClientInquiry, setNewClientInquiry] = useState<string>('');
  const [newClientTargetDate, setNewClientTargetDate] = useState<string>(
    new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0]
  );
  const [newClientSpread, setNewClientSpread] = useState<SpreadType>('strata3');
  const [newClientPrice, setNewClientPrice] = useState<number>(settings.singleReadingPrice);
  const [newClientNote, setNewClientNote] = useState<string>('May this subterranean alignment bring sovereignty and clarity to your path.');
  const [selectedReadingForOrder, setSelectedReadingForOrder] = useState<string>(
    savedReadings.length > 0 ? savedReadings[0].id : ''
  );

  useEffect(() => {
    const handleSettingsUpdate = () => setSettings(getCommercialSettings());
    const handleCreditsUpdate = () => setCredits(getUserCredits());
    const handleOrdersUpdate = () => setOrders(getClientOrders());

    window.addEventListener('commercial_settings_updated', handleSettingsUpdate);
    window.addEventListener('user_credits_updated', handleCreditsUpdate);
    window.addEventListener('client_orders_updated', handleOrdersUpdate);

    return () => {
      window.removeEventListener('commercial_settings_updated', handleSettingsUpdate);
      window.removeEventListener('user_credits_updated', handleCreditsUpdate);
      window.removeEventListener('client_orders_updated', handleOrdersUpdate);
    };
  }, []);

  if (!isOpen) return null;

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    saveCommercialSettings(settings);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleSimulatedPurchase = (amountCredits: number, costStr: string, packTitle: string) => {
    // If external stripe link exists and user wants real redirect
    if (settings.stripePaymentLink && window.confirm(`Redirect to secure Stripe checkout for ${packTitle} (${costStr})?`)) {
      window.open(settings.stripePaymentLink, '_blank');
      return;
    }

    // Instant Sandbox Activation
    addCredits(amountCredits, `Purchased ${packTitle} (${costStr})`);
    setPurchaseSuccess(`Success! Added ${amountCredits} reading credits to your account.`);
    setTimeout(() => setPurchaseSuccess(null), 4000);
  };

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName.trim()) return;

    const matchedReading = savedReadings.find((r) => r.id === selectedReadingForOrder) || savedReadings[0];

    const newOrder: ClientOrder = {
      id: 'order_' + Date.now(),
      orderNumber: Math.floor(100000 + Math.random() * 900000).toString(),
      createdAt: Date.now(),
      clientName: newClientName.trim(),
      clientEmail: newClientEmail.trim(),
      inquiry: newClientInquiry.trim() || 'General Life & Destiny Alignment',
      targetDate: newClientTargetDate,
      spreadType: newClientSpread,
      practitionerNote: newClientNote,
      pricePaid: Number(newClientPrice) || settings.singleReadingPrice,
      status: matchedReading ? 'completed' : 'pending',
      reading: matchedReading,
    };

    saveClientOrder(newOrder);
    setNewClientName('');
    setNewClientEmail('');
    setNewClientInquiry('');

    if (matchedReading && onTriggerClientReading) {
      // Trigger reading view
    }
  };

  const handleCopyEmailText = (order: ClientOrder) => {
    const reading = order.reading || savedReadings[0];
    if (!reading) {
      alert('Please link a completed prophecy reading to this order before generating the delivery message.');
      return;
    }
    const text = generateClientEmailDeliveryText(order, reading, settings);
    navigator.clipboard.writeText(text);
    setCopiedMsgId(order.id);
    setTimeout(() => setCopiedMsgId(null), 3000);
  };

  const handleDownloadDelivery = (order: ClientOrder) => {
    const reading = order.reading || savedReadings[0];
    if (!reading) {
      alert('Please attach or generate a completed reading for this order first.');
      return;
    }
    downloadClientDeliveryPack(order, reading, settings);
  };

  const TOP_APOTHECARY_STONES = [
    { name: 'Raw Pyrite (Fool\'s Gold)', keyword: 'Wealth Sovereign & Manifestation', price: '$12 - $24' },
    { name: 'Natural Malachite', keyword: 'Deep Mantle Shielding & Heart Wisdom', price: '$18 - $38' },
    { name: 'Black Tourmaline & Hematite', keyword: 'Electromagnetic Grounding & Anchor', price: '$9 - $19' },
    { name: 'Raw Emerald & Green Beryl', keyword: 'Royal Abundance & Clear Vision', price: '$25 - $65' },
    { name: 'Natural Selenite & Optical Calcite', keyword: 'Crown Clarity & Date Resonance', price: '$14 - $28' },
    { name: 'Native Copper Specimen', keyword: 'Deal Conductivity & Energy Flow', price: '$16 - $32' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-stone-950/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-5xl bg-stone-900 border-2 border-amber-500/50 rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]"
      >
        {/* Modal Top Banner */}
        <div className="bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 px-6 py-4 border-b border-amber-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-300">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-serif font-bold text-amber-200 tracking-wide">
                  Monetization & Commercial Sales Hub
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500 text-[10px] font-mono text-emerald-300">
                  Ready to Monetize
                </span>
              </div>
              <p className="text-xs text-stone-400 font-sans">
                Sell readings to clients, accept payments, generate Etsy/Fiverr orders, and monetize mineral prescriptions.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-stone-950 border border-amber-500/30 text-xs font-mono text-amber-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Available Credits:</span>
              <strong className="text-amber-200 font-bold text-sm">{credits}</strong>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-stone-950/60 border border-stone-800 text-stone-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-stone-950/80 px-6 py-2.5 border-b border-stone-800 flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('checkout')}
            className={`px-3.5 py-2 rounded-xl text-xs font-serif flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === 'checkout'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                : 'bg-stone-900/80 text-stone-300 hover:bg-stone-800'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Reading Credits & Paywall</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-3.5 py-2 rounded-xl text-xs font-serif flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === 'orders'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                : 'bg-stone-900/80 text-stone-300 hover:bg-stone-800'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Client Order Fulfillment ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('apothecary')}
            className={`px-3.5 py-2 rounded-xl text-xs font-serif flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === 'apothecary'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                : 'bg-stone-900/80 text-stone-300 hover:bg-stone-800'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Mineral Apothecary & Affiliates</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-3.5 py-2 rounded-xl text-xs font-serif flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === 'settings'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                : 'bg-stone-900/80 text-stone-300 hover:bg-stone-800'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>White-Label Branding & Prices</span>
          </button>

          <button
            onClick={() => setActiveTab('business_kit')}
            className={`px-3.5 py-2 rounded-xl text-xs font-serif flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === 'business_kit'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                : 'bg-stone-900/80 text-stone-300 hover:bg-stone-800'
            }`}
          >
            <Store className="w-3.5 h-3.5" />
            <span>"Sell This App" Business Kit</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {purchaseSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-2xl bg-emerald-950 border border-emerald-500 text-emerald-200 text-sm font-serif flex items-center gap-3 shadow-lg"
            >
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>{purchaseSuccess}</span>
            </motion.div>
          )}

          {/* TAB 1: CHECKOUT & PAYWALL PACKAGES */}
          {activeTab === 'checkout' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-stone-950 border border-amber-500/30">
                <div>
                  <h3 className="text-base font-serif font-bold text-amber-200">
                    Your Current Inscription Credits
                  </h3>
                  <p className="text-xs text-stone-400 font-sans mt-0.5">
                    Credits are consumed when unlocking comprehensive multi-strata AI prophecy readings.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-2xl font-bold font-mono text-amber-400">{credits} Credits</div>
                    <div className="text-[10px] text-stone-400">Ready for Inscriptions</div>
                  </div>
                  <button
                    onClick={() => addCredits(5, 'Free Developer Test Credits')}
                    className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs font-mono border border-stone-700 transition-colors"
                    title="Add 5 free test credits for testing"
                  >
                    +5 Test Credits
                  </button>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-serif font-bold text-stone-200 mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Choose a Client / User Reading Package</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {/* Single Reading */}
                  <div className="p-6 rounded-2xl bg-stone-950 border border-stone-800 hover:border-amber-500/50 flex flex-col justify-between transition-all group">
                    <div>
                      <div className="text-xs font-mono text-stone-400 uppercase">Single Seeker</div>
                      <div className="text-xl font-serif font-bold text-white mt-1">Single Deep Prophecy</div>
                      <div className="text-3xl font-mono font-bold text-amber-400 my-3">
                        {settings.currencySymbol}{settings.singleReadingPrice}
                      </div>
                      <ul className="text-xs text-stone-300 space-y-2 font-sans">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-amber-400" />
                          <span>1 Full Future Date Oracle Reading</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-amber-400" />
                          <span>Complete Date Sacred Geometry</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-amber-400" />
                          <span>Illuminated HTML & Scroll Download</span>
                        </li>
                      </ul>
                    </div>

                    <div className="mt-6 space-y-2">
                      {settings.paypalPaymentLink && (
                        <a
                          href={settings.paypalPaymentLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-2.5 rounded-xl bg-[#0070BA] hover:bg-[#005ea6] text-white font-sans text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md"
                        >
                          <CreditCard className="w-3.5 h-3.5 text-amber-300" />
                          <span>Pay with PayPal ({settings.currencySymbol}{settings.singleReadingPrice})</span>
                          <ExternalLink className="w-3 h-3 text-stone-200" />
                        </a>
                      )}
                      <button
                        onClick={() => handleSimulatedPurchase(1, `${settings.currencySymbol}${settings.singleReadingPrice}`, 'Single Prophecy')}
                        className="w-full py-2 rounded-xl bg-stone-800 hover:bg-amber-500 hover:text-stone-950 text-amber-300 font-serif text-xs font-bold border border-stone-700 hover:border-amber-400 transition-all flex items-center justify-center gap-2"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        <span>Instant Unlock (1 Credit)</span>
                      </button>
                    </div>
                  </div>

                  {/* 5-Reading Bundle (Popular) */}
                  <div className="p-6 rounded-2xl bg-gradient-to-b from-amber-950/40 to-stone-950 border-2 border-amber-500 relative flex flex-col justify-between shadow-xl">
                    <div className="absolute -top-3 right-4 px-3 py-0.5 rounded-full bg-amber-500 text-stone-950 font-mono font-bold text-[10px] uppercase">
                      Most Popular
                    </div>
                    <div>
                      <div className="text-xs font-mono text-amber-400 uppercase">Seeker Bundle</div>
                      <div className="text-xl font-serif font-bold text-amber-200 mt-1">5-Reading Inscription Pack</div>
                      <div className="text-3xl font-mono font-bold text-amber-400 my-3">
                        {settings.currencySymbol}{settings.bundleReadingPrice}
                        <span className="text-xs text-stone-400 font-normal ml-2 line-through">
                          {settings.currencySymbol}{(settings.singleReadingPrice * 5).toFixed(2)}
                        </span>
                      </div>
                      <ul className="text-xs text-stone-200 space-y-2 font-sans">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-amber-400" />
                          <span><strong>5 Full Oracle Readings</strong> (Save 40%)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-amber-400" />
                          <span>Multi-Strata & 4-Tier Timelines</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-amber-400" />
                          <span>Client Order Certificates generator</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-amber-400" />
                          <span>Mineral Prescription affiliate shop</span>
                        </li>
                      </ul>
                    </div>

                    <div className="mt-6 space-y-2">
                      {settings.paypalPaymentLink && (
                        <a
                          href={settings.paypalPaymentLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-2.5 rounded-xl bg-[#0070BA] hover:bg-[#005ea6] text-white font-sans text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md"
                        >
                          <CreditCard className="w-3.5 h-3.5 text-amber-300" />
                          <span>Pay with PayPal ({settings.currencySymbol}{settings.bundleReadingPrice})</span>
                          <ExternalLink className="w-3 h-3 text-stone-200" />
                        </a>
                      )}
                      <button
                        onClick={() => handleSimulatedPurchase(5, `${settings.currencySymbol}${settings.bundleReadingPrice}`, '5-Reading Bundle')}
                        className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-serif text-xs font-bold shadow-lg transition-all flex items-center justify-center gap-2"
                      >
                        <Zap className="w-4 h-4" />
                        <span>Instant Unlock (5 Credits)</span>
                      </button>
                    </div>
                  </div>

                  {/* Monthly Unlimited / Master */}
                  <div className="p-6 rounded-2xl bg-stone-950 border border-stone-800 hover:border-amber-500/50 flex flex-col justify-between transition-all group">
                    <div>
                      <div className="text-xs font-mono text-stone-400 uppercase">Practitioner Tier</div>
                      <div className="text-xl font-serif font-bold text-white mt-1">Unlimited Monthly Pass</div>
                      <div className="text-3xl font-mono font-bold text-amber-400 my-3">
                        {settings.currencySymbol}{settings.monthlyPassPrice}
                        <span className="text-xs text-stone-400 font-normal">/mo</span>
                      </div>
                      <ul className="text-xs text-stone-300 space-y-2 font-sans">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-amber-400" />
                          <span><strong>Unlimited Prophecy Readings</strong></span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-amber-400" />
                          <span>Full Etsy / Fiverr Client Delivery Suite</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-amber-400" />
                          <span>Custom White-Label Branding</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-amber-400" />
                          <span>Google Drive Sync & Lifetime Export</span>
                        </li>
                      </ul>
                    </div>

                    <div className="mt-6 space-y-2">
                      {settings.paypalPaymentLink && (
                        <a
                          href={settings.paypalPaymentLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-2.5 rounded-xl bg-[#0070BA] hover:bg-[#005ea6] text-white font-sans text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md"
                        >
                          <CreditCard className="w-3.5 h-3.5 text-amber-300" />
                          <span>Subscribe via PayPal ({settings.currencySymbol}{settings.monthlyPassPrice})</span>
                          <ExternalLink className="w-3 h-3 text-stone-200" />
                        </a>
                      )}
                      <button
                        onClick={() => handleSimulatedPurchase(30, `${settings.currencySymbol}${settings.monthlyPassPrice}/mo`, 'Monthly Unlimited Pass')}
                        className="w-full py-2 rounded-xl bg-stone-800 hover:bg-amber-500 hover:text-stone-950 text-amber-300 font-serif text-xs font-bold border border-stone-700 hover:border-amber-400 transition-all flex items-center justify-center gap-2"
                      >
                        <Award className="w-3.5 h-3.5" />
                        <span>Instant Unlock (30 Credits)</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CLIENT ORDER FULFILLMENT */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-stone-950 border border-stone-800">
                <h3 className="text-base font-serif font-bold text-amber-200 mb-1">
                  Client Order Fulfillment (Etsy / Fiverr / Direct Clients)
                </h3>
                <p className="text-xs text-stone-400 font-sans">
                  When someone buys a reading from your Etsy shop, Fiverr gig, or Instagram, enter their details here to generate their personalized, illuminated prophecy certificate and email response.
                </p>
              </div>

              {/* Create Client Order Form */}
              <form onSubmit={handleCreateOrder} className="p-5 rounded-2xl bg-stone-950 border border-amber-500/30 space-y-4">
                <div className="text-sm font-serif font-bold text-amber-300 flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Inscribe New Client Order
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-stone-400 mb-1">Client Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={newClientName}
                      onChange={(e) => setNewClientName(e.target.value)}
                      className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-sm text-stone-100 focus:border-amber-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-stone-400 mb-1">Client Email (Optional)</label>
                    <input
                      type="email"
                      placeholder="client@example.com"
                      value={newClientEmail}
                      onChange={(e) => setNewClientEmail(e.target.value)}
                      className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-sm text-stone-100 focus:border-amber-500 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-stone-400 mb-1">Target Future Date</label>
                    <input
                      type="date"
                      value={newClientTargetDate}
                      onChange={(e) => setNewClientTargetDate(e.target.value)}
                      className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-sm text-stone-100 focus:border-amber-500 outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-stone-400 mb-1">Spread Archetype</label>
                    <select
                      value={newClientSpread}
                      onChange={(e) => setNewClientSpread(e.target.value as SpreadType)}
                      className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-sm text-stone-100 focus:border-amber-500 outline-none font-serif"
                    >
                      <option value="strata3">Strata 3 (Past, Present, Target Horizon)</option>
                      <option value="single">Single Seam (Core Sovereign Focus)</option>
                      <option value="cross4">Tectonic Cross (4 Cardinal Pressures)</option>
                      <option value="descent4">Mantle Descent (4-Tier Depth)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-stone-400 mb-1">Price Charged ({settings.currencySymbol})</label>
                    <input
                      type="number"
                      step="0.01"
                      value={newClientPrice}
                      onChange={(e) => setNewClientPrice(parseFloat(e.target.value))}
                      className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-sm text-stone-100 focus:border-amber-500 outline-none font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-stone-400 mb-1">Client's Specific Inquiry / Question</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. What financial breakthroughs and career alignment will unfold by this date?"
                    value={newClientInquiry}
                    onChange={(e) => setNewClientInquiry(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 rounded-xl p-3 text-sm text-stone-100 focus:border-amber-500 outline-none"
                  />
                </div>

                {savedReadings.length > 0 && (
                  <div>
                    <label className="block text-xs font-mono text-stone-400 mb-1">Attach Existing Saved Prophecy (or generate fresh)</label>
                    <select
                      value={selectedReadingForOrder}
                      onChange={(e) => setSelectedReadingForOrder(e.target.value)}
                      className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-sm text-stone-100 focus:border-amber-500 outline-none font-serif"
                    >
                      {savedReadings.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.interpretation?.oracularTitle || 'Prophecy'} ({new Date(r.timestamp).toLocaleDateString()}) - Target: {r.targetFutureDate || 'N/A'}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-serif text-xs font-bold transition-all shadow-md flex items-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Create & Package Client Order</span>
                  </button>
                </div>
              </form>

              {/* Existing Orders List */}
              <div className="space-y-3">
                <div className="text-sm font-serif font-bold text-stone-300">
                  Client Inscription History ({orders.length})
                </div>

                {orders.length === 0 ? (
                  <div className="p-8 text-center bg-stone-950 rounded-2xl border border-stone-800 text-stone-500 text-xs font-serif">
                    No client orders yet. Add your first order above to generate delivery packs!
                  </div>
                ) : (
                  orders.map((order) => (
                    <div
                      key={order.id}
                      className="p-4 rounded-2xl bg-stone-950 border border-stone-800 hover:border-amber-500/40 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-serif font-bold text-amber-200">{order.clientName}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-stone-900 border border-stone-700 text-stone-300">
                            #{order.orderNumber}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300">
                            {settings.currencySymbol}{order.pricePaid || settings.singleReadingPrice}
                          </span>
                        </div>
                        <p className="text-xs text-stone-400 font-sans mt-1">
                          Inquiry: "{order.inquiry}" • Target: {order.targetDate}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 flex-wrap">
                        <button
                          onClick={() => handleDownloadDelivery(order)}
                          className="px-3 py-1.5 rounded-xl bg-amber-950/80 hover:bg-amber-900 border border-amber-500/40 text-amber-300 text-xs font-serif flex items-center gap-1.5 transition-colors"
                          title="Download personalized illuminated HTML Certificate"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Delivery Pack (.html)</span>
                        </button>

                        <button
                          onClick={() => handleCopyEmailText(order)}
                          className="px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-300 text-xs font-serif flex items-center gap-1.5 transition-colors"
                          title="Copy message draft to paste into Etsy/Fiverr/Email"
                        >
                          {copiedMsgId === order.id ? (
                            <>
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-stone-400" />
                              <span>Copy Message</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => deleteClientOrder(order.id)}
                          className="p-1.5 rounded-xl hover:bg-red-950/80 text-stone-500 hover:text-red-400 transition-colors"
                          title="Delete record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 3: MINERAL APOTHECARY & AFFILIATES */}
          {activeTab === 'apothecary' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-stone-950 border border-stone-800">
                <h3 className="text-base font-serif font-bold text-amber-200 mb-1">
                  Mineral Apothecary & Crystal Affiliate Monetization
                </h3>
                <p className="text-xs text-stone-400 font-sans">
                  Every prophecy reading recommends specific geological stones in its "Chthonic Prescription". When seekers click to buy these stones, you earn affiliate revenue or sell from your own inventory.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {TOP_APOTHECARY_STONES.map((stone, idx) => {
                  const link = getMineralPurchaseLink(stone.name, settings);
                  return (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-stone-950 border border-stone-800 hover:border-amber-500/40 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="text-xs font-mono text-amber-400 uppercase">Prescription Element #{idx + 1}</div>
                        <h4 className="text-base font-serif font-bold text-stone-100 mt-1">{stone.name}</h4>
                        <p className="text-xs text-stone-400 mt-1 font-sans">{stone.keyword}</p>
                        <div className="text-sm font-mono text-amber-300 mt-2 font-bold">{stone.price} Est. Value</div>
                      </div>

                      <a
                        href={link}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 w-full py-2 rounded-xl bg-stone-900 hover:bg-amber-500 hover:text-stone-950 text-amber-300 font-serif text-xs font-bold border border-stone-700 hover:border-amber-400 transition-all flex items-center justify-center gap-2"
                      >
                        <span>Acquire Specimen</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: WHITE-LABEL BRANDING & SETTINGS */}
          {activeTab === 'settings' && (
            <form onSubmit={handleSaveSettings} className="space-y-6">
              <div className="p-5 rounded-2xl bg-stone-950 border border-stone-800 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-serif font-bold text-amber-200">
                    White-Label Customization & Brand Settings
                  </h3>
                  <p className="text-xs text-stone-400 font-sans mt-0.5">
                    Re-brand this application with your own business name, logo, custom prices, and payment gateway links.
                  </p>
                </div>
                {saveSuccess && (
                  <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500 text-xs font-serif flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5" /> Saved!
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono text-stone-400 mb-1">Application Title</label>
                  <input
                    type="text"
                    value={settings.appTitle}
                    onChange={(e) => setSettings({ ...settings, appTitle: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2.5 text-sm text-stone-100 focus:border-amber-500 outline-none font-serif font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-stone-400 mb-1">Tagline / Subtitle</label>
                  <input
                    type="text"
                    value={settings.tagline}
                    onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2.5 text-sm text-stone-100 focus:border-amber-500 outline-none font-sans"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-mono text-stone-400 mb-1">Practitioner Name</label>
                  <input
                    type="text"
                    value={settings.practitionerName}
                    onChange={(e) => setSettings({ ...settings, practitionerName: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2.5 text-sm text-stone-100 focus:border-amber-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-stone-400 mb-1">Practitioner Title</label>
                  <input
                    type="text"
                    value={settings.practitionerTitle}
                    onChange={(e) => setSettings({ ...settings, practitionerTitle: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2.5 text-sm text-stone-100 focus:border-amber-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-stone-400 mb-1">Contact Email</label>
                  <input
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2.5 text-sm text-stone-100 focus:border-amber-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
                <div>
                  <label className="block text-xs font-mono text-stone-400 mb-1">Currency Symbol</label>
                  <input
                    type="text"
                    value={settings.currencySymbol}
                    onChange={(e) => setSettings({ ...settings, currencySymbol: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2.5 text-sm text-stone-100 focus:border-amber-500 outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-stone-400 mb-1">Single Reading ({settings.currencySymbol})</label>
                  <input
                    type="number"
                    step="0.01"
                    value={settings.singleReadingPrice}
                    onChange={(e) => setSettings({ ...settings, singleReadingPrice: parseFloat(e.target.value) })}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2.5 text-sm text-stone-100 focus:border-amber-500 outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-stone-400 mb-1">5-Pack Bundle ({settings.currencySymbol})</label>
                  <input
                    type="number"
                    step="0.01"
                    value={settings.bundleReadingPrice}
                    onChange={(e) => setSettings({ ...settings, bundleReadingPrice: parseFloat(e.target.value) })}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2.5 text-sm text-stone-100 focus:border-amber-500 outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-stone-400 mb-1">Monthly Pass ({settings.currencySymbol})</label>
                  <input
                    type="number"
                    step="0.01"
                    value={settings.monthlyPassPrice}
                    onChange={(e) => setSettings({ ...settings, monthlyPassPrice: parseFloat(e.target.value) })}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2.5 text-sm text-stone-100 focus:border-amber-500 outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-mono text-stone-400 mb-1">PayPal Checkout / Button URL</label>
                  <input
                    type="url"
                    placeholder="https://www.paypal.com/ncp/payment/..."
                    value={settings.paypalPaymentLink}
                    onChange={(e) => setSettings({ ...settings, paypalPaymentLink: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2.5 text-sm text-stone-100 focus:border-amber-500 outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-stone-400 mb-1">Stripe Payment / Buy Link URL</label>
                  <input
                    type="url"
                    placeholder="https://buy.stripe.com/..."
                    value={settings.stripePaymentLink}
                    onChange={(e) => setSettings({ ...settings, stripePaymentLink: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2.5 text-sm text-stone-100 focus:border-amber-500 outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-stone-400 mb-1">Etsy Shop / Shopify Store URL</label>
                  <input
                    type="url"
                    placeholder="https://etsy.com/shop/..."
                    value={settings.etsyShopUrl}
                    onChange={(e) => setSettings({ ...settings, etsyShopUrl: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2.5 text-sm text-stone-100 focus:border-amber-500 outline-none font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSettings(DEFAULT_COMMERCIAL_SETTINGS)}
                  className="px-4 py-2.5 rounded-xl bg-stone-950 hover:bg-stone-800 text-stone-400 text-xs font-serif border border-stone-800"
                >
                  Reset Defaults
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-serif text-xs font-bold transition-all shadow-md flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Save Brand & Pricing Settings</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 5: "SELL THIS APP" BUSINESS KIT */}
          {activeTab === 'business_kit' && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/60 via-stone-900 to-amber-950/60 border border-amber-500/40">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-mono uppercase tracking-wider mb-1">
                  <Store className="w-4 h-4" /> Turnkey Digital Business Blueprint
                </div>
                <h3 className="text-xl font-serif font-bold text-white mb-2">
                  How to Make High Revenue Selling This Software & Its Readings
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 font-serif leading-relaxed">
                  You now own a complete digital asset combining AI prophecy generation, 2,500+ world mines database, date sacred geometry, and automated client certificate delivery. Here are the 3 best ways to turn this into income:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Method 1 */}
                <div className="p-5 rounded-2xl bg-stone-950 border border-stone-800 space-y-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 font-bold font-mono">
                    1
                  </div>
                  <h4 className="text-base font-serif font-bold text-amber-200">
                    Sell Custom Readings on Etsy & Fiverr ($15 - $45 / order)
                  </h4>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    List a service titled <em>"Personalized Astrological Earth Prophecy & Future Date Reading"</em>. When orders come in, input their target date and question here, click <strong>Download Delivery Pack</strong>, and deliver the gold-illuminated HTML certificate.
                  </p>
                </div>

                {/* Method 2 */}
                <div className="p-5 rounded-2xl bg-stone-950 border border-stone-800 space-y-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 font-bold font-mono">
                    2
                  </div>
                  <h4 className="text-base font-serif font-bold text-amber-200">
                    White-Label & Sell to Spiritual Practitioners ($500 - $1,500)
                  </h4>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    Tarot readers, astrologers, and spiritual coaches love having custom branded web apps for their followers. Use the <strong>White-Label Branding</strong> tab to customize the app with their logo and name, then sell the turnkey app as a custom digital portal.
                  </p>
                </div>

                {/* Method 3 */}
                <div className="p-5 rounded-2xl bg-stone-950 border border-stone-800 space-y-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 font-bold font-mono">
                    3
                  </div>
                  <h4 className="text-base font-serif font-bold text-amber-200">
                    Sell as a Web App Asset on Flippa / Acquire ($2,000 - $8,000)
                  </h4>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    List this complete full-stack web application on digital marketplaces as an AI Spiritual SaaS with integrated Stripe checkout, Google Maps cartography, and offline capabilities.
                  </p>
                </div>
              </div>

              {/* Copy-Paste Etsy Listing Template */}
              <div className="p-5 rounded-2xl bg-stone-950 border border-stone-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-mono text-amber-400 uppercase">
                    Ready-to-Use Etsy / Fiverr Gig Description Template
                  </div>
                  <button
                    onClick={() => {
                      const sampleListing = `🔮 PERSONALIZED ASTROLOGY & EARTH MANTLE FUTURE PROPHECY READING 🔮

Are you seeking clarity on an upcoming date, milestone, or life transition?

Using the sacred geometry of your target date and the subterranean resonance of world mineral veins, I will inscribe a comprehensive future prophecy exclusively for you.

✦ WHAT YOU RECEIVE:
• Complete Narrative Prophecy & Mantle Poem
• Four Pillars of Prognostication: Manifesting Breakthrough, Dissolving Blockage, Pivotal Crossroads, and Bedrock Destiny
• Sacred Date Geometry: Solar Phase Angle & Harmonic Frequency
• Custom Chthonic Prescription: Prescribed crystals and grounding rituals
• Delivered as an illuminated, gold-styled printable certificate (.html and .txt)

✦ HOW TO ORDER:
1. Provide your Name
2. State your Target Future Date
3. Provide your specific question or area of focus`;
                      navigator.clipboard.writeText(sampleListing);
                      alert('Listing template copied to clipboard!');
                    }}
                    className="px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-300 text-xs font-serif flex items-center gap-1.5"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Listing Template</span>
                  </button>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-900/60 border border-stone-800 text-xs text-stone-300 font-mono whitespace-pre-line leading-relaxed max-h-40 overflow-y-auto">
                  {`🔮 PERSONALIZED ASTROLOGY & EARTH MANTLE FUTURE PROPHECY READING 🔮\n\nAre you seeking clarity on an upcoming date, milestone, or life transition?\n\nUsing the sacred geometry of your target date and the subterranean resonance of world mineral veins, I will inscribe a comprehensive future prophecy exclusively for you.\n\n✦ WHAT YOU RECEIVE:\n• Complete Narrative Prophecy & Mantle Poem\n• Four Pillars of Prognostication: Manifesting Breakthrough, Dissolving Blockage, Pivotal Crossroads, and Bedrock Destiny\n• Sacred Date Geometry: Solar Phase Angle & Harmonic Frequency\n• Custom Chthonic Prescription: Prescribed crystals and grounding rituals\n• Delivered as an illuminated, gold-styled printable certificate (.html and .txt)`}
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
