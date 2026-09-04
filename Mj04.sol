// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Mj04 Asset Token
 * @dev Implements B20 Asset Standard features with issuer roles and supply ceiling on Base network.
 */
contract Mj04 is ERC20, Ownable {
    // سپلائی کی حد (Supply Ceiling) - مثلاً زیادہ سے زیادہ 10 ملین ٹوکن
    uint256 public immutable maxSupply;

    constructor(uint256 initialSupply, uint256 _maxSupply) 
        ERC20("Mj04", "MJ04") 
        Ownable(msg.sender) 
    {
        require(_maxSupply > 0, "Max supply must be greater than zero");
        require(initialSupply <= _maxSupply, "Initial supply exceeds max supply");
        
        maxSupply = _maxSupply * 10 ** decimals();
        _mint(msg.sender, initialSupply * 10 ** decimals());
    }

    /**
     * @dev نئے ٹوکن منٹ کرنے کا فنکشن (صرف اونر/ایشوئر کے لیے، جو سپلائی سیلنگ کی حد میں رہتے ہوئے جاری ہوں گے)
     */
    function mint(address to, uint256 amount) public onlyOwner {
        require(totalSupply() + amount <= maxSupply, "Supply ceiling reached");
        _mint(to, amount);
    }
}
