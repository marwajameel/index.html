/**
 * Solana Stake Pool Fee Calculator
 * @param {number} amt - Amount of tokens
 * @param {number} numerator - Fee rate numerator
 * @param {number} denominator - Fee rate denominator
 * @returns {number} - Calculated fee
 */
function calculateFee(amt, numerator, denominator) {
  if (denominator === 0) {
    return 0;
  }
  return Math.floor((amt * numerator) / denominator);
}

module.exports = { calculateFee };
