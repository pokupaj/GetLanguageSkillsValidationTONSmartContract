import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { GetLangSkillValidation } from '../wrappers/GetLangSkillValidation';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('GetLangSkillValidation', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('GetLangSkillValidation');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let getLangSkillValidation: SandboxContract<GetLangSkillValidation>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        getLangSkillValidation = blockchain.openContract(GetLangSkillValidation.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await getLangSkillValidation.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: getLangSkillValidation.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and getLangSkillValidation are ready to use
    });
});
