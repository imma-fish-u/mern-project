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
const MemberRepositoryBuilder_1 = require("../builder/MemberRepositoryBuilder");
const BoardRepositoryBuilder_1 = require("../builder/BoardRepositoryBuilder");
const UnsplashGatewayBuilder_1 = require("../builder/UnsplashGatewayBuilder");
const UnsplashPhotoBuilder_1 = require("../builder/UnsplashPhotoBuilder");
const presenter = new (class {
    present(response) {
        this.response = response;
    }
})();
const zeus = {
    id: uuid_1.v4(),
    login: 'zeus',
    name: 'Zeus God of thunder',
    avatarURL: 'https://placekitten.com/200/300'
};
const request = {
    name: 'Olympus Reunion',
    coverPhotoId: uuid_1.v4(),
    private: true,
    memberId: zeus.id
};
const boardExpected = {
    name: request.name,
    cover: new UnsplashPhotoBuilder_1.UnsplashPhotoBuilder().build(),
    private: request.private,
    description: null,
    participants: [
        {
            isAdmin: true,
            member: zeus
        }
    ]
};
describe('AddBoard Use case', () => {
    it('is successful', () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        // Given
        let boardResult = null;
        const memberRepo = new MemberRepositoryBuilder_1.MemberRepositoryBuilder()
            .withGetMemberById(() => __awaiter(void 0, void 0, void 0, function* () { return zeus; }))
            .build();
        const boardRepo = new BoardRepositoryBuilder_1.BoardRepositoryBuilder()
            .withAddBoard((board) => __awaiter(void 0, void 0, void 0, function* () {
            boardResult = board;
            return board;
        }))
            .build();
        const unsplashGateway = new UnsplashGatewayBuilder_1.UnsplashGatewayBuilder()
            .withGetPhoto(() => __awaiter(void 0, void 0, void 0, function* () { return new UnsplashPhotoBuilder_1.UnsplashPhotoBuilder().build(); }))
            .build();
        const useCase = new src_1.AddBoardUseCase(memberRepo, boardRepo, unsplashGateway);
        // When
        yield useCase.execute(request, presenter);
        // Then
        expect((_a = presenter.response) === null || _a === void 0 ? void 0 : _a.errors).toBe(null);
        expect(boardResult).not.toBe(null);
        expect(boardResult).toBe((_b = presenter.response) === null || _b === void 0 ? void 0 : _b.board);
        expect(boardResult).toMatchObject(boardExpected);
    }));
    it('Should show error & does not add to repo if memberId invalid', () => __awaiter(void 0, void 0, void 0, function* () {
        var _c, _d, _e;
        // Given
        let boardResult = null;
        const memberRepo = new MemberRepositoryBuilder_1.MemberRepositoryBuilder()
            .withGetMemberById(() => __awaiter(void 0, void 0, void 0, function* () { return null; }))
            .build();
        const boardRepo = new BoardRepositoryBuilder_1.BoardRepositoryBuilder()
            .withAddBoard((board) => __awaiter(void 0, void 0, void 0, function* () {
            boardResult = board;
            return board;
        }))
            .build();
        const unsplashGateway = new UnsplashGatewayBuilder_1.UnsplashGatewayBuilder()
            .withGetPhoto(() => __awaiter(void 0, void 0, void 0, function* () { return new UnsplashPhotoBuilder_1.UnsplashPhotoBuilder().build(); }))
            .build();
        const useCase = new src_1.AddBoardUseCase(memberRepo, boardRepo, unsplashGateway);
        // When
        yield useCase.execute(request, presenter);
        // Then
        expect((_c = presenter.response) === null || _c === void 0 ? void 0 : _c.errors).not.toBe(null);
        expect((_e = (_d = presenter.response) === null || _d === void 0 ? void 0 : _d.errors) === null || _e === void 0 ? void 0 : _e.memberId).toContainEqual("Cet utilisateur n'existe pas");
        expect(boardResult).toBe(null);
        expect(presenter.response.board).toBe(null);
    }));
    it('Should show error & does not add to repo if coverPhotoId is invalid', () => __awaiter(void 0, void 0, void 0, function* () {
        var _f, _g, _h;
        // Given
        let boardResult = null;
        const memberRepo = new MemberRepositoryBuilder_1.MemberRepositoryBuilder()
            .withGetMemberById(() => __awaiter(void 0, void 0, void 0, function* () { return zeus; }))
            .build();
        const boardRepo = new BoardRepositoryBuilder_1.BoardRepositoryBuilder()
            .withAddBoard((board) => __awaiter(void 0, void 0, void 0, function* () {
            boardResult = board;
            return board;
        }))
            .build();
        const unsplashGateway = new UnsplashGatewayBuilder_1.UnsplashGatewayBuilder()
            .withGetPhoto(() => __awaiter(void 0, void 0, void 0, function* () { return null; }))
            .build();
        const useCase = new src_1.AddBoardUseCase(memberRepo, boardRepo, unsplashGateway);
        // When
        yield useCase.execute(request, presenter);
        // Then
        expect((_f = presenter.response) === null || _f === void 0 ? void 0 : _f.errors).not.toBe(null);
        expect((_h = (_g = presenter.response) === null || _g === void 0 ? void 0 : _g.errors) === null || _h === void 0 ? void 0 : _h.coverPhotoId).toHaveLength(1);
        expect(boardResult).toBe(null);
        expect(presenter.response.board).toBe(null);
    }));
    describe('Invalid Requests', () => {
        const dataset = [
            {
                label: 'Name empty',
                request: Object.assign(Object.assign({}, request), { name: '' })
            },
            {
                label: 'cover empty',
                request: Object.assign(Object.assign({}, request), { coverPhotoId: '' })
            },
            {
                label: 'memberId empty',
                request: Object.assign(Object.assign({}, request), { memberId: '' })
            }
        ];
        it.each(dataset)('shows errors & do not add to repo with invalid request : "$label"', ({ request }) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            // Given
            let boardResult = null;
            const memberRepo = new MemberRepositoryBuilder_1.MemberRepositoryBuilder()
                .withGetMemberById((id) => __awaiter(void 0, void 0, void 0, function* () {
                return id === zeus.id ? zeus : null;
            }))
                .build();
            const boardRepo = new BoardRepositoryBuilder_1.BoardRepositoryBuilder()
                .withAddBoard((board) => __awaiter(void 0, void 0, void 0, function* () {
                boardResult = board;
                return board;
            }))
                .build();
            const unsplashGateway = new UnsplashGatewayBuilder_1.UnsplashGatewayBuilder()
                .withGetPhoto(() => __awaiter(void 0, void 0, void 0, function* () { return new UnsplashPhotoBuilder_1.UnsplashPhotoBuilder().build(); }))
                .build();
            const useCase = new src_1.AddBoardUseCase(memberRepo, boardRepo, unsplashGateway);
            // When
            yield useCase.execute(request, presenter);
            // Then
            expect((_a = presenter.response) === null || _a === void 0 ? void 0 : _a.errors).not.toBe(null);
            expect(boardResult).toBe(null);
            expect(presenter.response.board).toBe(null);
        }));
    });
});
