import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductCard from '../components/ProductCard';

// Mock product data
const mockProduct = {
    id: 'test-product-1',
    title: 'Test Supplement',
    slug: 'test-supplement',
    category: 'Nutritional Health',
    images: [
        {
            src: 'https://example.com/image.jpg',
            alt: 'Test Supplement bottle'
        }
    ],
    rating: 4.5,
    badges: ['Lab Tested', 'Vegan'],
    short_description: 'A test supplement for optimal health.',
    ingredients: [
        { name: 'Vitamin C', amount: '500mg' },
        { name: 'Vitamin D', amount: '1000 IU' }
    ],
    goal: ['immunity', 'wellness'],
    format: 'capsule',
    servings: 30,
    lab_reports: [
        { title: 'Third party test 2024', url: '#test-report' }
    ],
    meta: {
        safety_notes: 'Take with food',
        certifications: ['GMP', 'ISO']
    }
};

const mockOnQuickView = jest.fn();

// Mock DOM manipulation for toasts
const mockToastRemove = jest.fn();
const mockToast = {
    remove: mockToastRemove,
    setAttribute: jest.fn(),
    className: '',
    innerHTML: ''
};

// Mock document.createElement
const originalCreateElement = document.createElement;
beforeEach(() => {
    document.createElement = jest.fn((tagName) => {
        if (tagName === 'div') {
            return mockToast;
        }
        return originalCreateElement.call(document, tagName);
    });

    // Mock appendChild
    document.body.appendChild = jest.fn();

    jest.clearAllMocks();
});

afterEach(() => {
    document.createElement = originalCreateElement;
});

