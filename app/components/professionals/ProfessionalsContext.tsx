"use client";

export default function ProfessionalsContext() {
  return (
    <section className="px-6 md:px-16 pt-4 md:pt-5 pb-6 md:pb-8">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-3">
          CONKA Elite Portal
        </h1>

        {/* Distilled copy - clinical only */}
        <div className="space-y-2">
          <p className="font-primary text-base md:text-lg opacity-80">
            Trusted by elite sports teams and performance practitioners
          </p>
          <p className="font-primary text-base md:text-lg opacity-80">
            Purchase protocols for athletes, clients, and teams
          </p>
        </div>
      </div>
    </section>
  );
}
