import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { siteConfig } from "../data/config";
import { MessageCircle } from "lucide-react";

export function Simulator() {
  const [selectedProductId, setSelectedProductId] = useState(siteConfig.simulador.produtos[0].id);
  const [quantity, setQuantity] = useState<number>(siteConfig.simulador.minQuantity);

  const selectedProduct = siteConfig.simulador.produtos.find(p => p.id === selectedProductId)!;
  const estimatedTotal = selectedProduct.basePrice * quantity;

  const handleWhatsAppClick = () => {
    const text = `${siteConfig.contato.whatsappMessage}
    
*Resumo da Simulação:*
- Modelo: ${selectedProduct.name}
- Quantidade estimada: ${quantity} unidades
- Valor base estimado: R$ ${estimatedTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;

    // Dispara o evento de conversão para o Google Tag Manager
    if (typeof window !== "undefined") {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({ event: "conversion" });
    }

    const url = `https://wa.me/${siteConfig.contato.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="simulador" className="py-32 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold tracking-tighter mb-6"
          >
            {siteConfig.simulador.title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-zinc-400"
          >
            {siteConfig.simulador.subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image Display */}
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-zinc-900">
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedProduct.id}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.5)] pointer-events-none"></div>
          </div>

          {/* Right: Controls */}
          <div className="space-y-12">
            
            {/* Model Selection */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">1. Escolha o Modelo</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {siteConfig.simulador.produtos.map((produto) => (
                  <button
                    key={produto.id}
                    onClick={() => setSelectedProductId(produto.id)}
                    className={`p-6 rounded-2xl border text-left transition-all duration-300 ${
                      selectedProductId === produto.id 
                        ? 'border-white bg-white/10 shadow-[0_0_20px_rgba(255,255,255,0.1)]' 
                        : 'border-white/10 bg-zinc-900/50 hover:border-white/30'
                    }`}
                  >
                    <div className="font-semibold text-lg mb-1">{produto.name}</div>
                    <div className="text-sm text-zinc-400">{produto.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selection */}
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <h3 className="text-2xl font-semibold">2. Quantidade</h3>
                <span className="text-zinc-400 text-sm">Mínimo: {siteConfig.simulador.minQuantity} un.</span>
              </div>
              
              <div className="bg-zinc-900/50 border border-white/10 p-6 rounded-2xl flex items-center gap-6">
                <input 
                  type="range" 
                  min={siteConfig.simulador.minQuantity} 
                  max="500" 
                  step="5"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="flex-1 accent-white h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-3xl font-bold w-20 text-center">
                  {quantity}
                </div>
              </div>
            </div>

            {/* Summary & CTA */}
            <div className="pt-8 border-t border-white/10">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-8">
                <div>
                  <div className="text-zinc-400 mb-2">Investimento Estimado</div>
                  <div className="text-5xl font-bold tracking-tighter">
                    R$ {estimatedTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-sm text-zinc-500 mt-2">
                    *Valor base (R$ {selectedProduct.basePrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/un). O valor final pode variar conforme a complexidade da arte e a cotação junto ao fornecedor.
                  </div>
                </div>
              </div>

              <button 
                onClick={handleWhatsAppClick}
                className="w-full py-5 bg-white text-black rounded-2xl font-bold text-xl hover:bg-zinc-200 transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_rgba(255,255,255,0.4)]"
              >
                <MessageCircle className="w-6 h-6" />
                Falar com Consultor no WhatsApp
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
