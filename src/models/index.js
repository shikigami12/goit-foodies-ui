/**
 * API Request/Response Models
 * These models correspond to the backend API schemas
 */

// ============================================================================
// AUTH
// ============================================================================

/**
 * @typedef {Object} RegisterRequest
 * @property {string} name - User's display name (2-50 chars)
 * @property {string} email - User's email address
 * @property {string} password - User's password (min 6 chars)
 */

/**
 * @typedef {Object} LoginRequest
 * @property {string} email - User's email address
 * @property {string} password - User's password
 */

/**
 * @typedef {Object} AuthResponse
 * @property {UserResponse} user - Authenticated user data
 * @property {string} token - JWT authentication token
 */

// ============================================================================
// USER
// ============================================================================

/**
 * @typedef {Object} UserResponse
 * @property {string} id - Unique user identifier (UUID)
 * @property {string} name - User's display name
 * @property {string} email - User's email address
 * @property {string|null} avatar - URL to user's avatar image
 */

/**
 * @typedef {Object} UserWithStatsResponse
 * @property {string} id - Unique user identifier (UUID)
 * @property {string} name - User's display name
 * @property {string} email - User's email address
 * @property {string|null} avatar - URL to user's avatar image
 * @property {number} recipesCount - Number of recipes created by user
 * @property {number} favoritesCount - Number of recipes in user's favorites
 * @property {number} followersCount - Number of users following this user
 * @property {number} followingCount - Number of users this user is following
 */

// ============================================================================
// FOLLOWERS
// ============================================================================

/**
 * @typedef {Object} FollowerItem
 * @property {string} id - User's unique identifier (UUID)
 * @property {string} name - User's display name
 * @property {string|null} avatar - URL to user's avatar image
 */

/**
 * @typedef {Object} FollowersResponse
 * @property {FollowerItem[]} followers - List of followers
 * @property {number} total - Total number of followers
 */

/**
 * @typedef {Object} FollowingResponse
 * @property {FollowerItem[]} following - List of users being followed
 * @property {number} total - Total number of users being followed
 */

// ============================================================================
// RECIPE
// ============================================================================

/**
 * @typedef {Object} RecipeIngredientDto
 * @property {string} ingredientId - UUID of the ingredient
 * @property {string} measure - Measurement amount (e.g., "2 cups", "100g")
 */

/**
 * @typedef {Object} CreateRecipeRequest
 * @property {string} title - Recipe title (3-100 chars)
 * @property {string} categoryId - UUID of the category
 * @property {string} areaId - UUID of the area/region
 * @property {string} instructions - Step-by-step cooking instructions (min 10 chars)
 * @property {string} [time] - Estimated cooking time (e.g., "30 mins")
 * @property {RecipeIngredientDto[]} ingredients - List of ingredients with measurements
 */

/**
 * @typedef {Object} RecipeOwner
 * @property {string} id - Owner's unique identifier
 * @property {string} name - Owner's display name
 * @property {string|null} avatar - Owner's avatar URL
 */

/**
 * @typedef {Object} RecipeCategory
 * @property {string} id - Category UUID
 * @property {string} name - Category name
 * @property {string|null} thumb - Category thumbnail URL
 */

/**
 * @typedef {Object} RecipeArea
 * @property {string} id - Area UUID
 * @property {string} name - Area name
 */

/**
 * @typedef {Object} RecipeIngredient
 * @property {string} id - Ingredient UUID
 * @property {string} name - Ingredient name
 * @property {string|null} description - Ingredient description
 * @property {string|null} img - Ingredient image URL
 */

/**
 * @typedef {Object} RecipeIngredientItem
 * @property {string} ingredientId - Ingredient UUID
 * @property {string} measure - Measurement amount
 * @property {RecipeIngredient} ingredient - Full ingredient data
 */

