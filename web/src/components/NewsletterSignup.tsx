"use client";

export function NewsletterSignup() {
  return (
    <div className="newsletter-form">
      <input
        type="email"
        placeholder="Enter your email address..."
        id="newsletterEmail"
      />
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => {
          const el = document.getElementById(
            "newsletterEmail",
          ) as HTMLInputElement | null;
          const email = el?.value?.trim();
          if (email && el) {
            alert(
              "Thanks - portfolio demo only; email openrize@gmail.com for real inquiries.",
            );
            el.value = "";
          } else {
            alert("Please enter a valid email address.");
          }
        }}
      >
        Notify me
      </button>
    </div>
  );
}
