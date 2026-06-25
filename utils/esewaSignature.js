import crypto from "crypto";

export const generateEsewaSignature = (
  totalAmount,
  transactionUuid,
  productCode
) => {
  const secretKey = process.env.ESEWA_SECRET_KEY;

  const message = `total_amount=${totalAmount},transaction_uuid=${transactionUuid},product_code=${productCode}`;

  const signature = crypto
    .createHmac("sha256", secretKey)
    .update(message)
    .digest("base64");

  return signature;
};