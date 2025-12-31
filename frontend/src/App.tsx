import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import axios from 'axios';
import CheckoutForm from './components/CheckoutForm';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Rocket, DollarSign, Package } from 'lucide-react';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const API_BASE_URL = 'http://localhost:8080/api/payments';

function App() {
  const [amount, setAmount] = useState<string>('50');
  const [description, setDescription] = useState<string>('Premium Subscription');
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleInitializePayment = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/create`, {
        amount: parseFloat(amount) * 100, // convert to cents
        currency: 'usd',
        description: description,
      });
      setClientSecret(response.data.clientSecret);
    } catch (error) {
      console.error('Error initializing payment:', error);
      alert('Failed to initialize payment. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  const appearance = {
    theme: 'night' as const,
    variables: {
      colorPrimary: '#6366f1',
      colorBackground: '#1c1c1c',
      colorText: '#ffffff',
      colorDanger: '#df1b41',
      fontFamily: 'Outfit, system-ui, sans-serif',
      spacingUnit: '4px',
      borderRadius: '8px',
    },
  };

  const options = {
    clientSecret: clientSecret || '',
    appearance,
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card w-full max-w-2xl"
      >
        <div className="text-center mb-10">
          <motion.div
            initial={{ rotate: -10 }}
            animate={{ rotate: 0 }}
            className="icon-wrapper"
          >
            <Rocket className="text-primary" size={48} />
          </motion.div>
          <h1>Swift Pay X</h1>
          <p className="text-muted">Experience the future of seamless global transactions</p>
        </div>

        <AnimatePresence mode="wait">
          {!clientSecret ? (
            <motion.div
              key="setup"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 grid-md-2 gap-6">
                <div className="flex flex-col gap-2 text-left">
                  <label className="text-sm font-medium text-muted flex items-center gap-2">
                    <DollarSign size={14} /> Amount (USD)
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="50.00"
                    className="w-full bg-white/5 border-white/10 rounded-xl p-4 text-xl font-bold"
                  />
                </div>
                <div className="flex flex-col gap-2 text-left">
                  <label className="text-sm font-medium text-muted flex items-center gap-2">
                    <Package size={14} /> Description
                  </label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Product name..."
                    className="w-full bg-white/5 border-white/10 rounded-xl p-4"
                  />
                </div>
              </div>

              <button
                onClick={handleInitializePayment}
                disabled={loading || !amount}
                className="checkout-button"
              >
                {loading ? 'Processing...' : (
                  <>
                    <CreditCard size={20} />
                    Secure Checkout
                  </>
                )}
              </button>

              <div className="trust-badges">
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-6" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-8" />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="checkout"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Elements stripe={stripePromise} options={options}>
                <CheckoutForm amount={parseFloat(amount) * 100} />
              </Elements>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <footer className="footer">
        &copy; 2026 Swift Pay X. Built with Spring Boot & React.
      </footer>
    </div>
  );
}

export default App;
