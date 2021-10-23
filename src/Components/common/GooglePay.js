import React, { useState } from 'react'
import { db } from '../../Config/Config'
import { useHistory } from 'react-router-dom'
import GooglePayButton from '@google-pay/button-react';

export const GooglePay = (props) => {
    const {totalP, handleOrderToDb}= props;
    
    return (
        <div >
            <GooglePayButton
                environment="TEST"
                paymentRequest={{
                    apiVersion: 2,
                    apiVersionMinor: 0,
                    allowedPaymentMethods: [
                        {
                            type: 'CARD',
                            parameters: {
                                allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                                allowedCardNetworks: ['MASTERCARD', 'VISA'],
                            },
                            tokenizationSpecification: {
                                type: 'PAYMENT_GATEWAY',
                                parameters: {
                                    gateway: 'example',
                                    gatewayMerchantId: 'exampleGatewayMerchantId',
                                },
                            },
                        },
                    ],
                    merchantInfo: {
                        merchantId: '12345678901234567890',
                        merchantName: 'Test',
                    },
                    transactionInfo: {
                        totalPriceStatus: 'FINAL',
                        totalPriceLabel: 'Total',
                        totalPrice:  totalP.toString(),
                        currencyCode: 'USD',
                        countryCode: 'US',
                    },
                    shippingAddressRequired: true,
                    callbackIntents: ['SHIPPING_ADDRESS', 'PAYMENT_AUTHORIZATION'],
                }}
                onLoadPaymentData={paymentRequest => {
                    console.log('Success', paymentRequest);
                    handleOrderToDb(paymentRequest);

                }}
                onPaymentAuthorized={paymentData => {
                    console.log('Payment Authorised Success', paymentData)
                    return { transactionState: 'SUCCESS' }
                }
                }
                onPaymentDataChanged={paymentData => {
                    console.log('On Payment Data Changed', paymentData)
                    return {}
                }
                }
                existingPaymentMethodRequired='false'
                buttonColor='black'
                buttonType='Buy'
            />
        </div>
    )

}