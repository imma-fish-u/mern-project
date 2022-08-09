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
const MemberRepositoryBuilder_1 = require("../builder/MemberRepositoryBuilder");
const presenter = new (class {
    present(response) {
        this.response = response;
    }
})();
const BOARD_ID = uuid_1.v4();
const admin = {
    id: uuid_1.v4(),
    login: 'zeus',
    name: 'Zeus God of thunder',
    avatarURL: 'https://www.photos.com/thunder.png'
};
const memberToAdd = {
    id: uuid_1.v4(),
    login: 'poseidon',
    name: 'Poseidon God of the sea',
    avatarURL: 'https://www.photos.com/poseidon.png'
};
const request = {
    memberIds: [memberToAdd.id],
    initiatorId: admin.id,
    boardId: BOARD_ID
};
describe('InviteMemberToBoard Use case', () => {
    it('is successful', () => __awaiter(void 0, void 0, void 0, function* () {
        // Given
        const aggregate = new domain_1.BoardAggregate({
            id: BOARD_ID,
            name: 'Dev Challenge Boards',
            description: '',
            private: true
        }, {
            cards: [],
            lists: [],
            participants: [
                {
                    isAdmin: true,
                    member: admin
                }
            ]
        });
        let boardExpected;
        const memberRepository = new MemberRepositoryBuilder_1.MemberRepositoryBuilder()
            .withGetMembersByIds((ids) => __awaiter(void 0, void 0, void 0, function* () {
            return [memberToAdd];
        }))
            .build();
        const boardAggregateRepository = new BoardAggregateRepositoryBuilder_1.BoardAggregateRepositoryBuilder()
            .withGetBoardAggregateById(() => __awaiter(void 0, void 0, void 0, function* () {
            return aggregate;
        }))
            .withSaveAggregate((boardAggregate) => __awaiter(void 0, void 0, void 0, function* () {
            boardExpected = boardAggregate;
            return boardAggregate;
        }))
            .build();
        const useCase = new domain_1.InviteMemberToBoardUseCase(memberRepository, boardAggregateRepository);
        // When
        yield useCase.execute(request, presenter);
        // Then
        expect(presenter.response).not.toBe(null);
        expect(presenter.response.errors).toBe(null);
        expect(boardExpected).not.toBeFalsy();
        expect(boardExpected).toBe(aggregate);
        expect(boardExpected.participants).toHaveLength(2);
        expect(boardExpected.participants[1].member).toBe(memberToAdd);
        expect(boardExpected).toBe(presenter.response.aggregate);
    }));
    it('should show errors if initiator is not a member of the board', () => __awaiter(void 0, void 0, void 0, function* () {
        // Given
        let boardExpected = null;
        const aggregate = new domain_1.BoardAggregate({
            id: BOARD_ID,
            name: 'Dev Challenge Boards',
            description: '',
            private: true
        }, {
            cards: [],
            lists: [],
            participants: [
                {
                    isAdmin: true,
                    member: admin
                }
            ]
        });
        const memberRepository = new MemberRepositoryBuilder_1.MemberRepositoryBuilder()
            .withGetMembersByIds((ids) => __awaiter(void 0, void 0, void 0, function* () {
            return [memberToAdd];
        }))
            .build();
        const boardAggregateRepository = new BoardAggregateRepositoryBuilder_1.BoardAggregateRepositoryBuilder()
            .withGetBoardAggregateById(() => __awaiter(void 0, void 0, void 0, function* () {
            return aggregate;
        }))
            .withSaveAggregate((boardAggregate) => __awaiter(void 0, void 0, void 0, function* () {
            boardExpected = boardAggregate;
            return boardAggregate;
        }))
            .build();
        const useCase = new domain_1.InviteMemberToBoardUseCase(memberRepository, boardAggregateRepository);
        // When
        yield useCase.execute(Object.assign(Object.assign({}, request), { initiatorId: memberToAdd.id }), presenter);
        // Then
        expect(presenter.response).not.toBe(null);
        expect(presenter.response.errors).not.toBe(null);
        expect(presenter.response.errors.initiatorId).toHaveLength(1);
        expect(boardExpected).toBe(null);
        expect(presenter.response.aggregate).toBeNull();
    }));
    it('Should not do anything if member already present in board', () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        // Given
        let boardExpected = null;
        const aggregate = new domain_1.BoardAggregate({
            id: BOARD_ID,
            name: 'Dev Challenge Boards',
            description: '',
            private: true
        }, {
            cards: [],
            lists: [],
            participants: [
                {
                    isAdmin: true,
                    member: admin
                },
                {
                    isAdmin: false,
                    member: memberToAdd
                }
            ]
        });
        const memberRepository = new MemberRepositoryBuilder_1.MemberRepositoryBuilder()
            .withGetMembersByIds((ids) => __awaiter(void 0, void 0, void 0, function* () {
            return [memberToAdd];
        }))
            .build();
        const boardAggregateRepository = new BoardAggregateRepositoryBuilder_1.BoardAggregateRepositoryBuilder()
            .withGetBoardAggregateById(() => __awaiter(void 0, void 0, void 0, function* () {
            return aggregate;
        }))
            .withSaveAggregate((boardAggregate) => __awaiter(void 0, void 0, void 0, function* () {
            boardExpected = boardAggregate;
            return boardAggregate;
        }))
            .build();
        const useCase = new domain_1.InviteMemberToBoardUseCase(memberRepository, boardAggregateRepository);
        // When
        yield useCase.execute(request, presenter);
        // Then
        expect(presenter.response).not.toBe(null);
        expect(presenter.response.errors).toBeNull();
        expect(presenter.response.aggregate).not.toBeNull();
        expect((_a = presenter.response.aggregate) === null || _a === void 0 ? void 0 : _a.participants).toHaveLength(2);
    }));
    it('Should show errors if board does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        // Given
        let boardExpected = null;
        const memberRepository = new MemberRepositoryBuilder_1.MemberRepositoryBuilder()
            .withGetMembersByIds((ids) => __awaiter(void 0, void 0, void 0, function* () {
            return [memberToAdd];
        }))
            .build();
        const boardAggregateRepository = new BoardAggregateRepositoryBuilder_1.BoardAggregateRepositoryBuilder()
            .withGetBoardAggregateById(() => __awaiter(void 0, void 0, void 0, function* () {
            return null;
        }))
            .withSaveAggregate((boardAggregate) => __awaiter(void 0, void 0, void 0, function* () {
            boardExpected = boardAggregate;
            return boardAggregate;
        }))
            .build();
        const useCase = new domain_1.InviteMemberToBoardUseCase(memberRepository, boardAggregateRepository);
        // When
        yield useCase.execute(request, presenter);
        // Then
        expect(presenter.response).not.toBe(null);
        expect(presenter.response.errors).not.toBe(null);
        expect(presenter.response.errors.boardId).toHaveLength(1);
        expect(boardExpected).toBe(null);
        expect(presenter.response.aggregate).toBeNull();
    }));
    describe('Invalid Requests', () => {
        const dataset = [
            {
                label: 'MemberId empty',
                request: Object.assign(Object.assign({}, request), { memberIds: [] })
            },
            {
                label: 'BoardId empty',
                request: Object.assign(Object.assign({}, request), { boardId: '' })
            },
            {
                label: 'initiatorId empty',
                request: Object.assign(Object.assign({}, request), { initiatorId: '' })
            }
        ];
        it.each(dataset)('shows errors with invalid request : "$label"', ({ request }) => __awaiter(void 0, void 0, void 0, function* () {
            // Given
            const aggregate = new domain_1.BoardAggregate({
                id: BOARD_ID,
                name: 'Dev Challenge Boards',
                description: '',
                private: true
            }, {
                cards: [],
                lists: [],
                participants: [
                    {
                        isAdmin: true,
                        member: admin
                    }
                ]
            });
            let boardExpected;
            const memberRepository = new MemberRepositoryBuilder_1.MemberRepositoryBuilder()
                .withGetMemberById((id) => __awaiter(void 0, void 0, void 0, function* () {
                return memberToAdd;
            }))
                .build();
            const boardAggregateRepository = new BoardAggregateRepositoryBuilder_1.BoardAggregateRepositoryBuilder()
                .withGetBoardAggregateById(() => __awaiter(void 0, void 0, void 0, function* () {
                return aggregate;
            }))
                .withSaveAggregate((boardAggregate) => __awaiter(void 0, void 0, void 0, function* () {
                boardExpected = boardAggregate;
                return boardAggregate;
            }))
                .build();
            const useCase = new domain_1.InviteMemberToBoardUseCase(memberRepository, boardAggregateRepository);
            // When
            yield useCase.execute(request, presenter);
            // Then
            expect(presenter.response.errors).not.toBeNull();
            expect(presenter.response.aggregate).toBeNull();
        }));
    });
});
