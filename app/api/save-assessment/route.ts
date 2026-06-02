import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { questions } from "../../business-ai-os-assessment/data/questions";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, answers, results, optedIn = true } = body;

    if (!email || !name || !answers || !results) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      console.error("Missing Supabase credentials in server environment.");
      return NextResponse.json({ error: "Server config error." }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // Derive labels from question options
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
    tags.push(`priority-${priorityProblem.toLowerCase().replace(/ /g, "-").slice(0, 40)}`);
    tags.push(results.category.toLowerCase().replace(/ /g, "-"));
    tags.push(`lowest-${results.lowestSection.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`);

    if (operationType.includes("Solo")) {
      tags.push("operation-solo");
    } else if (operationType.includes("Small")) {
      tags.push("operation-small-team");
    } else if (operationType.includes("Growing")) {
      tags.push("operation-growing-team");
    } else {
      tags.push("operation-established");
    }

    const btClean = businessType.toLowerCase().split(" ")[0].replace(/[^a-z0-9]/g, "");
    tags.push(`biz-${btClean}`);

    if (results.totalMonthlyOpportunity < 5000) {
      tags.push("opportunity-under-5k");
    } else if (results.totalMonthlyOpportunity < 10000) {
      tags.push("opportunity-5k-10k");
    } else {
      tags.push("opportunity-10k-plus");
    }

    const { error: insertError } = await supabase.from("assessment_responses").insert([
      {
        email,
        name,
        operation_type: operationType,
        business_type: businessType,
        revenue_per_person: revenuePerPerson,
        avg_customer_value: answers[5]?.sliderValue ?? 5000,
        hourly_rate: answers[6]?.sliderValue ?? 150,
        close_rate: answers[7]?.sliderValue ?? 25,
        answers,
        total_score: results.totalScore,
        category: results.category,
        section_scores: results.sectionScores,
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

    if (insertError) {
      console.error("Supabase insert error:", insertError);
      return NextResponse.json({ error: "Database insert failed.", detail: insertError.message }, { status: 500 });
    }

    if (optedIn) {
      await supabase.from("email_subscribers").upsert(
        [{ email, name, source: "assessment", consent_method: "assessment_completion" }],
        { onConflict: "email" }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Save assessment error:", error);
    return NextResponse.json({ error: "Unexpected error." }, { status: 500 });
  }
}
