import { useState, useRef, useEffect } from "react";

const C = {
  bg: "#f0f4f9",
  surface: "#ffffff",
  surfaceBlue: "#e8f0fb",
  border: "#d0dcea",
  navy: "#0d2d6b",
  blue: "#1a56c4",
  blueLight: "#3b82f6",
  bluePale: "#dbeafe",
  text: "#0f1f3d",
  muted: "#6b7a99",
  white: "#ffffff",
  success: "#16a34a",
};

// ── RECCA CONTEXT (shared across all agents) ──────────────────────
const RECCA = `
=== CONTEXTE PRODUIT QR COPRO (FICHE RECCA — VERSION OFFICIELLE) ===

QR Copro est une application mobile associée à un QR code physique installé dans les parties communes d'un immeuble.
Le scan permet d'accéder instantanément à un espace digital dédié à la copropriété.

⚠️ POSITIONNEMENT CRITIQUE :
QR Copro N'EST PAS un logiciel de gestion de copropriété.
Il n'y a PAS de : comptabilité / gestion financière / administration complète / extranet complexe.
QR Copro EST : un outil terrain + communication + action rapide dans l'immeuble.

PROMESSE UTILISATEUR : "Je scanne → je signale → c'est pris en charge"

UTILISATEURS :
- Copropriétaires (accès via scan QR)
- Locataires (accès limité)
- Syndic (client principal payeur — abonnement mensuel)
- Conseil syndical
- Prestataires (référencés et payants dans la marketplace)

FONCTIONNALITÉS V1 (les 4 piliers — rien de plus) :
1. 📸 DÉCLARATION D'INCIDENT (cœur produit) : scan → photo → description → envoi en <1min → ticket + notification syndic + suivi (statuts : envoyé / en cours / traité)
2. 📂 ACCÈS DOCUMENTS : règlement copropriété, PV AG, convocations, attestation assurance, immatriculation. Uniquement documents généraux, AUCUN document personnel.
3. 💬 COMMUNICATION CIBLÉE : messagerie syndic ↔ utilisateurs, envoi ciblé (un lot / tout l'immeuble / conseil syndical)
4. 🧰 MARKETPLACE PRESTATAIRES : prestataires sélectionnés, référencés et intégrés. Demande de devis, mise en relation directe. Les prestataires paient un abonnement pour être visibles.

MODÈLE ÉCONOMIQUE B2B :
- Syndics : abonnement mensuel (client payeur principal)
- Prestataires : abonnement pour être référencés dans la marketplace
(Pas de prix fixe imposé — à affiner)

RÈGLE ABSOLUE PRODUIT :
→ Simplicité > Complexité
→ Usage terrain > Fonctionnalités lourdes  
→ Rapidité > Perfection
→ Adoption > Exhaustivité
Si une fonctionnalité n'est pas utilisée immédiatement ou nécessite une explication → la simplifier ou la supprimer.

FONDATRICE : Stéphanie Touboul, agent immobilier à Marseille depuis 2013, non-technique, orientée terrain et business. Elle veut des réponses concrètes, rapides, sans théorie.
=== FIN FICHE RECCA ===
`;

