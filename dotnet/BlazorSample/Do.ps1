rm -fr ../nuget/*
cp /Users/geddoff/Git/trinsic-id/okapi/dotnet/Library/Okapi/bin/Release/Okapi.Net.2.0.0.* ../nuget/
dotnet nuget locals all --clear
rm -fr bin
rm -fr obj

dotnet restore