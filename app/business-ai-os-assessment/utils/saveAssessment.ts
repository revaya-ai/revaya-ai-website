import { supabase } from "../lib/supabaseClient";
import { AssessmentAnswers, ROIResults } from "../types/assessment";
import { questions } from "../data/questions";

interface SaveAssessmentParams {
  email: string;
  name: string;
  answers: AssessmentAnswers;
  results: ROIResults;
  optedIn?: boolean;
}

export async function saveAssessmentResponse({
  email,
  name,
  answers,
  results,
  optedIn = true,
}: SaveAssessmentParams) {
  // Extract contextual values for tagging
  // Priority problem (Q0, index 0)
  const priorityProblemOption = answers[0]?.selectedOption ?? 0;
  const priorityProblem = questions[0].options?.[priorityProblemOption]?.label ?? "Unknown";

  const operationTypeOption = answers[1]?.selectedOption ?? 0;
  const operationType = questions[1].options?.[operationTypeOption]?.label ?? "Unknown";

  const businessTypeOption = answers[2]?.selectedOption ?? 0;
  const businessType = questions[2].options?.[businessTypeOption]?.label ?? "Unknown";

  const revenuePerPersonOption = answers[3]?.selectedOption ?? 0;
  const revenuePerPerson = questions[3].options?.[revenuePerPersonOption]?.label ?? "Unknown";

  // Build tags for segmentation
  const tags: string[] = [];

  // Priority problem tag
  tags.push(`priority-${priorityProblem.toLowerCase().replace(/ /g, "-").slice(0, 40)}`);

  // Category tag
  tags.push(results.category.toLowerCase().replace(/ /g, "-"));

  // Lowest section tag
  tags.push(
    `lowest-${results.lowestSection.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`
  );

  // Operation type tag
  if (operationType.includes("Solo")) {
    tags.push("operation-solo");
  } else if (operationType.includes("Small")) {
    tags.push("operation-small-team");
  } else if (operationType.includes("Growing")) {
    tags.push("operation-growing-team");
  } else {
    tags.push("operation-established");
  }

  // Business type tag
  const btClean = businessType
    .toLowerCase()
    .split(" ")[0]
    .replace(/[^a-z0-9]/g, "");
  tags.push(`biz-${btClean}`);

  // Opportunity size tag
  if (results.totalMonthlyOpportunity < 5000) {
    tags.push("opportunity-under-5k");
  } else if (results.totalMonthlyOpportunity < 10000) {
    tags.push("opportunity-5k-10k");
  } else {
    tags.push("opportunity-10k-plus");
  }

  const answersJson = JSON.parse(JSON.stringify(answers));
  const sectionScoresJson = JSON.parse(JSON.stringify(results.sectionScores));

  const { error } = await supabase.from("assessment_responses").insert([
    {
      email,
      name,
      operation_type: operationType,
      business_type: businessType,
      revenue_per_person: revenuePerPerson,
      avg_customer_value: answers[5]?.sliderValue ?? 5000,
      hourly_rate: answers[6]?.sliderValue ?? 150,
      close_rate: answers[7]?.sliderValue ?? 25,
      answers: answersJson,
      total_score: results.totalScore,
      category: results.category,
      section_scores: sectionScoresJson,
      monthly_hours_recoverable: results.monthlyHoursRecoverable,
      time_value: results.timeValue,
      lost_revenue: results.lostRevenue,
      total_monthly_opportunity: results.totalMonthlyOpportunity,
      annual_opportunity: results.annualOpportunity,
      lowest_section: results.lowestSection,
      tags,
      opted_in: optedIn,
    },
  ]);

  if (error) {
    console.error("Error saving assessment:", error);
    throw error;
  }

  // Upsert into email_subscribers — assessment completion = implicit consent
  if (optedIn) {
    await supabase.from("email_subscribers").upsert([{
      email,
      name,
      source: "assessment",
      consent_method: "assessment_completion",
    }], { onConflict: "email" });
  }

  return { success: true };
}
