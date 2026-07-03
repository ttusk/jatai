import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="flex min-h-screen items-center px-4 py-16 sm:px-6 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl bg-primary px-6 py-12 text-primary-foreground sm:px-16 sm:py-24"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,var(--of-azul-claro),transparent_50%)] opacity-30" />
        <div className="relative z-10 flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
            Build on Open Finance
          </h2>
          <p className="mt-4 max-w-lg text-primary-foreground/80">
            Explore the codebase, read the docs, and start integrating Jataí
            into your product.
          </p>
          <Button variant="secondary" size="lg" className="mt-8">
            View on GitHub
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
