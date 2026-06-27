/**
 * AI Recommendation Engine Service
 * Calculates a highly accurate Compatibility Score based on multiple weighted parameters.
 */

export interface CandidateProfile {
  id: string;
  name: string;
  age: number;
  height: number;
  religion: string;
  profession: string;
  city: string;
  country: string;
  education: string;
  incomeRange?: 'low' | 'mid' | 'high';
  lifestyle?: {
    diet: 'veg' | 'non-veg' | 'vegan';
    drinking: 'yes' | 'no' | 'occasionally';
    smoking: 'yes' | 'no' | 'occasionally';
  };
}

export interface UserPreferences {
  targetMinAge: number;
  targetMaxAge: number;
  targetReligion: string;
  targetEducationLevel: string;
  targetIncomeRange: 'low' | 'mid' | 'high' | 'any';
  targetLifestyle: {
    diet: 'veg' | 'non-veg' | 'vegan' | 'any';
  };
}

/**
 * Calculates compatibility out of 100% based on defined weighted metrics.
 * 
 * Weights Matrix:
 * - Age Proximity (15%)
 * - Education Parity (20%)
 * - Religion & Lifestyle (30%)
 * - Profession & Income (20%)
 * - Location Proxy (15%)
 */
export function calculateCompatibilityScore(
  candidate: CandidateProfile,
  preferences: UserPreferences
): number {
  let score = 0;

  // 1. Age Proximity (Max 15 points)
  if (candidate.age >= preferences.targetMinAge && candidate.age <= preferences.targetMaxAge) {
    score += 15;
  } else {
    // Deduct 2 points for every year outside the range, min 0
    const diff = Math.min(
      Math.abs(candidate.age - preferences.targetMinAge),
      Math.abs(candidate.age - preferences.targetMaxAge)
    );
    score += Math.max(0, 15 - diff * 2);
  }

  // 2. Education Parity (Max 20 points)
  // Simplified string match for demonstration. In production, this would use a ranking matrix.
  if (candidate.education.toLowerCase().includes(preferences.targetEducationLevel.toLowerCase())) {
    score += 20;
  } else {
    score += 10; // Partial score for having some education
  }

  // 3. Religion & Lifestyle (Max 30 points)
  let religionLifestyleScore = 0;
  if (candidate.religion.toLowerCase() === preferences.targetReligion.toLowerCase()) {
    religionLifestyleScore += 20; // Heavy weight for religion match
  }
  
  if (preferences.targetLifestyle.diet === 'any' || candidate.lifestyle?.diet === preferences.targetLifestyle.diet) {
    religionLifestyleScore += 10;
  } else {
    religionLifestyleScore += 5; // Partial compatibility
  }
  score += religionLifestyleScore;

  // 4. Profession & Income (Max 20 points)
  if (preferences.targetIncomeRange === 'any' || candidate.incomeRange === preferences.targetIncomeRange) {
    score += 20;
  } else {
    score += 12; // Different bracket but still employed
  }

  // 5. Location Proxy (Max 15 points)
  // Assumes 15 points base for same country. If we had coordinates, we'd calculate Haversine distance.
  score += 15; 

  // Normalize max bounds just in case
  return Math.min(100, Math.max(0, Math.round(score)));
}
