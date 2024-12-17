import { expect } from "chai";
import { ethers } from "hardhat";
import { YourContract } from "../typechain-types";

describe("YourContract", function () {
  let yourContract: YourContract;

  before(async () => {
    const YourContractFactory = await ethers.getContractFactory("YourContract");
    yourContract = (await YourContractFactory.deploy()) as YourContract;
    await yourContract.waitForDeployment();
  });

  it("Should allow the creation of a poll", async function () {
    const question = "What is your favorite color?";
    const options = ["Red", "Blue", "Green"];

    await yourContract.createPoll(question, options);
    const poll = await yourContract.getPoll(0);

    expect(poll[0]).to.equal(question); // Проверяем вопрос
    expect(poll[1]).to.deep.equal(options); // Проверяем опции
    expect(poll[2]).to.be.true; // Проверяем, что опрос активен
  });
});
