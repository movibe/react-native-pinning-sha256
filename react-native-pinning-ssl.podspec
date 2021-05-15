require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "react-native-pinning-sha256"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.description  = <<-DESC
                  react-native-pinning-sha256
                   DESC
  s.homepage     = "https://github.com/movibe/react-native-pinning-sha256"
  # brief license entry:
  s.license      = "MIT"
  # optional - use expanded license entry instead:
  # s.license    = { :type => "MIT", :file => "LICENSE" }
  s.authors      = { "Willian Ribeiro Angelo" => "agfoccus@gmail.com" }
  s.platforms    = { :ios => "9.0" }
  s.source       = { :git => "https://github.com/movibe/react-native-pinning-sha256.git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,m,swift,c}"
  s.requires_arc = true

  s.dependency "React"
  # ...
  # s.dependency "..."
end