describe('ProductCard Component', () => {
    it('renders product information correctly', () => {
        render(<ProductCard product={mockProduct} onQuickView={mockOnQuickView} />);

        // Check basic product information
        expect(screen.getByText('Test Supplement')).toBeInTheDocument();
        expect(screen.getByText('A test supplement for optimal health.')).toBeInTheDocument();
        expect(screen.getByText('(4.5)')).toBeInTheDocument();

        // Check badges
        expect(screen.getByText('Lab Tested')).toBeInTheDocument();
        expect(screen.getByText('Vegan')).toBeInTheDocument();

        // Check goals
        expect(screen.getByText('Immunity')).toBeInTheDocument();
        expect(screen.getByText('Wellness')).toBeInTheDocument();
    });

    it('displays product image with correct alt text', () => {
        render(<ProductCard product={mockProduct} onQuickView={mockOnQuickView} />);

        const image = screen.getByAltText('Test Supplement bottle');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
        expect(image).toHaveAttribute('loading', 'lazy');
    });

    it('renders rating stars correctly', () => {
        render(<ProductCard product={mockProduct} onQuickView={mockOnQuickView} />);

        // Check for rating display
        const ratingText = screen.getByText('(4.5)');
        expect(ratingText).toBeInTheDocument();
    });

    it('calls onQuickView when Quick View button is clicked', () => {
        render(<ProductCard product={mockProduct} onQuickView={mockOnQuickView} />);

        const quickViewButton = screen.getByRole('button', { name: /view details for test supplement/i });
        fireEvent.click(quickViewButton);

        expect(mockOnQuickView).toHaveBeenCalledTimes(1);
    });

    it('handles add to routine button click', async () => {
        render(<ProductCard product={mockProduct} onQuickView={mockOnQuickView} />);

        const addButton = screen.getByRole('button', { name: /add test supplement to routine/i });
        fireEvent.click(addButton);

        // Check that toast was created and appended
        expect(document.createElement).toHaveBeenCalledWith('div');
        expect(document.body.appendChild).toHaveBeenCalledWith(mockToast);
        expect(mockToast.innerHTML).toContain('Added to routine');
    });

    it('shows ingredients in hover details', async () => {
        const { container } = render(<ProductCard product={mockProduct} onQuickView={mockOnQuickView} />);

        const card = container.querySelector('.product-card');
        fireEvent.mouseEnter(card);

        await waitFor(() => {
            expect(screen.getByText(/Vitamin C, Vitamin D/)).toBeInTheDocument();
        });
    });

    it('handles out of stock state correctly', () => {
        // Mock Math.random to return a low value (simulating out of stock)
        const originalRandom = Math.random;
        Math.random = () => 0.05; // Less than 0.1 threshold

        render(<ProductCard product={mockProduct} onQuickView={mockOnQuickView} />);

        expect(screen.getByText('Unavailable')).toBeInTheDocument();

        const quickViewButton = screen.getByRole('button', { name: /view details for test supplement/i });
        expect(quickViewButton).toBeDisabled();

        // Restore original Math.random
        Math.random = originalRandom;
    });

    it('displays safety data sheet link for household products', () => {
        const householdProduct = {
            ...mockProduct,
            category: 'Household',
            title: 'Test Cleaner'
        };

        render(<ProductCard product={householdProduct} onQuickView={mockOnQuickView} />);

        expect(screen.getByText('Safety Data Sheet')).toBeInTheDocument();
    });

    it('handles keyboard navigation correctly', () => {
        render(<ProductCard product={mockProduct} onQuickView={mockOnQuickView} />);

        const quickViewButton = screen.getByRole('button', { name: /view details for test supplement/i });

        // Focus should be manageable
        quickViewButton.focus();
        expect(quickViewButton).toHaveFocus();

        // Enter key should trigger click
        fireEvent.keyDown(quickViewButton, { key: 'Enter', code: 'Enter' });
        expect(mockOnQuickView).toHaveBeenCalledTimes(1);
    });

    it('properly formats and displays badges with limits', () => {
        const productWithManyBadges = {
            ...mockProduct,
            badges: ['Lab Tested', 'Vegan', 'Organic', 'Third-Party', 'GMP', 'ISO']
        };

        render(<ProductCard product={productWithManyBadges} onQuickView={mockOnQuickView} />);

        // Should only show first 2 badges in the overlay
        expect(screen.getByText('Lab Tested')).toBeInTheDocument();
        expect(screen.getByText('Vegan')).toBeInTheDocument();
    });

    it('handles missing or invalid product data gracefully', () => {
        const incompleteProduct = {
            id: 'incomplete',
            title: 'Incomplete Product',
            category: 'Test',
            images: [],
            rating: null,
            badges: [],
            short_description: '',
            ingredients: [],
            goal: [],
            format: 'capsule',
            servings: 0
        };

        render(<ProductCard product={incompleteProduct} onQuickView={mockOnQuickView} />);

        expect(screen.getByText('Incomplete Product')).toBeInTheDocument();
        // Component should not crash with incomplete data
    });

    it('maintains accessibility with proper ARIA labels', () => {
        render(<ProductCard product={mockProduct} onQuickView={mockOnQuickView} />);

        const quickViewButton = screen.getByRole('button', { name: /view details for test supplement/i });
        expect(quickViewButton).toHaveAttribute('aria-label', 'View details for Test Supplement');

        const addToRoutineButton = screen.getByRole('button', { name: /add test supplement to routine/i });
        expect(addToRoutineButton).toHaveAttribute('aria-label', 'Add Test Supplement to routine');
    });
});

describe('ProductCard Interactions', () => {
    it('toggles save state correctly', async () => {
        render(<ProductCard product={mockProduct} onQuickView={mockOnQuickView} />);

        const addButton = screen.getByRole('button', { name: /add test supplement to routine/i });

        // Click once to add
        fireEvent.click(addButton);
        await waitFor(() => {
            expect(screen.getByText('Added')).toBeInTheDocument();
        });

        // Click again to remove
        fireEvent.click(addButton);
        await waitFor(() => {
            expect(screen.getByText('Add to Kit')).toBeInTheDocument();
        });
    });

    it('shows hover effects on supported devices', async () => {
        const { container } = render(<ProductCard product={mockProduct} onQuickView={mockOnQuickView} />);

        const card = container.querySelector('.card');
        const image = container.querySelector('img');

        // Mock window.matchMedia for prefers-reduced-motion
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: jest.fn().mockImplementation(query => ({
                matches: false,
                media: query,
                onchange: null,
                addListener: jest.fn(),
                removeListener: jest.fn(),
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn(),
            })),
        });

        fireEvent.mouseEnter(image);

        // Should apply hover transform
        expect(image.style.transform).toBe('scale(1.05)');

        fireEvent.mouseLeave(image);
        expect(image.style.transform).toBe('scale(1)');
    });
});