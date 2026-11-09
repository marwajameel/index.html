pragma solidity ^0.8.0;

import "@api3/contracts/interfaces/IApi3ReaderProxy.sol";

contract DataFeedReaderExample {
    // Use your proxy address as the argument
    function readDataFeed(address proxy)
        public
        view
        returns (int224 value, uint32 timestamp)
        {
          (value, timestamp) = IApi3ReaderProxy(proxy).read();
        }
}