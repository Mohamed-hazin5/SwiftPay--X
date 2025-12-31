package com.hazin.stripe_payment_api.controller;

import com.hazin.stripe_payment_api.dto.CreatePaymentRequest;
import com.hazin.stripe_payment_api.dto.PaymentIntentResponse;
import com.hazin.stripe_payment_api.service.PaymentService;
import com.stripe.model.PaymentIntent;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
@Slf4j
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/create")
    public ResponseEntity<PaymentIntentResponse> createPayment(@RequestBody CreatePaymentRequest request) {
        log.info("Received payment request for amount: {} {}", request.getAmount(), request.getCurrency());
        try {
            PaymentIntent intent = paymentService.createPayment(request);
            log.info("Successfully created PaymentIntent with ID: {}", intent.getId());

            PaymentIntentResponse response = new PaymentIntentResponse(
                    intent.getId(),
                    intent.getClientSecret(),
                    intent.getAmount(),
                    intent.getCurrency(),
                    intent.getStatus());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error creating payment intent: {}", e.getMessage());
            throw new RuntimeException(e.getMessage());
        }
    }
}
