import { JobTaskStatus } from "../enums/jobTaskStatus";

interface JobTaskStatusBadgeProps {
  JobTaskStatus: JobTaskStatus;
}

export function JobTaskStatusBadge(props: JobTaskStatusBadgeProps) {
  const displayValues = {
    [JobTaskStatus.Upcoming]: {
      style: "badge-primary",
      text: "Upcoming",
    },
    [JobTaskStatus.InProgress]: {
      style: "badge-secondary",
      text: "In Progress",
    },
    [JobTaskStatus.Complete]: {
      style: "badge-accent",
      text: "Complete",
    },
  };

  const displayValue = displayValues[props.JobTaskStatus];

  return (
    <div className={`badge ${displayValue.style}`}>{displayValue.text}</div>
  );
}