/**
 * Recipe list item (without ingredients details)
 * @typedef {Object} RecipeListItem
 * @property {string} id - Recipe UUID
 * @property {string} title - Recipe title
 * @property {string} instructions - Cooking instructions
 * @property {string|null} thumb - Recipe thumbnail URL
 * @property {string|null} time - Cooking time
 * @property {string} ownerId - Owner's UUID
 * @property {string} categoryId - Category UUID
 * @property {string} areaId - Area UUID
 * @property {string} createdAt - Creation timestamp
 * @property {string} updatedAt - Last update timestamp
 * @property {RecipeCategory} category - Category details
 * @property {RecipeArea} area - Area details
 * @property {RecipeOwner} owner - Owner details
 */

/**
 * Recipe with full details (including ingredients)
 * @typedef {RecipeListItem & { ingredients: RecipeIngredientItem[] }} RecipeDetail
 */

/**
 * Popular recipe with favorites count
 * @typedef {RecipeListItem & { favoritesCount: number }} PopularRecipe
 */

// ============================================================================
// REFERENCE DATA
// ============================================================================

/**
 * @typedef {Object} Category
 * @property {string} id - Category UUID
 * @property {string} name - Category name
 * @property {string|null} thumb - Category thumbnail URL
 */

/**
 * @typedef {Object} Area
 * @property {string} id - Area UUID
 * @property {string} name - Area name
 */

/**
 * @typedef {Object} Ingredient
 * @property {string} id - Ingredient UUID
 * @property {string} name - Ingredient name
 * @property {string|null} description - Ingredient description
 * @property {string|null} img - Ingredient image URL
 */

// ============================================================================
// TESTIMONIAL
// ============================================================================

/**
 * @typedef {Object} TestimonialUser
 * @property {string} id - User's unique identifier
 * @property {string} name - User's display name
 * @property {string|null} avatar - User's avatar URL
 */

/**
 * @typedef {Object} TestimonialResponse
 * @property {string} id - Testimonial UUID
 * @property {string} testimonial - Testimonial text content
 * @property {string} createdAt - Creation timestamp
 * @property {TestimonialUser} user - User who wrote the testimonial
 */

// ============================================================================
// PAGINATION
// ============================================================================

/**
 * @typedef {Object} PaginationParams
 * @property {number} [page=1] - Page number (1-indexed)
 * @property {number} [limit=10] - Number of items per page (max 100)
 */

/**
 * @typedef {Object} RecipeSearchParams
 * @property {number} [page=1] - Page number (1-indexed)
 * @property {number} [limit=10] - Number of items per page (max 100)
 * @property {string} [category] - Filter by category ID (UUID)
 * @property {string} [ingredient] - Filter by ingredient ID (UUID)
 * @property {string} [area] - Filter by area ID (UUID)
 */

/**
 * @template T
 * @typedef {Object} PaginatedResponse
 * @property {T[]} data - Array of items for the current page
 * @property {number} total - Total number of items across all pages
 * @property {number} page - Current page number (1-indexed)
 * @property {number} limit - Number of items per page
 * @property {number} totalPages - Total number of pages
 */

/**
 * @typedef {Object} RecipesPaginatedResponse
 * @property {RecipeListItem[]} recipes - Array of recipes for the current page
 * @property {number} total - Total number of recipes
 * @property {number} page - Current page number
 * @property {number} limit - Items per page
 * @property {number} totalPages - Total pages
 */

// ============================================================================
// ERROR
// ============================================================================

/**
 * @typedef {Object} ErrorResponse
 * @property {string} message - Error message
 */

/**
 * @typedef {Object} ApiError
 * @property {number} status - HTTP status code
 * @property {string} message - Error message
 * @property {Object|null} data - Additional error data
 * @property {Error} originalError - Original error object
 */

// ============================================================================
// MESSAGE RESPONSES
// ============================================================================

/**
 * @typedef {Object} MessageResponse
 * @property {string} message - Success/info message
 */

export {};
