import { useState, useContext, createContext, useRef, useEffect } from "react";

const CartContext = createContext();

const MED_IMAGES = {
  "Pain Relief": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80",
  "Antibiotics": "https://images.unsplash.com/photo-1550572017-edd951b55104?w=400&q=80",
  "Allergy": "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&q=80",
  "Vitamins": "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&q=80",
  "Digestive": "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=400&q=80",
  "Heart & BP": "https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=400&q=80",
  "Diabetes": "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400&q=80",
  "Antifungal": "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&q=80",
  "Cough & Cold": "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&q=80",
};
const DEFAULT_IMG = "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&q=80";

const MEDICINES = [
  { id:1,  name:"Cetirizine 10mg",   generic:"Cetirizine HCl",      category:"Allergy",    price:12, packPrice:85,  pack:10, desc:"Antihistamine for allergies & hay fever" },
  { id:2,  name:"Loratadine 10mg",   generic:"Loratadine",          category:"Allergy",    price:15, packPrice:110, pack:10, desc:"Non-drowsy allergy relief" },
  { id:3,  name:"Amoxicillin 500mg", generic:"Amoxicillin",         category:"Antibiotics",price:18, packPrice:160, pack:10, desc:"Broad-spectrum antibiotic" },
  { id:4,  name:"Azithromycin 250mg",generic:"Azithromycin",        category:"Antibiotics",price:45, packPrice:200, pack:6,  desc:"Macrolide antibiotic for infections" },
  { id:5,  name:"Fluconazole 150mg", generic:"Fluconazole",         category:"Antifungal", price:55, packPrice:55,  pack:1,  desc:"Antifungal treatment" },
  { id:6,  name:"Paracetamol 500mg", generic:"Acetaminophen",       category:"Pain Relief",price:5,  packPrice:35,  pack:10, desc:"Pain & fever relief" },
  { id:7,  name:"Ibuprofen 400mg",   generic:"Ibuprofen",           category:"Pain Relief",price:8,  packPrice:65,  pack:10, desc:"Anti-inflammatory pain relief" },
  { id:8,  name:"Diclofenac 50mg",   generic:"Diclofenac Sodium",   category:"Pain Relief",price:10, packPrice:80,  pack:10, desc:"NSAID for pain & inflammation" },
  { id:9,  name:"Tramadol 50mg",     generic:"Tramadol HCl",        category:"Pain Relief",price:25, packPrice:200, pack:10, desc:"Moderate to severe pain relief" },
  { id:10, name:"Amlodipine 5mg",    generic:"Amlodipine Besylate", category:"Heart & BP", price:12, packPrice:100, pack:10, desc:"Calcium channel blocker for BP" },
  { id:11, name:"Atenolol 50mg",     generic:"Atenolol",            category:"Heart & BP", price:10, packPrice:80,  pack:10, desc:"Beta-blocker for hypertension" },
  { id:12, name:"Metformin 500mg",   generic:"Metformin HCl",       category:"Diabetes",   price:8,  packPrice:65,  pack:10, desc:"First-line diabetes medication" },
  { id:13, name:"Vitamin C 500mg",   generic:"Ascorbic Acid",       category:"Vitamins",   price:6,  packPrice:50,  pack:10, desc:"Immune support & antioxidant" },
  { id:14, name:"Vitamin D3 1000IU", generic:"Cholecalciferol",     category:"Vitamins",   price:10, packPrice:85,  pack:10, desc:"Bone health & immunity" },
  { id:15, name:"Vitamin B12 500mcg",generic:"Cyanocobalamin",      category:"Vitamins",   price:12, packPrice:100, pack:10, desc:"Energy & nerve function" },
  { id:16, name:"Multivitamin",      generic:"Multiple vitamins",   category:"Vitamins",   price:8,  packPrice:70,  pack:10, desc:"Complete daily nutrition" },
  { id:17, name:"Omeprazole 20mg",   generic:"Omeprazole",          category:"Digestive",  price:12, packPrice:95,  pack:10, desc:"Acid reflux & ulcer treatment" },
  { id:18, name:"Domperidone 10mg",  generic:"Domperidone",         category:"Digestive",  price:8,  packPrice:65,  pack:10, desc:"Nausea & vomiting relief" },
  { id:19, name:"Pantoprazole 40mg", generic:"Pantoprazole",        category:"Digestive",  price:14, packPrice:115, pack:10, desc:"Proton pump inhibitor" },
  { id:20, name:"Loperamide 2mg",    generic:"Loperamide HCl",      category:"Digestive",  price:10, packPrice:80,  pack:10, desc:"Diarrhea treatment" },
];

const CATEGORIES = ["All","Allergy","Antibiotics","Antifungal","Pain Relief","Heart & BP","Diabetes","Vitamins","Digestive","Cough & Cold"];

