type ProgressBarProps = {
  current: number;
  total: number;
};

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percent = Math.round((current / total) * 100);

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-[0.8125rem] text-white/40 font-body">
          Question {current} of {total}
        </span>
        <span className="text-[0.8125rem] text-white/40 font-body">
          {percent}%
        </span>
      </div>
      <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-brand-accent rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
