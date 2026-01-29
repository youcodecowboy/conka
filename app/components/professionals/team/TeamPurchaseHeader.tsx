"use client";

export default function TeamPurchaseHeader() {
  return (
    <section className="px-6 md:px-16 py-6 md:py-8">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
          Team Orders
        </h1>

        {/* Subheading */}
        <p className="font-clinical text-base md:text-lg opacity-80">
          For clubs, teams, and organisations purchasing at scale
        </p>
        <p className="font-clinical text-sm opacity-70 mt-2">
          Prices include VAT. Shipping calculated at checkout.
        </p>
      </div>
    </section>
  );
}
