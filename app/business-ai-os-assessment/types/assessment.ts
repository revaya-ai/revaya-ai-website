export interface Question {
  id: number;
  text: string;
  type: "single-select" | "slider";
  section: string;
  options?: QuestionOption[];
  helperText?: string;
  sliderConfig?: {
    min: number;
    max: number;
    default: number;
    prefix?: string;
    suffix?: string;
  };
}

export interface QuestionOption {
  label: string;
  points: number;
  roiMultiplier?: number;
  founderTaxPct?: number;
  decisionHours?: number;
  hoursPerProposal?: number;
  lostDealPct?: number;
  adminHours?: number;
  meetingHours?: number;
  duplicateEntryHours?: number;
  communicationHours?: number;
  onboardingHours?: number;
  missedReviews?: number;
}

export interface AssessmentAnswers {
  [questionId: number]: {
    selectedOption?: number;
    sliderValue?: number;
    points: number;
  };
}

export interface SectionScore {
  name: string;
  score: number;
  maxScore: number;
  hoursLost?: number;
  revenueImpact?: number;
  priority: "High" | "Medium" | "Low";
}

export interface ROIResults {
  totalScore: number;
  category:
    | "Optimized"
    | "Solid Foundation"
    | "Clear Opportunities"
    | "High Potential";
  sectionScores: SectionScore[];
  monthlyHoursRecoverable: number;
  timeValue: number;
  lostRevenue: number;
  totalMonthlyOpportunity: number;
  annualOpportunity: number;
  lowestSection: string;
  founderDependencyROI: {
    monthlyFounderHoursLocked: number;
    cost: number;
  };
  salesDeliveryROI: {
    wastedHours: number;
    timeCost: number;
    lostDeals: number;
    lostRevenue: number;
  };
  operationsROI: {
    hours: number;
    cost: number;
  };
  growthCapacityROI: {
    onboardingHours: number;
    onboardingCost: number;
    missedReferralRevenue: number;
  };
}

export interface AssessmentSubmission {
  email: string;
  name: string;
  answers: AssessmentAnswers;
  results: ROIResults;
}
