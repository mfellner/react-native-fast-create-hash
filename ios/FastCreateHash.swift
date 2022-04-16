import Foundation

@objc(FastCreateHash)
class FastCreateHash: NSObject {
    // https://stackoverflow.com/a/50294485
    @objc static func requiresMainQueueSetup() -> Bool {
        return false
    }

    @objc(multiply:withB:withResolver:withRejecter:)
    func multiply(a: Float, b: Float, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        resolve(a*b)
    }
}
