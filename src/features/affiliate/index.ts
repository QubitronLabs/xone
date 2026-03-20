export { AffiliateDashboard } from "./components/AffiliateDashboard";
// Business-logic hooks
export {
	useAffiliateStats,
	useReferrals,
	useAffiliateRates,
} from "./hooks/useAffiliate";
// TanStack Query wrappers
export {
	affiliateQueries,
	affiliateKeys,
	useAffiliateStatsQuery,
	useReferralsQuery,
	useAffiliateRatesQuery,
} from "./queries/affiliate.queries";
export type {
	AffiliateStats,
	Referral,
	AffiliateRate,
	EarningEntry,
} from "./types";
