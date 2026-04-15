import { useState } from 'react'
// DOUBLE CHECK: Ensure your folder is 'pages' (lowercase) and file is 'navbar.tsx'
import Navbar from './pages/navbar'

interface MediaItem {
  type: 'video' | 'image';
  url: string;
}

interface Shoe {
  id: number;
  model: string;
  price: number;
  size: string;
  status: 'available' | 'sold';
  image: string; 
  condition: string;
  description: string;
  media: MediaItem[]; 
}

const SHOE_DATA: Shoe[] = [
  { 
    id: 1, 
    model: "practice lng", 
    price: 15500, 
    size: "8.5", 
    status: 'sold', 
    condition: "Deadstock", 
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=500",
    description: "",
    media: [
      { type: 'video', url: "/videos/16-7_SG2-146047508_01.webm" },
      { type: 'image', url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=500" }
    ]
  },
  { 
    id: 2, 
    model: "wan", 
    price: 8500123123, 
    size: "8.5", 
    status: 'available', 
    condition: "9/10 PADS", 
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=500",
    description: "",
    media: [
      { type: 'video', url: "/videos/16-7_SG2-146047508_01.webm" },
      { type: 'image', url: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=500" }
    ]
  },
  { 
    id: 3, 
    model: "dos", 
    price: 110001231234, 
    size: "8.5", 
    status: 'available', 
    condition: "VNDS", 
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=500",
    description: "",
    media: [
      { type: 'video', url: "/videos/16-7_SG2-146047508_01.webm" },
      { type: 'image', url: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=500" }
    ]
  },
];

export default function App() {
  const [filter, setFilter] = useState<'available' | 'sold'>('available');
  const [selectedShoe, setSelectedShoe] = useState<Shoe | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredShoes = SHOE_DATA.filter(shoe => {
    const matchesStatus = shoe.status === filter;
    const matchesSearch = shoe.model.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const openShowcase = (shoe: Shoe) => {
    setSelectedShoe(shoe);
    setCurrentSlide(0);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans overflow-x-hidden">
      <Navbar />
      
      <div className="p-4 md:p-10 pt-20"> 
        <header className="max-w-6xl mx-auto mb-16 flex flex-col items-center text-center mt-10">
          <h1 className="text-6xl font-black italic text-orange-500 uppercase tracking-tighter">
            PJ'S SHOES
          </h1>
          <p className="text-zinc-400 font-medium tracking-widest mt-2 uppercase text-sm">
            Quality shoes | Baguio City 
          </p>

          <div className="w-full max-w-md mt-10 relative">
            <input 
              type="text"
              placeholder="SEARCH KICKS..."
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-orange-500/50 rounded-2xl py-4 px-6 outline-none transition-all duration-300 text-[10px] font-black tracking-widest uppercase placeholder:text-zinc-600 shadow-2xl"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="absolute right-5 top-1/2 -translate-y-1/2 opacity-30">🔍</span>
          </div>
          
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
            <div key={shoe.id} className="group bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden transition-all duration-500 hover:border-orange-500/50 cursor-pointer" onClick={() => openShowcase(shoe)}>
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
                  disabled={shoe.status === 'sold'}
                  className="w-full mt-4 py-2.5 font-black uppercase rounded-xl tracking-wider text-[10px] transition-all bg-white text-black disabled:bg-zinc-800 disabled:text-zinc-600 group-hover:bg-orange-500 group-hover:text-white"
                >
                  {shoe.status === 'available' ? 'Inquire' : 'Out of Stock'}
                </button>
              </div>
            </div>
          ))}
        </main>

        {selectedShoe && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden relative shadow-2xl">
              <button 
                onClick={() => setSelectedShoe(null)} 
                className="absolute top-4 right-4 z-50 bg-white text-black w-8 h-8 rounded-full font-black hover:bg-orange-500 hover:text-white transition-all flex items-center justify-center"
              >✕</button>
              
              {/* FIXED: overflow-x-hidden on this container prevents the side-to-side wiggle */}
              <div className="grid md:grid-cols-2 h-full overflow-y-auto md:overflow-hidden w-full overflow-x-hidden">
                
                <div className="relative bg-black flex items-center justify-center border-b md:border-b-0 md:border-r border-zinc-800 overflow-hidden min-h-[350px] md:min-h-0 w-full">
                  {selectedShoe.media[currentSlide].type === 'video' ? (
                    <video 
                      key={selectedShoe.media[currentSlide].url}
                      src={selectedShoe.media[currentSlide].url} 
                      controls 
                      autoPlay 
                      muted
                      playsInline 
                      loop
                      className="w-full h-full max-h-[80vh] md:max-h-full object-contain"
                    />
                  ) : (
                    <img 
                      src={selectedShoe.media[currentSlide].url} 
                      className="w-full h-full max-h-[80vh] md:max-h-full object-contain"
                      alt="Product View"
                    />
                  )}

                  {selectedShoe.media.length > 1 && (
                    <>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setCurrentSlide(prev => (prev > 0 ? prev - 1 : selectedShoe.media.length - 1))}}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 p-2.5 rounded-full backdrop-blur-md z-10"
                      >
                        <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/>
                        </svg>
                      </button>
                      
                      <button 
                        onClick={(e) => { e.stopPropagation(); setCurrentSlide(prev => (prev < selectedShoe.media.length - 1 ? prev + 1 : 0))}}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 p-2.5 rounded-full backdrop-blur-md z-10"
                      >
                        <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                        </svg>
                      </button>
                    </>
                  )}

                  <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
                    {selectedShoe.media.map((_, idx) => (
                      <div 
                        key={idx}
                        className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentSlide ? 'bg-orange-500 w-4' : 'bg-white/30 w-1.5'}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="p-8 md:p-10 flex flex-col justify-center bg-zinc-900 w-full">
                  <h2 className="text-3xl font-black uppercase text-orange-500 italic leading-none mb-4 tracking-tighter">
                    {selectedShoe.model}
                  </h2>
                  
                  <div className="flex gap-2 mb-6">
                    <span className="bg-zinc-800 text-zinc-400 text-[9px] font-black px-2 py-1 rounded-md uppercase">SIZE: {selectedShoe.size}</span>
                    <span className="bg-zinc-800 text-zinc-400 text-[9px] font-black px-2 py-1 rounded-md uppercase">COND: {selectedShoe.condition}</span>
                  </div>

                  <p className="text-zinc-400 text-sm leading-relaxed mb-8 border-l-2 border-orange-500 pl-4">
                    {selectedShoe.description || "No description provided."}
                  </p>

                  <div className="mt-auto">
                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Current Price</p>
                    <p className="text-4xl font-black mb-8 text-white">₱{selectedShoe.price.toLocaleString()}</p>
                    
                    <a 
                      href="https://www.instagram.com/pjs_shoes" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full py-4 bg-orange-600 text-white font-black uppercase rounded-2xl tracking-[0.2em] text-[10px] text-center hover:bg-orange-500 transition-all shadow-lg"
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