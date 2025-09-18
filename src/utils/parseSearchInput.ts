export const parseSearchInput = (raw: string) => {
  const result: {
    name?: string;
    assigneeName?: string;
    status?: string;
    tags?: string[];
    pointEstimate?: string;
    dueDate?: string;
  } = {};
  if (!raw || !raw.trim()) return result;

  const assigneeRegex = /assignee:"([^"]+)"|assignee:([^\s]+)/i;
  const assigneeMatch = raw.match(assigneeRegex);
  if (assigneeMatch) {
    result.assigneeName = assigneeMatch[1] || assigneeMatch[2];
  }

  const statusRegex = /status:"([^"]+)"|status:([^\s]+)/i;
  const statusMatch = raw.match(statusRegex);
  if (statusMatch) {
    result.status = statusMatch[1] || statusMatch[2];
  }

  const estimateRegex = /estimate:"([^"]+)"|estimate:([^\s]+)/i;
  const estimateMatch = raw.match(estimateRegex);
  if (estimateMatch) {
    result.pointEstimate = estimateMatch[1] || estimateMatch[2];
  }

  const dueDateRegex = /due:"([^"]+)"|due:([^\s]+)/i;
  const dueDateMatch = raw.match(dueDateRegex);
  if (dueDateMatch) {
    result.dueDate = dueDateMatch[1] || dueDateMatch[2];
  }
  const tagsRegex = /tags:"([^"]+)"|tags:([^\s]+)/i;
  const tagsMatch = raw.match(tagsRegex);
  if (tagsMatch) {
    const rawTags = tagsMatch[1] || tagsMatch[2];
    result.tags = rawTags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
  }

  const cleaned = raw
    .replace(assigneeRegex, "")
    .replace(statusRegex, "")
    .replace(tagsRegex, "")
    .replace(estimateRegex, "")
    .replace(dueDateRegex, "")
    .trim();

  if (cleaned) {
    result.name = cleaned;
  }

  return result;
};
