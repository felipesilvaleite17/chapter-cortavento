import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { siteConfig } from "../data/config";

export function Features() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={containerRef} className="relative bg-black text-white pb-32">
      <div className="pt-32 pb-16 px-6 text-center max-w-4xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold tracking-tighter mb-6"
        >
          {siteConfig.diferenciais.title}
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xl text-zinc-400"
        >
          Cada detalhe pensado para entregar a melhor experiência, do campus aos jogos.
        </motion.p>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {siteConfig.diferenciais.items.map((item, index) => {
          const isEven = index % 2 === 0;
          
          return (
            <div 
              key={item.id} 
              className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24 py-24 border-t border-white/10`}
            >
              <div className="flex-1 w-full">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="relative aspect-[4/5] md:aspect-square rounded-3xl overflow-hidden bg-zinc-900"
                >
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-700"
                  />
                  <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] pointer-events-none"></div>
                </motion.div>
              </div>

              <div className="flex-1 space-y-6">
                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-3xl md:text-5xl font-bold tracking-tight"
                >
                  {item.title}
                </motion.h3>
                <motion.h4 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-xl md:text-2xl text-zinc-300 font-medium"
                >
                  {item.subtitle}
                </motion.h4>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-lg text-zinc-500 leading-relaxed"
                >
                  {item.description}
                </motion.p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
