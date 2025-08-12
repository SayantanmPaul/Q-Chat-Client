// parse token and request per minute from the response
export function parseTokenPerMin(msg: string): {
  limit?: number;
  requested?: number;
} {
  const limitMatch = msg.match(/Limit\s+(\d+)/i);
  const reqMatch = msg.match(/Requested\s+(\d+)/i);
  return {
    limit: limitMatch ? Number(limitMatch[1]) : undefined,
    requested: reqMatch ? Number(reqMatch[1]) : undefined,
  };
}
