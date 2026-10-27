// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MJ04InstantProfitExtractor is Ownable {
    address public targetSpotWallet;

    event ProfitExtracted(address indexed token, uint256 amount, uint256 timestamp);
    event EthExtracted(uint256 amount, uint256 timestamp);

    constructor(address _targetSpotWallet) Ownable(msg.sender) {
        targetSpotWallet = _targetSpotWallet;
    }

    // فوری طور پر تمام پرافٹ یا ٹوکنز نکالنے کا فنکشن
    function extractTokenProfit(address tokenAddress) external onlyOwner {
        IERC20 token = IERC20(tokenAddress);
        uint256 balance = token.balanceOf(address(this));
        require(balance > 0, "No profit balance available to extract");

        bool success = token.transfer(targetSpotWallet, balance);
        require(success, "Token extraction transfer failed");

        emit ProfitExtracted(tokenAddress, balance, block.timestamp);
    }

    // اگر کانٹریکٹ میں کوئی ایتھریم (ETH) موجود ہو تو اسے بھی فوری نکالنے کا فنکشن
    function extractEthProfit() external onlyOwner {
        uint256 ethBalance = address(this).balance;
        require(ethBalance > 0, "No ETH balance available");

        (bool success, ) = payable(targetSpotWallet).call{value: ethBalance}("");
        require(success, "ETH extraction failed");

        emit EthExtracted(ethBalance, block.timestamp);
    }

    function updateTargetWallet(address _newWallet) external onlyOwner {
        targetSpotWallet = _newWallet;
    }

    receive() external payable {}
}
