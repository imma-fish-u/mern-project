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
const domain_1 = require("@thullo/domain");
const uuid_1 = require("uuid");
const BoardAggregateRepositoryBuilder_1 = require("../builder/BoardAggregateRepositoryBuilder");
const presenter = new (class {
    present(response) {
        this.response = response;
    }
})();
const BOARD_ID = uuid_1.v4();
const list = {
    id: uuid_1.v4(),
    name: 'To Do',
    boardId: BOARD_ID,
    position: 0
};
const admin = {
    id: uuid_1.v4(),
    login: 'zeus',
    name: 'Zeus God of thunder',
    avatarURL: 'https://www.photos.com/thunder.png'
};
const other = Object.assign(Object.assign({}, admin), { id: uuid_1.v4() });
const request = {
    requesterId: admin.id,
    boardId: BOARD_ID,
    listId: list.id,
    title: 'New Card'
};
let aggregate;
const initTests = () => {
    aggregate = new domain_1.BoardAggregate({
        id: BOARD_ID,
        name: 'Dev Challenge Boards',
        description: '',
        private: true
    }, {
        cards: [],
        lists: [list],
        participants: [
            {
                isAdmin: true,
                member: admin
            }
        ]
    });
};
describe('AddCardToList Use case', () => {
    beforeEach(initTests);
    it('is successful', () => __awaiter(void 0, void 0, void 0, function* () {
        // Given
        let aggregateExpected = null;
        const boardAggregateRepository = new BoardAggregateRepositoryBuilder_1.BoardAggregateRepositoryBuilder()
            .withGetBoardAggregateById(() => __awaiter(void 0, void 0, void 0, function* () {
            return aggregate;
        }))
            .withSaveAggregate((board) => __awaiter(void 0, void 0, void 0, function* () {
            aggregateExpected = board;
            return board;
        }))
            .build();
        const useCase = new domain_1.AddCardToListUseCase(boardAggregateRepository);
        // When
        yield useCase.execute(request, presenter);
        // Then
        expect(presenter.response).not.toBe(null);
        expect(aggregateExpected).not.toBe(null);
        const cards = aggregateExpected.cardsByLists[list.id];
        expect(cards).toHaveLength(1);
        expect(cards[0].title).toBe('New Card');
        expect(presenter.response.card).toBe(cards[0]);
    }));
    it('Should show error if board does not exists', () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        // Given
        const boardAggregateRepository = new BoardAggregateRepositoryBuilder_1.BoardAggregateRepositoryBuilder()
            .withGetBoardAggregateById(() => __awaiter(void 0, void 0, void 0, function* () {
            return null;
        }))
            .build();
        const useCase = new domain_1.AddCardToListUseCase(boardAggregateRepository);
        // When
        yield useCase.execute(request, presenter);
        // Then
        expect(presenter.response).not.toBe(null);
        expect((_a = presenter.response) === null || _a === void 0 ? void 0 : _a.errors).not.toBe(null);
        expect((_c = (_b = presenter.response) === null || _b === void 0 ? void 0 : _b.errors) === null || _c === void 0 ? void 0 : _c.boardId).toHaveLength(1);
        expect(presenter.response.card).toBeNull();
    }));
    it('Should show error if list does not exists', () => __awaiter(void 0, void 0, void 0, function* () {
        var _d, _e, _f;
        // Given
        const boardAggregateRepository = new BoardAggregateRepositoryBuilder_1.BoardAggregateRepositoryBuilder()
            .withGetBoardAggregateById(() => __awaiter(void 0, void 0, void 0, function* () {
            return aggregate;
        }))
            .build();
        const useCase = new domain_1.AddCardToListUseCase(boardAggregateRepository);
        // When
        yield useCase.execute(Object.assign(Object.assign({}, request), { listId: 'inexistant' }), presenter);
        // Then
        expect(presenter.response).not.toBe(null);
        expect((_d = presenter.response) === null || _d === void 0 ? void 0 : _d.errors).not.toBe(null);
        expect((_f = (_e = presenter.response) === null || _e === void 0 ? void 0 : _e.errors) === null || _f === void 0 ? void 0 : _f.listId).toHaveLength(1);
        expect(presenter.response.card).toBeNull();
    }));
    it('Should show error if requester is not a participant of the board', () => __awaiter(void 0, void 0, void 0, function* () {
        var _g, _h, _j;
        // Given
        const boardAggregateRepository = new BoardAggregateRepositoryBuilder_1.BoardAggregateRepositoryBuilder()
            .withGetBoardAggregateById(() => __awaiter(void 0, void 0, void 0, function* () {
            return aggregate;
        }))
            .build();
        const useCase = new domain_1.AddCardToListUseCase(boardAggregateRepository);
        // When
        yield useCase.execute(Object.assign(Object.assign({}, request), { requesterId: other.id }), presenter);
        // Then
        expect(presenter.response).not.toBe(null);
        expect((_g = presenter.response) === null || _g === void 0 ? void 0 : _g.errors).not.toBe(null);
        expect((_j = (_h = presenter.response) === null || _h === void 0 ? void 0 : _h.errors) === null || _j === void 0 ? void 0 : _j.requesterId).toHaveLength(1);
        expect(presenter.response.card).toBeNull();
    }));
    describe('Invalid Requests', () => {
        const dataset = [
            {
                label: 'Empty listId',
                request: Object.assign(Object.assign({}, request), { listId: '' })
            },
            {
                label: 'Empty title',
                request: Object.assign(Object.assign({}, request), { title: '' })
            },
            {
                label: 'Empty requesterId',
                request: Object.assign(Object.assign({}, request), { requesterId: '' })
            },
            {
                label: 'Empty boardId',
                request: Object.assign(Object.assign({}, request), { boardId: '' })
            }
        ];
        it.each(dataset)('shows errors with invalid request : "$label"', ({ request }) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            // // Given
            // Given
            const boardAggregateRepository = new BoardAggregateRepositoryBuilder_1.BoardAggregateRepositoryBuilder()
                .withGetBoardAggregateById(() => __awaiter(void 0, void 0, void 0, function* () {
                return aggregate;
            }))
                .build();
            const useCase = new domain_1.AddCardToListUseCase(boardAggregateRepository);
            // When
            yield useCase.execute(request, presenter);
            // Then
            expect((_a = presenter.response) === null || _a === void 0 ? void 0 : _a.errors).not.toBe(null);
            expect(presenter.response.card).toBeNull();
        }));
    });
});
