/**
 * Product matching engine for the Product Finder Quiz
 */

export const calculateProductMatches = (products, userAnswers) => {
  const scoredProducts = products.map(product => {
    let totalScore = 0;
    const maxScore = 100;
    const matchReasons = [];

    // Goal Matching (40% of total score)
    if (userAnswers.goal) {
      const goalScore = calculateGoalScore(product, userAnswers.goal);
      totalScore += goalScore.score * 0.4;
      if (goalScore.reasons.length > 0) {
        matchReasons.push(...goalScore.reasons);
      }
    }

    // Format Matching (30% of total score)  
    if (userAnswers.format) {
      const formatScore = calculateFormatScore(product, userAnswers.format);
      totalScore += formatScore.score * 0.3;
      if (formatScore.reasons.length > 0) {
        matchReasons.push(...formatScore.reasons);
      }
    }

    // Constraints Matching (30% of total score)
    if (userAnswers.constraints && userAnswers.constraints.length > 0) {
      const constraintScore = calculateConstraintScore(product, userAnswers.constraints);
      totalScore += constraintScore.score * 0.3;
      if (constraintScore.reasons.length > 0) {
        matchReasons.push(...constraintScore.reasons);
      }
    }

    return {
      ...product,
      matchScore: Math.round(totalScore),
      matchReasons: matchReasons.slice(0, 4) // Limit to top 4 reasons
    };
  });

  return scoredProducts
    .filter(product => product.matchScore >= 25) // Filter out poor matches
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 6); // Return top 6 matches
};

const calculateGoalScore = (product, userGoal) => {
  const goalMapping = {
    'energy': {
      keywords: ['energy', 'focus', 'boost', 'performance'],
      productGoals: ['energy', 'cognition', 'focus'],
      categories: ['Nutritional Health']
    },
    'sleep': {
      keywords: ['sleep', 'rest', 'recovery', 'calm'],
      productGoals: ['sleep', 'recovery', 'relaxation'],
      categories: ['Nutritional Health', 'Home Technology']
    },
    'cognition': {
      keywords: ['brain', 'memory', 'focus', 'mental', 'cognitive'],
      productGoals: ['cognition', 'focus', 'brain', 'memory'],
      categories: ['Nutritional Health']
    },
    'longevity': {
      keywords: ['aging', 'longevity', 'cellular', 'antioxidant'],
      productGoals: ['longevity', 'anti-aging', 'cellular'],
      categories: ['Nutritional Health', 'Beauty & Skin Care']
    },
    'immunity': {
      keywords: ['immune', 'defense', 'wellness', 'protection'],
      productGoals: ['immunity', 'wellness', 'defense'],
      categories: ['Nutritional Health']
    },
    'cleaning': {
      keywords: ['clean', 'sanitize', 'disinfect', 'safe'],
      productGoals: ['cleaning', 'sanitization', 'safety'],
      categories: ['Household']
    },
    'air-quality': {
      keywords: ['air', 'quality', 'monitor', 'environment'],
      productGoals: ['air quality', 'monitoring', 'environmental'],
      categories: ['Home Technology']
    },
    'skin-care': {
      keywords: ['skin', 'beauty', 'anti-aging', 'hydration'],
      productGoals: ['anti-aging', 'hydration', 'barrier repair'],
      categories: ['Beauty & Skin Care']
    }
  };

  const mapping = goalMapping[userGoal];
  if (!mapping) return { score: 0, reasons: [] };

  let score = 0;
  const reasons = [];

  // Check category match (high weight)
  if (mapping.categories.includes(product.category)) {
    score += 40;
    reasons.push(`Perfect category match: ${product.category}`);
  }

  // Check product goals (medium weight)
  const matchingGoals = product.goal.filter(goal => 
    mapping.productGoals.some(mappedGoal => 
      goal.toLowerCase().includes(mappedGoal.toLowerCase()) ||
      mappedGoal.toLowerCase().includes(goal.toLowerCase())
    )
  );

  if (matchingGoals.length > 0) {
    score += 40 * (matchingGoals.length / product.goal.length);
    reasons.push(`Supports: ${matchingGoals.join(', ')}`);
  }

  // Check keywords in title and description (lower weight)
  const titleMatch = mapping.keywords.some(keyword =>
    product.title.toLowerCase().includes(keyword.toLowerCase())
  );
  const descMatch = mapping.keywords.some(keyword =>
    product.short_description.toLowerCase().includes(keyword.toLowerCase())
  );

  if (titleMatch || descMatch) {
    score += 20;
    reasons.push('Directly addresses your goal');
  }

  return { score: Math.min(score, 100), reasons };
};

