# 💳 Swift Pay X - Full-Stack Payment Integration

This project is a complete, production-ready payment integration system featuring a robust **Spring Boot** backend and a high-performance **React** frontend. It leverages **Stripe Elements** for secure payment processing and **Framer Motion** for a premium user experience.

## 🔥 Key Features

-   ✅ **Secure Payment Intents**: Backend implementation for creating and managing Stripe Payment Intents.
-   ✅ **Stripe Elements Integration**: Seamless, secure credit card input using Stripe's pre-built UI components.
-   ✅ **Dynamic Checkout**: Real-time amount and description updates from the frontend.
-   ✅ **Premium UI/UX**: Modern dark-themed design with Glassmorphism, built using Vite and Framer Motion.
-   ✅ **Robust Backend**: Spring Boot 3+ with global exception handling and CORS configuration.
-   ✅ **Type Safety**: Full TypeScript implementation on the frontend for better developer experience and reliability.

---

## 🚀 Tech Stack

### Backend
-   **Spring Boot 3.5.x**
-   **Java 17**
-   **Stripe Java SDK**
-   **Maven**
-   **Lombok** (for boilerplate reduction)
-   **Validation API**

### Frontend
-   **React 18**
-   **TypeScript**
-   **Vite** (for lightning-fast development)
-   **Stripe React SDK**
-   **Lucide React** (icons)
-   **Framer Motion** (animations)
-   **Axios** (API requests)

---

## 🛠️ Project Structure

```text
swift-pay-x/
├── src/main/java/com/hazin/stripe_payment_api/
│   ├── config/             # Stripe & CORS configuration
│   ├── controller/         # REST endpoints (PaymentController)
│   ├── dto/                # Data Transfer Objects (Request/Response)
│   ├── exception/          # Global Exception Handling
│   └── service/            # Business Logic (Stripe API calls)
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable components (CheckoutForm)
│   │   ├── App.tsx         # Main payment flow logic
│   │   └── index.css       # Premium Design System
│   └── package.json        # Frontend dependencies
└── pom.xml                 # Backend dependencies
```

---

## ⚙️ Configuration & Setup

### 1. Prerequisites
-   **JDK 17** or higher
-   **Node.js** (v18+) and **npm**
-   **Stripe Account** (for API keys)

### 2. Backend Setup
1.  Navigate to the root directory.
2.  Open `src/main/resources/application.properties`.
3.  Create a `.env` file in the root directory (copy from `.env.example`):
    ```properties
    STRIPE_SECRET_KEY=your_sk_test_...
    STRIPE_PUBLIC_KEY=your_pk_test_...
    ```
4.  Run the backend:
    ```bash
    # Ensure environment variables are loaded
    export STRIPE_SECRET_KEY=your_sk_test_...
    export STRIPE_PUBLIC_KEY=your_pk_test_...
    ./mvnw spring-boot:run
    ```

### 3. Frontend Setup
1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `frontend` directory (copy from `.env.example`):
    ```properties
    VITE_STRIPE_PUBLIC_KEY=your_pk_test_...
    ```
4.  Run the frontend:
    ```bash
    npm run dev
    ```

---

## 📝 Implementation Details (Interview Highlights)

### Backend: Payment Flow
The backend exposes a POST endpoint `/api/payments/create`.
-   **Validated Input**: Uses `@RequestBody` with validation to ensure amount and currency are provided.
-   **Payment Intent**: Uses the Stripe Java SDK to create a `PaymentIntent`. This is more secure than traditional charges as it handles 3D Secure and other authentication methods automatically.
-   **Client Secret**: Returns the `clientSecret` to the frontend, which is required by Stripe Elements to confirm the payment without exposing sensitive keys.

### Frontend: User Experience
-   **Interactive Checkout**: Users can specify the amount and description dynamically.
-   **Glassmorphism Design**: Used modern CSS techniques like `backdrop-filter` and custom gradients for a premium feel.
-   **Security**: Minimal sensitive data handling. Card details never touch our server; they are sent directly to Stripe via the `PaymentElement`.
-   **Animations**: Used `AnimatePresence` for smooth transitions between the "Setup" screen, "Checkout" screen, and "Success" state.

---

## 🤝 Documentation & Developer Notes
*All major changes included in this version:*
-   Refactored `PaymentController` for cleaner response handling.
-   Implemented `GlobalExceptionHandler` to provide descriptive error messages to the frontend.
-   Switched to `Vite` for the frontend to ensure modern tooling and speed.
-   Added `lucide-react` for a consistent, professional icon set.
-   Configured CORS to strictly allow the frontend URL for security.

---
*Created for interview preparation - December 2025*
