import { okAsync } from "@aave/client";
import { submitOrder, tokenSwapQuote } from "@aave/client/actions";
import { sendWith } from "@aave/client/viem";

import { client } from "./client";
import { handleApprovals } from "./handleApprovals";
import { wallet } from "./wallet";

// آپ کا اپنا سمارٹ کنٹریکٹ ایڈریس (جیسے AutoTransferSystem یا بیس نیٹ ورک کا کنٹریکٹ)
const MY_SMART_CONTRACT_ADDRESS = "0x92d4ee32bc0f81dbb9923073395a2be7febbc3e5";

const result = await tokenSwapQuote(client, request)
  .andThen(handleApprovals)
  .andThen((request) => submitOrder(client, request))
  .andThen((plan) => {
    switch (plan.__typename) {
      case "OrderReceipt":
        return okAsync(plan);

      case "OrderTransactionRequest":
        // یہاں ہم ٹرانزیکشن کو آپ کے مقرر کردہ والٹ یا کنٹریکٹ کے مطابق پاس کرتے ہیں
        // آپ چاہیں تو یہاں ٹرانزیکشن کے پے لوڈ (payload) میں اپنے کنٹریکٹ کا پتہ بھی شامل کر سکتے ہیں
        return sendWith(wallet, {
          ...plan.transaction,
          // optional: تو اگر کنٹریکٹ کے ذریعے کال کرنا ہو تو یہاں اضافی پیرامیٹرز دیے جا سکتے ہیں
        }).map(() => plan.orderReceipt);
    }
  });

// نتائج یا ایرر کو ہینڈل کرنے کا حصہ
if (result.isErr()) {
  console.error("سوپ یا ٹرانزیکشن میں خرابی پیش آئی:", result.error);
} else {
  console.log("ٹرانزیکشن کامیابی سے مکمل ہو گئی:", result.value);
}
