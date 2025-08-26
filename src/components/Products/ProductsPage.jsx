import React, { useState, useEffect } from 'react';
import HeroProducts from './HeroProducts';
import ProductsFilters from './ProductsFilters';
import ProductGrid from './ProductGrid';
import NutritionalHealthCarousel from './NutritionalHealthCarousel';
import HouseholdCollection from './HouseholdCollection';
import HomeTechGrid from './HomeTechGrid';
import BeautySkinCollection from './BeautySkinCollection';
import ProductFinderQuiz from './ProductFinderQuiz';
import productsData from '../../data/products.json';
import '../../styles/ProductsPage.css';
import Navbar from '../Navbar';
import Footer from '../Footer/Footer';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filters, setFilters] = useState({
        search: '',
        category: '',
        format: '',
        goals: [],
        sort: 'relevance'
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading products
        setTimeout(() => {
            setProducts(productsData);
            setFilteredProducts(productsData);
            setLoading(false);
        }, 500);
    }, []);

    useEffect(() => {
        applyFilters();
    }, [filters, products]);

    const applyFilters = () => {
        let filtered = [...products];

        // Search filter
        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            filtered = filtered.filter(product =>
                product.title.toLowerCase().includes(searchTerm) ||
                product.short_description.toLowerCase().includes(searchTerm) ||
                product.ingredients.some(ing => ing.name.toLowerCase().includes(searchTerm))
            );
        }

        // Category filter
        if (filters.category) {
            filtered = filtered.filter(product => product.category === filters.category);
        }

        // Format filter
        if (filters.format) {
            filtered = filtered.filter(product => product.format === filters.format);
        }

        // Goals filter
        if (filters.goals.length > 0) {
            filtered = filtered.filter(product =>
                product.goal.some(goal => filters.goals.includes(goal))
            );
        }

        // Sorting
        switch (filters.sort) {
            case 'rating':
                filtered.sort((a, b) => b.rating - a.rating);
                break;
            case 'alphabetical':
                filtered.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'newest':
                // Simulate newest first (could be based on creation date)
                filtered.reverse();
                break;
            default:
                // Relevance (default order)
                break;
        }

        setFilteredProducts(filtered);
    };

    const handleFilterChange = (newFilters) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
    };

    const generateProductJsonLd = () => {
        const visibleProducts = filteredProducts.slice(0, 12); // First 12 products

        return {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Premium Health & Wellness Products",
            "description": "Clinically tested supplements, household products, and wellness technology",
            "mainEntity": {
                "@type": "ItemList",
                "itemListElement": visibleProducts.map((product, index) => ({
                    "@type": "Product",
                    "position": index + 1,
                    "name": product.title,
                    "description": product.short_description,
                    "image": product.images[0]?.src,
                    "brand": "BioTech Solutions",
                    "category": product.category,
                    "aggregateRating": {
                        "@type": "AggregateRating",
                        "ratingValue": product.rating,
                        "reviewCount": Math.floor(product.rating * 100)
                    }
                }))
            }
        };
    };

    if (loading) {
        return (
            <div className="container" style={{ padding: '2rem 0' }}>
                <div className="skeleton" style={{ height: '400px', borderRadius: '24px', marginBottom: '2rem' }}></div>
                <div className="grid grid-3">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="skeleton card" style={{ height: '300px' }}></div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <>
        <Navbar/>
        <div data-testid="products-page">
            <main id="main-content" className="products-page" style={{paddingTop: '100px'}}>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(generateProductJsonLd())
                    }}
                />

                <HeroProducts featuredProducts={products.slice(0, 3)} />

                <section className="container" style={{ padding: '2rem 0' }}>
                    <ProductsFilters
                        filters={filters}
                        onFilterChange={handleFilterChange}
                        totalResults={filteredProducts.length}
                    />

                    <ProductGrid
                        products={filteredProducts}
                        loading={loading}
                    />
                </section>

                <NutritionalHealthCarousel
                    products={products.filter(p => p.category === 'Nutritional Health')}
                />

                <HouseholdCollection
                    products={products.filter(p => p.category === 'Household')}
                />

                <HomeTechGrid
                    products={products.filter(p => p.category === 'Home Technology')}
                />

                <BeautySkinCollection
                    products={products.filter(p => p.category === 'Beauty & Skin Care')}
                />

                <ProductFinderQuiz products={products} />

                <section className="newsletter-cta" style={{
                    background: 'var(--primary)',
                    color: 'white',
                    padding: '3rem 0',
                    marginTop: '4rem'
                }}>
                    <div className="container" style={{ textAlign: 'center' }}>
                        <h2>Get Product Tips & Science Updates</h2>
                        <p style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
                            Stay informed with the latest research, product insights, and wellness tips from our science team.
                        </p>
                        <form style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                style={{
                                    padding: '0.75rem 1rem',
                                    borderRadius: 'var(--radius)',
                                    border: 'none',
                                    minWidth: '300px'
                                }}
                                aria-label="Email address for newsletter"
                            />
                            <button type="submit" className="btn-secondary" style={{
                                background: 'white',
                                color: 'var(--primary)',
                                border: 'none'
                            }}>
                                Subscribe
                            </button>
                        </form>
                    </div>
                </section>
            </main>
        </div>
        <Footer/>
        </>
    );
};

export default ProductsPage;