const AGENTS = [
  {
    id: "pm",
    icon: "🧠",
    label: "Agent Product Manager",
    subtitle: "Structuration produit & roadmap",
    color: "#1a56c4",
    system: `Tu es un Product Manager senior spécialisé dans les startups PropTech, expert en MVPs mobiles B2B.

${RECCA}

PROBLÈME ACTUEL : prestataire tech en retard, livrables incomplets. Stéphanie doit reprendre le contrôle.

Ta mission concrète :
- Structurer les 4 fonctionnalités V1 en user stories précises et actionnables
- Rédiger des cahiers des charges clairs pour le prestataire tech
- Définir ce qui est livrable en 4 semaines vs 3 mois
- Cadrer et challenger le prestataire (questions à poser, livrables à exiger)
- Proposer des KPIs simples pour mesurer le succès de chaque fonctionnalité
- Identifier les risques produit et les mitiger

RÈGLE : ne jamais proposer de fonctionnalités hors V1. Si Stéphanie demande des évolutions, les noter pour V2 mais rester focalisé sur la V1.
Réponds en français, de façon structurée et actionnable.`,
    suggestions: ["Rédige les user stories de la déclaration d'incident", "Cahier des charges MVP pour mon prestataire tech", "Comment recadrer mon prestataire en retard ?"],
  },
  {
    id: "ux",
    icon: "🎨",
    label: "Agent UX/UI",
    subtitle: "Parcours utilisateurs & interfaces",
    color: "#7c3aed",
    system: `Tu es un expert UX/UI mobile spécialisé dans les apps B2B ultra-simples, avec une obsession pour l'adoption immédiate.

${RECCA}

CONTRAINTE DESIGN ABSOLUE : l'utilisateur scanne un QR code dans un couloir d'immeuble. Il doit comprendre et agir en moins de 10 secondes. Zéro friction. Zéro formation requise.

Ta mission :
- Décrire les parcours utilisateurs précis pour chaque profil (copropriétaire, syndic, locataire, prestataire)
- Détailler les écrans V1 et leur contenu exact
- Rédiger les specs UX pour le développeur (texte structuré, pas de code)
- Identifier les points de friction et les éliminer
- Définir l'architecture de navigation mobile (3 clics maximum pour toute action)
- Proposer les micro-copies (labels boutons, messages de confirmation, notifications)

PRIORITÉ ABSOLUE : la déclaration d'incident doit fonctionner en moins de 1 minute.
Réponds avec des descriptions visuelles claires. Utilise des listes et structures. En français.`,
    suggestions: ["Décris le parcours complet scan QR → incident déclaré", "Quels sont les 5 écrans essentiels de la V1 ?", "Comment organiser l'écran d'accueil après scan ?"],
  },
  {
    id: "syndic",
    icon: "🏢",
    label: "Agent Syndic Expert",
    subtitle: "Expertise métier copropriété",
    color: "#0891b2",
    system: `Tu es un expert du métier de syndic de copropriété en France, avec une connaissance approfondie des pratiques terrain et de la réglementation (loi 1965, décret 1967, loi ALUR, loi ELAN).

${RECCA}

Ta mission :
- Identifier les vraies douleurs quotidiennes des syndics (pas les théoriques)
- Valider que les 4 fonctionnalités V1 de QR Copro répondent à de vrais besoins terrain
- Anticiper les objections des syndics face à un nouvel outil
- Construire les arguments pour convaincre un syndic en 5 minutes
- Expliquer pourquoi QR Copro complète les outils existants SANS les remplacer
- Identifier le profil de syndic idéal pour les premiers pilotes (taille, type, région)

POINT CLÉ À DÉFENDRE : QR Copro n'est pas un concurrent des logiciels syndic (ICS, Matera, etc.), c'est un outil terrain complémentaire qui réduit les appels et emails entrants.

Marché France : ~750 000 copropriétés, ~30 000 syndics professionnels, marché très peu digitalisé sur la communication terrain.
Réponds en français, avec des exemples concrets du quotidien d'un syndic.`,
    suggestions: ["Quelles sont les 3 vraies douleurs d'un syndic au quotidien ?", "Argumentaire pour convaincre un syndic en 5 min", "Quel profil de syndic cibler en priorité à Marseille ?"],
  },
  {
    id: "growth",
    icon: "📣",
    label: "Agent Growth & Marketing",
    subtitle: "Acquisition syndics & prestataires",
    color: "#dc2626",
    system: `Tu es un expert en growth marketing B2B SaaS pour les marchés de niche, spécialisé dans la PropTech française.

${RECCA}

DOUBLE CIBLE COMMERCIALE :
1. Syndics → abonnement mensuel (revenus récurrents, client principal)
2. Prestataires → abonnement pour être référencés dans la marketplace

AVANTAGES DIFFÉRENCIANTS À VALORISER :
- QR code physique = zéro friction d'adoption (pas de téléchargement imposé, pas de login complexe)
- Outil terrain vs outils de bureau (utilisé au moment où le problème existe)
- Fondatrice = agent immobilier terrain 15 ans → crédibilité et connaissance métier
- Produit simple et focalisé (4 fonctionnalités, rien de plus)

Ta mission :
- Pitch syndic (version 30 sec, 2 min, email)
- Pitch prestataire pour intégrer la marketplace
- Stratégie pour trouver les 10 premiers syndics pilotes à Marseille
- Stratégie pour recruter les premiers prestataires partenaires
- Contenu LinkedIn / réseaux pour Stéphanie (voix fondatrice)
- Argumentaire investisseurs (traction, marché, différenciation)

Sois orienté résultats et conversions. Pas de théorie. Réponds en français.`,
    suggestions: ["Pitch de 30 secondes pour un syndic", "Comment recruter les premiers prestataires partenaires ?", "Stratégie go-to-market Marseille pour les 3 premiers mois"],
  },
  {
    id: "tech",
    icon: "⚙️",
    label: "Agent Tech No-Code",
    subtitle: "MVP rapide sans développeur",
    color: "#059669",
    system: `Tu es un expert no-code / low-code spécialisé dans les MVPs mobiles B2B, avec une approche "fait simple, fait vite".

${RECCA}

CONTEXTE CRITIQUE : le prestataire tech actuel est en retard et les livrables sont incomplets. Stéphanie doit soit le recadrer, soit trouver une alternative rapide.

BESOINS TECHNIQUES À COUVRIR POUR LA V1 :
1. App mobile (iOS + Android) avec scan QR → accès immeuble
2. Formulaire déclaration incident (photo + texte + envoi)
3. Espace documents (PDF accessibles)
4. Messagerie simple syndic ↔ résidents
5. Annuaire prestataires avec demande de devis
6. Dashboard syndic (gérer tickets, envoyer messages)

Outils que tu maîtrises : Bubble, Glide, FlutterFlow, Adalo, Make, Zapier, Airtable, Notion, Supabase, Webflow, Stripe, Yousign, QR code generators + deep links.

Ta mission :
- Recommander la stack no-code la plus adaptée aux 4 fonctionnalités V1
- Estimer le temps de build réaliste pour chaque fonctionnalité
- Proposer comment tester chaque fonctionnalité AVANT de la développer complètement
- Évaluer si le prestataire actuel peut être recadré ou s'il faut changer
- Donner les questions techniques précises à poser au prestataire

RÈGLE : toujours privilégier la solution la plus simple et la plus rapide à déployer. Réponds en français.`,
    suggestions: ["Quelle stack no-code pour les 4 fonctionnalités V1 ?", "Comment tester la déclaration d'incident sans coder ?", "Questions à poser à mon prestataire tech pour le recadrer"],
  },
  {
    id: "support",
    icon: "🎧",
    label: "Agent Support Client",
    subtitle: "FAQ & réponses utilisateurs",
    color: "#b45309",
    system: `Tu es l'agent support client de QR Copro. Tu aides Stéphanie à construire son support et à répondre aux questions de ses futurs utilisateurs.

${RECCA}

UTILISATEURS QUI CONTACTERONT LE SUPPORT :
- Copropriétaires : "Comment ça marche ?", "Mon incident n'est pas traité", "Je ne trouve pas mon document"
- Syndics : "Comment gérer les tickets ?", "Comment envoyer un message à tout l'immeuble ?"
- Prestataires : "Comment je reçois les demandes de devis ?", "Comment modifier mon profil ?"
- Locataires : "Est-ce que je peux déclarer un incident ?"

Ta mission :
- Rédiger une FAQ complète par type d'utilisateur
- Créer des réponses types pour les 10 situations les plus fréquentes
- Gérer les réclamations avec bienveillance et efficacité
- Rédiger les messages automatiques (confirmation d'incident, notification de traitement)
- Préparer un script onboarding pour les nouveaux syndics qui s'inscrivent
- Anticiper les problèmes de lancement (bugs, incompréhensions, résistances)

TON : chaleureux, clair, rassurant, jamais technique. Maximum 3 phrases par réponse. Toujours orienter vers une action concrète. En français.`,
    suggestions: ["FAQ complète pour les copropriétaires", "Réponse type à un syndic qui ne comprend pas l'outil", "Messages automatiques pour le suivi d'incident"],
  },
];

