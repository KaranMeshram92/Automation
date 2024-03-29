# Demo Blaze Website Test Plan

This test plan outlines the testing strategy for evaluating the [demoblaze.com](https://www.demoblaze.com) website. It encompasses both functional and non-functional aspects to ensure the website's reliability, performance, security, usability, and accessibility.

To view the detailed test plan with more information check out `TestPlan\TestPlan.docx` in project **root** directory

## Test Categories

1. **Functional Tests**
   - Manual Tests
   - Automated Tests
2. **Non-Functional Tests**
   - Performance
   - Security
   - Usability
   - Accessibility

## Prioritization

1. **Functional Tests (P1)**
   - Manual Tests (P1.1)
   - Automated Tests (P1.2)
2. **Performance Tests (P2)**
3. **Usability Tests (P3)**
4. **Security Tests (P4)**
5. **Accessibility Test (P5)**

## Tasks Breakdown

### 1. Functional Testing

#### a. Manual Tests
- **Task:** Create and document manual tests for essential functionalities. **(1 day)**
   - Verify navigation
   - Verify Log in and sign out flow for users
   - Verify new user Sign up flow
   - Verify Products can be loaded for all categories
   - Verify user can view products in a new screen
   - Verify Products can be added to cart
   - Verify Products can be deleted from cart
   - Verify user can place an order and complete purchase
- **Task:** Execute manual tests on the demo blaze release in the QA environment. **(2 days)**

#### b. Automated Tests
- **Task:** Develop Automated tests for Demo Blaze UI using Cypress framework. **(4 days)**
   - Verify demo blaze Home Page
   - Verify Log in Flow
   - Verify Sign up Flow
   - Verify loading products in each product category (Phones, Mobiles, Laptops)
   - Verify user can view a single Product
   - Verify add to cart functionality
   - Verify delete products from cart
   - Verify user can place an order

### 2. Performance Tests

- **Task:** Create Performance test Script for major call flows and APIs. **(2 days)**
   - Login and Logout
   - New user Sign up
   - Load Products per category
   - View products page
   - Add product to Cart
   - Check Out and Purchase request
   - Home Page Load for [https://www.demoblaze.com/index.html](https://www.demoblaze.com/index.html)
- **Task:** Execute Performance Tests. *(3 days)*
   - Load Test
   - Stress Test
   - Spike Test
   - Soak Test

### 3. Security Tests

- **Task:** Document and Execute Security Tests. **(3 days)**
   - Input Validation Testing
   - Authentication Testing
   - Authorization Testing
   - Session Management Testing
   - Sensitive Data Exposure Testing
   - Payment Gateway Security Testing
   - Cross-Site Request Forgery (CSRF) Testing
   - Security Headers Testing
   - Third-Party Integration Testing
   - Security Misconfiguration
   - Denial of service attacks

### 4. Usability Tests

- **Task:** Execute usability tests on Demo Blaze website. **(2 days)**
   - UI/UX consistency
   - Mobile responsiveness

### 5. Accessibility Tests

- **Task:** Execute accessibility tests on Demo Blaze website. **(2 days)**
   - Keyboard Navigation Testing
   - Screen Reader Compatibility Testing
   - Color Contrast Testing
   - Semantic HTML Testing
   - Alternative Text (Alt Text) Testing
   - Form Field Labels and Errors Testing
   - Focus Management Testing
   - Resizing and Zooming Testing
   - Skip Navigation Link Testing

**Note:** These estimates are approximate and may vary depending on the website's complexity and testing environment. Continuous iteration and adjustment of priorities based on feedback and issues are crucial.
