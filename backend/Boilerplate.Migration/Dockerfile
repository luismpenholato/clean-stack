FROM mcr.microsoft.com/dotnet/runtime:9.0-alpine AS runner
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:9.0-alpine AS builder
WORKDIR /src
COPY ["Boilerplate.Migration/Boilerplate.Migration.csproj", "Boilerplate.Migration/"]
RUN dotnet restore "Boilerplate.Migration/Boilerplate.Migration.csproj"
COPY . .
WORKDIR /src/Boilerplate.Migration
RUN dotnet build "Boilerplate.Migration.csproj" -c Release -o /out/build

FROM builder AS publisher
RUN dotnet publish "Boilerplate.Migration.csproj" -c Release -o /out/publish

FROM runner
COPY --from=publisher /out/publish .
CMD ["dotnet", "Boilerplate.Migration.dll"]
