package com.hazin.stripe_payment_api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PaymentIntentResponse {
    private String id;
    private String clientSecret;
    private Long amount;
    private String currency;
    private String status;
}
