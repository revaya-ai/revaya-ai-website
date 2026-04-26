export type PrepQuestion = {
  id: number;
  dimension: string;
  text: string;
  helperText?: string;
  yesLabel: string;
  noLabel: string;
};

export const questions: PrepQuestion[] = [
  {
    id: 0,
    dimension: "Knowledge Capture",
    text: "The way you do things in your business — is it written down somewhere, or does it mostly live in your head?",
    yesLabel: "Written down somewhere",
    noLabel: "Mostly in my head",
  },
  {
    id: 1,
    dimension: "Process Repeatability",
    text: "When you do a recurring task — onboarding a client, sending a proposal, following up on a lead — do you do it the same way every time?",
    yesLabel: "Consistent process, same way every time",
    noLabel: "Depends on the situation",
  },
  {
    id: 2,
    dimension: "Tool Integration",
    text: "Do your main tools share data automatically, or do you re-enter information between them?",
    helperText: "Think: CRM, email, calendar, project management.",
    yesLabel: "Mostly connected and automatic",
    noLabel: "Mostly manual or siloed",
  },
  {
    id: 3,
    dimension: "Delegation Readiness",
    text: "If someone needed to handle one of your recurring tasks without you, could they follow written instructions to do it?",
    yesLabel: "Yes, instructions exist or could be followed",
    noLabel: "No, they'd need me to explain it",
  },
  {
    id: 4,
    dimension: "Time Visibility",
    text: "Do you know, roughly, where your time actually goes each week — broken down by type of work?",
    yesLabel: "I have a clear picture",
    noLabel: "Hard to say exactly",
  },
];
