import { supabase } from "@/lib/supabaseClient";
import { QuizResult } from "./scoreQuiz";

interface SavePrepCheckParams {
  name: string;
  email: string;
  result: QuizResult;
}

export async function savePrepCheckResponse({ name, email, result }: SavePrepCheckParams) {
  const { error } = await supabase.from("email_subscribers").upsert([{
    email,
    name,
    source: "prep-check",
    consent_method: "prep_check_completion",
    metadata: {
      score: result.score,
      tier: result.tier,
      gaps: result.gaps,
    },
  }], { onConflict: "email" });

  if (error) {
    console.error("Error saving prep check:", error);
    throw error;
  }

  // Send results email non-blocking
  fetch("/api/prep-check-results", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      email,
      score: result.score,
      tier: result.tier,
      gaps: result.gaps,
    }),
  }).catch((e) => console.error("Results email failed:", e));

  return { success: true };
}
