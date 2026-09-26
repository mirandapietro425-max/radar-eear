export function GoogleEarthBridge() {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-white">
      <p className="text-xs uppercase tracking-widest text-amber-300">Google Earth / Google Maps 3D</p>
      <h2 className="mt-2 text-2xl font-semibold">O “olho de Deus” do Radar</h2>
      <p className="mt-3 max-w-3xl text-slate-300">No modo interno, o Radar usa Google Maps 3D quando a chave da API estiver configurada. Para exploração narrativa mais ampla, o projeto também exporta KML compatível com Google Earth.</p>
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl bg-white/5 p-4"><b>Voo de câmera</b><p className="mt-1 text-sm text-slate-400">cidade → região → local</p></div>
        <div className="rounded-2xl bg-white/5 p-4"><b>Camadas históricas</b><p className="mt-1 text-sm text-slate-400">rota, período, personagens</p></div>
        <div className="rounded-2xl bg-white/5 p-4"><b>Modo história</b><p className="mt-1 text-sm text-slate-400">pontos-chave e narração</p></div>
      </div>
    </section>
  );
}
