import React, { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';

interface CheckoutFormProps {
  amount: number;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + '/success',
      },
      redirect: 'if_required',
    });

    if (error) {
      setErrorMessage(error.message ?? 'An unexpected error occurred.');
      setLoading(false);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      setSuccess(true);
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <AnimatePresence mode="wait">
        {!success ? (
          <motion.form
            key="payment-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <CreditCard className="text-primary" />
                Payment Details
              </h2>
              <span className="amount-badge">
                ${(amount / 100).toFixed(2)}
              </span>
            </div>

            <div className="stripe-container">
              <PaymentElement />
            </div>

            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="error-message"
              >
                <AlertCircle size={16} />
                {errorMessage}
              </motion.div>
            )}

            <button
              disabled={!stripe || loading}
              className="checkout-button"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  <ShieldCheck size={20} />
                  Pay Now
                </>
              )}
            </button>

            <p className="secure-text">
              <ShieldCheck size={12} />
              Secure payment processed by Stripe
            </p>
          </motion.form>
        ) : (
          <motion.div
            key="success-message"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-8"
          >
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="text-green-500" size={40} />
            </div>
            <h2 className="text-3xl font-bold mb-2">Payment Successful!</h2>
            <p className="text-white/60 mb-8">Thank you for your purchase. Your transaction has been completed.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10"
            >
              Start New Payment
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CheckoutForm;
