#import <Foundation/Foundation.h>

@interface NSURLAuthenticationChallenge (Fingerprint)
- (NSString *)SHA256Fingerprint;
- (NSString *)DomainName;
@end
