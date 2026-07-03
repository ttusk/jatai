import { motion } from "motion/react";

export function Manifesto() {
  return (
    <section className="flex min-h-screen items-center px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-sm font-medium uppercase tracking-widest text-primary">
            What is Jataí
          </p>
          <div className="mt-6 space-y-6 text-lg leading-relaxed text-foreground sm:text-xl">
            <p>
              Jataí is an open financial technology lab. We build tools that
              help fintechs, institutions, and marketplaces integrate data,
              payments, and banking services in a regulated, transparent way.
            </p>
            <p className="text-muted-foreground">
              Like the bee, we are small, social, and native to the ecosystem.
              Our code is open-source, our patterns are public, and our focus is
              on security, compliance, and data sovereignty.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
