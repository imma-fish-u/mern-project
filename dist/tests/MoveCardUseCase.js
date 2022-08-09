"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../../src");
const uuid_1 = require("uuid");
const BoardAggregateRepositoryBuilder_1 = require("../builder/BoardAggregateRepositoryBuilder");
const presenter = new (class {
    present(response) {
        this.response = response;
    }
})();
const BOARD_ID = uuid_1.v4();
const todoListID = uuid_1.v4();
const doneListID = uuid_1.v4();
const firstCard = {
    id: uuid_1.v4(),
    title: 'Todo',
    parentListId: todoListID,
    comments: [],
    attachments: [],
    labels: [],
    cover: null,
    description: ''
};
const admin = {
    id: uuid_1.v4(),
    login: 'admin',
    name: 'admin',
    avatarURL: 'https://thispersondoesnotexist.com/image',
    email: 'admin@thullo.com'
};
const request = {
    boardId: BOARD_ID,
    cardId: firstCard.id,
    destinationListId: doneListID,
    destinationPosition: 0,
    requestedBy: admin.id
};
describe('MoveCard Use case', () => {
    it('is successful', () => __awaiter(void 0, void 0, void 0, function* () {
        // Given
        const aggregate = new src_1.BoardAggregateBuilder()
            .withBoardId(BOARD_ID)
            .withLists([
            {
                id: todoListID,
                name: 'Todo',
                position: 0
            },
            {
                id: doneListID,
                name: 'Done',
                position: 1
            }
        ])
            .withCards([firstCard])
            .withParticipants([
            {
                isAdmin: true,
                member: admin
            }
        ])
            .build();
        let boardExpected;
        const boardAggregateRepository = new BoardAggregateRepositoryBuilder_1.BoardAggregateRepositoryBuilder()
            .withGetBoardAggregateById(() => __awaiter(void 0, void 0, void 0, function* () {
            return aggregate;
        }))
            .withSaveAggregate((boardAggregate) => __awaiter(void 0, void 0, void 0, function* () {
            boardExpected = boardAggregate;
            return boardAggregate;
        }))
            .build();
        const useCase = new src_1.MoveCardUseCase(boardAggregateRepository);
        // When
        yield useCase.execute(request, presenter);
        // Then
        expect(presenter.response).not.toBe(null);
        expect(presenter.response.errors).toBeNull();
        expect(boardExpected).not.toBeFalsy();
        // The card should be moved to the done list
        expect(boardExpected.cardsByLists[todoListID]).toHaveLength(0);
        expect(boardExpected.cardsByLists[doneListID]).toHaveLength(1);
        expect(boardExpected.cardsByLists[doneListID][0].id).toBe(firstCard.id);
    }));
    it('should show errors if user is not a participant of the board', () => __awaiter(void 0, void 0, void 0, function* () {
        // Given
        const aggregate = new src_1.BoardAggregateBuilder()
            .withBoardId(BOARD_ID)
            .withLists([
            {
                id: todoListID,
                name: 'Todo',
                position: 0
            }
        ])
            .withCards([firstCard])
            .withParticipants([
            {
                isAdmin: false,
                member: admin
            }
        ])
            .build();
        const boardAggregateRepository = new BoardAggregateRepositoryBuilder_1.BoardAggregateRepositoryBuilder()
            .withGetBoardAggregateById(() => __awaiter(void 0, void 0, void 0, function* () {
            return aggregate;
        }))
            .build();
        const useCase = new src_1.MoveCardUseCase(boardAggregateRepository);
        // When
        yield useCase.execute(Object.assign(Object.assign({}, request), { destinationListId: todoListID, requestedBy: uuid_1.v4() }), presenter);
        // Then
        expect(presenter.response).not.toBe(null);
        expect(presenter.response.errors).not.toBeNull();
        expect(presenter.response.errors.requestedBy).toHaveLength(1);
    }));
    it('should show errors if card is moved to an inexistant list', () => __awaiter(void 0, void 0, void 0, function* () {
        // Given
        const aggregate = new src_1.BoardAggregateBuilder()
            .withBoardId(BOARD_ID)
            .withLists([
            {
                id: todoListID,
                name: 'Todo',
                position: 0
            }
        ])
            .withCards([firstCard])
            .withParticipants([
            {
                isAdmin: true,
                member: admin
            }
        ])
            .build();
        const boardAggregateRepository = new BoardAggregateRepositoryBuilder_1.BoardAggregateRepositoryBuilder()
            .withGetBoardAggregateById(() => __awaiter(void 0, void 0, void 0, function* () {
            return aggregate;
        }))
            .build();
        const useCase = new src_1.MoveCardUseCase(boardAggregateRepository);
        // When
        yield useCase.execute(request, presenter);
        // Then
        expect(presenter.response).not.toBe(null);
        expect(presenter.response.errors).not.toBeNull();
        expect(presenter.response.errors.destinationListId).toHaveLength(1);
    }));
    it("should show errors if the card moved doesn't exist", () => __awaiter(void 0, void 0, void 0, function* () {
        // Given
        const aggregate = new src_1.BoardAggregateBuilder()
            .withBoardId(BOARD_ID)
            .withLists([
            {
                id: todoListID,
                name: 'Todo',
                position: 0
            },
            {
                id: doneListID,
                name: 'Done',
                position: 1
            }
        ])
            .withParticipants([
            {
                isAdmin: true,
                member: admin
            }
        ])
            .build();
        const boardAggregateRepository = new BoardAggregateRepositoryBuilder_1.BoardAggregateRepositoryBuilder()
            .withGetBoardAggregateById(() => __awaiter(void 0, void 0, void 0, function* () {
            return aggregate;
        }))
            .build();
        const useCase = new src_1.MoveCardUseCase(boardAggregateRepository);
        // When
        yield useCase.execute(request, presenter);
        // Then
        expect(presenter.response).not.toBe(null);
        expect(presenter.response.errors).not.toBeNull();
        expect(presenter.response.errors.cardId).toHaveLength(1);
    }));
    describe('Invalid Requests', () => {
        const dataset = [
            {
                label: 'destinationListId is empty',
                request: Object.assign(Object.assign({}, request), { destinationListId: '' })
            },
            {
                label: 'cardId is empty',
                request: Object.assign(Object.assign({}, request), { cardId: '' })
            },
            {
                label: 'requestedBy is empty',
                request: Object.assign(Object.assign({}, request), { requestedBy: '' })
            },
            {
                label: 'destinationPosition is less than 0',
                request: Object.assign(Object.assign({}, request), { destinationPosition: -1 })
            }
        ];
        it.each(dataset)('shows errors with invalid request : "$label"', ({ request }) => __awaiter(void 0, void 0, void 0, function* () {
            // Given
            const aggregate = new src_1.BoardAggregateBuilder()
                .withBoardId(BOARD_ID)
                .withLists([
                {
                    id: todoListID,
                    name: 'Todo',
                    position: 0
                },
                {
                    id: doneListID,
                    name: 'Done',
                    position: 1
                }
            ])
                .withCards([firstCard])
                .withParticipants([
                {
                    isAdmin: true,
                    member: admin
                }
            ])
                .build();
            let boardExpected;
            const boardAggregateRepository = new BoardAggregateRepositoryBuilder_1.BoardAggregateRepositoryBuilder()
                .withGetBoardAggregateById(() => __awaiter(void 0, void 0, void 0, function* () {
                return aggregate;
            }))
                .withSaveAggregate((boardAggregate) => __awaiter(void 0, void 0, void 0, function* () {
                boardExpected = boardAggregate;
                return boardAggregate;
            }))
                .build();
            const useCase = new src_1.MoveCardUseCase(boardAggregateRepository);
            // When
            yield useCase.execute(request, presenter);
            // Then
            expect(presenter.response.errors).not.toBeNull();
        }));
    });
});
