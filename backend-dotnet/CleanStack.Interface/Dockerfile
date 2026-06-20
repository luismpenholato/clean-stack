FROM mcr.microsoft.com/dotnet/aspnet:10.0-alpine AS runtime
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:10.0-alpine AS builder
ARG CONFIG=Release
WORKDIR /src
COPY ["CleanStack.Interface/CleanStack.Interface.csproj", "CleanStack.Interface/"]
COPY ["CleanStack.CrossCutting.IOC/CleanStack.CrossCutting.IOC.csproj", "CleanStack.CrossCutting.IOC/"]
COPY ["CleanStack.Application/CleanStack.Application.csproj", "CleanStack.Application/"]
COPY ["CleanStack.CrossCutting/CleanStack.CrossCutting.csproj", "CleanStack.CrossCutting/"]
COPY ["CleanStack.Domain/CleanStack.Domain.csproj", "CleanStack.Domain/"]
COPY ["CleanStack.Infrastructure/CleanStack.Infrastructure.csproj", "CleanStack.Infrastructure/"]
RUN dotnet restore "CleanStack.Interface/CleanStack.Interface.csproj"
COPY . .
WORKDIR /src/CleanStack.Interface
RUN dotnet build "CleanStack.Interface.csproj" -c $CONFIG -o /out/build

FROM builder AS publisher
ARG CONFIG=Release
RUN dotnet publish "CleanStack.Interface.csproj" -c $CONFIG -o /out/publish /p:UseAppHost=false

FROM runtime
WORKDIR /app
ENV ASPNETCORE_URLS=http://+:80
COPY --from=publisher /out/publish .
ENTRYPOINT ["dotnet", "CleanStack.Interface.dll"]
