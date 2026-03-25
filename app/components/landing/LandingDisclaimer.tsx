/**
 * Landing disclaimer footer — AG1-style anchored footnotes + legal block.
 *
 * Rendered at the bottom of /start, before the main site Footer.
 * Contains all anchor symbol definitions used throughout the landing page,
 * plus standard UK food supplement disclaimers.
 *
 * Page wraps this in premium-section-luxury + premium-track.
 * Component is content-only.
 */
export default function LandingDisclaimer() {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Divider */}
      <div
        className="w-full h-px mb-8"
        style={{ backgroundColor: "rgba(0,0,0,0.08)" }}
      />

      <h3
        className="text-xs font-semibold uppercase tracking-widest mb-6"
        style={{ color: "var(--color-ink)", opacity: 0.35 }}
      >
        Important information
      </h3>

      <div
        className="space-y-5 text-xs leading-relaxed"
        style={{ color: "var(--color-ink)", opacity: 0.4 }}
      >
        {/* † Clinically dosed */}
        <p>
          <span className="font-semibold" style={{ opacity: 1 }}>
            †
          </span>{" "}
          <span className="font-semibold">Clinically dosed</span> — Dosages of
          key ingredients match or exceed the amounts used in published,
          peer-reviewed studies on those individual ingredients.
          &ldquo;Clinically dosed&rdquo; refers to ingredient-level research,
          not clinical trials conducted on the CONKA product itself.
        </p>

        {/* †† EFSA-authorised health claims */}
        <p>
          <span className="font-semibold" style={{ opacity: 1 }}>
            ††
          </span>{" "}
          <span className="font-semibold">
            EFSA-authorised health claims
          </span>{" "}
          — CONKA Clear contains Vitamin C, which contributes to normal
          psychological function, the protection of cells from oxidative stress,
          normal energy-yielding metabolism, the reduction of tiredness and
          fatigue, and normal functioning of the nervous system. CONKA Clear also
          contains Vitamin B12, which contributes to normal psychological
          function, normal energy-yielding metabolism, the reduction of tiredness
          and fatigue, and normal functioning of the nervous system.
        </p>

        {/* ‡ Reviews */}
        <p>
          <span className="font-semibold" style={{ opacity: 1 }}>
            ‡
          </span>{" "}
          <span className="font-semibold">Reviews</span> — Reviews collected via
          Loox, a verified review platform. Review invitations are sent to
          customers after purchase. Reviews are genuine and unedited.
        </p>

        {/* § Bottles sold */}
        <p>
          <span className="font-semibold" style={{ opacity: 1 }}>
            §
          </span>{" "}
          <span className="font-semibold">Bottles sold</span> — Based on
          cumulative units sold across all channels as of March 2026.
        </p>

        {/* ¶ Ingredient-level research */}
        <p>
          <span className="font-semibold" style={{ opacity: 1 }}>
            ¶
          </span>{" "}
          <span className="font-semibold">Ingredient-level research</span> —
          Formulated using ingredients studied across 30+ clinical trials
          involving 6,000+ participants. These are studies on individual
          ingredients, not clinical trials on the CONKA product. Individual
          results may vary.
        </p>

        {/* ^^ Cognitive test */}
        <p>
          <span className="font-semibold" style={{ opacity: 1 }}>
            ^^
          </span>{" "}
          <span className="font-semibold">Cognitive test</span> — The CONKA app
          uses a clinically validated cognitive assessment developed by
          Cognetivity Neurosciences from Cambridge University research. The test
          is FDA cleared as a medical device with 93% sensitivity for detecting
          cognitive change and 87.5% test-retest reliability, validated across
          NHS Memory Clinics (ADePT Study, PMC10533908; HRA ISRCTN95636074).
          Test scores reflect individual cognitive test performance and do not
          constitute health claims about CONKA products. Many factors —
          including lifestyle changes, practice effects, and natural variation —
          may contribute to changes in test scores.
        </p>

        {/* * Guarantee */}
        <p>
          <span className="font-semibold" style={{ opacity: 1 }}>
            *
          </span>{" "}
          <span className="font-semibold">Guarantee</span> — 30-day
          satisfaction guarantee applies to first-time customers. Contact
          support@conka.co.uk for a full refund within 30 days of your first
          order if you are not satisfied. See full terms at conka.co.uk/terms.
        </p>

        {/* Standard UK food supplement legal block */}
        <div
          className="pt-5 mt-5"
          style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}
        >
          <p>
            Food supplements should not be used as a substitute for a varied and
            balanced diet and a healthy lifestyle. Do not exceed the recommended
            daily intake. Keep out of reach of young children. If you are
            pregnant, breastfeeding, taking medication, or under medical
            supervision, consult your doctor before use.
          </p>
          <p className="mt-3">
            CONKA Ltd &middot; Registered in England &amp; Wales
          </p>
        </div>
      </div>
    </div>
  );
}
