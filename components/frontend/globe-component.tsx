import Earth from '@/components/ui/globe';
 
export default function Globe1() {
  return (
    <>
      <div className="flex flex-col items-center justify-center overflow-hidden">
        <article className="relative mx-auto my-8 max-w-[500px] rounded-xl border border-border p-5 text-center">
          <div className="relative z-10">
            <h1 className="text-4xl font-semibold leading-[100%] tracking-tighter">
              Global Audit Standards
            </h1>
            {/* Using CSS variables converted to normalized RGB values */}
            <Earth
              baseColor={[0.87, 0.52, 0.47]} // Primary color (11 76% 80%) converted to RGB
              markerColor={[0.87, 0.52, 0.47]} // Primary color for markers
              glowColor={[0.87, 0.52, 0.47]} // Primary color for glow
            />
          </div>
        </article>
      </div>
    </>
  );
}