package com.hazin.stripe_payment_api.service;

import com.hazin.stripe_payment_api.dto.CreatePaymentRequest;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class PaymentService {

    public PaymentIntent createPayment(CreatePaymentRequest request) throws Exception {
        log.debug("Creating Stripe PaymentIntent for amount: {}", request.getAmount());

        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount(request.getAmount())
                .setCurrency(request.getCurrency())
                .setDescription(request.getDescription())
                .setAutomaticPaymentMethods(
                        PaymentIntentCreateParams.AutomaticPaymentMethods.builder()
                                .setEnabled(true)
                                .build())
                // In production, you would add metadata for tracking
                .putMetadata("order_id", "ORDER_" + System.currentTimeMillis())
                .build();

        return PaymentIntent.create(params);
    }
}
