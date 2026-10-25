import { creditPolicy } from '../data/payrollCredits';
import type { PayrollCredit, PortalUser } from '../types/portal';

export function summarizeCredit(user: PortalUser, credits: PayrollCredit[]) {
  const mine = credits.filter((c) => c.employeeId === user.employeeId);
  const active = mine.filter((c) => c.status === 'activo');
  const limit = user.salaryUsd * creditPolicy.limitMultiplier;
  const used = active.reduce((sum, c) => sum + (c.amountUsd - c.monthlyUsd * c.paidInstallments), 0);
  const monthlyCommitted = active.reduce((sum, c) => sum + c.monthlyUsd, 0);
  const maxMonthly = user.salaryUsd * creditPolicy.maxInstallmentShare;
  return {
    credits: mine,
    limit,
    used,
    available: Math.max(0, limit - used),
    monthlyCommitted,
    maxMonthly,
    monthlyRoom: Math.max(0, maxMonthly - monthlyCommitted)
  };
}