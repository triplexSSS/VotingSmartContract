import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  // Указание конкретного аккаунта для деплоя
  const deployer = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"; // Укажите нужный адрес

  console.log("Deploying YourContract...");

  // Деплой контракта с указанным аккаунтом
  await deploy("YourContract", {
    from: deployer,
    log: true,
  });

  console.log("YourContract deployed successfully!");
};

export default func;
func.tags = ["YourContract"];
