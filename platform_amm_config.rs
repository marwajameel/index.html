// جامع فائل کا نام: platform_amm_config.rs

use anchor_lang::prelude::*;

// 1. ڈائنامک پول فیس کی کنفیگریشن
#[derive(AnchorSerialize, AnchorDeserialize, Clone, Copy, Debug, PartialEq)]
pub struct DynamicFeeConfig {
    pub index:                       u16,    // شناخت کنندہ؛ پی ڈی اے سیڈ کمپوننٹ[span_0](start_span)[span_0](end_span)
    pub filter_period:               u16,    // سیکنڈز — اتار چڑھاؤ کا ریفرنس[span_1](start_span)[span_1](end_span)
    pub decay_period:                u16,    // سیکنڈز — ریفرنس ختم ہونے کا وقت[span_2](start_span)[span_2](end_span)
    pub reduction_factor:            u16,    // فکسڈ پوائنٹ [1, 10_000][span_3](start_span)[span_3](end_span)
    pub dynamic_fee_control:         u32,    // فکسڈ پوائنٹ (0, 100_000)[span_4](start_span)[span_4](end_span)
    pub max_volatility_accumulator:  u32,    // اتار چڑھاؤ کی زیادہ سے زیادہ حد[span_5](start_span)[span_5](end_span)
    pub padding:                     [u64; 8], // الائنمنٹ کے لیے
}

// 2. پلیٹ فارم فیس کی حدود اور اپڈیٹ چیکس
pub fn validate_platform_fees(fee_rate: u64) -> Result<()> {
    // states/platform_config.rs — PlatformParams::check()
    require!(fee_rate <= 50000, ErrorCode::InvalidInput);[span_6](start_span)[span_6](end_span)
    
    // instructions/platform/update_platform_config.rs — update_platform_fee_rate
    require!(fee_rate <= 50000, ErrorCode::InvalidPlatformInfo);[span_7](start_span)[span_7](end_span)
    
    Ok(())
}
