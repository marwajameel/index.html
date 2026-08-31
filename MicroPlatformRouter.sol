// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MicroPlatformRouter {
    address public owner;
    uint256 public feePercentage; // مثال کے طور پر 50 کا مطلب 0.5% ہے

    event TransactionProcessed(address indexed sender, address indexed recipient, uint256 amount, uint256 fee);

    constructor(uint256 _feePercentage) {
        owner = msg.sender;
        feePercentage = _feePercentage; // زیادہ سے زیادہ کنٹرول کے لیے فیس فیصد سیٹ کریں
    }

    // فنڈز ٹرانسفر اور فیس کی کٹائی کا فنکشن
    function transferWithFee(address payable recipient) external payable {
        require(msg.value > 0, "Amount must be greater than zero");

        // فیس کا حساب کتاب
        uint256 fee = (msg.value * feePercentage) / 10000;
        uint256 netAmount = msg.value - fee;

        // اونر کو فیس بھیجنا
        (bool successOwner, ) = owner.call{value: fee}("");
        require(successOwner, "Fee transfer failed");

        // اصل ریسیپिएंट کو رقم بھیجना
        (bool successRecipient, ) = recipient.call{value: netAmount}("");
        require(successRecipient, "Transfer failed");

        emit TransactionProcessed(msg.sender, recipient, netAmount, fee);
    }

    // فیس کی شرح تبدیل کرنے کا اختیار صرف اونر کے پاس ہے
    function updateFee(uint256 _newFeePercentage) external {
        require(msg.sender == owner, "Only owner can update fee");
        feePercentage = _newFeePercentage;
    }
}
