const { createClient } = require('@sanity/client');

// Sanity client configuration
const sanityClient = createClient({
  projectId: 'gdey5o8v',
  dataset: 'production',
  apiVersion: '2024-03-13',
  useCdn: false,
});

// Function to fetch blog posts from Sanity
async function fetchBlogPosts() {
  try {
    const posts = await sanityClient.fetch(`
      *[_type == "post"] {
        "slug": slug.current,
        _updatedAt
      }
    `);
    
    console.log(`📝 Found ${posts.length} blog posts from Sanity`);
    return posts;
  } catch (error) {
    console.error('❌ Error fetching blog posts from Sanity:', error);
    return [];
  }
}

// Function to fetch categories from Sanity
async function fetchCategories() {
  try {
    const categories = await sanityClient.fetch(`
      *[_type == "category"] {
        "slug": slug.current,
        _updatedAt
      }
    `);
    
    console.log(`🏷️  Found ${categories.length} categories from Sanity`);
    return categories;
  } catch (error) {
    console.error('❌ Error fetching categories from Sanity:', error);
    return [];
  }
}

module.exports = {
  siteUrl: 'https://www.jmvisaservices.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/studio/*'],
  
  // This is the key - we'll add all dynamic content here
  additionalPaths: async (config) => {
    const paths = [];
    
    // Add all blog posts
    const posts = await fetchBlogPosts();
    posts.forEach(post => {
      paths.push({
        loc: `/blog/${post.slug}`,
        lastmod: post._updatedAt || new Date().toISOString(),
        changefreq: 'weekly',
        priority: 0.7,
      });
    });
    
    // Add all categories
    const categories = await fetchCategories();
    categories.forEach(category => {
      paths.push({
        loc: `/blog/category/${category.slug}`,
        lastmod: category._updatedAt || new Date().toISOString(),
        changefreq: 'monthly',
        priority: 0.6,
      });
    });
    
    // Add all static service pages
    const servicePages = [
      '/services/study-abroad',
      '/services/work-visa',
      '/services/tourist-visa',
      '/services/business-visa',
      '/services/residence-visa',
      '/services/overseas-education',
      '/services/dummy-ticket-booking',
      '/services/english-proficiency-test',
      '/services/foreign-exchange',
      '/services/passport-services',
      '/services/us-interview-dates',
    ];
    
    servicePages.forEach(service => {
      paths.push({
        loc: service,
        lastmod: new Date().toISOString(),
        changefreq: 'monthly',
        priority: 0.8,
      });
    });
    
    // Add country pages
    const countryPages = [
      '/country/Oceania/Australia',
      '/country/Oceania/New%20Zealand',
      '/country/NorthAmerica/United%20States',
      '/country/NorthAmerica/Canada',
      '/country/Europe/United%20Kingdom',
      '/country/Europe/Ireland',
      '/country/Europe/Austria',
      '/country/Europe/Belgium',
      '/country/Europe/Denmark',
      '/country/Europe/Finland',
      '/country/Europe/France',
      '/country/Europe/Germany',
      '/country/Europe/Greece',
    ];
    
    countryPages.forEach(country => {
      paths.push({
        loc: country,
        lastmod: new Date().toISOString(),
        changefreq: 'monthly',
        priority: 0.8,
      });
    });
    
    console.log(`🚀 Added ${paths.length} total paths to sitemap`);
    return paths;
  },
};
