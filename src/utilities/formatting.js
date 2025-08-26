/**
 * Utility functions for formatting data in the products page
 */

export const formatRating = (rating) => {
  if (!rating) return 'No rating';
  return `${rating.toFixed(1)} out of 5 stars`;
};

export const formatBadges = (badges) => {
  if (!badges || badges.length === 0) return [];
  return badges.slice(0, 3); // Limit to 3 badges for display
};

export const formatIngredients = (ingredients) => {
  if (!ingredients || ingredients.length === 0) return 'No ingredients listed';
  
  return ingredients
    .slice(0, 3) // Show only top 3 ingredients
    .map(ing => `${ing.name} (${ing.amount})`)
    .join(', ');
};

export const formatGoals = (goals) => {
  if (!goals || goals.length === 0) return [];
  
  return goals.map(goal => 
    goal.charAt(0).toUpperCase() + goal.slice(1)
  );
};

export const formatServings = (servings, format) => {
  if (!servings) return 'Servings not specified';
  
  const formatText = format ? ` ${format}s` : ' servings';
  return `${servings}${formatText} per container`;
};

export const formatCertifications = (certifications) => {
  if (!certifications || certifications.length === 0) return [];
  
  const certMap = {
    'GMP': 'Good Manufacturing Practice',
    'ISO': 'ISO Certified',
    'NSF': 'NSF International',
    'USDA': 'USDA Certified',
    'FDA': 'FDA Registered'
  };
  
  return certifications.map(cert => certMap[cert] || cert);
};

export const formatSafetyNotes = (notes) => {
  if (!notes) return null;
  
  // Ensure safety notes are properly formatted
  return notes.charAt(0).toUpperCase() + notes.slice(1);
};

export const formatCategory = (category) => {
  if (!category) return 'Uncategorized';
  
  // Format category names consistently
  const categoryMap = {
    'Nutritional Health': 'Nutritional Health',
    'Household': 'Household',
    'Home Technology': 'Home Technology', 
    'Beauty & Skin Care': 'Beauty & Skin Care'
  };
  
  return categoryMap[category] || category;
};

export const formatProductTitle = (title) => {
  if (!title) return 'Unnamed Product';
  
  // Ensure consistent title formatting
  return title.trim();
};

export const formatDescription = (description, maxLength = 150) => {
  if (!description) return 'No description available';
  
  if (description.length <= maxLength) return description;
  
  // Truncate at word boundary
  const truncated = description.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return lastSpace > 0 
    ? truncated.slice(0, lastSpace) + '...'
    : truncated + '...';
};

export const formatMatchScore = (score) => {
  if (typeof score !== 'number' || isNaN(score)) return '0%';
  return `${Math.round(score)}%`;
};

export const getMatchColor = (score) => {
  if (score >= 80) return '#059669'; // Green for high matches
  if (score >= 60) return '#F59E0B'; // Orange for medium matches
  if (score >= 40) return '#0099CC'; // Blue for okay matches
  return '#6B7280'; // Gray for low matches
};

export const formatLabReports = (reports) => {
  if (!reports || reports.length === 0) return [];
  
  return reports.map(report => ({
    ...report,
    title: report.title || 'Lab Report',
    url: report.url || '#'
  }));
};

export const validateProductData = (product) => {
  const errors = [];
  
  if (!product.id) errors.push('Product ID is required');
  if (!product.title) errors.push('Product title is required');
  if (!product.category) errors.push('Product category is required');
  if (!product.images || product.images.length === 0) {
    errors.push('At least one product image is required');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const sanitizeSearchQuery = (query) => {
  if (!query || typeof query !== 'string') return '';
  
  // Remove special characters and normalize spaces
  return query
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
};

export const highlightSearchTerms = (text, searchQuery) => {
  if (!searchQuery || !text) return text;
  
  const regex = new RegExp(`(${searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
};

export default {
  formatRating,
  formatBadges,
  formatIngredients,
  formatGoals,
  formatServings,
  formatCertifications,
  formatSafetyNotes,
  formatCategory,
  formatProductTitle,
  formatDescription,
  formatMatchScore,
  getMatchColor,
  formatLabReports,
  validateProductData,
  sanitizeSearchQuery,
  highlightSearchTerms
};