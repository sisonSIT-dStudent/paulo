import { useState } from 'react'
import Navbar from './pages/navbar'

// 1. TYPE DEFINITION
interface Shoe {
  id: number;
  model: string;
  price: number;
  size: string;
  status: 'available' | 'sold';
  image: string;
  condition: string;
  description: string;
  videoUrl: string;
}

// 2. DATA
const SHOE_DATA: Shoe[] = [
  { 
    id: 1, 
    model: "practice lng ", 
    price: 15500, 
    size: "8.5", 
    status: 'sold', 
    condition: "Deadstock", 
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=500",
    description: "",
    videoUrl: "/videos/16-7_SG2-146047508_01.webm" 
  },
  { 
    id: 2, 
    model: "1", 
    price: 8500, 
    size: "8.5", 
    status: 'available', 
    condition: "9/10 PADS", 
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=500",
    description: "",
    videoUrl: "/videos/16-7_SG2-146047508_01.webm" 
  },
  { 
    id: 3, 
    model: "2", 
    price: 11000, 
    size: "8.5", 
    status: 'available', 
    condition: "VNDS", 
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=500",
    description: "Premium rough-cut overlays. Elite comfort with a rugged edge.",
    videoUrl: "/videos/16-7_SG2-146047508_01.webm"
  },
];

export default function App() {
  const [filter, setFilter] = useState<'available' | 'sold'>('available');
  const [selectedShoe, setSelectedShoe] = useState<Shoe | null>(null);

  const filteredShoes = SHOE_DATA.filter(shoe => shoe.status === filter);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      <Navbar />
      
      <div className="p-4 md:p-10 pt-20"> 
        <header className="max-w-6xl mx-auto mb-16 flex flex-col items-center text-center mt-10">
          <h1 className="text-6xl font-black italic text-orange-500 uppercase tracking-tighter">
            PJ'S SHOES
          </h1>
          <p className="text-zinc-400 font-medium tracking-widest mt-2 uppercase text-sm">
            Quality shoes | Baguio City 
          </p>
          
          <div className="flex bg-zinc-900 p-1.5 rounded-2xl border border-zinc-800 mt-8 shadow-2xl">
             {['available', 'sold'].map((tab) => (
              <button 
                key={tab} 
                onClick={() => setFilter(tab as any)}
                className={`px-10 py-2.5 rounded-xl font-black uppercase text-[10px] tracking-[0.2em] transition-all duration-300
                  ${filter === tab ? 'bg-orange-600 text-white shadow-lg scale-105' : 'text-zinc-500 hover:text-zinc-200'}`}
              >
                {tab}
              </button>
             ))}
          </div>
        </header>

        <main className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {filteredShoes.map((shoe) => (
            <div key={shoe.id} className="group bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden transition-all duration-500 hover:border-orange-500/50">
              <div className="relative overflow-hidden aspect-[4/5]">
                <img 
                  src={shoe.image} 
                  className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${shoe.status === 'sold' ? 'grayscale opacity-50' : ''}`} 
                  alt={shoe.model} 
                />
                {shoe.status === 'sold' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                     <span className="bg-white text-black font-black px-3 py-1 -rotate-12 uppercase text-sm">Sold Out</span>
                  </div>
                )}
              </div>

              <div className="p-4">
                <div className="flex flex-col gap-1 mb-3">
                  <h3 className="font-bold text-sm uppercase leading-tight truncate">{shoe.model}</h3>
                  <span className="inline-block w-fit bg-zinc-800 text-orange-400 text-[9px] font-bold px-1.5 py-0.5 rounded">US {shoe.size}</span>
                </div>
                <p className="text-lg font-black text-white">₱{shoe.price.toLocaleString()}</p>
                
                <button 
                  onClick={() => setSelectedShoe(shoe)}
                  disabled={shoe.status === 'sold'}
                  className="w-full mt-4 py-2.5 font-black uppercase rounded-xl tracking-wider text-[10px] transition-all bg-white text-black disabled:bg-zinc-800 disabled:text-zinc-600"
                >
                  {shoe.status === 'available' ? 'Inquire' : 'Out of Stock'}
                </button>
              </div>
            </div>
          ))}
        </main>

        {/* 3. ADAPTIVE SHOWCASE MODAL */}
        {selectedShoe && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden relative animate-in fade-in zoom-in duration-300">
              <button 
                onClick={() => setSelectedShoe(null)} 
                className="absolute top-4 right-4 z-20 bg-white text-black w-8 h-8 rounded-full font-black hover:bg-orange-500 hover:text-white transition-all shadow-xl"
              >✕</button>
              
              <div className="grid md:grid-cols-2 h-full overflow-y-auto md:overflow-hidden">
                {/* VIDEO DISPLAY - ADAPTIVE HEIGHT */}
                <div className="bg-black flex items-center justify-center border-b md:border-b-0 md:border-r border-zinc-800 min-h-[400px] md:min-h-0">
                  <video 
                    src={selectedShoe.videoUrl} 
                    controls 
                    autoPlay 
                    playsInline 
                    className="w-full h-full max-h-full object-contain"
                  />
                </div>

                {/* DETAILS PANEL */}
                <div className="p-8 md:p-10 flex flex-col justify-center bg-zinc-900">
                  <h2 className="text-3xl font-black uppercase text-orange-500 italic leading-none mb-4 tracking-tighter">
                    {selectedShoe.model}
                  </h2>
                  
                  <div className="flex gap-2 mb-6">
                    <span className="bg-zinc-800 text-zinc-400 text-[9px] font-black px-2 py-1 rounded-md">SIZE: {selectedShoe.size}</span>
                    <span className="bg-zinc-800 text-zinc-400 text-[9px] font-black px-2 py-1 rounded-md">COND: {selectedShoe.condition}</span>
                  </div>

                  <p className="text-zinc-400 text-sm leading-relaxed mb-8 border-l-2 border-orange-500 pl-4">
                    {selectedShoe.description}
                  </p>

                  <div className="mt-auto">
                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Current Price</p>
                    <p className="text-4xl font-black mb-8 text-white">₱{selectedShoe.price.toLocaleString()}</p>
                    
                    <a 
                      href="https://www.instagram.com/pjs_shoes" 
                      target="_blank"
                      className="block w-full py-4 bg-orange-600 text-white font-black uppercase rounded-2xl tracking-[0.2em] text-[10px] text-center hover:bg-orange-500 transition-all shadow-lg shadow-orange-900/20"
                    >
                      Inquire on Instagram
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}