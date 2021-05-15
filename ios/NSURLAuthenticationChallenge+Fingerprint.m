#import "NSURLAuthenticationChallenge+Fingerprint.h"
#import <CommonCrypto/CommonCrypto.h>

typedef NS_ENUM(NSInteger, kFingerprintType) {
  kFingerprintTypeSHA256,
};

@implementation NSURLAuthenticationChallenge (Fingerprint)

NSString *domainName;

- (NSString *)SHA256Fingerprint
{
  return [self fingerprintWithType:kFingerprintTypeSHA256];
}

- (NSString *)DomainName
{
  return domainName;
}


- (NSString *)fingerprintWithType:(kFingerprintType)type
{
  domainName = @"";
  SecTrustRef serverTrust = [[self protectionSpace] serverTrust];
  SecTrustResultType trustResultType;
  SecTrustEvaluate(serverTrust, &trustResultType);
  
  SecCertificateRef certificate = SecTrustGetCertificateAtIndex(serverTrust, 0);
  NSData *data = CFBridgingRelease(SecCertificateCopyData(certificate));
  
  domainName = CFBridgingRelease(SecCertificateCopySubjectSummary(certificate));
  
  const NSUInteger length = [self lengthWithType:type];
  unsigned char buffer[length];
  
  switch (type) {
    case kFingerprintTypeSHA256: {
      CC_SHA256(data.bytes, (CC_LONG)data.length, buffer);
      break;
    }
  }
  
  NSMutableString *fingerprint = [NSMutableString stringWithCapacity:length * 3];
  
  for (int i = 0; i < length; i++) {
    [fingerprint appendFormat:@"%02x ",buffer[i]];
  }
  
  return [fingerprint stringByTrimmingCharactersInSet:[NSCharacterSet whitespaceCharacterSet]];
}

- (NSUInteger)lengthWithType:(kFingerprintType)type
{
  switch (type) {
    case kFingerprintTypeSHA256: {
      return CC_SHA256_DIGEST_LENGTH;
    }
  }
}
@end

