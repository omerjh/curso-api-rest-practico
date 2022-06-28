const qs = (id) => document.querySelector(id);

// Sections
const headerSection = qs('#header');
const trendingPreviewSection = qs('#trendingPreview');
const categoriesPreviewSection = qs('#categoriesPreview');
const genericSection = qs('#genericList');
const movieDetailSection = qs('#movieDetail');

// Lists & Containers
const searchForm = qs('#searchForm');
const trendingMoviesPreviewList = qs('.trendingPreview-movieList');
const categoriesPreviewList = qs('.categoriesPreview-list');
const movieDetailCategoriesList = qs('#movieDetail .categories-list');
const relatedMoviesContainer = qs('.relatedMovies-scrollContainer');

// Elements
const headerTitle = qs('.header-title');
const arrowBtn = qs('.header-arrow');
const headerCategoryTitle = qs('.header-title--categoryView');

const searchFormInput = qs('#searchForm input');
const searchFormBtn = qs('#searchBtn');

const trendingBtn = qs('.trendingPreview-btn');

const movieDetailTitle = qs('.movieDetail-title');
const movieDetailDescription = qs('.movieDetail-description');
const movieDetailScore = qs('.movieDetail-score');