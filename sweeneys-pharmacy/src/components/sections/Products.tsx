import { Reveal } from "@/components/ui/Reveal";
import { Snapshot } from "@/components/ui/Snapshot";
import { PRODUCTS, PRODUCTS_COPY } from "@/content/site";
import otcImg from "@/assets/images/otc-medicines.jpg";
import biocareImg from "@/assets/images/biocare-supplements.jpg";

const IMAGES = {
  "otc-medicines.jpg": { src: otcImg, alt: "Over-the-counter medicines on the shop counter", tilt: -3 },
  "biocare-supplements.jpg": { src: biocareImg, alt: "BioCare supplements on the counter at Sweeney's Pharmacy", tilt: 2.5 },
} as const;

export function Products() {
  return (
    <section id="shop" className="section-y panel" aria-labelledby="shop-title">
      <div className="wrap">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Over the counter &amp; nutrition</p>
          <h2 id="shop-title" className="mt-5">
            In the <em>shop</em>
          </h2>
          <p className="mt-6 max-w-[56ch] text-lg text-muted">{PRODUCTS_COPY.body}</p>
        </Reveal>

        <div className="mt-12 grid gap-x-16 gap-y-14 lg:grid-cols-2">
          {PRODUCTS.map((product, i) => {
            const image = IMAGES[product.image as keyof typeof IMAGES];
            return (
              <Reveal key={product.title} variant="card" delayMs={i * 120}>
                <article className="grid items-center gap-8 sm:grid-cols-[auto_1fr]">
                  <div className="justify-self-start">
                    <Snapshot src={image.src} alt={image.alt} tilt={image.tilt} width={image.src.width * 1.35} />
                  </div>
                  <div>
                    <span className="inline-block rounded-full bg-sage px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-green">
                      {product.tag}
                    </span>
                    <h3 className="mt-4">{product.title}</h3>
                    <p className="mt-3 text-body">{product.description}</p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
