"use client";

export default function IndividualPurchaseHeader() {
  return (
    <section className="px-6 md:px-16 py-12 md:py-16">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
          Purchase for Individuals
        </h1>

        {/* Subheading and description */}
        <div className="space-y-3">
          <p className="font-clinical text-base md:text-lg opacity-80">
            For nutritionists, S&C coaches, and performance practitioners working directly with athletes and clients
          </p>
          <p className="font-clinical text-sm md:text-base opacity-70">
            Select protocols or individual formulas to purchase on behalf of your clients. All products include detailed usage guidance and performance data.
          </p>
        </div>
      </div>
    </section>
  );
}