const CatSVG = ({ cat }) => {
  const s = { fill:"none", stroke:"currentColor", strokeWidth:"1.5", width:22, height:22 };
  if (cat==="Allergy")     return <svg viewBox="0 0 24 24" {...s}><path d="M12 3c-1.5 3-4 5-4 8a4 4 0 008 0c0-3-2.5-5-4-8z"/><path d="M9 15l3 3 3-3"/></svg>;
  if (cat==="Antibiotics") return <svg viewBox="0 0 24 24" {...s}><path d="M12 3v18M3 12h18"/><circle cx="12" cy="12" r="9"/></svg>;
  if (cat==="Antifungal")  return <svg viewBox="0 0 24 24" {...s}><rect x="5" y="2" width="14" height="20" rx="7"/><path d="M5 12h14"/></svg>;
  if (cat==="Cough & Cold")return <svg viewBox="0 0 24 24" {...s}><path d="M8 9h8M8 13h5"/><rect x="3" y="5" width="18" height="14" rx="2"/></svg>;
  if (cat==="Diabetes")    return <svg viewBox="0 0 24 24" {...s}><path d="M12 2a5 5 0 00-5 5v3H5v2h2v1a5 5 0 0010 0v-1h2v-2h-2V7a5 5 0 00-5-5z"/></svg>;
  if (cat==="Digestive")   return <svg viewBox="0 0 24 24" {...s}><path d="M6 3c0 3 4 4 4 7s-4 4-4 7M12 3c0 3 4 4 4 7s-4 4-4 7M18 3c0 3-4 4-4 7s4 4 4 7"/></svg>;
  if (cat==="Heart & BP")  return <svg viewBox="0 0 24 24" {...s}><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>;
  if (cat==="Pain Relief") return <svg viewBox="0 0 24 24" {...s}><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>;
  if (cat==="Vitamins")    return <svg viewBox="0 0 24 24" {...s}><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>;
  return <svg viewBox="0 0 24 24" {...s}><circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16h.01"/></svg>;
};

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const addToCart = (med, qty=1, isPack=false) => {
    setCart(prev => {
      const key = `${med.id}-${isPack}`;
      const ex = prev.find(i => i.key===key);
      if (ex) return prev.map(i => i.key===key ? {...i, qty:i.qty+qty} : i);
      return [...prev, {...med, qty, isPack, key}];
    });
  };
  const removeFromCart = (key) => setCart(p => p.filter(i => i.key!==key));
  const updateQty = (key, qty) => { if (qty<=0) return removeFromCart(key); setCart(p => p.map(i => i.key===key ? {...i,qty} : i)); };
  const clearCart = () => setCart([]);
  const total = cart.reduce((s,i) => s+(i.isPack?i.packPrice:i.price)*i.qty, 0);
  const count = cart.reduce((s,i) => s+i.qty, 0);
  return <CartContext.Provider value={{cart,addToCart,removeFromCart,updateQty,clearCart,total,count}}>{children}</CartContext.Provider>;
}

