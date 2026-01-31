"use client";

export default function FormulasPurchaseHeader() {
  return (
    <section className="px-6 md:px-16 py-4 md:py-5">
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-3">
          Shop individual formulas
        </h1>

        {/* Subheading */}
        <p className="font-primary text-base md:text-lg opacity-80 max-w-2xl mx-auto">
          Order CONKA Flow and CONKA Clear in the quantities you need for teams, clubs, and organisations.
        </p>
        <p className="font-primary text-sm opacity-70 mt-2">
          Shipping calculated at checkout.
        </p>
      </div>
    </section>
  );
}
