import { useMemo } from "react";
import { concat, toHex, createClient, http } from "viem";
import { useGasPrice, useEstimateMaxPriorityFeePerGas, useChains } from "wagmi";
import { paymasterActionsEip7677 } from "permissionless/experimental";
import { ENTRYPOINT_ADDRESS_V06 } from "permissionless";
import { useQuery } from "@tanstack/react-query";

export function useSponsoredTransaction({ from, chainId, calls, paymasterUrl }: any) {
  const { data: maxFeePerGas } = useGasPrice();
  const { data: maxPriorityFeePerGas } = useEstimateMaxPriorityFeePerGas();
  const chains = useChains();

  const callData = useMemo(() => 
    concat(calls.map((call: any) => concat([call.to, call.data, toHex(call.value)]))), 
    [calls]
  );

  const userOp = useMemo(() => ({
    sender: from,
    nonce: 0n,
    initCode: "0x" as `0x`,
    callData,
    maxFeePerGas: maxFeePerGas || 0n,
    maxPriorityFeePerGas: maxPriorityFeePerGas || 0n,
    preVerificationGas: 0n,
    verificationGasLimit: 0n,
    callGasLimit: 0n,
  }), [from, callData, maxFeePerGas, maxPriorityFeePerGas]);

  const paymasterClient = useMemo(() =>
    createClient({
      chain: chains.find((c) => toHex(c.id) === chainId),
      transport: http(paymasterUrl),
    }).extend(paymasterActionsEip7677(ENTRYPOINT_ADDRESS_V06)),
    [chainId, chains, paymasterUrl]
  );

  return useQuery({
    queryKey: ["paymasterStub", userOp],
    queryFn: () => paymasterClient.getPaymasterStubData({ userOperation: userOp as any }),
    enabled: !!from && !!maxFeePerGas,
  });
}
