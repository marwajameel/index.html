// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract CopyTradeProfitManager {
    address public owner;
    address public spotWallet;
    uint256 public lastTransferTime;
    uint256 public constant INTERVAL = 24 hours;

    event ProfitTransferred(address indexed token, uint256 amount, uint256 timestamp);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    constructor(address _spotWallet) {
        owner = msg.sender;
        spotWallet = _spotWallet;
        lastTransferTime = block.timestamp;
    }

    // 24 گھنٹے بعد پرافٹ کو سپورٹ والٹ میں ٹرانسفر کرنے کا فنکشن
    function transferDailyProfit(address tokenAddress) external onlyOwner {
        require(block.timestamp >= lastTransferTime + INTERVAL, "24 hours have not passed yet");

        IERC20 token = IERC20(tokenAddress);
        uint256 balance = token.balanceOf(address(this));
        
        require(balance > 0, "No profit available to transfer");

        // سپورٹ والٹ میں بیلنس بھیجنا
        bool success = token.transfer(spotWallet, balance);
        require(success, "Transfer failed");

        lastTransferTime = block.timestamp;
        emit ProfitTransferred(tokenAddress, balance, block.timestamp);
    }

    // سپورٹ والٹ ایڈریس اپ ڈیٹ کرنے کے لیے
    function updateSpotWallet(address _newSpotWallet) external onlyOwner {
        spotWallet = _newSpotWallet;
    }
}
