import {
	ParsedTarget,
	Pid,
	ViewSendKeys,
	Output,
	AmountOutput,
} from "../../../../../xmr-transaction";
import { BigInt } from "../../../../../biginteger";
import { HWDevice, NetType } from "../../../../../xmr-crypto-utils";

export type ConstructTxParams = {
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

export type TotalAmtAndEstFeeParams = {
	usingOutsAmount: BigInt;
	baseTotalAmount: BigInt;

	mixin: number;
	remainingUnusedOuts: Output[];
	usingOuts: Output[];

	simplePriority: number;
	feelessTotal: BigInt;
	feePerKB: BigInt; // obtained from server, so passed in
	networkFee: BigInt;

	isSweeping: boolean;
	isRingCT: boolean;
};

export type EstRctFeeAndAmtParams = {
	mixin: number;
	usingOutsAmount: BigInt;
	remainingUnusedOuts: Output[];
	usingOuts: Output[];

	simplePriority: number;
	feelessTotal: BigInt;
	feePerKB: BigInt; // obtained from server, so passed in
	networkFee: BigInt;

	isSweeping: boolean;
};

export type ConstructFundTargetsParams = {
	senderAddress: string;
	targetAddress: string;

	feelessTotal: BigInt;
	totalAmount: BigInt;
	usingOutsAmount: BigInt;

	isSweeping: boolean;
	isRingCT: boolean;

	nettype: NetType;
};
