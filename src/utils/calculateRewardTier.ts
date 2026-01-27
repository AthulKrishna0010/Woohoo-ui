/**
 * Determines the reward tier based on the gamified loudness score.
 * 
 * @param peakLoudness - The gamified loudness score (0 - 450+).
 * @returns One of the reward tier strings.
 */
export function calculateRewardTier(peakLoudness: number): "0_day" | "1_day" | "2_day" | "5_day" | "7_day" {
    // Updated Tiers (Synced with Backend)

    if (peakLoudness >= 1200) {
        return "7_day";
    } else if (peakLoudness >= 850) {
        return "5_day";
    } else if (peakLoudness >= 600) {
        return "2_day";
    } else if (peakLoudness >= 350) {
        return "1_day";
    } else {
        return "0_day";
    }
}
