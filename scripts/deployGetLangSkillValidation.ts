import { toNano } from '@ton/core';
import { GetLangSkillValidation } from '../wrappers/GetLangSkillValidation';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const getLangSkillValidation = provider.open(GetLangSkillValidation.createFromConfig({}, await compile('GetLangSkillValidation')));

    await getLangSkillValidation.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(getLangSkillValidation.address);

    // run methods on `getLangSkillValidation`
}
