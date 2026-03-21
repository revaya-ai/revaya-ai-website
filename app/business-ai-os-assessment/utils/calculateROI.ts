import { AssessmentAnswers, ROIResults, SectionScore } from "../types/assessment";
import { questions, sectionConfig } from "../data/questions";

export function calculateROI(answers: AssessmentAnswers): ROIResults {
  // ─── Extract ROI input values ───
  const avgClientValue = answers[5]?.sliderValue ?? 5000;
  const hourlyRate = answers[6]?.sliderValue ?? 150;
  const closeRate = (answers[7]?.sliderValue ?? 25) / 100;

  // Monthly lead volume from Q4
  const q4Option = answers[4]?.selectedOption ?? 0;
  const monthlyLeads = questions[3].options?.[q4Option]?.roiMultiplier ?? 10;

  // Monthly proposals from Q17
  const q17Option = answers[17]?.selectedOption ?? 0;
  const monthlyProposals = questions[16].options?.[q17Option]?.roiMultiplier ?? 5;

  // ─── FOUNDER DEPENDENCY ROI ───
  const q8Option = answers[8]?.selectedOption ?? 2;
  const q10Option = answers[10]?.selectedOption ?? 2;

  const founderTaxPct = questions[7].options?.[q8Option]?.founderTaxPct ?? 0.5;
  const decisionHours = questions[9].options?.[q10Option]?.decisionHours ?? 15;

  const weeklyFounderHoursLocked = founderTaxPct * 40 + decisionHours;
  const monthlyFounderHoursLocked = weeklyFounderHoursLocked * 4;
  const monthlyCost_FounderDependency = monthlyFounderHoursLocked * hourlyRate;

  // ─── SALES & DELIVERY ROI ───
  const q15Option = answers[15]?.selectedOption ?? 2;
  const q16Option = answers[16]?.selectedOption ?? 2;

  const hoursPerProposal = questions[14].options?.[q15Option]?.hoursPerProposal ?? 5;
  const lostDealPct = questions[15].options?.[q16Option]?.lostDealPct ?? 0.5;

  const monthlyProposalHours = hoursPerProposal * monthlyProposals;
  const monthlyCost_Sales = monthlyProposalHours * hourlyRate;

  const monthlyLostDeals = monthlyProposals * lostDealPct;
  const monthlyLostRevenue_Sales = monthlyLostDeals * avgClientValue;

  // ─── OPERATIONS & WORKFLOW ROI ───
  const q18Option = answers[18]?.selectedOption ?? 3;
  const q19Option = answers[19]?.selectedOption ?? 3;
  const q20Option = answers[20]?.selectedOption ?? 2;
  const q21Option = answers[21]?.selectedOption ?? 2;

  const adminHours = questions[17].options?.[q18Option]?.adminHours ?? 12;
  const meetingHours = questions[18].options?.[q19Option]?.meetingHours ?? 12;
  const duplicateEntryHours = questions[19].options?.[q20Option]?.duplicateEntryHours ?? 5;
  const communicationHours = questions[20].options?.[q21Option]?.communicationHours ?? 5;

  const weeklyOperationsHours = adminHours + meetingHours + duplicateEntryHours + communicationHours;
  const monthlyOperationsHours = weeklyOperationsHours * 4;
  const monthlyCost_Operations = monthlyOperationsHours * hourlyRate;

  // ─── GROWTH CAPACITY ROI ───
  const q23Option = answers[23]?.selectedOption ?? 2;
  const q24Option = answers[24]?.selectedOption ?? 2;

  const onboardingHours = questions[22].options?.[q23Option]?.onboardingHours ?? 8;
  const monthlyNewClients = monthlyLeads * closeRate;
  const monthlyOnboardingHours = onboardingHours * monthlyNewClients;
  const monthlyCost_Onboarding = monthlyOnboardingHours * hourlyRate;

  const missedReviews = questions[23].options?.[q24Option]?.missedReviews ?? 15;
  const estimatedReferralValue = missedReviews * 0.1 * avgClientValue;

  // ─── TOTALS ───
  const totalMonthlyHours =
    monthlyFounderHoursLocked + monthlyProposalHours + monthlyOperationsHours + monthlyOnboardingHours;
  const totalTimeValue = totalMonthlyHours * hourlyRate;
  const totalLostRevenue = monthlyLostRevenue_Sales + estimatedReferralValue;
  const totalMonthlyOpportunity = totalTimeValue + totalLostRevenue;
  const totalAnnualOpportunity = totalMonthlyOpportunity * 12;

  // ─── SECTION SCORES ───
  const sectionScores: SectionScore[] = [];

  for (const [sectionName, config] of Object.entries(sectionConfig)) {
    let sectionTotal = 0;
    for (const qId of config.questions) {
      sectionTotal += answers[qId]?.points ?? 0;
    }

    let priority: "High" | "Medium" | "Low" = "Medium";
    if (config.maxScore === 0) {
      priority = "Low"; // context-only sections
    } else if (config.maxScore === 8) {
      // AI Foundation: out of 8
      priority = sectionTotal <= 2 ? "High" : sectionTotal <= 5 ? "Medium" : "Low";
    } else if (config.maxScore === 6) {
      // Knowledge Systems: out of 6
      priority = sectionTotal <= 1 ? "High" : sectionTotal <= 4 ? "Medium" : "Low";
    } else if (config.maxScore === 9) {
      // Sales & Delivery: out of 9
      priority = sectionTotal <= 3 ? "High" : sectionTotal <= 6 ? "Medium" : "Low";
    } else {
      // Everything else (12): out of 12
      priority = sectionTotal <= 4 ? "High" : sectionTotal <= 8 ? "Medium" : "Low";
    }

    let hoursLost: number | undefined;
    let revenueImpact: number | undefined;

    if (sectionName === "Founder Dependency") {
      hoursLost = monthlyFounderHoursLocked;
      revenueImpact = monthlyCost_FounderDependency;
    } else if (sectionName === "Sales & Delivery") {
      hoursLost = monthlyProposalHours;
      revenueImpact = monthlyCost_Sales + monthlyLostRevenue_Sales;
    } else if (sectionName === "Operations & Workflow") {
      hoursLost = monthlyOperationsHours;
      revenueImpact = monthlyCost_Operations;
    } else if (sectionName === "Growth Capacity") {
      hoursLost = monthlyOnboardingHours;
      revenueImpact = monthlyCost_Onboarding + estimatedReferralValue;
    }

    sectionScores.push({
      name: sectionName,
      score: sectionTotal,
      maxScore: config.maxScore,
      hoursLost,
      revenueImpact,
      priority,
    });
  }

  // ─── TOTAL SCORE ───
  const totalScore = sectionScores.reduce((sum, s) => sum + s.score, 0);

  // ─── CATEGORY (59-point max) ───
  let category: ROIResults["category"];
  if (totalScore >= 50) {
    category = "Optimized";
  } else if (totalScore >= 38) {
    category = "Solid Foundation";
  } else if (totalScore >= 24) {
    category = "Clear Opportunities";
  } else {
    category = "High Potential";
  }

  // ─── LOWEST SECTION ───
  const scorableSections = sectionScores.filter((s) => s.maxScore > 0);
  const lowestSection = scorableSections.reduce((lowest, current) => {
    const lowestPct = lowest.score / lowest.maxScore;
    const currentPct = current.score / current.maxScore;
    return currentPct < lowestPct ? current : lowest;
  });

  return {
    totalScore,
    category,
    sectionScores,
    monthlyHoursRecoverable: totalMonthlyHours,
    timeValue: totalTimeValue,
    lostRevenue: totalLostRevenue,
    totalMonthlyOpportunity,
    annualOpportunity: totalAnnualOpportunity,
    lowestSection: lowestSection.name,
    founderDependencyROI: {
      monthlyFounderHoursLocked,
      cost: monthlyCost_FounderDependency,
    },
    salesDeliveryROI: {
      wastedHours: monthlyProposalHours,
      timeCost: monthlyCost_Sales,
      lostDeals: Math.round(monthlyLostDeals),
      lostRevenue: monthlyLostRevenue_Sales,
    },
    operationsROI: {
      hours: monthlyOperationsHours,
      cost: monthlyCost_Operations,
    },
    growthCapacityROI: {
      onboardingHours: monthlyOnboardingHours,
      onboardingCost: monthlyCost_Onboarding,
      missedReferralRevenue: estimatedReferralValue,
    },
  };
}
