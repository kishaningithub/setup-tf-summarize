"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeExtension = exports.computeDownloadContext = exports.FileType = void 0;
const os_1 = __importDefault(require("os"));
const core = __importStar(require("@actions/core"));
const core_1 = require("@actions/core");
const github_1 = require("@actions/github");
const semver = __importStar(require("semver"));
var FileType;
(function (FileType) {
    FileType["Tar"] = "tar.gz";
    FileType["Zip"] = "zip";
})(FileType || (exports.FileType = FileType = {}));
function computeDownloadContext() {
    return __awaiter(this, void 0, void 0, function* () {
        const version = yield computeVersion();
        const platform = computePlatform();
        const extension = computeExtension(version, platform);
        const url = `https://github.com/dineshba/tf-summarize/releases/download/${version}/tf-summarize_${platform}_${computeArchitecture()}.${extension}`;
        return {
            url,
            fileType: fetchFileType(extension)
        };
    });
}
exports.computeDownloadContext = computeDownloadContext;
function computeExtension(version, platform) {
    if (semver.gte(version, 'v0.3.6') && ['linux', 'darwin'].includes(platform)) {
        return FileType.Tar;
    }
    return FileType.Zip;
}
exports.computeExtension = computeExtension;
function fetchFileType(fileType) {
    switch (fileType) {
        case FileType.Tar:
            return FileType.Tar;
        default:
            return FileType.Zip;
    }
}
function computePlatform() {
    var _a;
    const platformMapping = new Map();
    platformMapping.set('win32', 'windows');
    return (_a = platformMapping.get(os_1.default.platform())) !== null && _a !== void 0 ? _a : os_1.default.platform();
}
function computeArchitecture() {
    var _a;
    const architectureMapping = new Map();
    architectureMapping.set('x64', 'amd64');
    architectureMapping.set('x32', '386');
    return (_a = architectureMapping.get(os_1.default.arch())) !== null && _a !== void 0 ? _a : os_1.default.arch();
}
function computeVersion() {
    return __awaiter(this, void 0, void 0, function* () {
        let latestVersion = (0, core_1.getInput)('tf-summarize-version');
        if (latestVersion === 'latest') {
            const latestRelease = yield octokit().rest.repos.getLatestRelease({
                owner: 'dineshba',
                repo: 'tf-summarize'
            });
            latestVersion = latestRelease.data.tag_name;
        }
        return latestVersion;
    });
}
function octokit() {
    return (0, github_1.getOctokit)(core.getInput('github-token'));
}
