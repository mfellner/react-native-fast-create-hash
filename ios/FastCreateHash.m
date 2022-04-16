#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(FastCreateHash, NSObject)

RCT_EXTERN_METHOD(multiply:(float)a
                  withB:(float)b
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(createHash:(NSString *)data64
                  withAlgorithm:(NSString *)algorithm
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

@end
