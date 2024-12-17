"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";
import deployedContracts from "../contracts/deployedContracts"; // Импортируем контракт
import { useContractRead, useContractWrite } from "wagmi";
import { ethers } from "ethers"; // Импортируем ethers вместо BigNumber

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  // Достаем адрес и ABI для контракта
  const { address, abi } = deployedContracts[31337].YourContract;

  // Пример чтения данных с контракта
  const { data: pollData, isLoading: pollLoading } = useContractRead({
    address: address, // Адрес контракта
    abi: abi, // ABI контракта
    functionName: "getPoll",
    args: [1], // pollId, передаем как обычное число
  });

  // Пример вызова функции для создания опроса
  const { write: createPoll, isLoading, isSuccess } = useContractWrite({
    address: address, // Адрес контракта
    abi: abi, // ABI контракта
    functionName: "createPoll",
    args: ["What is your favorite color?", ["Red", "Green", "Blue"]], // Передаем корректные данные
    overrides: {
      gasLimit: 500000, // Устанавливаем лимит газа
    },
  });

  // Пример вызова функции для голосования
  const { write: vote } = useContractWrite({
    address: address,
    abi: abi,
    functionName: "vote",
    args: [1, 0], // pollId и optionId, передаем как обычные числа
    overrides: {
      gasLimit: 500000, // Устанавливаем лимит газа
    },
  });

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Scaffold-ETH 2</span>
          </h1>
          <div className="flex justify-center items-center space-x-2 flex-col sm:flex-row">
            <p className="my-2 font-medium">Connected Address:</p>
            <Address address={connectedAddress} />
          </div>
          <p className="text-center text-lg">
            Get started by editing{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              packages/nextjs/app/page.tsx
            </code>
          </p>
          <p className="text-center text-lg">
            Edit your smart contract{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              YourContract.sol
            </code>{" "}
            in{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              packages/hardhat/contracts
            </code>
          </p>
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <BugAntIcon className="h-8 w-8 fill-secondary" />
              <p>
                Tinker with your smart contract using the{" "}
                <Link href="/debug" passHref className="link">
                  Debug Contracts
                </Link>{" "}
                tab.
              </p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <MagnifyingGlassIcon className="h-8 w-8 fill-secondary" />
              <p>
                Explore your local transactions with the{" "}
                <Link href="/blockexplorer" passHref className="link">
                  Block Explorer
                </Link>{" "}
                tab.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-4 mt-10">
          {/* Отображаем информацию о текущем опросе */}
          {pollLoading ? (
            <p>Loading poll data...</p>
          ) : (
            pollData && (
              <div className="text-center">
                <h3 className="text-2xl">Poll: {pollData[0]}</h3>
                <ul>
                  {pollData[1].map((option: string, index: number) => (
                    <li key={index}>{option}</li>
                  ))}
                </ul>
              </div>
            )
          )}

          {/* Кнопки для взаимодействия с контрактом */}
          <div className="flex justify-center gap-6">
            <button
              onClick={() => createPoll?.()}
              className="btn btn-primary"
              disabled={isLoading || isSuccess}
            >
              Create Poll
            </button>
            <button
              onClick={() => vote?.()}
              className="btn btn-primary"
              disabled={isLoading || isSuccess}
            >
              Vote
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