// ─── NEW MEDICINE CARD matching screenshot ───
function MedicineCard({ med }) {
  const { addToCart } = useContext(CartContext);
  const [qty, setQty] = useState(1);
  const [isPack, setIsPack] = useState(false);
  const saving = isPack ? (med.price * med.pack - med.packPrice).toFixed(2) : "0.00";
  const displayPrice = isPack ? med.packPrice : med.price;
  const units = isPack ? `${med.pack} units` : "1 unit";
  const img = MED_IMAGES[med.category] || DEFAULT_IMG;

  return (
    <div style={{ background:"#fff", borderRadius:14, border:"1px solid #e5e7eb", overflow:"hidden", display:"flex", flexDirection:"column", boxShadow:"0 1px 4px rgba(0,0,0,0.06)", transition:"box-shadow 0.2s" }}
      onMouseEnter={e=>e.currentTarget.style.boxShadow="0 6px 20px rgba(0,0,0,0.1)"}
      onMouseLeave={e=>e.currentTarget.style.boxShadow="0 1px 4px rgba(0,0,0,0.06)"}>
      {/* Image */}
      <div style={{ position:"relative", height:160, overflow:"hidden", background:"#f3f4f6" }}>
        <img src={img} alt={med.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
        {/* Badges */}
        <div style={{ position:"absolute", top:10, left:10, display:"flex", gap:"0.4rem", alignItems:"center" }}>
          <span style={{ background:"#10B981", color:"#fff", borderRadius:20, padding:"0.22rem 0.65rem", fontSize:"0.68rem", fontWeight:800, letterSpacing:"0.05em" }}>IN STOCK</span>
        </div>
        <div style={{ position:"absolute", top:10, right:10 }}>
          <span style={{ background:"rgba(255,255,255,0.92)", color:"#374151", borderRadius:20, padding:"0.22rem 0.65rem", fontSize:"0.68rem", fontWeight:700, letterSpacing:"0.04em", border:"1px solid #e5e7eb" }}>{med.category.toUpperCase()}</span>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding:"0.95rem 1rem 1.1rem", display:"flex", flexDirection:"column", gap:"0.7rem", flex:1 }}>
        {/* Name */}
        <div>
          <div style={{ fontWeight:700, fontSize:"1rem", color:"#111827", lineHeight:1.2 }}>{med.name}</div>
          <div style={{ fontSize:"0.78rem", color:"#6b7280", marginTop:3 }}>{med.generic}</div>
        </div>

        {/* Pack / Loose toggle */}
        <div style={{ display:"flex", gap:"0.5rem" }}>
          <button onClick={()=>setIsPack(true)} style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:"0.3rem", padding:"0.38rem 0.5rem", borderRadius:8, border:`1.5px solid ${isPack?"#111827":"#e5e7eb"}`, background:"#fff", color: isPack?"#111827":"#6b7280", fontWeight:isPack?700:500, fontSize:"0.8rem", cursor:"pointer" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>
            Pack
          </button>
          <button onClick={()=>setIsPack(false)} style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:"0.3rem", padding:"0.38rem 0.5rem", borderRadius:8, border:`1.5px solid ${!isPack?"#111827":"#e5e7eb"}`, background:"#fff", color: !isPack?"#111827":"#6b7280", fontWeight:!isPack?700:500, fontSize:"0.8rem", cursor:"pointer" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            Loose
          </button>
        </div>

        {/* Price */}
        <div style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
          <span style={{ fontWeight:800, fontSize:"1.15rem", color:"#111827" }}>₹{displayPrice}</span>
          <span style={{ fontSize:"0.78rem", color:"#6b7280" }}>/ {units}</span>
          {isPack && parseFloat(saving)>0 && (
            <span style={{ fontSize:"0.72rem", fontWeight:700, color:"#10B981", background:"#ecfdf5", borderRadius:6, padding:"0.15rem 0.4rem" }}>Save ₹{saving}</span>
          )}
        </div>

        {/* Qty + Add */}
        <div style={{ display:"flex", alignItems:"center", gap:"0.5rem", marginTop:"auto" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"0.4rem", border:"1.5px solid #e5e7eb", borderRadius:9, padding:"0.22rem 0.5rem" }}>
            <button onClick={()=>setQty(q=>Math.max(1,q-1))} style={{ background:"none", border:"none", cursor:"pointer", color:"#374151", fontSize:"1rem", width:20, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700 }}>−</button>
            <span style={{ fontWeight:700, color:"#111827", minWidth:18, textAlign:"center", fontSize:"0.9rem" }}>{qty}</span>
            <button onClick={()=>setQty(q=>q+1)} style={{ background:"none", border:"none", cursor:"pointer", color:"#374151", fontSize:"1rem", width:20, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700 }}>+</button>
          </div>
          <button onClick={()=>addToCart(med,qty,isPack)} style={{ flex:1, background:"#111827", color:"#fff", border:"none", borderRadius:9, padding:"0.5rem 0.7rem", fontWeight:700, fontSize:"0.85rem", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:"0.4rem" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="15" height="15"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── AI DOCTOR CHATBOT ───
function AiDoctor({ onClose }) {
  const [messages, setMessages] = useState([
    { role:"assistant", text:"👨‍⚕️ Hello! I'm Dr. Dhameja, your AI medical assistant powered by web search.\n\nDescribe your symptoms and I'll suggest appropriate medicines with dosage — just like a doctor would. Remember: always consult a real doctor for serious conditions." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:"smooth" }); }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages(m => [...m, { role:"user", text:userMsg }]);
    setLoading(true);

    try {
      const systemPrompt = `You are Dr. Dhameja, an experienced general physician AI assistant for Sanjeevni pharmacy.
When a patient describes symptoms, you:
1. Briefly acknowledge their symptoms with empathy
2. Suggest 2-4 appropriate medicines with:
   - Medicine name & strength (e.g., Paracetamol 500mg)
   - Dosage & frequency (e.g., 1 tablet 3x/day for 3 days)
   - Quantity to buy (e.g., Buy 9 tablets / 1 pack of 10)
   - Short reason why this medicine helps
3. Add a disclaimer to consult a real doctor for serious conditions
4. Keep response concise, clear, and formatted with medicine names in **bold**

Use web search to find the most current and accurate medicine recommendations for the symptoms described.
Always mention Indian brand names or generic names common in India. Prices are in Indian Rupees (₹).`;

      const response = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{
        parts: [{ 
          text: `${systemPrompt}\n\nPatient says: ${userMsg}` 
        }]
      }]
    })
  }
);
const data = await response.json();
const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, try again.";
setMessages((m) => [...m, { role: "assistant", text }]);
    } catch(e) {
      setMessages(m => [...m, { role:"assistant", text:"⚠️ Connection error. Please check your internet and try again." }]);
    }
    setLoading(false);
  };

  const formatText = (text) => {
    return text.split('\n').map((line, i) => {
      const bold = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      return <p key={i} style={{ margin:"0.2rem 0", lineHeight:1.55 }} dangerouslySetInnerHTML={{ __html: bold || '&nbsp;' }}/>;
    });
  };

  return (
    <div style={{ position:"fixed", bottom:90, right:24, width:370, height:520, background:"#fff", borderRadius:18, boxShadow:"0 20px 60px rgba(0,0,0,0.18)", display:"flex", flexDirection:"column", zIndex:999, overflow:"hidden", border:"1px solid #e5e7eb" }}>
      {/* Header */}
      <div style={{ background:"linear-gradient(135deg,#111827,#1f2937)", padding:"1rem 1.1rem", display:"flex", alignItems:"center", gap:"0.7rem" }}>
        <div style={{ width:38, height:38, background:"#10B981", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.2rem", flexShrink:0 }}>👨‍⚕️</div>
        <div style={{ flex:1 }}>
          <div style={{ color:"#fff", fontWeight:700, fontSize:"0.9rem" }}>Dr. Dhameja</div>
          <div style={{ color:"#6ee7b7", fontSize:"0.72rem", display:"flex", alignItems:"center", gap:"0.3rem" }}>
            <span style={{ width:6, height:6, background:"#10B981", borderRadius:"50%", display:"inline-block" }}></span>
            AI Medical Assistant • Web Search Enabled
          </div>
        </div>
        <button onClick={onClose} style={{ background:"rgba(255,255,255,0.1)", border:"none", color:"#fff", borderRadius:8, width:30, height:30, cursor:"pointer", fontSize:"1rem", display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
      </div>

      {/* Messages */}
      <div style={{ flex:1, overflowY:"auto", padding:"1rem", display:"flex", flexDirection:"column", gap:"0.75rem", background:"#f9fafb" }}>
        {messages.map((m,i) => (
          <div key={i} style={{ display:"flex", justifyContent:m.role==="user"?"flex-end":"flex-start" }}>
            <div style={{ maxWidth:"88%", background:m.role==="user"?"#111827":"#fff", color:m.role==="user"?"#fff":"#111827", borderRadius:m.role==="user"?"14px 14px 4px 14px":"14px 14px 14px 4px", padding:"0.65rem 0.85rem", fontSize:"0.82rem", boxShadow:"0 1px 3px rgba(0,0,0,0.08)", border:m.role==="assistant"?"1px solid #e5e7eb":"none" }}>
              {formatText(m.text)}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display:"flex", justifyContent:"flex-start" }}>
            <div style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:"14px 14px 14px 4px", padding:"0.65rem 1rem", boxShadow:"0 1px 3px rgba(0,0,0,0.08)" }}>
              <div style={{ display:"flex", gap:"0.3rem", alignItems:"center" }}>
                {[0,1,2].map(n=>(
                  <span key={n} style={{ width:7, height:7, borderRadius:"50%", background:"#10B981", display:"inline-block", animation:`bounce 1.2s ${n*0.2}s infinite` }}></span>
                ))}
                <span style={{ fontSize:"0.75rem", color:"#6b7280", marginLeft:4 }}>Searching & analyzing...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef}/>
      </div>

      {/* Input */}
      <div style={{ padding:"0.75rem 0.85rem", background:"#fff", borderTop:"1px solid #e5e7eb", display:"flex", gap:"0.5rem" }}>
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()}
          placeholder="Describe your symptoms..."
          style={{ flex:1, background:"#f9fafb", border:"1.5px solid #e5e7eb", borderRadius:10, padding:"0.5rem 0.8rem", fontSize:"0.83rem", outline:"none", color:"#111827" }} />
        <button onClick={send} disabled={loading||!input.trim()} style={{ background: input.trim()&&!loading?"#111827":"#d1d5db", color:"#fff", border:"none", borderRadius:10, width:40, cursor:input.trim()&&!loading?"pointer":"default", display:"flex", alignItems:"center", justifyContent:"center", transition:"background 0.15s" }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/></svg>
        </button>
      </div>
    </div>
  );
}

function AiDoctorButton({ open, setOpen }) {
  return (
    <button onClick={()=>setOpen(o=>!o)} style={{ position:"fixed", bottom:24, right:24, zIndex:998, background: open?"#374151":"#111827", color:"#fff", border:"none", borderRadius:16, padding:"0.7rem 1.2rem", fontWeight:700, fontSize:"0.875rem", cursor:"pointer", display:"flex", alignItems:"center", gap:"0.5rem", boxShadow:"0 8px 24px rgba(0,0,0,0.2)", transition:"all 0.2s" }}>
      <span style={{ fontSize:"1.1rem" }}>🩺</span>
      {open ? "Close Dr. Dhameja" : "Ask Dr. Dhameja"}
      <span style={{ width:7, height:7, background:"#10B981", borderRadius:"50%", display:"inline-block", boxShadow:"0 0 0 2px rgba(16,185,129,0.3)" }}></span>
    </button>
  );
}

// ─── NAVBAR ───
function Navbar({ page, setPage }) {
  const { count } = useContext(CartContext);
  const [search, setSearch] = useState("");
  return (
    <nav style={{ position:"sticky", top:0, zIndex:100, background:"#fff", borderBottom:"1px solid #e5e7eb", padding:"0 2rem", display:"flex", alignItems:"center", gap:"1.2rem", height:"62px", boxShadow:"0 1px 3px rgba(0,0,0,0.06)" }}>
      <div onClick={()=>setPage("home")} style={{ cursor:"pointer", display:"flex", alignItems:"center", gap:"0.5rem", flexShrink:0 }}>
        <div style={{ width:32, height:32, background:"#111827", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" width="17" height="17"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
        </div>
        <span style={{ fontWeight:800, fontSize:"1rem", color:"#111827", letterSpacing:"-0.03em" }}>Sanjeevni</span>
      </div>
      <div style={{ flex:1, position:"relative", maxWidth:480 }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" width="15" height="15" style={{ position:"absolute", left:11, top:"50%", transform:"translateY(-50%)" }}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        <input value={search} onChange={e=>setSearch(e.target.value)} onKeyDown={e=>e.key==="Enter"&&setPage("shop")} placeholder="Search medicines..."
          style={{ width:"100%", background:"#f9fafb", border:"1.5px solid #e5e7eb", borderRadius:9, padding:"0.45rem 1rem 0.45rem 2.2rem", fontSize:"0.85rem", outline:"none", color:"#111827", boxSizing:"border-box" }} />
      </div>
      <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:"1.3rem" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"0.35rem", fontSize:"0.78rem", fontWeight:800, color:"#111827" }}>
          <span style={{ width:7, height:7, borderRadius:"50%", background:"#10B981", display:"inline-block" }}></span>
          OPEN 24/7
        </div>
        <button onClick={()=>setPage("shop")} style={{ background:"none", border:"none", color:"#374151", cursor:"pointer", fontSize:"0.875rem", fontWeight:600 }}>Shop</button>
        <button onClick={()=>setPage("admin")} style={{ background:"none", border:"none", color:"#374151", cursor:"pointer", fontSize:"0.875rem", fontWeight:600, display:"flex", alignItems:"center", gap:"0.25rem" }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          Admin
        </button>
        <button onClick={()=>setPage("cart")} style={{ position:"relative", background:"none", border:"none", cursor:"pointer", color:"#374151", display:"flex" }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>
          {count>0 && <span style={{ position:"absolute", top:-5, right:-5, background:"#10B981", color:"#fff", borderRadius:"50%", width:17, height:17, fontSize:"0.6rem", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800 }}>{count}</span>}
        </button>
      </div>
    </nav>
  );
}

// ─── HOME PAGE ───
function HomePage({ setPage }) {
  const cats = CATEGORIES.filter(c=>c!=="All");
  return (
    <div style={{ background:"#fff" }}>
      {/* Hero */}
      <div style={{ position:"relative", minHeight:320, background:"linear-gradient(to right,rgba(0,0,0,0.72) 0%,rgba(0,0,0,0.38) 55%,transparent 100%), url('https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1400&q=80') center/cover no-repeat", display:"flex", alignItems:"center", padding:"3.5rem 2.5rem" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", width:"100%" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:"0.35rem", background:"rgba(16,185,129,0.92)", borderRadius:20, padding:"0.28rem 0.85rem", fontSize:"0.7rem", color:"#fff", fontWeight:800, letterSpacing:"0.06em", marginBottom:"0.85rem" }}>
            <span style={{ width:5, height:5, background:"#fff", borderRadius:"50%", display:"inline-block" }}></span>
            PHARMACY OPEN 24/7
          </div>
          <h1 style={{ fontWeight:900, fontSize:"clamp(1.9rem,4vw,3rem)", color:"#fff", lineHeight:1.1, margin:"0 0 0.6rem", letterSpacing:"-0.03em" }}>
            Buy exactly<br /><span style={{ color:"#34d399" }}>what you need</span>
          </h1>
          <p style={{ color:"rgba(255,255,255,0.82)", fontSize:"0.92rem", maxWidth:420, marginBottom:"1.6rem", lineHeight:1.65 }}>
            Full packs or loose units — get your medicines delivered anytime. No minimum order.
          </p>
          <button onClick={()=>setPage("shop")} style={{ background:"#10B981", color:"#fff", border:"none", borderRadius:9, padding:"0.7rem 1.6rem", fontSize:"0.9rem", fontWeight:800, cursor:"pointer" }}>
            Browse Medicines →
          </button>
        </div>
      </div>

      {/* Feature strip */}
      <div style={{ borderBottom:"1px solid #f3f4f6" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(4,1fr)", padding:"1rem 2rem" }}>
          {[["⏰","24/7 Available","Always open"],["📦","Exact Quantity","Buy what you need"],["🚚","Fast Delivery","At your doorstep"],["🛡️","Genuine Meds","Quality assured"]].map(([ic,t,s])=>(
            <div key={t} style={{ display:"flex", gap:"0.65rem", alignItems:"center", padding:"0.7rem 0.5rem" }}>
              <span style={{ fontSize:"1.2rem" }}>{ic}</span>
              <div><div style={{ fontWeight:700, fontSize:"0.875rem", color:"#111827" }}>{t}</div><div style={{ fontSize:"0.75rem", color:"#9ca3af" }}>{s}</div></div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories — original style */}
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"2.5rem 2rem 1.5rem" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"1.3rem" }}>
          <div>
            <div style={{ fontSize:"0.7rem", fontWeight:800, letterSpacing:"0.12em", color:"#10B981", marginBottom:5 }}>CATEGORIES</div>
            <h2 style={{ fontWeight:800, fontSize:"1.5rem", color:"#111827", letterSpacing:"-0.02em", margin:0 }}>Browse by Category</h2>
          </div>
          <button onClick={()=>setPage("shop")} style={{ background:"none", border:"none", color:"#374151", cursor:"pointer", fontSize:"0.875rem", fontWeight:600, display:"flex", alignItems:"center", gap:"0.25rem" }}>
            View All <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="13" height="13"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(148px,1fr))", gap:"0.9rem" }}>
          {cats.map(cat=>{
            const cnt = MEDICINES.filter(m=>m.category===cat).length;
            return (
              <div key={cat} onClick={()=>setPage("shop")}
                style={{ border:"1px solid #e5e7eb", borderRadius:10, padding:"1.1rem 1rem", cursor:"pointer", background:"#fff", transition:"all 0.15s" }}
                onMouseEnter={e=>{ e.currentTarget.style.borderColor="#10B981"; e.currentTarget.style.background="#f0fdf4"; }}
                onMouseLeave={e=>{ e.currentTarget.style.borderColor="#e5e7eb"; e.currentTarget.style.background="#fff"; }}>
                <div style={{ color:"#6b7280", marginBottom:9 }}><CatSVG cat={cat}/></div>
                <div style={{ fontWeight:700, fontSize:"0.875rem", color:"#111827" }}>{cat}</div>
                <div style={{ fontSize:"0.72rem", color:"#9ca3af", marginTop:2 }}>{cnt} items</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Featured Medicines — NEW card style */}
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"1rem 2rem 3rem" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"1.3rem" }}>
          <div>
            <div style={{ fontSize:"0.7rem", fontWeight:800, letterSpacing:"0.12em", color:"#10B981", marginBottom:5 }}>POPULAR</div>
            <h2 style={{ fontWeight:800, fontSize:"1.5rem", color:"#111827", letterSpacing:"-0.02em", margin:0 }}>Featured Medicines</h2>
          </div>
          <button onClick={()=>setPage("shop")} style={{ background:"none", border:"none", color:"#374151", cursor:"pointer", fontSize:"0.875rem", fontWeight:600, display:"flex", alignItems:"center", gap:"0.25rem" }}>
            View All <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="13" height="13"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(230px,1fr))", gap:"1.1rem" }}>
          {MEDICINES.slice(5,11).map(med=><MedicineCard key={med.id} med={med}/>)}
        </div>
      </div>
    </div>
  );
}

// ─── SHOP PAGE ───
function ShopPage() {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");
  const filtered = MEDICINES.filter(m =>
    (cat==="All"||m.category===cat) &&
    (m.name.toLowerCase().includes(search.toLowerCase())||m.generic.toLowerCase().includes(search.toLowerCase()))
  );
  return (
    <div style={{ background:"#fff", minHeight:"100vh" }}>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"2rem" }}>
        <h1 style={{ fontWeight:800, fontSize:"1.6rem", color:"#111827", letterSpacing:"-0.02em", marginBottom:"1.4rem" }}>Medicine Shop</h1>
        <div style={{ display:"flex", gap:"0.75rem", marginBottom:"1.2rem", flexWrap:"wrap" }}>
          <div style={{ position:"relative", flex:1, minWidth:200 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" width="15" height="15" style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)" }}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by name or generic..."
              style={{ width:"100%", background:"#f9fafb", border:"1.5px solid #e5e7eb", borderRadius:9, padding:"0.5rem 0.9rem 0.5rem 2.1rem", fontSize:"0.85rem", outline:"none", color:"#111827", boxSizing:"border-box" }} />
          </div>
          <select value={cat} onChange={e=>setCat(e.target.value)}
            style={{ background:"#f9fafb", border:"1.5px solid #e5e7eb", borderRadius:9, padding:"0.5rem 1rem", fontSize:"0.85rem", outline:"none", color:"#111827" }}>
            {CATEGORIES.map(c=><option key={c}>{c}</option>)}
          </select>
        </div>
        <div style={{ fontSize:"0.8rem", color:"#9ca3af", marginBottom:"1rem" }}>{filtered.length} medicines found</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(230px,1fr))", gap:"1.1rem" }}>
          {filtered.map(med=><MedicineCard key={med.id} med={med}/>)}
        </div>
      </div>
    </div>
  );
}

// ─── CART PAGE ───
function CartPage({ setPage }) {
  const { cart, removeFromCart, updateQty, total } = useContext(CartContext);
  if (!cart.length) return (
    <div style={{ maxWidth:480, margin:"5rem auto", textAlign:"center", padding:"2rem" }}>
      <div style={{ width:60, height:60, background:"#f3f4f6", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 1rem" }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" width="26" height="26"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>
      </div>
      <h2 style={{ fontWeight:800, color:"#111827", marginBottom:6 }}>Your cart is empty</h2>
      <p style={{ color:"#6b7280", fontSize:"0.875rem", marginBottom:"1.4rem" }}>Browse our medicines and add items to your cart.</p>
      <button onClick={()=>setPage("shop")} style={{ background:"#111827", color:"#fff", border:"none", borderRadius:9, padding:"0.65rem 1.8rem", fontWeight:700, cursor:"pointer" }}>Browse Medicines</button>
    </div>
  );
  return (
    <div style={{ maxWidth:680, margin:"0 auto", padding:"2rem", background:"#fff", minHeight:"100vh" }}>
      <h1 style={{ fontWeight:800, fontSize:"1.5rem", color:"#111827", marginBottom:"1.4rem", letterSpacing:"-0.02em" }}>Your Cart</h1>
      {cart.map(item=>(
        <div key={item.key} style={{ border:"1px solid #e5e7eb", borderRadius:10, padding:"0.9rem 1rem", marginBottom:"0.7rem", display:"flex", alignItems:"center", gap:"0.9rem", background:"#fafafa" }}>
          <div style={{ width:42, height:42, background:"#f3f4f6", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, overflow:"hidden" }}>
            <img src={MED_IMAGES[item.category]||DEFAULT_IMG} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontWeight:700, fontSize:"0.875rem", color:"#111827" }}>{item.name}</div>
            <div style={{ fontSize:"0.72rem", color:"#9ca3af" }}>{item.isPack?`Pack of ${item.pack}`:"Loose"} · ₹{item.isPack?item.packPrice:item.price} each</div>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:"0.35rem", border:"1.5px solid #e5e7eb", borderRadius:8, padding:"0.2rem 0.4rem" }}>
            <button onClick={()=>updateQty(item.key,item.qty-1)} style={{ background:"none", border:"none", cursor:"pointer", color:"#374151", fontSize:"0.95rem", fontWeight:700, width:22, display:"flex", alignItems:"center", justifyContent:"center" }}>−</button>
            <span style={{ color:"#111827", fontWeight:700, minWidth:16, textAlign:"center", fontSize:"0.85rem" }}>{item.qty}</span>
            <button onClick={()=>updateQty(item.key,item.qty+1)} style={{ background:"none", border:"none", cursor:"pointer", color:"#374151", fontSize:"0.95rem", fontWeight:700, width:22, display:"flex", alignItems:"center", justifyContent:"center" }}>+</button>
          </div>
          <div style={{ color:"#111827", fontWeight:800, minWidth:52, textAlign:"right", fontSize:"0.9rem" }}>₹{(item.isPack?item.packPrice:item.price)*item.qty}</div>
          <button onClick={()=>removeFromCart(item.key)} style={{ background:"none", border:"none", color:"#d1d5db", cursor:"pointer", fontSize:"1rem" }}>✕</button>
        </div>
      ))}
      <div style={{ border:"1px solid #e5e7eb", borderRadius:10, padding:"1rem 1.1rem", marginTop:"1.4rem", display:"flex", justifyContent:"space-between", alignItems:"center", background:"#f9fafb" }}>
        <div style={{ fontWeight:800, color:"#111827", fontSize:"1rem" }}>Total: <span style={{ color:"#10B981" }}>₹{total}</span></div>
        <button onClick={()=>setPage("checkout")} style={{ background:"#111827", color:"#fff", border:"none", borderRadius:9, padding:"0.65rem 1.8rem", fontWeight:800, cursor:"pointer" }}>Checkout →</button>
      </div>
    </div>
  );
}

// ─── CHECKOUT PAGE ───
function CheckoutPage({ setPage }) {
  const { cart, total, clearCart } = useContext(CartContext);
  const [form, setForm] = useState({ name:"", phone:"", address:"", pincode:"" });
  const [submitted, setSubmitted] = useState(false);
  const [orderId] = useState("PRX"+Math.floor(100000+Math.random()*900000));
  const submit = () => { if(!form.name||!form.phone||!form.address) return alert("Please fill required fields"); setSubmitted(true); clearCart(); };
  if (submitted) return (
    <div style={{ maxWidth:460, margin:"5rem auto", textAlign:"center", padding:"2rem" }}>
      <div style={{ width:64, height:64, background:"#ecfdf5", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 1rem" }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" width="28" height="28"><path d="M20 6L9 17l-5-5"/></svg>
      </div>
      <h2 style={{ fontWeight:800, color:"#111827", fontSize:"1.5rem", marginBottom:6 }}>Order Confirmed!</h2>
      <div style={{ background:"#f9fafb", border:"1px solid #e5e7eb", borderRadius:10, padding:"0.9rem", margin:"1rem 0" }}>
        <div style={{ fontSize:"0.72rem", color:"#9ca3af", marginBottom:3 }}>Order ID</div>
        <div style={{ color:"#10B981", fontSize:"1.2rem", fontWeight:800, fontFamily:"monospace" }}>{orderId}</div>
      </div>
      <p style={{ color:"#6b7280", fontSize:"0.875rem", marginBottom:"1.4rem" }}>Thank you, {form.name}! Medicines delivered soon.</p>
      <button onClick={()=>setPage("home")} style={{ background:"#111827", color:"#fff", border:"none", borderRadius:9, padding:"0.65rem 1.8rem", fontWeight:800, cursor:"pointer" }}>Back to Home</button>
    </div>
  );
  return (
    <div style={{ maxWidth:820, margin:"0 auto", padding:"2rem", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"2rem", background:"#fff", minHeight:"100vh" }}>
      <div>
        <h2 style={{ fontWeight:800, color:"#111827", fontSize:"1.3rem", marginBottom:"1.3rem", letterSpacing:"-0.02em" }}>Delivery Details</h2>
        {[["name","Full Name *"],["phone","Phone Number *"],["address","Delivery Address *"],["pincode","Pincode"]].map(([k,l])=>(
          <div key={k} style={{ marginBottom:"0.9rem" }}>
            <label style={{ color:"#374151", fontSize:"0.8rem", fontWeight:600, display:"block", marginBottom:4 }}>{l}</label>
            <input value={form[k]} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))}
              style={{ width:"100%", background:"#f9fafb", border:"1.5px solid #e5e7eb", borderRadius:9, padding:"0.55rem 0.85rem", fontSize:"0.875rem", outline:"none", color:"#111827", boxSizing:"border-box" }} />
          </div>
        ))}
        <button onClick={submit} style={{ width:"100%", background:"#111827", color:"#fff", border:"none", borderRadius:9, padding:"0.7rem", fontWeight:800, cursor:"pointer", fontSize:"0.9rem", marginTop:4 }}>Place Order</button>
      </div>
      <div>
        <h2 style={{ fontWeight:800, color:"#111827", fontSize:"1.3rem", marginBottom:"1.3rem", letterSpacing:"-0.02em" }}>Order Summary</h2>
        <div style={{ border:"1px solid #e5e7eb", borderRadius:10, overflow:"hidden" }}>
          {cart.map(item=>(
            <div key={item.key} style={{ display:"flex", justifyContent:"space-between", padding:"0.65rem 1rem", borderBottom:"1px solid #f3f4f6", fontSize:"0.82rem" }}>
              <span style={{ color:"#374151" }}>{item.name} × {item.qty}</span>
              <span style={{ color:"#111827", fontWeight:700 }}>₹{(item.isPack?item.packPrice:item.price)*item.qty}</span>
            </div>
          ))}
          <div style={{ display:"flex", justifyContent:"space-between", padding:"0.85rem 1rem", background:"#f9fafb", fontWeight:800, fontSize:"0.9rem" }}>
            <span>Total</span><span style={{ color:"#10B981" }}>₹{total}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── ADMIN PAGE ───
function AdminPage() {
  const [meds, setMeds] = useState(MEDICINES);
  const [orders] = useState([
    { id:"PRX100001", name:"Rahul Sharma", items:"Paracetamol x5, Vitamin C x2", total:147, status:"Delivered" },
    { id:"PRX100002", name:"Priya Patel",  items:"Amoxicillin Pack, Ibuprofen x3", total:184, status:"Processing" },
    { id:"PRX100003", name:"Amit Kumar",   items:"Metformin x10, Vitamin D3 x5", total:130, status:"Shipped" },
  ]);
  const [tab, setTab] = useState("meds");
  const [adding, setAdding] = useState(false);
  const [newMed, setNewMed] = useState({ name:"", generic:"", category:"Pain Relief", price:"", packPrice:"", pack:10, desc:"" });
  return (
    <div style={{ maxWidth:1100, margin:"0 auto", padding:"2rem", background:"#fff", minHeight:"100vh" }}>
      <h1 style={{ fontWeight:800, fontSize:"1.5rem", color:"#111827", marginBottom:"1.4rem", letterSpacing:"-0.02em" }}>Admin Dashboard</h1>
      <div style={{ display:"flex", gap:"0.5rem", marginBottom:"1.4rem", borderBottom:"1px solid #e5e7eb", paddingBottom:"1rem" }}>
        {[["meds","💊 Medicines"],["orders","📋 Orders"]].map(([t,l])=>(
          <button key={t} onClick={()=>setTab(t)} style={{ padding:"0.4rem 1.1rem", borderRadius:7, border:"1px solid", cursor:"pointer", background:tab===t?"#ecfdf5":"#fff", borderColor:tab===t?"#10B981":"#e5e7eb", color:tab===t?"#059669":"#6b7280", fontWeight:tab===t?800:500, fontSize:"0.85rem" }}>{l}</button>
        ))}
      </div>
      {tab==="meds"&&(
        <div>
          <button onClick={()=>setAdding(!adding)} style={{ background:adding?"#f9fafb":"#111827", color:adding?"#374151":"#fff", border:adding?"1px solid #e5e7eb":"none", borderRadius:8, padding:"0.45rem 1.1rem", cursor:"pointer", marginBottom:"1rem", fontWeight:700, fontSize:"0.85rem" }}>
            {adding?"✕ Cancel":"+ Add Medicine"}
          </button>
          {adding&&(
            <div style={{ background:"#f9fafb", border:"1px solid #e5e7eb", borderRadius:10, padding:"1.1rem", marginBottom:"1.4rem", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.7rem" }}>
              {[["name","Name"],["generic","Generic Name"],["price","Price/Unit (₹)"],["packPrice","Pack Price (₹)"],["desc","Description"]].map(([k,l])=>(
                <div key={k}>
                  <label style={{ color:"#374151", fontSize:"0.78rem", fontWeight:600, display:"block", marginBottom:3 }}>{l}</label>
                  <input value={newMed[k]} onChange={e=>setNewMed(m=>({...m,[k]:e.target.value}))}
                    style={{ width:"100%", background:"#fff", border:"1.5px solid #e5e7eb", borderRadius:7, padding:"0.42rem 0.7rem", color:"#111827", fontSize:"0.83rem", outline:"none", boxSizing:"border-box" }} />
                </div>
              ))}
              <button onClick={()=>{ if(newMed.name&&newMed.price){setMeds(m=>[...m,{...newMed,id:Date.now(),price:+newMed.price,packPrice:+newMed.packPrice,pack:+newMed.pack}]);setAdding(false);}}}
                style={{ gridColumn:"1/-1", background:"#111827", color:"#fff", border:"none", borderRadius:8, padding:"0.55rem", cursor:"pointer", fontWeight:700, fontSize:"0.875rem" }}>Save Medicine</button>
            </div>
          )}
          <div style={{ border:"1px solid #e5e7eb", borderRadius:10, overflow:"hidden" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:"0.83rem" }}>
              <thead><tr style={{ background:"#f9fafb", borderBottom:"1px solid #e5e7eb" }}>
                {["Name","Generic","Category","Price","Pack Price",""].map(h=><th key={h} style={{ padding:"0.65rem 0.9rem", textAlign:"left", color:"#6b7280", fontWeight:700, fontSize:"0.72rem", textTransform:"uppercase", letterSpacing:"0.05em" }}>{h}</th>)}
              </tr></thead>
              <tbody>
                {meds.map((m,i)=>(
                  <tr key={m.id} style={{ borderTop:i>0?"1px solid #f3f4f6":"none" }}>
                    <td style={{ padding:"0.65rem 0.9rem", color:"#111827", fontWeight:700 }}>{m.name}</td>
                    <td style={{ padding:"0.65rem 0.9rem", color:"#6b7280" }}>{m.generic}</td>
                    <td style={{ padding:"0.65rem 0.9rem" }}><span style={{ background:"#ecfdf5", color:"#059669", borderRadius:6, padding:"0.18rem 0.55rem", fontSize:"0.72rem", fontWeight:700 }}>{m.category}</span></td>
                    <td style={{ padding:"0.65rem 0.9rem", color:"#111827" }}>₹{m.price}</td>
                    <td style={{ padding:"0.65rem 0.9rem", color:"#111827" }}>₹{m.packPrice}</td>
                    <td style={{ padding:"0.65rem 0.9rem" }}><button onClick={()=>setMeds(ms=>ms.filter(x=>x.id!==m.id))} style={{ background:"#fff0f0", border:"1px solid #fecaca", color:"#ef4444", borderRadius:6, padding:"0.18rem 0.55rem", cursor:"pointer", fontSize:"0.72rem" }}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {tab==="orders"&&(
        <div style={{ border:"1px solid #e5e7eb", borderRadius:10, overflow:"hidden" }}>
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:"0.83rem" }}>
            <thead><tr style={{ background:"#f9fafb", borderBottom:"1px solid #e5e7eb" }}>
              {["Order ID","Customer","Items","Total","Status"].map(h=><th key={h} style={{ padding:"0.65rem 0.9rem", textAlign:"left", color:"#6b7280", fontWeight:700, fontSize:"0.72rem", textTransform:"uppercase", letterSpacing:"0.05em" }}>{h}</th>)}
            </tr></thead>
            <tbody>
              {orders.map((o,i)=>(
                <tr key={o.id} style={{ borderTop:i>0?"1px solid #f3f4f6":"none" }}>
                  <td style={{ padding:"0.75rem 0.9rem", color:"#10B981", fontFamily:"monospace", fontWeight:800 }}>{o.id}</td>
                  <td style={{ padding:"0.75rem 0.9rem", color:"#111827", fontWeight:600 }}>{o.name}</td>
                  <td style={{ padding:"0.75rem 0.9rem", color:"#6b7280", fontSize:"0.78rem" }}>{o.items}</td>
                  <td style={{ padding:"0.75rem 0.9rem", color:"#111827", fontWeight:800 }}>₹{o.total}</td>
                  <td style={{ padding:"0.75rem 0.9rem" }}>
                    <span style={{ borderRadius:6, padding:"0.22rem 0.65rem", fontSize:"0.72rem", fontWeight:700, background:o.status==="Delivered"?"#ecfdf5":o.status==="Shipped"?"#eff6ff":"#fffbeb", color:o.status==="Delivered"?"#059669":o.status==="Shipped"?"#3b82f6":"#d97706" }}>{o.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── APP ───
export default function App() {
  const [page, setPage] = useState("home");
  const [aiOpen, setAiOpen] = useState(false);
  return (
    <CartProvider>
      <style>{`
        *{margin:0;padding:0;box-sizing:border-box;}
        body{background:#fff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif;min-height:100vh;color:#111827;}
        input::placeholder,textarea::placeholder{color:#9ca3af;}
        ::-webkit-scrollbar{width:5px;}::-webkit-scrollbar-track{background:#f9fafb;}::-webkit-scrollbar-thumb{background:#d1d5db;border-radius:3px;}
        @keyframes bounce{0%,80%,100%{transform:scale(0)}40%{transform:scale(1)}}
      `}</style>
      <Navbar page={page} setPage={setPage}/>
      {page==="home"     && <HomePage setPage={setPage}/>}
      {page==="shop"     && <ShopPage/>}
      {page==="cart"     && <CartPage setPage={setPage}/>}
      {page==="checkout" && <CheckoutPage setPage={setPage}/>}
      {page==="admin"    && <AdminPage/>}
      {aiOpen && <AiDoctor onClose={()=>setAiOpen(false)}/>}
      <AiDoctorButton open={aiOpen} setOpen={setAiOpen}/>
    </CartProvider>
  );
}
