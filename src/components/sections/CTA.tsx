import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="flex h-screen items-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl bg-primary px-8 py-16 text-primary-foreground sm:px-16 sm:py-24"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,var(--aperture-blue-light),transparent_50%)] opacity-30" />
        <div className="relative z-10 flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
            Ready to automate?
          </h2>
          <p className="mt-4 max-w-lg text-primary-foreground/80">
            Join the OpenNode pilot and bring accessible, open-source IoT to
            your home or small industry.
          </p>
          <Button
            variant="secondary"
            size="lg"
            className="mt-8"
          >
            Start now
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