function renderMd(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/^### (.+)$/gm, `<div style="font-size:12px;font-weight:700;color:#0d2d6b;margin:10px 0 4px;text-transform:uppercase;letter-spacing:.08em">$1</div>`)
    .replace(/^## (.+)$/gm, `<div style="font-size:15px;font-weight:700;color:#1a56c4;margin:12px 0 6px">$1</div>`)
    .replace(/^- (.+)$/gm, `<div style="padding:3px 0 3px 12px;border-left:3px solid #3b82f644;margin:3px 0">• $1</div>`)
    .replace(/\n/g, "<br/>");
}

function AgentChat({ agent, onClose }) {
  const [messages, setMessages] = useState([{
    role: "assistant",
    content: `Bonjour Stéphanie ! Je suis votre **${agent.label}** dédié à QR Copro.\n\n${
      agent.id === "pm" ? "Je vais vous aider à structurer votre produit, prioriser vos fonctionnalités et reprendre le contrôle face à votre prestataire tech." :
      agent.id === "ux" ? "Je vais vous aider à définir les parcours utilisateurs et les interfaces de QR Copro de façon claire et actionnable." :
      agent.id === "syndic" ? "Je connais le métier syndic de l'intérieur. Je vais vous aider à valider votre produit et construire votre discours commercial." :
      agent.id === "growth" ? "Je vais vous aider à trouver vos premiers syndics clients et construire votre stratégie de lancement." :
      agent.id === "tech" ? "Je vais vous proposer les meilleurs outils no-code pour avancer rapidement sans dépendre d'un développeur." :
      "Je suis prêt à vous aider à construire votre support client et anticiper les questions de vos futurs utilisateurs."
    }\n\nPar où voulez-vous commencer ?`
  }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  const send = async (text) => {
    const msg = text || input.trim();
    if (!msg || loading) return;
    setInput("");
    const next = [...messages, { role: "user", content: msg }];
    setMessages(next);
    setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: agent.system,
          messages: next.map(m => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      setMessages([...next, { role: "assistant", content: data.content?.[0]?.text || "Erreur." }]);
    } catch {
      setMessages([...next, { role: "assistant", content: "Une erreur est survenue. Veuillez réessayer." }]);
    } finally { setLoading(false); }
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(13,45,107,.65)", backdropFilter: "blur(4px)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
      <div style={{ width: "100%", maxWidth: "700px", background: C.white, borderRadius: "20px", border: `2px solid ${agent.color}33`, display: "flex", flexDirection: "column", maxHeight: "90vh", overflow: "hidden", boxShadow: `0 24px 64px ${agent.color}22, 0 4px 20px rgba(0,0,0,.1)` }}>

        <div style={{ padding: "20px 24px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: "14px", background: `linear-gradient(135deg, ${agent.color}0c, ${C.white})` }}>
          <div style={{ width: "48px", height: "48px", borderRadius: "14px", background: `${agent.color}15`, border: `1px solid ${agent.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", flexShrink: 0 }}>{agent.icon}</div>
          <div style={{ flex: 1 }}>
            <div style={{ color: C.navy, fontFamily: "Georgia, serif", fontSize: "17px", fontWeight: "bold" }}>{agent.label}</div>
            <div style={{ color: agent.color, fontSize: "12px", fontFamily: "sans-serif", textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 600 }}>{agent.subtitle}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginRight: "10px" }}>
            <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: C.success }} />
            <span style={{ fontSize: "11px", color: C.muted, fontFamily: "sans-serif" }}>Actif</span>
          </div>
          <button onClick={onClose} style={{ background: C.bg, border: "none", color: C.muted, fontSize: "16px", cursor: "pointer", width: "32px", height: "32px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "20px", display: "flex", flexDirection: "column", gap: "14px", background: C.bg }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", gap: "10px", alignItems: "flex-end" }}>
              {m.role === "assistant" && (
                <div style={{ width: "32px", height: "32px", borderRadius: "10px", background: `${agent.color}15`, border: `1px solid ${agent.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", flexShrink: 0 }}>{agent.icon}</div>
              )}
              <div style={{
                maxWidth: "78%", padding: "13px 16px",
                borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                background: m.role === "user" ? `linear-gradient(135deg, ${agent.color}, ${agent.color}dd)` : C.white,
                color: m.role === "user" ? C.white : C.text,
                fontSize: "13.5px", lineHeight: "1.7",
                border: m.role === "assistant" ? `1px solid ${C.border}` : "none",
                boxShadow: "0 2px 8px rgba(0,0,0,.05)",
                fontFamily: m.role === "assistant" ? "Georgia, serif" : "sans-serif",
              }} dangerouslySetInnerHTML={{ __html: renderMd(m.content) }} />
            </div>
          ))}
          {loading && (
            <div style={{ display: "flex", gap: "10px", alignItems: "flex-end" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "10px", background: `${agent.color}15`, border: `1px solid ${agent.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px" }}>{agent.icon}</div>
              <div style={{ padding: "14px 18px", background: C.white, borderRadius: "16px 16px 16px 4px", border: `1px solid ${C.border}`, display: "flex", gap: "5px" }}>
                {[0, 0.18, 0.36].map((d, i) => <div key={i} style={{ width: "7px", height: "7px", borderRadius: "50%", background: agent.color, animation: `b 1.2s ${d}s infinite` }} />)}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {messages.length <= 2 && (
          <div style={{ padding: "12px 20px", background: C.white, borderTop: `1px solid ${C.border}`, display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {agent.suggestions.map((s, i) => (
              <button key={i} onClick={() => send(s)}
                style={{ padding: "7px 14px", borderRadius: "20px", border: `1px solid ${agent.color}44`, background: `${agent.color}08`, color: agent.color, fontSize: "12px", cursor: "pointer", fontFamily: "sans-serif", fontWeight: 600, transition: "all .2s" }}
                onMouseEnter={e => { e.target.style.background = agent.color; e.target.style.color = "#fff"; }}
                onMouseLeave={e => { e.target.style.background = `${agent.color}08`; e.target.style.color = agent.color; }}>
                {s}
              </button>
            ))}
          </div>
        )}

        <div style={{ padding: "16px 20px", borderTop: `1px solid ${C.border}`, display: "flex", gap: "10px", background: C.white }}>
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()}
            placeholder="Posez votre question..."
            style={{ flex: 1, background: C.bg, border: `1.5px solid ${C.border}`, borderRadius: "24px", padding: "11px 18px", color: C.text, fontSize: "13.5px", outline: "none", fontFamily: "sans-serif", transition: "border .2s" }}
            onFocus={e => e.target.style.border = `1.5px solid ${agent.color}`}
            onBlur={e => e.target.style.border = `1.5px solid ${C.border}`}
          />
          <button onClick={() => send()} disabled={!input.trim() || loading}
            style={{ width: "44px", height: "44px", borderRadius: "50%", border: "none", background: !input.trim() || loading ? C.border : `linear-gradient(135deg, ${agent.color}, ${agent.color}bb)`, cursor: !input.trim() || loading ? "not-allowed" : "pointer", color: C.white, fontSize: "16px", transition: "all .2s", boxShadow: !input.trim() || loading ? "none" : `0 4px 14px ${agent.color}44` }}>➤</button>
        </div>
      </div>
      <style>{`@keyframes b{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-6px)}}`}</style>
    </div>
  );
}

export default function QRCoproDashboard() {
  const [activeAgent, setActiveAgent] = useState(null);

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "Georgia, serif" }}>
      <style>{`
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #1a56c444; border-radius: 4px; }
        .card { transition: transform .22s, box-shadow .22s; cursor: pointer; }
        .card:hover { transform: translateY(-5px); box-shadow: 0 16px 40px rgba(26,86,196,.13) !important; }
      `}</style>

      {/* Navbar */}
      <div style={{ background: C.navy, padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "58px", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "30px", height: "30px", background: C.blue, borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px" }}>📱</div>
          <span style={{ color: C.white, fontWeight: 800, fontSize: "16px", fontFamily: "sans-serif", letterSpacing: ".01em" }}>QR Copro</span>
          <span style={{ background: "#3b82f633", color: "#93c5fd", fontSize: "10px", padding: "2px 8px", borderRadius: "10px", fontFamily: "sans-serif", fontWeight: 700 }}>BETA</span>
        </div>
        <div style={{ color: "#ffffff55", fontSize: "12px", fontFamily: "sans-serif" }}>Centre IA · Stéphanie Touboul</div>
      </div>

      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "44px 20px" }}>

        {/* Hero */}
        <div style={{ marginBottom: "44px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: C.bluePale, border: `1px solid ${C.blueLight}55`, borderRadius: "20px", padding: "5px 14px", marginBottom: "18px" }}>
            <span style={{ fontSize: "10px", color: C.blue, fontFamily: "sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".12em" }}>✦ Plateforme Intelligence Artificielle</span>
          </div>
          <h1 style={{ fontFamily: "sans-serif", fontSize: "clamp(26px, 4vw, 44px)", fontWeight: 800, color: C.navy, margin: "0 0 12px", lineHeight: 1.12 }}>
            Votre équipe IA<br />
            <span style={{ color: C.blue }}>QR Copro</span>
          </h1>
          <p style={{ color: C.muted, fontSize: "15px", fontFamily: "sans-serif", maxWidth: "500px", lineHeight: 1.65, margin: 0 }}>
            6 agents spécialisés pour structurer, lancer et scaler votre startup de digitalisation de copropriété.
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "12px", marginBottom: "44px" }}>
          {[
            { label: "Agents actifs", value: "6", icon: "🤖" },
            { label: "Copropriétés FR", value: "750k", icon: "🏢" },
            { label: "Modèle", value: "B2B", icon: "💼" },
            { label: "Prix / copro", value: "35–50€", icon: "💶" },
          ].map((s, i) => (
            <div key={i} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: "14px", padding: "16px 18px", display: "flex", alignItems: "center", gap: "12px", boxShadow: "0 2px 8px rgba(0,0,0,.04)" }}>
              <span style={{ fontSize: "20px" }}>{s.icon}</span>
              <div>
                <div style={{ fontSize: "20px", fontWeight: 800, color: C.navy, fontFamily: "sans-serif", lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: "11px", color: C.muted, fontFamily: "sans-serif", marginTop: "2px" }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Section header */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
          <div style={{ fontSize: "13px", fontWeight: 700, color: C.navy, fontFamily: "sans-serif" }}>Vos agents spécialisés</div>
          <div style={{ flex: 1, height: "1px", background: C.border }} />
          <div style={{ fontSize: "12px", color: C.muted, fontFamily: "sans-serif" }}>Cliquez pour démarrer</div>
        </div>

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
          {AGENTS.map(agent => (
            <div key={agent.id} className="card"
              onClick={() => setActiveAgent(agent)}
              style={{ background: C.white, border: `1.5px solid ${C.border}`, borderRadius: "18px", padding: "26px 22px", boxShadow: "0 4px 16px rgba(0,0,0,.05)", position: "relative", overflow: "hidden" }}>

              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: `linear-gradient(90deg, ${agent.color}, ${agent.color}55)` }} />

              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "14px" }}>
                <div style={{ width: "46px", height: "46px", borderRadius: "12px", background: `${agent.color}10`, border: `1px solid ${agent.color}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px" }}>{agent.icon}</div>
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: C.success }} />
                  <span style={{ fontSize: "10px", color: C.muted, fontFamily: "sans-serif" }}>Actif</span>
                </div>
              </div>

              <div style={{ fontSize: "15px", fontWeight: 700, color: C.navy, fontFamily: "sans-serif", marginBottom: "4px" }}>{agent.label}</div>
              <div style={{ fontSize: "12px", color: agent.color, fontFamily: "sans-serif", marginBottom: "16px", fontWeight: 600 }}>{agent.subtitle}</div>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "18px" }}>
                {agent.suggestions.slice(0, 2).map((s, i) => (
                  <div key={i} style={{ fontSize: "11.5px", color: C.muted, fontFamily: "sans-serif", display: "flex", alignItems: "flex-start", gap: "6px" }}>
                    <span style={{ color: agent.color, fontSize: "10px", marginTop: "2px", flexShrink: 0 }}>→</span>
                    <span>{s.length > 42 ? s.slice(0, 42) + "…" : s}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "14px", borderTop: `1px solid ${C.border}` }}>
                <span style={{ fontSize: "12px", color: agent.color, fontFamily: "sans-serif", fontWeight: 700 }}>Démarrer →</span>
                <div style={{ fontSize: "10px", color: C.muted, fontFamily: "sans-serif", background: C.bg, padding: "3px 9px", borderRadius: "8px", border: `1px solid ${C.border}` }}>IA Active</div>
              </div>
            </div>
          ))}
        </div>

        {/* Priority tip */}
        <div style={{ marginTop: "36px", padding: "20px 24px", background: C.bluePale, borderRadius: "16px", border: `1px solid ${C.blueLight}44`, display: "flex", alignItems: "center", gap: "16px" }}>
          <span style={{ fontSize: "26px", flexShrink: 0 }}>💡</span>
          <div>
            <div style={{ fontSize: "13px", fontWeight: 700, color: C.navy, fontFamily: "sans-serif", marginBottom: "4px" }}>Par où commencer ?</div>
            <div style={{ fontSize: "12.5px", color: C.muted, fontFamily: "sans-serif", lineHeight: 1.6 }}>
              Commencez par l'<strong style={{ color: C.navy }}>Agent Product Manager</strong> pour structurer vos fonctionnalités V1 et reprendre le contrôle face à votre prestataire tech. C'est votre priorité stratégique numéro 1.
            </div>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: "32px", color: C.muted, fontSize: "11px", fontFamily: "sans-serif" }}>
          QR Copro · Marseille · Propulsé par Claude IA · Stéphanie Touboul
        </div>
      </div>

      {activeAgent && <AgentChat agent={activeAgent} onClose={() => setActiveAgent(null)} />}
    </div>
  );
}
