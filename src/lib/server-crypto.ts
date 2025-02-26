
import CryptoJS from "crypto-js";

export function hash(algorithm: "sha256", data: string, encoding: "hex" | "base64url") {
	if (algorithm === "sha256") {
		const hash = CryptoJS.SHA256(data);
		return encoding === "hex" ? hash.toString(CryptoJS.enc.Hex) : hash.toString(CryptoJS.enc.Base64url);
	}
	throw new Error("Unsupported algorithm");
}

export function randomBytes(size: number) {
	const randomWords = CryptoJS.lib.WordArray.random(size);
	return randomWords.toString(CryptoJS.enc.Hex).normalize();
}