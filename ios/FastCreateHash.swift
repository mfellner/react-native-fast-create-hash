import Foundation
import CryptoKit

@objc(FastCreateHash)
class FastCreateHash: NSObject {
    // https://stackoverflow.com/a/50294485
    @objc static func requiresMainQueueSetup() -> Bool {
        return false
    }

    @objc(multiply:withB:withResolver:withRejecter:)
    func multiply(a: Float,
                  b: Float,
                  resolve: RCTPromiseResolveBlock,
                  reject: RCTPromiseRejectBlock) -> Void {
        resolve(a*b)
    }

    @objc(createHash:withAlgorithm:withResolver:withRejecter:)
    func createHash(data64: String,
                    algorithm: String,
                    resolve: RCTPromiseResolveBlock,
                    reject: RCTPromiseRejectBlock) -> Void {
        let data = Data.init(base64Encoded: data64)
        if data != nil {
            let digest = SHA256.hash(data: data!)
            let base64 = digest.withUnsafeBytes { bytes in
                Data(bytes).base64EncodedString()
            }
            resolve(base64)
        } else {
            reject("bad_data", "data cannot be parsed", nil)
        }
    }
}
