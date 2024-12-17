// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract YourContract {
    // Структура опроса
    struct Poll {
        string question;
        string[] options;
        mapping(uint256 => uint256) votes; // Хранение количества голосов для каждой опции
        bool isActive;
        address creator;
    }

    Poll[] public polls; // Массив для хранения всех опросов

    // Событие, которое генерируется при создании нового опроса
    event PollCreated(uint256 pollId, string question, uint256 optionsCount, address creator);

    // Событие, которое генерируется при закрытии опроса
    event PollClosed(uint256 pollId, address closer);

    // Событие, которое генерируется при голосовании
    event VoteCast(uint256 pollId, uint256 optionId, uint256 votes);

    // Функция для создания нового опроса
    function createPoll(string memory question, string[] memory options) public {
        require(options.length > 0, "Poll must have at least one option");

        // Создаем новый опрос
        Poll storage newPoll = polls.push();
        newPoll.question = question;
        newPoll.isActive = true;
        newPoll.creator = msg.sender;

        // Инициализация массива опций перед добавлением
        delete newPoll.options;

        // Добавляем опции в массив
        for (uint256 i = 0; i < options.length; i++) {
            newPoll.options.push(options[i]);
        }

        uint256 pollId = polls.length - 1;

        // Генерируем событие при создании нового опроса
        emit PollCreated(pollId, newPoll.question, newPoll.options.length, newPoll.creator);
    }

    // Функция для закрытия опроса
    function closePoll(uint256 pollId) public {
        require(pollId < polls.length, "Poll does not exist");
        Poll storage poll = polls[pollId];
        require(poll.isActive, "Poll is already closed");
        require(msg.sender == poll.creator, "Only the creator can close the poll");

        poll.isActive = false;

        // Генерируем событие при закрытии опроса
        emit PollClosed(pollId, msg.sender);
    }

    // Функция для голосования в опросе
    function vote(uint256 pollId, uint256 optionId) public {
        require(pollId < polls.length, "Poll does not exist");
        Poll storage poll = polls[pollId];
        require(poll.isActive, "Poll is not active");
        require(optionId < poll.options.length, "Invalid option");

        poll.votes[optionId]++;

        // Генерируем событие при голосовании
        emit VoteCast(pollId, optionId, poll.votes[optionId]);
    }

    // Функция для получения информации об опросе
    function getPoll(uint256 pollId) public view returns (string memory question, string[] memory options, bool isActive) {
        require(pollId < polls.length, "Poll does not exist");
        Poll storage poll = polls[pollId];
        return (poll.question, poll.options, poll.isActive);
    }

    // Функция для получения результатов голосования
    function getResults(uint256 pollId) public view returns (uint256[] memory results) {
        require(pollId < polls.length, "Poll does not exist");
        Poll storage poll = polls[pollId];

        uint256[] memory voteCounts = new uint256[](poll.options.length);
        for (uint256 i = 0; i < poll.options.length; i++) {
            voteCounts[i] = poll.votes[i];
        }

        // Возвращаем массив с результатами голосования
        return voteCounts;
    }
}
