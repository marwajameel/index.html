// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title AutoTransferSystem
 * @dev جمیل کلیال کے پروجیکٹ کے لیے خودکار ٹرانسفر اور مینجمنٹ کا نظام
 */
contract AutoTransferSystem {
    address public owner;

    // ایونٹس (Events) تاکہ ٹرانزیکشن کا ریکارڈ ٹریک کیا جا سکے
    event FundsTransferred(address indexed recipient, uint256 amount);
    event TokenTransferred(address indexed tokenAddress, address indexed recipient, uint256 amount);

    // صرف کنٹریکٹ کے مالک کے لیے موڈیفائر
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can execute this function");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // کنٹریکٹ میں فنڈز جمع کرنے کے لیے ریسییو فنکشن
    receive() external payable {}

    // 1. ایتھریم (ETH) یا نیٹ ورک کی اصل کرنسی خودکار طریقے سے ٹرانسفر کرنے کا فنکشن
    function autoTransferETH(address payable recipient, uint256 amount) external onlyOwner {
        require(address(this).balance >= amount, "Insufficient contract balance");
        (bool success, ) = recipient.call{value: amount}("");
        require(success, "ETH transfer failed");

        emit FundsTransferred(recipient, amount);
    }

    // 2. کسی بھی ERC-20 ٹوکن (جیسے USDC یا دیگر ٹوکنز) کو خودکار طریقے سے ٹرانسفر کرنے کا فنکشن
    function autoTransferToken(address tokenAddress, address recipient, uint256 amount) external onlyOwner {
        // ERC-20 ٹرانسفر انٹرفیس کال
        bool success = IERC20(tokenAddress).transfer(recipient, amount);
        require(success, "Token transfer failed");

        emit TokenTransferred(tokenAddress, recipient, amount);
    }

    // کنٹریکٹ کا بیلنس چیک کرنے کا فنکشن
    function getContractBalance() external view returns (uint256) {
        return address(this.balance);
    }
}

// معیاری ERC-20 انٹرفیس
interface IERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}
