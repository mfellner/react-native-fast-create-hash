import Foundation
import CryptoKit

@objc(FastCreateHash)
class FastCreateHash: NSObject {
    // https://stackoverflow.com/a/50294485
    @objc static func requiresMainQueueSetup() -> Bool {
        return false
    }

    @objc(createHash:withAlgorithm:withResolver:withRejecter:)
    func createHash(data64: String,
                    algorithm: String,
                    resolve: RCTPromiseResolveBlock,
                    reject: RCTPromiseRejectBlock) -> Void {
        let data = Data.init(base64Encoded: data64)
        if data != nil {
            let digest: ContiguousBytes
            switch algorithm {
            case "sha256":
                digest = SHA256.hash(data: data!)
            case "sha384":
                digest = SHA384.hash(data: data!)
            case "sha512":
                digest = SHA512.hash(data: data!)
            default:
                reject("unknown_algorithm", "hashing algorithm not supported", nil as Error?)
                return
            }
            let base64 = digest.withUnsafeBytes { bytes in
                Data(bytes).base64EncodedString()
            }
            resolve(base64)
        } else {
            reject("bad_data", "data cannot be parsed", nil as Error?)
        }
    }
}
