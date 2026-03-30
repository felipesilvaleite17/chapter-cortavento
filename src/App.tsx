/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { Process } from "./components/Process";
import { Simulator } from "./components/Simulator";

export default function App() {
  return (
    <main className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black">
      <Hero />
      <Features />
      <Process />
      <Simulator />
      
      <footer className="py-12 border-t border-white/10 bg-black text-center text-zinc-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-4">
          <p className="text-sm">
            © {new Date().getFullYear()} Chapter & Co. Todos os direitos reservados.
          </p>
          <p className="text-xs max-w-md">
            Especialistas em produtos personalizados para atléticas e turmas universitárias.
          </p>
        </div>
      </footer>
    </main>
  );
}
