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
  
  // Transform function to add dynamic content
  async transform(config, path) {
    // Add blog posts
    if (path === '/blog') {
      const posts = await fetchBlogPosts();
      const blogUrls = posts.map(post => ({
        loc: `/blog/${post.slug}`,
        lastmod: post._updatedAt || new Date().toISOString(),
        changefreq: 'weekly',
        priority: 0.7,
      }));
      
      // Return the main blog page plus all individual blog posts
      return [
        {
          loc: path,
          lastmod: new Date().toISOString(),
          changefreq: 'weekly',
          priority: 0.8,
        },
        ...blogUrls
      ];
    }
    
    // Add categories
    if (path === '/blog/categories') {
      const categories = await fetchCategories();
      const categoryUrls = categories.map(category => ({
        loc: `/blog/category/${category.slug}`,
        lastmod: category._updatedAt || new Date().toISOString(),
        changefreq: 'monthly',
        priority: 0.6,
      }));
      
      return categoryUrls;
    }
    
    // Default transformation for other pages
    return {
      loc: path,
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: 0.8,
    };
  },
  
  // Additional paths to include
  additionalPaths: async (config) => {
    const paths = [];
    
    // Add blog posts
    const posts = await fetchBlogPosts();
    posts.forEach(post => {
      paths.push({
        loc: `/blog/${post.slug}`,
        lastmod: post._updatedAt || new Date().toISOString(),
        changefreq: 'weekly',
        priority: 0.7,
      });
    });
    
    // Add categories
    const categories = await fetchCategories();
    categories.forEach(category => {
      paths.push({
        loc: `/blog/category/${category.slug}`,
        lastmod: category._updatedAt || new Date().toISOString(),
        changefreq: 'monthly',
        priority: 0.6,
      });
    });
    
    return paths;
  },
};
