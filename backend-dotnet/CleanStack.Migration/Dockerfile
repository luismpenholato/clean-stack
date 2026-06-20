FROM mcr.microsoft.com/dotnet/runtime:10.0-alpine AS runner
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:10.0-alpine AS builder
WORKDIR /src
COPY ["CleanStack.Migration/CleanStack.Migration.csproj", "CleanStack.Migration/"]
RUN dotnet restore "CleanStack.Migration/CleanStack.Migration.csproj"
COPY . .
WORKDIR /src/CleanStack.Migration
RUN dotnet build "CleanStack.Migration.csproj" -c Release -o /out/build

FROM builder AS publisher
RUN dotnet publish "CleanStack.Migration.csproj" -c Release -o /out/publish

FROM runner
COPY --from=publisher /out/publish .
CMD ["dotnet", "CleanStack.Migration.dll"]