const calculateFormatScore = (product, userFormat) => {
  if (userFormat === 'any') {
    return { score: 50, reasons: ['Flexible format preference'] };
  }

  const formatMapping = {
    'capsule': ['capsule'],
    'powder': ['powder'],
    'device': ['device'],
    'topical': ['serum', 'cream', 'gel', 'mask', 'spray']
  };

  const acceptableFormats = formatMapping[userFormat] || [userFormat];
  
  if (acceptableFormats.includes(product.format)) {
    return { 
      score: 100, 
      reasons: [`Available in your preferred ${product.format} format`] 
    };
  }

  // Partial score for related formats
  if (userFormat === 'topical' && ['cream', 'serum', 'gel'].includes(product.format)) {
    return { score: 80, reasons: [`${product.format} format (topical)`] };
  }

  return { score: 0, reasons: [] };
};

const calculateConstraintScore = (product, userConstraints) => {
  const constraintMapping = {
    'vegan': {
      badges: ['Vegan', 'Plant-Based'],
      weight: 1.0
    },
    'organic': {
      badges: ['Organic', 'USDA Organic', 'Certified Organic'],
      weight: 1.0
    },
    'fragrance-free': {
      badges: ['Fragrance-Free', 'Unscented', 'Fragrance Free'],
      weight: 0.8
    },
    'sensitive': {
      badges: ['Sensitive Skin', 'Hypoallergenic', 'Gentle', 'Dermatologist Tested'],
      weight: 0.9
    },
    'eco-friendly': {
      badges: ['Eco-Friendly', 'Sustainable', 'Plastic-Free', 'Green Seal'],
      weight: 0.8
    },
    'third-party-tested': {
      badges: ['Third-Party Tested', 'Lab Tested', 'Clinically Tested', 'Third Party'],
      weight: 1.0
    }
  };

  let totalScore = 0;
  const reasons = [];
  const maxConstraints = userConstraints.length;

  userConstraints.forEach(constraint => {
    const mapping = constraintMapping[constraint];
    if (!mapping) return;

    const hasMatchingBadge = product.badges.some(badge =>
      mapping.badges.some(requiredBadge =>
        badge.toLowerCase().includes(requiredBadge.toLowerCase()) ||
        requiredBadge.toLowerCase().includes(badge.toLowerCase())
      )
    );

    if (hasMatchingBadge) {
      totalScore += (100 / maxConstraints) * mapping.weight;
      const matchedBadge = product.badges.find(badge =>
        mapping.badges.some(requiredBadge =>
          badge.toLowerCase().includes(requiredBadge.toLowerCase())
        )
      );
      if (matchedBadge) {
        reasons.push(matchedBadge);
      }
    }
  });

  return { score: Math.min(totalScore, 100), reasons };
};

export const getMatchExplanation = (product, userAnswers) => {
  const explanations = [];

  // Goal explanation
  if (userAnswers.goal && product.matchReasons.length > 0) {
    explanations.push(
      `This product matches your "${userAnswers.goal}" goal because it ${product.matchReasons[0].toLowerCase()}.`
    );
  }

  // Format explanation
  if (userAnswers.format && userAnswers.format !== 'any') {
    if (product.format === userAnswers.format) {
      explanations.push(`Available in your preferred ${product.format} format.`);
    }
  }

  // Constraints explanation
  if (userAnswers.constraints && userAnswers.constraints.length > 0) {
    const metConstraints = product.matchReasons.filter(reason =>
      product.badges.some(badge => reason.includes(badge))
    );
    
    if (metConstraints.length > 0) {
      explanations.push(`Meets your requirements: ${metConstraints.join(', ')}.`);
    }
  }

  return explanations.join(' ');
};

export default {
  calculateProductMatches,
  getMatchExplanation
};