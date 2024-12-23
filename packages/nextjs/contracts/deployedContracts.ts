/**
 * This file is autogenerated by Scaffold-ETH.
 * You should not edit it manually or your changes might be overwritten.
 */
import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

const deployedContracts = {
  31337: {
    YourContract: {
      address: "0x0165878A594ca255338adfa4d48449f69242Eb8F",
      abi: [
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "uint256",
              name: "pollId",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "address",
              name: "closer",
              type: "address",
            },
          ],
          name: "PollClosed",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "uint256",
              name: "pollId",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "string",
              name: "question",
              type: "string",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "optionsCount",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "address",
              name: "creator",
              type: "address",
            },
          ],
          name: "PollCreated",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "uint256",
              name: "pollId",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "optionId",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "votes",
              type: "uint256",
            },
          ],
          name: "VoteCast",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "pollId",
              type: "uint256",
            },
          ],
          name: "closePoll",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "question",
              type: "string",
            },
            {
              internalType: "string[]",
              name: "options",
              type: "string[]",
            },
          ],
          name: "createPoll",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "pollId",
              type: "uint256",
            },
          ],
          name: "getPoll",
          outputs: [
            {
              internalType: "string",
              name: "question",
              type: "string",
            },
            {
              internalType: "string[]",
              name: "options",
              type: "string[]",
            },
            {
              internalType: "bool",
              name: "isActive",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "pollId",
              type: "uint256",
            },
          ],
          name: "getResults",
          outputs: [
            {
              internalType: "uint256[]",
              name: "results",
              type: "uint256[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "polls",
          outputs: [
            {
              internalType: "string",
              name: "question",
              type: "string",
            },
            {
              internalType: "bool",
              name: "isActive",
              type: "bool",
            },
            {
              internalType: "address",
              name: "creator",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "pollId",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "optionId",
              type: "uint256",
            },
          ],
          name: "vote",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      inheritedFunctions: {},
    },
  },
} as const;

export default deployedContracts satisfies GenericContractsDeclaration;
