import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type GetLangSkillValidationConfig = {};

export function getLangSkillValidationConfigToCell(config: GetLangSkillValidationConfig): Cell {
    return beginCell().endCell();
}

export class GetLangSkillValidation implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new GetLangSkillValidation(address);
    }

    static createFromConfig(config: GetLangSkillValidationConfig, code: Cell, workchain = 0) {
        const data = getLangSkillValidationConfigToCell(config);
        const init = { code, data };
        return new GetLangSkillValidation(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
}
