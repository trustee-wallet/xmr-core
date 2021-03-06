import { ParsedTarget, Pid, ViewSendKeys, Output, AmountOutput } from "../../../../../xmr-transaction";
import { BigInt } from "../../../../../biginteger";
import { HWDevice, NetType } from "../../../../../xmr-crypto-utils";
export declare type ConstructTxParams = {
    senderPublicKeys: ViewSendKeys;
    senderPrivateKeys: ViewSendKeys;
    targetAddress: string;
    fundTargets: ParsedTarget[];
    pid: Pid;
    encryptPid: boolean;
    mixOuts?: AmountOutput[];
    mixin: number;
    usingOuts: Output[];
    networkFee: BigInt;
    isRingCT: boolean;
    nettype: NetType;
    hwdev: HWDevice;
};
export declare type TotalAmtAndEstFeeParams = {
    usingOutsAmount: BigInt;
    baseTotalAmount: BigInt;
    mixin: number;
    remainingUnusedOuts: Output[];
    usingOuts: Output[];
    simplePriority: number;
    feelessTotal: BigInt;
    feePerKB: BigInt;
    networkFee: BigInt;
    isSweeping: boolean;
    isRingCT: boolean;
};
export declare type EstRctFeeAndAmtParams = {
    mixin: number;
    usingOutsAmount: BigInt;
    remainingUnusedOuts: Output[];
    usingOuts: Output[];
    simplePriority: number;
    feelessTotal: BigInt;
    feePerKB: BigInt;
    networkFee: BigInt;
    isSweeping: boolean;
};
export declare type ConstructFundTargetsParams = {
    senderAddress: string;
    targetAddress: string;
    feelessTotal: BigInt;
    totalAmount: BigInt;
    usingOutsAmount: BigInt;
    isSweeping: boolean;
    isRingCT: boolean;
    nettype: NetType;
};
//# sourceMappingURL=types.d.ts.map
