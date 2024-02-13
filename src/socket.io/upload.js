'use strict';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const socketUser = __importStar(require("./user"));
const socketGroup = __importStar(require("./groups"));
const image = __importStar(require("../image"));
const meta = __importStar(require("../meta"));
const inProgress = {};
const uploads = {
    upload: function (socket, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const methodToFunc = {
                'user.uploadCroppedPicture': socketUser.uploadCroppedPicture,
                'user.updateCover': socketUser.updateCover,
                'groups.cover.update': socketGroup.cover.update,
            };
            if (!socket.uid || !data || !data.chunk ||
                !data.params || !data.params.method || !methodToFunc.hasOwnProperty(data.params.method)) {
                throw new Error('[[error:invalid-data]]');
            }
            inProgress[socket.id] = inProgress[socket.id] || Object.create(null);
            const socketUploads = inProgress[socket.id];
            const { method } = data.params;
            socketUploads[method] = socketUploads[method] || { imageData: '' };
            socketUploads[method].imageData += data.chunk;
            try {
                const maxSize = data.params.method === 'user.uploadCroppedPicture' ?
                    meta.config.maximumProfileImageSize : meta.config.maximumCoverImageSize;
                const size = image.sizeFromBase64(socketUploads[method].imageData);
                if (size > maxSize * 1024) {
                    throw new Error(`[[error:file-too-big, ${maxSize}]]`);
                }
                if (socketUploads[method].imageData.length < data.params.size) {
                    return;
                }
                data.params.imageData = socketUploads[method].imageData;
                const result = yield methodToFunc[data.params.method](socket, data.params);
                delete socketUploads[method];
                return result;
            }
            catch (err) {
                delete inProgress[socket.id];
                throw err;
            }
        });
    },
    clear: function (sid) {
        delete inProgress[sid];
    }
};
module.exports = uploads;
