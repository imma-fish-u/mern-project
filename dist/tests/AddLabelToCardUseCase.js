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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
const cardId = uuid_1.v4();
const todoListID = uuid_1.v4();
const labelID = uuid_1.v4();
const admin = {
    id: uuid_1.v4(),
    login: 'admin',
    name: 'admin',
    avatarURL: 'https://thispersondoesnotexist.com/image',
    email: 'admin@thullo.com'
};
const cardDetails = {
    id: cardId,
    title: 'Card title',
    description: 'Card description',
    parentListId: todoListID,
    labels: [],
    comments: [],
    attachments: [],
    cover: null
};
const request = {
    boardId: BOARD_ID,
    labelId: null,
    cardId,
    requestedBy: admin.id,
    color: src_1.Colors.BLUE,
    name: 'New label'
};
describe('AddLabelToCard Use case', () => {
    it('should add the label to the card and to the board if no id is passed', () => __awaiter(void 0, void 0, void 0, function* () {
        // Given
        let aggregateExpected = null;
        const aggregate = new src_1.BoardAggregateBuilder()
            .withBoardId(BOARD_ID)
            .withLists([
            {
                id: todoListID,
                name: 'Todo',
                position: 0
            }
        ])
            .withCards([cardDetails])
            .withParticipants([
            {
                isAdmin: true,
                member: admin
            }
        ])
            .build();
        const boardAggregateRepository = new BoardAggregateRepositoryBuilder_1.BoardAggregateRepositoryBuilder()
            .withGetBoardAggregateById(() => Promise.resolve(aggregate))
            .withSaveAggregate((aggregate) => {
            aggregateExpected = aggregate;
            return Promise.resolve(aggregate);
        })
            .build();
        const useCase = new src_1.AddLabelToCardUseCase(boardAggregateRepository);
        // When
        yield useCase.execute(request, presenter);
        // Then
        expect(presenter.response).not.toBe(null);
        expect(aggregateExpected).not.toBeFalsy();
        // added to the board
        expect(Object.values(aggregateExpected.labelsByIds)).toHaveLength(1);
        expect(Object.values(aggregateExpected.labelsByIds)[0].name).toBe('New label');
        // added to the card
        expect(aggregateExpected.getCardById(cardId).labels).toHaveLength(1);
        expect(aggregateExpected.getCardById(cardId).labels[0].name).toBe('New label');
    }));
    it('should add the label to the card and not to the board if an id is passed', () => __awaiter(void 0, void 0, void 0, function* () {
        // Given
        let aggregateExpected = null;
        const aggregate = new src_1.BoardAggregateBuilder()
            .withBoardId(BOARD_ID)
            .withLists([
            {
                id: todoListID,
                name: 'Todo',
                position: 0
            }
        ])
            .withCards([cardDetails])
            .withLabels([
            {
                name: 'Label 1',
                color: src_1.Colors.BLUE,
                id: labelID
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
            .withGetBoardAggregateById(() => Promise.resolve(aggregate))
            .withSaveAggregate((aggregate) => {
            aggregateExpected = aggregate;
            return Promise.resolve(aggregate);
        })
            .build();
        const useCase = new src_1.AddLabelToCardUseCase(boardAggregateRepository);
        // When
        const { name } = request, requestRest = __rest(request, ["name"]); // remove the name
        yield useCase.execute(Object.assign(Object.assign({}, requestRest), { labelId: labelID }), presenter);
        // Then
        expect(presenter.response).not.toBe(null);
        expect(aggregateExpected).not.toBeFalsy();
        // Not added to the board
        expect(Object.values(aggregateExpected.labelsByIds)).toHaveLength(1);
        expect(Object.values(aggregateExpected.labelsByIds)[0].name).toBe('Label 1');
        expect(aggregateExpected.getCardById(cardId).labels).toHaveLength(1);
        expect(aggregateExpected.getCardById(cardId).labels[0].name).toBe('Label 1');
    }));
    it('should not add a label twice to the card', () => __awaiter(void 0, void 0, void 0, function* () {
        // Given
        let aggregateExpected = null;
        const label = {
            name: 'Label 1',
            color: src_1.Colors.BLUE,
            id: labelID,
            parentBoardId: BOARD_ID
        };
        const aggregate = new src_1.BoardAggregateBuilder()
            .withBoardId(BOARD_ID)
            .withLists([
            {
                id: todoListID,
                name: 'Todo',
                position: 0
            }
        ])
            .withCards([
            Object.assign(Object.assign({}, cardDetails), { labels: [label] })
        ])
            .withLabels([
            {
                name: 'Label 1',
                color: src_1.Colors.BLUE,
                id: labelID
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
            .withGetBoardAggregateById(() => Promise.resolve(aggregate))
            .withSaveAggregate((aggregate) => {
            aggregateExpected = aggregate;
            return Promise.resolve(aggregate);
        })
            .build();
        const useCase = new src_1.AddLabelToCardUseCase(boardAggregateRepository);
        // When
        yield useCase.execute(Object.assign(Object.assign({}, request), { labelId: labelID }), presenter);
        // Then
        expect(presenter.response).not.toBe(null);
        expect(aggregateExpected).not.toBeFalsy();
        // Not added to the board
        expect(Object.values(aggregateExpected.labelsByIds)).toHaveLength(1);
        expect(Object.values(aggregateExpected.labelsByIds)[0].name).toBe('Label 1');
        // Not added to the card
        expect(aggregateExpected.getCardById(cardId).labels).toHaveLength(1);
        expect(aggregateExpected.getCardById(cardId).labels[0].name).toBe('Label 1');
    }));
    it('should show error if the label does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        // Given
        let aggregateExpected = null;
        const aggregate = new src_1.BoardAggregateBuilder()
            .withBoardId(BOARD_ID)
            .withLists([
            {
                id: todoListID,
                name: 'Todo',
                position: 0
            }
        ])
            .withCards([cardDetails])
            .withParticipants([
            {
                isAdmin: true,
                member: admin
            }
        ])
            .build();
        const boardAggregateRepository = new BoardAggregateRepositoryBuilder_1.BoardAggregateRepositoryBuilder()
            .withGetBoardAggregateById(() => Promise.resolve(aggregate))
            .withSaveAggregate((aggregate) => {
            aggregateExpected = aggregate;
            return Promise.resolve(aggregate);
        })
            .build();
        const useCase = new src_1.AddLabelToCardUseCase(boardAggregateRepository);
        // When
        const { name } = request, requestRest = __rest(request, ["name"]); // remove the name
        yield useCase.execute(Object.assign(Object.assign({}, requestRest), { labelId: labelID }), presenter);
        // Then
        expect(presenter.response).not.toBe(null);
        expect(aggregateExpected).toBeNull();
        expect((_a = presenter.response.errors) === null || _a === void 0 ? void 0 : _a.labelId).toHaveLength(1);
    }));
    it('should show error if the card does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        // Given
        let aggregateExpected = null;
        const aggregate = new src_1.BoardAggregateBuilder()
            .withBoardId(BOARD_ID)
            .withLists([
            {
                id: todoListID,
                name: 'Todo',
                position: 0
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
            .withGetBoardAggregateById(() => Promise.resolve(aggregate))
            .withSaveAggregate((aggregate) => {
            aggregateExpected = aggregate;
            return Promise.resolve(aggregate);
        })
            .build();
        const useCase = new src_1.AddLabelToCardUseCase(boardAggregateRepository);
        // When
        yield useCase.execute(request, presenter);
        // Then
        expect(presenter.response).not.toBe(null);
        expect(aggregateExpected).toBeNull();
        expect((_b = presenter.response.errors) === null || _b === void 0 ? void 0 : _b.cardId).toHaveLength(1);
    }));
    it('should show error if the board does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        var _c;
        // Given
        let aggregateExpected = null;
        const boardAggregateRepository = new BoardAggregateRepositoryBuilder_1.BoardAggregateRepositoryBuilder()
            .withGetBoardAggregateById(() => Promise.resolve(null))
            .withSaveAggregate((aggregate) => {
            aggregateExpected = aggregate;
            return Promise.resolve(aggregate);
        })
            .build();
        const useCase = new src_1.AddLabelToCardUseCase(boardAggregateRepository);
        // When
        yield useCase.execute(request, presenter);
        // Then
        expect(presenter.response).not.toBe(null);
        expect(aggregateExpected).toBeNull();
        expect((_c = presenter.response.errors) === null || _c === void 0 ? void 0 : _c.boardId).toHaveLength(1);
    }));
    it('show error if the requester is not a member of the board', () => __awaiter(void 0, void 0, void 0, function* () {
        var _d;
        // Given
        let aggregateExpected = null;
        const aggregate = new src_1.BoardAggregateBuilder()
            .withBoardId(BOARD_ID)
            .withLists([
            {
                id: todoListID,
                name: 'Todo',
                position: 0
            }
        ])
            .withCards([cardDetails])
            .build();
        const boardAggregateRepository = new BoardAggregateRepositoryBuilder_1.BoardAggregateRepositoryBuilder()
            .withGetBoardAggregateById(() => Promise.resolve(aggregate))
            .withSaveAggregate((aggregate) => {
            aggregateExpected = aggregate;
            return Promise.resolve(aggregate);
        })
            .build();
        const useCase = new src_1.AddLabelToCardUseCase(boardAggregateRepository);
        // When
        yield useCase.execute(request, presenter);
        // Then
        expect(presenter.response).not.toBe(null);
        expect(aggregateExpected).toBeNull();
        expect((_d = presenter.response.errors) === null || _d === void 0 ? void 0 : _d.requestedBy).toHaveLength(1);
    }));
    describe('Invalid Requests', () => {
        const dataset = [
            {
                label: 'Empty board id',
                request: Object.assign(Object.assign({}, request), { boardId: '' })
            },
            {
                label: 'Empty card id',
                request: Object.assign(Object.assign({}, request), { cardId: '' })
            },
            {
                label: 'Empty member id',
                request: Object.assign(Object.assign({}, request), { requestedBy: '' })
            },
            {
                label: 'Invalid color',
                request: Object.assign(Object.assign({}, request), { 
                    // @ts-ignore
                    color: 'invalid' })
            },
            {
                label: 'Name and labelId are not provided',
                request: Object.assign(Object.assign({}, request), { name: null, labelId: null })
            },
            {
                label: 'Name is provided but color is not',
                request: Object.assign(Object.assign({}, request), { name: 'Label 1', color: null })
            },
            {
                label: 'Empty name and not labelId',
                request: Object.assign(Object.assign({}, request), { name: '', labelId: null })
            }
        ];
        it.each(dataset)('shows errors with invalid request : "$label"', ({ request }) => __awaiter(void 0, void 0, void 0, function* () {
            // Given
            let aggregateExpected = null;
            const aggregate = new src_1.BoardAggregateBuilder()
                .withBoardId(BOARD_ID)
                .withLists([
                {
                    id: todoListID,
                    name: 'Todo',
                    position: 0
                }
            ])
                .withCards([cardDetails])
                .withParticipants([
                {
                    isAdmin: true,
                    member: admin
                }
            ])
                .build();
            const boardAggregateRepository = new BoardAggregateRepositoryBuilder_1.BoardAggregateRepositoryBuilder()
                .withGetBoardAggregateById(() => Promise.resolve(aggregate))
                .withSaveAggregate((aggregate) => {
                aggregateExpected = aggregate;
                return Promise.resolve(aggregate);
            })
                .build();
            const useCase = new src_1.AddLabelToCardUseCase(boardAggregateRepository);
            // When
            yield useCase.execute(request, presenter);
            // Then
            expect(presenter.response).not.toBe(null);
            expect(aggregateExpected).toBeNull();
            // Then
            expect(presenter.response.errors).not.toBe(null);
        }));
    });
});
